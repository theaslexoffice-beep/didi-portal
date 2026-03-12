import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, ward, language } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number (must be 10 digits)' },
        { status: 400 }
      );
    }

    // Check if citizen already exists
    const existing = await db.getCitizenByPhone(phoneClean);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Phone number already registered' },
        { status: 400 }
      );
    }

    // Generate OTP (mock: 123456 for now)
    const otp = '123456';

    // Create citizen record (unverified)
    const citizenId = await db.createCitizen({
      name,
      phone: phoneClean,
      ward: ward || null,
      language: language || 'en',
      verified: false
    });

    // Update with OTP
    await db.updateCitizenOTP(citizenId, otp);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully. Use 123456 to verify.',
      data: {
        citizen_id: citizenId,
        phone: phoneClean,
        otp_hint: 'Use 123456'
      }
    });
  } catch (error) {
    console.error('POST /api/auth/register error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
