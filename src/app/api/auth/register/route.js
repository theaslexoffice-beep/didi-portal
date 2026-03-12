import { NextResponse } from 'next/server';
import { createCitizen, getCitizenByPhone } from '@/lib/data';

export async function POST(request) {
  try {
    const { name, phone, email } = await request.json();
    
    // Validate
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }
    
    if (phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ success: false, error: 'Invalid phone number' }, { status: 400 });
    }
    
    // Check if already exists
    const existing = await getCitizenByPhone(phone);
    if (existing) {
      // Resend OTP — update OTP and expiry
      const { updateCitizenOTP } = await import('@/lib/db');await updateCitizenOTP(phone, '123456');
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent to your phone',
        otp: '123456',
        citizen_id: existing.id
      });
    }
    
    // Create new citizen
    const result = await createCitizen({ name, phone, email });
    
    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent to your phone',
      otp: result.otp,
      citizen_id: result.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
