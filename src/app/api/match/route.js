import { NextResponse } from 'next/server';
import { findEligibleSchemes } from '@/lib/scheme-matcher';

export async function POST(request) {
  try {
    const body = await request.json();
    const { citizen_profile } = body;

    if (!citizen_profile) {
      return NextResponse.json(
        { success: false, error: 'citizen_profile is required' },
        { status: 400 }
      );
    }

    // Find eligible schemes
    const matches = findEligibleSchemes(citizen_profile);

    return NextResponse.json({
      success: true,
      data: {
        total_matches: matches.length,
        schemes: matches
      }
    });
  } catch (error) {
    console.error('POST /api/match error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
