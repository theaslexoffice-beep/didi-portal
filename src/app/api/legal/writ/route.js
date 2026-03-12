import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { draftWrit } from '@/lib/legal/writ-drafter';

export async function POST(request) {
  try {
    const body = await request.json();
    const { violation, facts, relief_sought, citizen_id } = body;

    // Validate required fields
    if (!violation || !facts || !relief_sought || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'violation, facts, relief_sought, and citizen_id are required' },
        { status: 400 }
      );
    }

    // Get citizen info
    const citizen = await db.getCitizenById(citizen_id);
    
    if (!citizen) {
      return NextResponse.json(
        { success: false, error: 'Citizen not found' },
        { status: 404 }
      );
    }

    // Draft writ petition
    const writData = {
      petitioner_name: citizen.name,
      petitioner_address: citizen.address || 'Bilaspur, Chhattisgarh',
      violation,
      facts,
      relief_sought,
      court: 'High Court of Chhattisgarh, Bilaspur Bench'
    };

    const writDocument = draftWrit(writData);

    // Save to legal_documents
    const docId = await db.createLegalDocument({
      citizen_id,
      document_type: 'writ_petition',
      title: `Writ Petition - ${violation}`,
      content: writDocument,
      status: 'draft'
    });

    return NextResponse.json({
      success: true,
      data: {
        document_id: docId,
        document: writDocument,
        disclaimer: 'AI-generated writ petition. MUST be reviewed and filed by an advocate. This is a serious legal document.',
        court: 'High Court of Chhattisgarh, Bilaspur Bench'
      }
    });
  } catch (error) {
    console.error('POST /api/legal/writ error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
