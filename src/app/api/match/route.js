import { NextResponse } from 'next/server';
import { getIssueById } from '@/lib/db';
import { findNearestHelpers, suggestSkillsForCategory } from '@/lib/matcher';

export async function POST(request) {
  try {
    const { issue_id, radius_km, limit } = await request.json();
    
    if (!issue_id) {
      return NextResponse.json({ success: false, error: 'Issue ID required' }, { status: 400 });
    }
    
    const issue = getIssueById(parseInt(issue_id));
    
    if (!issue) {
      return NextResponse.json({ success: false, error: 'Issue not found' }, { status: 404 });
    }
    
    if (!issue.lat || !issue.lng) {
      return NextResponse.json({ success: false, error: 'Issue has no location data' }, { status: 400 });
    }
    
    // Suggest skills based on category
    const suggestedSkills = suggestSkillsForCategory(issue.category);
    
    // Find nearest helpers
    const helpers = findNearestHelpers(
      issue.lat,
      issue.lng,
      suggestedSkills,
      radius_km || 5,
      limit || 10
    );
    
    return NextResponse.json({ 
      success: true, 
      helpers,
      suggested_skills: suggestedSkills
    });
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
