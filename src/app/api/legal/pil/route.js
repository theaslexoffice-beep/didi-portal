import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { checkPIL } from '@/lib/legal/pil-checker';

export async function POST(request) {
  try {
    const body = await request.json();
    const { issue, affected_people, fundamental_rights, citizen_id } = body;

    // Validate required fields
    if (!issue || !affected_people || !fundamental_rights || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'issue, affected_people, fundamental_rights, and citizen_id are required' },
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

    // Check PIL eligibility
    const pilData = {
      issue,
      affected_people,
      fundamental_rights,
      petitioner_name: citizen.name,
      petitioner_address: citizen.address || 'Bilaspur, Chhattisgarh'
    };

    const pilResult = checkPIL(pilData);

    // If eligible, save the draft
    if (pilResult.eligible) {
      const docId = await db.createLegalDocument({
        citizen_id,
        document_type: 'pil',
        title: `PIL - ${issue}`,
        content: pilResult.draft || '',
        status: 'draft'
      });

      return NextResponse.json({
        success: true,
        data: {
          eligible: true,
          document_id: docId,
          assessment: pilResult.assessment,
          draft: pilResult.draft,
          disclaimer: 'AI-generated PIL. MUST be reviewed and filed by an advocate with PIL experience. Public Interest Litigation is a serious matter requiring legal expertise.'
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        data: {
          eligible: false,
          assessment: pilResult.assessment,
          reason: pilResult.reason,
          alternative: pilResult.alternative
        }
      });
    }
  } catch (error) {
    console.error('POST /api/legal/pil error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
