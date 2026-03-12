import { NextResponse } from 'next/server';
import { createComplaint, getApprovedComplaints } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const complaints = getApprovedComplaints(limit, offset);
    return NextResponse.json({ success: true, complaints });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, category, description } = body;

    // Validate required fields
    if (!whatsapp || !description) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number and complaint description are required' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    const phoneClean = whatsapp.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const id = createComplaint({
      name: name || 'Anonymous',
      whatsapp: phoneClean,
      email: email || null,
      category: category || 'other',
      description,
    });

    return NextResponse.json({ success: true, id, message: 'Complaint submitted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
