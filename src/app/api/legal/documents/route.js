import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const citizen_id = searchParams.get('citizen_id');

    if (!citizen_id) {
      return NextResponse.json(
        { success: false, error: 'citizen_id query parameter is required' },
        { status: 400 }
      );
    }

    // Get all legal documents for citizen
    const documents = await db.getLegalDocumentsByCitizen(parseInt(citizen_id));

    return NextResponse.json({
      success: true,
      data: documents,
      count: documents.length
    });
  } catch (error) {
    console.error('GET /api/legal/documents error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
