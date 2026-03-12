import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Scheme ID is required' },
        { status: 400 }
      );
    }

    const scheme = await db.getSchemeById(parseInt(id));
    
    if (!scheme) {
      return NextResponse.json(
        { success: false, error: 'Scheme not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields if needed
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }

    return NextResponse.json({
      success: true,
      data: scheme
    });
  } catch (error) {
    console.error('GET /api/schemes/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
