import { NextResponse } from 'next/server';
import { getCitizenById, updateCitizenProfile } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Citizen ID required' }, { status: 400 });
    }
    
    const citizen = getCitizenById(parseInt(id));
    
    if (!citizen) {
      return NextResponse.json({ success: false, error: 'Citizen not found' }, { status: 404 });
    }
    
    // Parse JSON fields
    if (citizen.skills) citizen.skills = JSON.parse(citizen.skills);
    if (citizen.resources) citizen.resources = JSON.parse(citizen.resources);
    
    return NextResponse.json({ success: true, citizen });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Citizen ID required' }, { status: 400 });
    }
    
    updateCitizenProfile(parseInt(id), updates);
    
    const citizen = getCitizenById(parseInt(id));
    if (citizen.skills) citizen.skills = JSON.parse(citizen.skills);
    if (citizen.resources) citizen.resources = JSON.parse(citizen.resources);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated',
      citizen
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
