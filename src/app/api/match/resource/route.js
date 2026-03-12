import { NextResponse } from 'next/server';
import { resourceMatch } from '@/lib/matcher';
import { getIssueById } from '@/lib/data';

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
    
    const issue = await getIssueById(issue_id);
    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      );
    }
    
    const result = resourceMatch(issue);
    
    return NextResponse.json({
      success: true,
      issue_id,
      count: result.helpers.length,
      ...result
    });
  } catch (error) {
    console.error('Error in resource matching:', error);
    return NextResponse.json(
      { error: 'Resource matching failed' },
      { status: 500 }
    );
  }
}
