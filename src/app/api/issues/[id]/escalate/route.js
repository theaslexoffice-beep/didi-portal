import { NextResponse } from 'next/server';
import {
  getIssueById,
  getCitizenById,
  getEscalationLogs,
  getLatestEscalation,
  createEscalationLog,
  updateIssueEscalationLevel,
  createLegalDocument
} from '@/lib/data';
import {
  getEscalationStatus,
  getNextEscalation,
  generateEscalationTimeline,
  shouldEscalate
} from '@/lib/escalation';
import { generateRTI } from '@/lib/legal/rti-drafter';
import { prepareCPGRAMS } from '@/lib/legal/cpgrams-helper';
import { generateLegalNotice } from '@/lib/legal/legal-notice';
import { generateWritPetition } from '@/lib/legal/writ-drafter';

// GET /api/issues/[id]/escalate — Get escalation timeline
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const issue = await getIssueById(parseInt(id));
    
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    
    const logs = await getEscalationLogs(parseInt(id));
    const latest = await getLatestEscalation(parseInt(id));
    const status = getEscalationStatus(issue, logs);
    const timeline = generateEscalationTimeline(issue, logs);
    const nextEscalation = getNextEscalation(issue, logs);
    
    return NextResponse.json({
      issue: {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        category: issue.category,
        severity: issue.severity,
        status: issue.status,
        created_at: issue.created_at
      },
      escalation: {
        current_level: latest?.level || 0,
        current_level_name: latest?.level_name || 'local',
        status,
        timeline,
        next: nextEscalation,
        should_escalate: shouldEscalate(issue, logs)
      },
      logs
    });
  } catch (error) {
    console.error('Error fetching escalation timeline:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/issues/[id]/escalate — Trigger next escalation level
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { force = false, language = 'en' } = body;
    
    const issue = await getIssueById(parseInt(id));
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    
    const citizen = issue.citizen_id ? getCitizenById(issue.citizen_id) : null;
    const logs = await getEscalationLogs(parseInt(id));
    const latest = await getLatestEscalation(parseInt(id));
    const currentLevel = latest?.level ?? -1;
    
    // Check if we should escalate
    if (!force && !shouldEscalate(issue, logs)) {
      return NextResponse.json({
        error: 'Not ready to escalate yet. Use force=true to override.',
        current_level: currentLevel,
        next_escalation_date: getNextEscalation(issue, logs)?.trigger_date
      }, { status: 400 });
    }
    
    const nextEscalation = getNextEscalation(issue, logs);
    if (!nextEscalation) {
      return NextResponse.json({ error: 'Already at maximum escalation level' }, { status: 400 });
    }
    
    const nextLevel = currentLevel + 1;
    const nextLevelName = nextEscalation.name;
    
    let documentId = null;
    let documentType = null;
    let generatedDoc = null;
    
    // Generate appropriate documents based on escalation level
    switch (nextLevelName) {
      case 'cpgrams':
        if (citizen) {
          generatedDoc = prepareCPGRAMS(issue, citizen);
          documentType = 'cpgrams';
          const docId = await createLegalDocument({
            issue_id: issue.id,
            citizen_id: issue.citizen_id,
            doc_type: 'cpgrams',
            title: `CPGRAMS Complaint - ${issue.title || issue.description.substring(0, 50)}`,
            content: JSON.stringify(generatedDoc),
            language,
            status: 'draft'
          });
          documentId = docId;
        }
        break;
        
      case 'rti':
        if (citizen) {
          generatedDoc = generateRTI(issue, citizen, language);
          documentType = 'rti';
          const docId = await createLegalDocument({
            issue_id: issue.id,
            citizen_id: issue.citizen_id,
            doc_type: 'rti',
            title: `RTI Application - ${issue.title || issue.description.substring(0, 50)}`,
            content: generatedDoc.text,
            content_html: generatedDoc.html,
            language,
            status: 'draft'
          });
          documentId = docId;
        }
        break;
        
      case 'legal_notice':
        if (citizen) {
          generatedDoc = generateLegalNotice(issue, citizen, logs);
          documentType = 'legal_notice';
          const docId = await createLegalDocument({
            issue_id: issue.id,
            citizen_id: issue.citizen_id,
            doc_type: 'legal_notice',
            title: `Legal Notice - ${issue.title || issue.description.substring(0, 50)}`,
            content: generatedDoc.text,
            content_html: generatedDoc.html,
            language,
            status: 'draft'
          });
          documentId = docId;
        }
        break;
        
      case 'writ_petition':
        if (citizen) {
          generatedDoc = generateWritPetition(issue, citizen, logs);
          documentType = 'writ_petition';
          const docId = await createLegalDocument({
            issue_id: issue.id,
            citizen_id: issue.citizen_id,
            doc_type: 'writ_petition',
            title: `Writ Petition - ${issue.title || issue.description.substring(0, 50)}`,
            content: generatedDoc.text,
            content_html: generatedDoc.html,
            language,
            status: 'draft'
          });
          documentId = docId;
        }
        break;
    }
    
    // Create escalation log entry
    const logId = await createEscalationLog({
      issue_id: issue.id,
      level: nextLevel,
      level_name: nextLevelName,
      action_taken: nextEscalation.action,
      document_type: documentType,
      document_id: documentId
    });
    
    // Update issue escalation level
await updateIssueEscalationLevel(issue.id, nextLevel);
    
    return NextResponse.json({
      success: true,
      escalation: {
        log_id: logId,
        level: nextLevel,
        level_name: nextLevelName,
        action: nextEscalation.action,
        icon: nextEscalation.icon
      },
      document: documentId ? {
        id: documentId,
        type: documentType,
        content: generatedDoc
      } : null
    });
    
  } catch (error) {
    console.error('Error escalating issue:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
