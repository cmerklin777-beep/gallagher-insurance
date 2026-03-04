'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the eTags Assistant. I can help you learn about our Vehicle Service Contracts, coverage tiers, or navigate the site. What can I help you with?",
};

function renderMessageContent(content: string) {
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const href = linkMatch[2];
      // Sanitize: only allow http, https, and relative URLs
      const isSafe = href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://');
      if (isSafe) {
        return (
          <a key={i} href={href} className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover">
            {linkMatch[1]}
          </a>
        );
      }
      // Render unsafe links as plain text
      return <span key={i}>{linkMatch[1]}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

type MascotState = 'entering' | 'performing' | 'idle' | 'chatOpen';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Entrance animation sequence
  useEffect(() => {
    // TODO: Re-enable session check after testing
    // const hasEntered = sessionStorage.getItem('mascotEntered');
    // if (hasEntered) {
    //   setMascotState('idle');
    //   setShowBubble(true);
    //   return;
    // }

    // Phase 1: Walk in from off-screen (3s slide + walk frames looping)
    setMascotState('entering');

    // Phase 2: After walk-in, play salute + wave + 360° spin (4s)
    const performTimer = setTimeout(() => {
      setMascotState('performing');
    }, 3000);

    // Phase 3: After perform completes, switch to idle + show bubble
    const idleTimer = setTimeout(() => {
      setMascotState('idle');
      setShowBubble(true);
      sessionStorage.setItem('mascotEntered', 'true');
    }, 7200);

    return () => {
      clearTimeout(performTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setMascotState('chatOpen');
    setShowBubble(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setMascotState('idle');
    setShowBubble(true);
  }, []);

  const handleMascotClick = useCallback(() => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isOpen, openChat, closeChat]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Skip the welcome message (first message) to save API tokens
          messages: updatedMessages.slice(1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        const currentContent = assistantContent;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: currentContent };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble responding right now. Please try again or visit our [FAQ](/faq) page." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const spriteClass =
    mascotState === 'entering'
      ? 'mascot-entering'
      : mascotState === 'performing'
        ? 'mascot-performing'
        : 'mascot-idle';

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-28 right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl sm:w-[400px] sm:right-6"
          style={{ height: 'min(500px, calc(100vh - 160px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="mascot-sprite shrink-0" style={{ width: 28, height: 28, backgroundSize: '800% 800%', backgroundPosition: '0% 0%' }} />
              <span className="font-semibold text-white">eTags Assistant</span>
            </div>
            <button onClick={closeChat} className="rounded-lg p-1 text-navy-100 transition hover:bg-white/10 hover:text-white" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-br-md'
                      : 'bg-navy-50 text-navy-900 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-navy-50 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-navy-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="rounded-xl bg-accent p-2.5 text-white transition hover:bg-accent-hover disabled:opacity-50 disabled:hover:bg-accent"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mascot + Speech Bubble */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:right-6">
        {/* Speech Bubble */}
        {showBubble && !isOpen && (
          <button
            onClick={openChat}
            className="mascot-bubble relative mb-2 cursor-pointer rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-lg transition hover:shadow-xl"
            aria-label="Open chat assistant"
          >
            Need help?
            {/* Triangle pointer */}
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white" />
          </button>
        )}

        {/* Mascot Sprite */}
        <button
          onClick={handleMascotClick}
          className={`mascot-sprite cursor-pointer transition-transform hover:scale-105 ${spriteClass}`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        />
      </div>
    </>
  );
}
