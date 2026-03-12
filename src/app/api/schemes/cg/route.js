import { NextResponse } from 'next/server';
import { getCGSchemes } from '@/lib/scheme-matcher';

/**
 * GET /api/schemes/cg
 * Get all Chhattisgarh state-specific schemes
 */
export async function GET(request) {
  try {
    const cgSchemes = getCGSchemes();

    return NextResponse.json({
      success: true,
      schemes: cgSchemes,
      count: cgSchemes.length,
      state: 'Chhattisgarh',
      description: 'All Chhattisgarh state government schemes'
    });

  } catch (error) {
    console.error('Get CG schemes error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}
