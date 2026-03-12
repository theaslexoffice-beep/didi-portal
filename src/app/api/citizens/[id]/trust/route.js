import { NextResponse } from 'next/server';
import { updateTrustScore, getTrustBadge } from '@/lib/community';
import { getCitizenById } from '@/lib/data';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const citizen = await getCitizenById(parseInt(id));
    if (!citizen) {
      return NextResponse.json(
        { error: 'Citizen not found' },
        { status: 404 }
      );
    }
    
    // Recalculate trust score
    const trustScore = await updateTrustScore(parseInt(id));
    const badge = getTrustBadge(trustScore);
    
    return NextResponse.json({
      success: true,
      citizen_id: parseInt(id),
      trust_score: trustScore,
      badge
    });
  } catch (error) {
    console.error('Error fetching trust score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trust score' },
      { status: 500 }
    );
  }
}
