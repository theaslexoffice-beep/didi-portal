import { NextResponse } from 'next/server';
import { incrementIssueUpvotes, getIssueById } from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = params;
    
    incrementIssueUpvotes(parseInt(id));
    
    const issue = getIssueById(parseInt(id));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Upvoted',
      upvotes: issue.upvotes
    });
  } catch (error) {
    console.error('Upvote error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
