import { NextResponse } from 'next/server';
import { getAllSchemes, getSchemeById } from '@/lib/db';
import { getDocumentChecklist, generatePrintableChecklist, getApplicationSequence } from '@/lib/scheme-documents';

/**
 * GET /api/schemes/documents
 * 
 * Query parameters:
 * - scheme_ids: comma-separated scheme IDs (e.g., "1,2,3")
 * - printable: true (returns printable format)
 * - sequence: true (returns application sequence)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const schemeIds = searchParams.get('scheme_ids');
    const printable = searchParams.get('printable') === 'true';
    const sequence = searchParams.get('sequence') === 'true';

    if (!schemeIds) {
      return NextResponse.json(
        { success: false, error: 'scheme_ids parameter required (comma-separated IDs)' },
        { status: 400 }
      );
    }

    // Parse scheme IDs
    const ids = schemeIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    if (ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Valid scheme IDs required' },
        { status: 400 }
      );
    }

    // Fetch schemes
    const schemes = ids.map(id => getSchemeById(id)).filter(s => s !== null && s !== undefined);

    if (schemes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid schemes found' },
        { status: 404 }
      );
    }

    // Generate checklist
    if (printable) {
      const checklist = generatePrintableChecklist(schemes);
      return NextResponse.json({ success: true, ...checklist });
    } else if (sequence) {
      const checklist = getDocumentChecklist(schemes);
      const sequenced = getApplicationSequence(checklist.documents);
      return NextResponse.json({
        success: true,
        sequence: sequenced,
        summary: checklist.summary,
        schemes: schemes.map(s => s.name)
      });
    } else {
      const checklist = getDocumentChecklist(schemes);
      return NextResponse.json({
        success: true,
        ...checklist,
        schemes: schemes.map(s => s.name)
      });
    }

  } catch (error) {
    console.error('Get document checklist error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}
