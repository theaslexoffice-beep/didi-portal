import { NextResponse } from 'next/server';
import { findCompatibleDonors } from '@/lib/matcher';

export async function POST(request) {
  try {
    const body = await request.json();
    const { blood_group, location, urgency } = body;

    // Validate required fields
    if (!blood_group || !location) {
      return NextResponse.json(
        { success: false, error: 'blood_group and location (lat, lng) are required' },
        { status: 400 }
      );
    }

    const { lat, lng } = location;
    
    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'location must include lat and lng' },
        { status: 400 }
      );
    }

    // Determine radius based on urgency
    const radius = urgency === 'critical' ? 20 : urgency === 'urgent' ? 15 : 10;

    // Find compatible donors
    const donors = findCompatibleDonors(blood_group, lat, lng, radius);

    return NextResponse.json({
      success: true,
      data: {
        blood_group,
        total_donors: donors.length,
        donors,
        search_radius_km: radius,
        emergency_number: '108'
      }
    });
  } catch (error) {
    console.error('POST /api/match/blood error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
