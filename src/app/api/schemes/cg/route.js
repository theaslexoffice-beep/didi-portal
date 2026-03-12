import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request) {
  try {
    // Get all schemes
    let schemes = await db.getAllSchemes();
    
    // Filter for state-level CG schemes
    schemes = schemes.filter(s => s.level === 'state');

    return NextResponse.json({
      success: true,
      data: schemes,
      count: schemes.length
    });
  } catch (error) {
    console.error('GET /api/schemes/cg error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
