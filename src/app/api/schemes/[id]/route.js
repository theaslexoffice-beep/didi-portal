import { NextResponse } from 'next/server';
import { getSchemeById } from '@/lib/data';

/**
 * GET /api/schemes/[id]
 * Get single scheme with full details
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Scheme ID required' },
        { status: 400 }
      );
    }

    const scheme = await getSchemeById(parseInt(id));

    if (!scheme) {
      return NextResponse.json(
        { success: false, error: 'Scheme not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      try {
        scheme.eligibility = JSON.parse(scheme.eligibility);
      } catch (e) {
        scheme.eligibility = null;
      }
    }

    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      try {
        scheme.documents_needed = JSON.parse(scheme.documents_needed);
      } catch (e) {
        scheme.documents_needed = [];
      }
    }

    return NextResponse.json({ success: true, scheme });

  } catch (error) {
    console.error('Get scheme by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}
