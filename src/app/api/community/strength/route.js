import { NextResponse } from 'next/server';
import { getCommunityStrength } from '@/lib/matcher';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    
    const strength = getCommunityStrength(ward);
    
    return NextResponse.json({
      success: true,
      ...strength
    });
  } catch (error) {
    console.error('Error fetching community strength:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community strength' },
      { status: 500 }
    );
  }
}
