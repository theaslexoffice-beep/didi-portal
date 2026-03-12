import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const id = searchParams.get('id');

    if (!phone && !id) {
      return NextResponse.json(
        { success: false, error: 'Either phone or id query parameter is required' },
        { status: 400 }
      );
    }

    let citizen;

    if (id) {
      citizen = await db.getCitizenById(parseInt(id));
    } else if (phone) {
      const phoneClean = phone.replace(/\D/g, '');
      citizen = await db.getCitizenByPhone(phoneClean);
    }

    if (!citizen) {
      return NextResponse.json(
        { success: false, error: 'Citizen not found' },
        { status: 404 }
      );
    }

    // Get achievements
    const achievements = await db.getCitizenAchievements(citizen.id);

    return NextResponse.json({
      success: true,
      data: {
        ...citizen,
        achievements,
        achievement_count: achievements.length
      }
    });
  } catch (error) {
    console.error('GET /api/citizens/profile error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
