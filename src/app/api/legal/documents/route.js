import { NextResponse } from 'next/server';
import {
  getLegalDocuments,
  getLegalDocumentsByIssue,
  getLegalDocumentsByCitizen,
  getLegalDocumentById,
  updateLegalDocumentStatus
} from '@/lib/data';

// GET /api/legal/documents — List legal documents
// Query params: issue_id OR citizen_id OR document_id
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('issue_id');
    const citizenId = searchParams.get('citizen_id');
    const documentId = searchParams.get('document_id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let documents;
    
    if (documentId) {
      const doc = await getLegalDocumentById(parseInt(documentId));
      if (!doc) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }
      return NextResponse.json({ document: doc });
    } else if (issueId) {
      documents = getLegalDocumentsByIssue(parseInt(issueId));
    } else if (citizenId) {
      documents = getLegalDocumentsByCitizen(parseInt(citizenId));
    } else {
      documents = getLegalDocuments({ limit, offset });
    }
    
    return NextResponse.json({
      count: documents.length,
      documents: documents.map(doc => ({
        id: doc.id,
        issue_id: doc.issue_id,
        citizen_id: doc.citizen_id,
        doc_type: doc.doc_type,
        title: doc.title,
        language: doc.language,
        status: doc.status,
        created_at: doc.created_at,
        // Don't send full content in list view
        has_content: !!doc.content,
        has_html: !!doc.content_html
      }))
    });
    
  } catch (error) {
    console.error('Error fetching legal documents:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/legal/documents — Update document status
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { document_id, status } = body;
    
    if (!document_id || !status) {
      return NextResponse.json(
        { error: 'document_id and status are required' },
        { status: 400 }
      );
    }
    
    const validStatuses = ['draft', 'finalized', 'filed', 'archived'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }
    
    const result = await updateLegalDocumentStatus(parseInt(document_id), status);
    
    if (!result || result.changes === 0) {
      return NextResponse.json({ error: 'Document not found or not updated' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      document_id: parseInt(document_id),
      status
    });
    
  } catch (error) {
    console.error('Error updating document status:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
