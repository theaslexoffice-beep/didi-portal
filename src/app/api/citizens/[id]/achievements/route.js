import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Citizen ID is required' },
        { status: 400 }
      );
    }

    // Get achievements for citizen
    const achievements = await db.getCitizenAchievements(parseInt(id));

    return NextResponse.json({
      success: true,
      data: achievements,
      count: achievements.length
    });
  } catch (error) {
    console.error('GET /api/citizens/[id]/achievements error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
