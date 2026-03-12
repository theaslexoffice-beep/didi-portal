import { NextResponse } from 'next/server';
import { emergencyMatch } from '@/lib/matcher';
import { getIssueById } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { issue_id } = body;
    
    if (!issue_id) {
      return NextResponse.json(
        { error: 'issue_id is required' },
        { status: 400 }
      );
    }
    
    const issue = getIssueById(issue_id);
    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      );
    }
    
    const result = emergencyMatch(issue);
    
    return NextResponse.json({
      success: true,
      issue_id,
      ...result
    });
  } catch (error) {
    console.error('Error in emergency matching:', error);
    return NextResponse.json(
      { error: 'Emergency matching failed' },
      { status: 500 }
    );
  }
}
