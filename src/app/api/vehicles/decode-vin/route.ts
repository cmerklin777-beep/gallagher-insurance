import { NextRequest, NextResponse } from 'next/server';

const NHTSA_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues';

export async function POST(request: NextRequest) {
  try {
    const { vin } = await request.json();

    if (!vin || typeof vin !== 'string') {
      return NextResponse.json({ error: 'VIN is required' }, { status: 400 });
    }

    const cleanVin = vin.trim().toUpperCase();

    // Validate VIN format
    if (cleanVin.length !== 17) {
      return NextResponse.json({ error: 'VIN must be exactly 17 characters' }, { status: 400 });
    }
    if (/[IOQ]/.test(cleanVin)) {
      return NextResponse.json({ error: 'VIN cannot contain I, O, or Q' }, { status: 400 });
    }

    // Call NHTSA
    const response = await fetch(`${NHTSA_API_URL}/${cleanVin}?format=json`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to reach NHTSA database' }, { status: 502 });
    }

    const data = await response.json();
    const result = data.Results?.[0];

    if (!result) {
      return NextResponse.json({ error: 'No vehicle data found for this VIN' }, { status: 404 });
    }

    const year = result.ModelYear;
    const make = result.Make;
    const model = result.Model;

    // Check for error codes from NHTSA (code 0 = success, others = issues)
    const errorCode = result.ErrorCode;
    if (errorCode && !errorCode.split(',').includes('0')) {
      return NextResponse.json(
        { error: 'Could not decode this VIN. Please enter vehicle details manually.' },
        { status: 422 }
      );
    }

    if (!year || !make || !model) {
      return NextResponse.json(
        { error: 'Incomplete vehicle data for this VIN. Please enter details manually.' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      year: parseInt(year, 10),
      make: make,
      model: model,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return NextResponse.json({ error: 'VIN lookup timed out. Please try again or enter details manually.' }, { status: 504 });
    }
    console.error('VIN decode error:', error);
    return NextResponse.json({ error: 'Failed to decode VIN' }, { status: 500 });
  }
}
