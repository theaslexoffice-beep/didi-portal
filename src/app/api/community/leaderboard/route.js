import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/community';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    const period = searchParams.get('period') || 'month';

    // Get leaderboard
    const leaderboard = getLeaderboard(ward, period);

    return NextResponse.json({
      success: true,
      data: {
        ward: ward || 'all',
        period,
        leaderboard
      }
    });
  } catch (error) {
    console.error('GET /api/community/leaderboard error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
