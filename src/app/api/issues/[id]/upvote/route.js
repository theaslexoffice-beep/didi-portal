import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function POST(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Issue ID is required' },
        { status: 400 }
      );
    }

    // Increment upvote count
    await db.upvoteIssue(parseInt(id));
    
    // Get updated issue to return new count
    const issue = await db.getIssueById(parseInt(id));
    
    if (!issue) {
      return NextResponse.json(
        { success: false, error: 'Issue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        issue_id: id,
        upvote_count: issue.upvote_count || 0
      }
    });
  } catch (error) {
    console.error('POST /api/issues/[id]/upvote error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
