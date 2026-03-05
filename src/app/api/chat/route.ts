import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/chatbot-knowledge';
import { getAutoAccessToken } from '@/lib/pcrs-auth';

const anthropic = new Anthropic();

const PCRS_AUTO_API_URL = process.env.PCRS_AUTO_API_URL;
const DEALER_NUMBER_AUTO = process.env.DEALER_NUMBER_AUTO;

const tools: Anthropic.Tool[] = [
  {
    name: 'get_coverage_rates',
    description:
      'Look up available Vehicle Service Contract coverage rates and pricing for a specific vehicle. Requires a VIN (17 characters) and current mileage.',
    input_schema: {
      type: 'object' as const,
      properties: {
        vin: {
          type: 'string',
          description: 'The 17-character Vehicle Identification Number',
        },
        mileage: {
          type: 'number',
          description: 'The current odometer reading in miles',
        },
      },
      required: ['vin', 'mileage'],
    },
  },
];

async function fetchCoverageRates(vin: string, mileage: number) {
  try {
    // Decode year/make/model from VIN via PCRS (the rates endpoint handles this)
    const today = new Date().toISOString().split('T')[0];
    const payload = {
      saleDate: today,
      dealerNumber: DEALER_NUMBER_AUTO,
      saleOdometer: mileage,
      vehicle: {
        vin,
        vehicleAgeType: mileage > 0 ? 'Used' : 'New',
      },
    };

    const accessToken = await getAutoAccessToken();
    const response = await fetch(`${PCRS_AUTO_API_URL}/contracts/GetCoverageRates`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: 'Failed to fetch rates. The vehicle may not be eligible for coverage.' };
    }

    // Summarize rates for the bot
    if (!data.rates || data.rates.length === 0) {
      return { error: 'No coverage rates available for this vehicle.' };
    }

    interface RateTerm { termMonths: number; termOdometer: number; dealerCost: number; deductible: { amount: number } }
    interface Rate { code: string; description: string; terms: RateTerm[] }

    const summary = (data.rates as Rate[]).map((rate) => {
      const lowestTerm = rate.terms.reduce((min, t) => (t.dealerCost < min.dealerCost ? t : min), rate.terms[0]);
      return {
        tier: rate.description,
        code: rate.code,
        startingPrice: lowestTerm.dealerCost,
        termMonths: lowestTerm.termMonths,
        termMiles: lowestTerm.termOdometer,
        deductible: lowestTerm.deductible?.amount ?? 0,
        totalTermOptions: rate.terms.length,
      };
    });

    return { rates: summary };
  } catch (error) {
    console.error('Chat coverage rates error:', error);
    return { error: 'Something went wrong looking up rates. Please try the quote page directly.' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Guard: limit conversation length to prevent token abuse
    if (messages.length > 30) {
      return new Response(
        'This conversation has gotten quite long. Please refresh the page to start a new chat.',
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    // Guard: limit individual message length (500 chars is plenty for VSC questions)
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content && lastMessage.content.length > 500) {
      return new Response(
        'Your message is too long. Please keep questions brief and focused on AssuredPartners coverage.',
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    const apiMessages: Anthropic.MessageParam[] = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // First call — may return tool_use or text
    let response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: CHATBOT_SYSTEM_PROMPT,
      tools,
      messages: apiMessages,
    });

    // Tool use loop — if Claude wants to call a tool, execute it and continue
    while (response.stop_reason === 'tool_use') {
      const toolBlock = response.content.find((block) => block.type === 'tool_use');

      if (!toolBlock || toolBlock.type !== 'tool_use') break;

      let toolResult: unknown;

      if (toolBlock.name === 'get_coverage_rates') {
        const { vin, mileage } = toolBlock.input as { vin: string; mileage: number };
        toolResult = await fetchCoverageRates(vin, mileage);
      } else {
        toolResult = { error: `Unknown tool: ${toolBlock.name}` };
      }

      // Continue conversation with tool result
      apiMessages.push({
        role: 'assistant',
        content: response.content,
      });
      apiMessages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolBlock.id,
            content: JSON.stringify(toolResult),
          },
        ],
      });

      response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: CHATBOT_SYSTEM_PROMPT,
        tools,
        messages: apiMessages,
      });
    }

    // Extract final text response
    const textContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('');

    return new Response(textContent, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
