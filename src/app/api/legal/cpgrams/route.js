import { NextResponse } from 'next/server';
import { getIssueById, getCitizenById, createLegalDocument } from '@/lib/db';
import { prepareCPGRAMS } from '@/lib/legal/cpgrams-helper';

// POST /api/legal/cpgrams — Prepare CPGRAMS complaint
export async function POST(request) {
  try {
    const body = await request.json();
    const { issue_id, citizen_id } = body;
    
    if (!issue_id || !citizen_id) {
      return NextResponse.json(
        { error: 'issue_id and citizen_id are required' },
        { status: 400 }
      );
    }
    
    const issue = getIssueById(parseInt(issue_id));
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    
    const citizen = getCitizenById(parseInt(citizen_id));
    if (!citizen) {
      return NextResponse.json({ error: 'Citizen not found' }, { status: 404 });
    }
    
    // Prepare CPGRAMS complaint
    const cpgramsDoc = prepareCPGRAMS(issue, citizen);
    
    // Save to database
    const docId = createLegalDocument({
      issue_id: issue.id,
      citizen_id: citizen.id,
      doc_type: 'cpgrams',
      title: `CPGRAMS Complaint - ${issue.title || issue.description.substring(0, 50)}`,
      content: JSON.stringify(cpgramsDoc),
      language: 'en',
      status: 'draft'
    });
    
    return NextResponse.json({
      success: true,
      document_id: docId,
      complaint: cpgramsDoc,
      disclaimer: 'AI-generated draft. Verify ministry and category before filing.'
    });
    
  } catch (error) {
    console.error('Error preparing CPGRAMS:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
