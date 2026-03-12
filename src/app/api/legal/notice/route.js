import { NextResponse } from 'next/server';
import { getIssueById, getCitizenById, getEscalationLogs, createLegalDocument } from '@/lib/db';
import { generateLegalNotice } from '@/lib/legal/legal-notice';

// POST /api/legal/notice — Generate legal notice
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
    
    // Generate legal notice
    const noticeDoc = generateLegalNotice(issue, citizen, escalationHistory);
    
    // Save to database
    const docId = createLegalDocument({
      issue_id: issue.id,
      citizen_id: citizen.id,
      doc_type: 'legal_notice',
      title: `Legal Notice - ${issue.title || issue.description.substring(0, 50)}`,
      content: noticeDoc.text,
      content_html: noticeDoc.html,
      language: 'en',
      status: 'draft'
    });
    
    return NextResponse.json({
      success: true,
      document_id: docId,
      document: {
        type: 'legal_notice',
        text: noticeDoc.text,
        html: noticeDoc.html
      },
      disclaimer: 'AI-generated draft. Consult a qualified advocate before use.'
    });
    
  } catch (error) {
    console.error('Error generating legal notice:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
