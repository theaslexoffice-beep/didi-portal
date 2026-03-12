import { NextResponse } from 'next/server';
import { createIssue, getIssues, getIssueStats } from '@/lib/db';
import { classifySeverity } from '@/lib/severity';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status') || 'open';
    const ward = searchParams.get('ward');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const issues = getIssues({ category, severity, status, ward, limit, offset });
    const stats = getIssueStats();
    
    // Parse JSON fields
    issues.forEach(issue => {
      if (issue.media_urls) issue.media_urls = JSON.parse(issue.media_urls);
      if (issue.matched_helpers) issue.matched_helpers = JSON.parse(issue.matched_helpers);
      if (issue.escalation_history) issue.escalation_history = JSON.parse(issue.escalation_history);
    });
    
    return NextResponse.json({ success: true, issues, stats });
  } catch (error) {
    console.error('Get issues error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.description) {
      return NextResponse.json({ success: false, error: 'Description is required' }, { status: 400 });
    }
    
    // Auto-classify severity using AI
    const severity = data.severity || classifySeverity(data.description);
    
    const issueId = createIssue({
      ...data,
      severity
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Issue created',
      issue_id: issueId,
      severity
    });
  } catch (error) {
    console.error('Create issue error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
