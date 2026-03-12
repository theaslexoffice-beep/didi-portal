import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const eligibility_age = searchParams.get('eligibility_age');
    const eligibility_income = searchParams.get('eligibility_income');

    let schemes;

    // Search query
    if (search) {
      schemes = await db.searchSchemes(search);
    } else {
      schemes = await db.getAllSchemes();
    }

    // Filter by category
    if (category) {
      schemes = schemes.filter(s => s.category === category);
    }

    // Filter by age eligibility
    if (eligibility_age) {
      const age = parseInt(eligibility_age);
      schemes = schemes.filter(s => {
        if (!s.eligibility) return true;
        
        try {
          const elig = typeof s.eligibility === 'string' 
            ? JSON.parse(s.eligibility) 
            : s.eligibility;
          
          const meetsMin = !elig.age_min || age >= elig.age_min;
          const meetsMax = !elig.age_max || age <= elig.age_max;
          
          return meetsMin && meetsMax;
        } catch {
          return true;
        }
      });
    }

    // Filter by income eligibility
    if (eligibility_income) {
      const income = parseInt(eligibility_income);
      schemes = schemes.filter(s => {
        if (!s.eligibility) return true;
        
        try {
          const elig = typeof s.eligibility === 'string' 
            ? JSON.parse(s.eligibility) 
            : s.eligibility;
          
          return !elig.income_max || income <= elig.income_max;
        } catch {
          return true;
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: schemes,
      count: schemes.length
    });
  } catch (error) {
    console.error('GET /api/schemes error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
