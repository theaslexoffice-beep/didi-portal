import { NextResponse } from 'next/server';
import { verifyCitizen } from '@/lib/data';

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();
    
    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: 'Phone and OTP are required' }, { status: 400 });
    }
    
    const result = await verifyCitizen(phone, otp);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Verification successful',
        citizen: result.citizen
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid or expired OTP' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
