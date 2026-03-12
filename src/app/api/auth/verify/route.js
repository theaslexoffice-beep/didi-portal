import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    // Validate required fields
    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Get citizen
    const citizen = await db.getCitizenByPhone(phoneClean);
    
    if (!citizen) {
      return NextResponse.json(
        { success: false, error: 'Phone number not registered' },
        { status: 404 }
      );
    }

    // Verify OTP (mock: accept 123456)
    if (otp !== '123456' && citizen.otp !== otp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Mark as verified
    await db.verifyCitizen(phoneClean, otp);

    // Get updated citizen
    const updatedCitizen = await db.getCitizenByPhone(phoneClean);

    return NextResponse.json({
      success: true,
      message: 'Phone verified successfully',
      data: {
        citizen: updatedCitizen
      }
    });
  } catch (error) {
    console.error('POST /api/auth/verify error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
