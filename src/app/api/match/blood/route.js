import { NextResponse } from 'next/server';
import { findCompatibleDonors } from '@/lib/matcher';

export async function POST(request) {
  try {
    const body = await request.json();
    const { blood_group, lat, lng, radius } = body;
    
    if (!blood_group || !lat || !lng) {
      return NextResponse.json(
        { error: 'blood_group, lat, and lng are required' },
        { status: 400 }
      );
    }
    
    const donors = findCompatibleDonors(
      blood_group,
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 15
    );
    
    return NextResponse.json({
      success: true,
      blood_group,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      radius: radius || 15,
      count: donors.length,
      donors
    });
  } catch (error) {
    console.error('Error in blood donor matching:', error);
    return NextResponse.json(
      { error: 'Blood donor matching failed' },
      { status: 500 }
    );
  }
}
