import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { draftLegalNotice } from '@/lib/legal/legal-notice';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, facts, demand, citizen_id } = body;

    // Validate required fields
    if (!to || !subject || !facts || !demand || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'to, subject, facts, demand, and citizen_id are required' },
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

    // Draft legal notice
    const noticeData = {
      from_name: citizen.name,
      from_address: citizen.address || 'Bilaspur, Chhattisgarh',
      to_name: to,
      subject,
      facts,
      demand,
      reply_period_days: 15
    };

    const noticeDocument = draftLegalNotice(noticeData);

    // Save to legal_documents
    const docId = await db.createLegalDocument({
      citizen_id,
      document_type: 'legal_notice',
      title: `Legal Notice - ${subject}`,
      content: noticeDocument,
      status: 'draft'
    });

    return NextResponse.json({
      success: true,
      data: {
        document_id: docId,
        document: noticeDocument,
        disclaimer: 'AI-generated legal notice. Recommended to send via registered post or through an advocate.'
      }
    });
  } catch (error) {
    console.error('POST /api/legal/notice error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
