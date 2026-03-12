import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { draftCPGRAMS } from '@/lib/legal/cpgrams-helper';

export async function POST(request) {
  try {
    const body = await request.json();
    const { department, grievance, citizen_id } = body;

    // Validate required fields
    if (!department || !grievance || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'department, grievance, and citizen_id are required' },
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

    // Draft CPGRAMS complaint
    const cpgramsData = {
      department,
      grievance,
      complainant_name: citizen.name,
      complainant_address: citizen.address || 'Bilaspur, Chhattisgarh',
      complainant_phone: citizen.phone,
      complainant_email: citizen.email || ''
    };

    const cpgramsDocument = draftCPGRAMS(cpgramsData);

    // Save to legal_documents
    const docId = await db.createLegalDocument({
      citizen_id,
      document_type: 'cpgrams',
      title: `CPGRAMS Complaint - ${department}`,
      content: cpgramsDocument,
      status: 'draft'
    });

    return NextResponse.json({
      success: true,
      data: {
        document_id: docId,
        document: cpgramsDocument,
        disclaimer: 'AI-generated document. Please review before submitting.',
        filing_url: 'https://pgportal.gov.in/'
      }
    });
  } catch (error) {
    console.error('POST /api/legal/cpgrams error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
