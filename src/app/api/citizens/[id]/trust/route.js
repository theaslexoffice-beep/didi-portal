import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { getTrustBadge } from '@/lib/community';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Citizen ID is required' },
        { status: 400 }
      );
    }

    // Get citizen
    const citizen = await db.getCitizenById(parseInt(id));
    
    if (!citizen) {
      return NextResponse.json(
        { success: false, error: 'Citizen not found' },
        { status: 404 }
      );
    }

    const trustScore = citizen.trust_score || 0;
    const badge = getTrustBadge(trustScore);

    // Get help history for breakdown
    const helpResponses = await db.getHelpResponsesByCitizen(parseInt(id));
    const completedHelps = helpResponses.filter(hr => hr.status === 'completed').length;
    const cancelledHelps = helpResponses.filter(hr => hr.status === 'cancelled').length;

    // Calculate score breakdown
    const breakdown = {
      base_score: citizen.verified ? 10 : 0,
      completed_helps: completedHelps * 5,
      cancelled_penalty: cancelledHelps * -10,
      total: trustScore
    };

    return NextResponse.json({
      success: true,
      data: {
        citizen_id: id,
        trust_score: trustScore,
        badge,
        breakdown,
        help_stats: {
          total: helpResponses.length,
          completed: completedHelps,
          cancelled: cancelledHelps,
          in_progress: helpResponses.filter(hr => hr.status === 'in_progress').length
        }
      }
    });
  } catch (error) {
    console.error('GET /api/citizens/[id]/trust error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
