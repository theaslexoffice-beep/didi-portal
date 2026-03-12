import { NextResponse } from 'next/server';
import { getCommunityStrength } from '@/lib/matcher';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');

    // Get community strength data
    const strength = getCommunityStrength(ward);

    return NextResponse.json({
      success: true,
      data: strength
    });
  } catch (error) {
    console.error('GET /api/community/strength error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
