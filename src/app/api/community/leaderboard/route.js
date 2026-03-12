import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/community';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    const period = searchParams.get('period') || 'month'; // month, week, all-time
    
    const leaderboard = await getLeaderboard(ward, period);
    
    return NextResponse.json({
      success: true,
      ward: ward || 'All Wards',
      period,
      count: leaderboard.length,
      leaderboard
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
