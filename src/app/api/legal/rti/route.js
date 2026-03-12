import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { draftRTI } from '@/lib/legal/rti-drafter';

export async function POST(request) {
  try {
    const body = await request.json();
    const { department, subject, information_sought, citizen_id } = body;

    // Validate required fields
    if (!department || !subject || !information_sought || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'department, subject, information_sought, and citizen_id are required' },
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

    // Draft RTI
    const rtiData = {
      department,
      subject,
      information_sought,
      applicant_name: citizen.name,
      applicant_address: citizen.address || 'Bilaspur, Chhattisgarh',
      applicant_phone: citizen.phone
    };

    const rtiDocument = draftRTI(rtiData);

    // Save to legal_documents
    const docId = await db.createLegalDocument({
      citizen_id,
      document_type: 'rti',
      title: `RTI Application - ${subject}`,
      content: rtiDocument,
      status: 'draft'
    });

    return NextResponse.json({
      success: true,
      data: {
        document_id: docId,
        document: rtiDocument,
        disclaimer: 'AI-generated document. Please consult an advocate before filing.'
      }
    });
  } catch (error) {
    console.error('POST /api/legal/rti error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
