import { NextResponse } from 'next/server';
import { getAchievements } from '@/lib/community';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const achievements = getAchievements(parseInt(id));
    
    return NextResponse.json({
      success: true,
      citizen_id: parseInt(id),
      count: achievements.length,
      achievements
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}
