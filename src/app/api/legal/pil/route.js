import { NextResponse } from 'next/server';
import { checkPILEligibility } from '@/lib/legal/pil-checker';

// GET /api/legal/pil — Check PIL eligibility
// Query params: category, ward, city (optional, defaults to Bilaspur)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const ward = searchParams.get('ward');
    const city = searchParams.get('city') || 'Bilaspur';
    
    if (!category || !ward) {
      return NextResponse.json(
        { error: 'category and ward are required query parameters' },
        { status: 400 }
      );
    }
    
    const pilCheck = await checkPILEligibility(category, ward, city);
    
    return NextResponse.json({
      eligible: pilCheck.eligible,
      threshold: 30,
      issue_count: pilCheck.issueCount,
      affected_citizens: pilCheck.affectedCitizens,
      pattern: pilCheck.pattern,
      suggested_title: pilCheck.suggestedTitle,
      constitutional_articles: pilCheck.articles,
      landmark_cases: pilCheck.landmarkCases,
      recommendation: pilCheck.eligible
        ? 'This pattern qualifies for a Public Interest Litigation. Consider aggregating these complaints and approaching a qualified advocate.'
        : `Need ${30 - pilCheck.issueCount} more complaints from this ward in the last 90 days to qualify for PIL.`
    });
    
  } catch (error) {
    console.error('Error checking PIL eligibility:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
