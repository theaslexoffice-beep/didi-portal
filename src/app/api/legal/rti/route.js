import { NextResponse } from 'next/server';
import { getIssueById, getCitizenById, createLegalDocument } from '@/lib/data';
import { generateRTI } from '@/lib/legal/rti-drafter';

// POST /api/legal/rti — Generate RTI application
export async function POST(request) {
  try {
    const body = await request.json();
    const { issue_id, citizen_id, language = 'en' } = body;
    
    if (!issue_id || !citizen_id) {
      return NextResponse.json(
        { error: 'issue_id and citizen_id are required' },
        { status: 400 }
      );
    }
    
    const issue = await getIssueById(parseInt(issue_id));
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    
    const citizen = await getCitizenById(parseInt(citizen_id));
    if (!citizen) {
      return NextResponse.json({ error: 'Citizen not found' }, { status: 404 });
    }
    
    // Generate RTI
    const rtiDoc = generateRTI(issue, citizen, language);
    
    // Save to database
    const docId = await createLegalDocument({
      issue_id: issue.id,
      citizen_id: citizen.id,
      doc_type: 'rti',
      title: `RTI Application - ${issue.title || issue.description.substring(0, 50)}`,
      content: rtiDoc.text,
      content_html: rtiDoc.html,
      language,
      status: 'draft'
    });
    
    return NextResponse.json({
      success: true,
      document_id: docId,
      document: {
        type: 'rti',
        text: rtiDoc.text,
        html: rtiDoc.html,
        department: rtiDoc.department,
        pio_address: rtiDoc.pioAddress,
        language
      },
      disclaimer: 'AI-generated draft. Consult a qualified advocate before use.'
    });
    
  } catch (error) {
    console.error('Error generating RTI:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
