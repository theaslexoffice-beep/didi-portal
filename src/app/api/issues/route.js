import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const ward = searchParams.get('ward');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';

    // Get all issues
    let issues = await db.getIssues();
    
    // Apply filters
    if (category) {
      issues = issues.filter(i => i.category === category);
    }
    if (ward) {
      issues = issues.filter(i => i.ward === ward);
    }
    if (status) {
      issues = issues.filter(i => i.status === status);
    }
    
    // Apply sorting
    switch (sort) {
      case 'most_upvoted':
        issues.sort((a, b) => 
          (b.upvote_count || 0) - (a.upvote_count || 0)
        );
        break;
      case 'most_urgent':
        const severityOrder = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
        issues.sort((a, b) => {
          const severityDiff = severityOrder[a.severity || 'P3'] - severityOrder[b.severity || 'P3'];
          if (severityDiff !== 0) return severityDiff;
          return (b.upvote_count || 0) - (a.upvote_count || 0);
        });
        break;
      default: // newest
        issues.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
    }

    return NextResponse.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('GET /api/issues error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
