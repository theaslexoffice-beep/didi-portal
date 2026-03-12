import { NextResponse } from 'next/server';
import { getIssueById, getCitizenById, getEscalationLogs, createLegalDocument } from '@/lib/db';
import { generateWritPetition } from '@/lib/legal/writ-drafter';

// POST /api/legal/writ — Generate writ petition
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
    
    // Get escalation history
    const escalationHistory = getEscalationLogs(parseInt(issue_id));
    
    // Generate writ petition
    const writDoc = generateWritPetition(issue, citizen, escalationHistory);
    
    // Save to database
    const docId = createLegalDocument({
      issue_id: issue.id,
      citizen_id: citizen.id,
      doc_type: 'writ_petition',
      title: `Writ Petition - ${issue.title || issue.description.substring(0, 50)}`,
      content: writDoc.text,
      content_html: writDoc.html,
      language: 'en',
      status: 'draft'
    });
    
    return NextResponse.json({
      success: true,
      document_id: docId,
      document: {
        type: 'writ_petition',
        text: writDoc.text,
        html: writDoc.html
      },
      disclaimer: 'AI-generated draft. MUST be reviewed and signed by a qualified advocate before filing. This is NOT a substitute for legal advice.'
    });
    
  } catch (error) {
    console.error('Error generating writ petition:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
