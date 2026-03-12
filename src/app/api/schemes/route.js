import { NextResponse } from 'next/server';
import { getAllSchemes } from '@/lib/db';
import { 
  findEligibleSchemes, 
  getSchemesByCategory, 
  searchSchemes, 
  getCGSchemes,
  getSchemeStats,
  getRecommendedSchemes
} from '@/lib/scheme-matcher';

/**
 * GET /api/schemes
 * 
 * Query parameters:
 * - age: number
 * - income: number
 * - gender: male|female
 * - category: general|sc|st|obc|below_poverty_line
 * - state: state name (e.g., "Chhattisgarh")
 * - occupation: occupation type
 * - hasLand: true|false
 * - isMarried: true|false
 * - hasChildren: true|false
 * - isPregnant: true|false
 * - isDisabled: true|false
 * - isWidow: true|false
 * - isSenior: true|false
 * - disabilityPercent: 0-100
 * - location: rural|urban
 * - search: search keyword
 * - category_filter: agriculture|health|education|housing|employment|women|senior|sc_st_obc|livelihood
 * - level: central|state
 * - cg: true|false (Chhattisgarh specific)
 * - recommended: true (get essential/popular schemes)
 * - stats: true (get statistics)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Stats endpoint
    if (searchParams.get('stats') === 'true') {
      const stats = getSchemeStats();
      return NextResponse.json({ success: true, stats });
    }

    // Recommended schemes endpoint
    if (searchParams.get('recommended') === 'true') {
      const recommended = getRecommendedSchemes();
      return NextResponse.json({ success: true, schemes: recommended, count: recommended.length });
    }

    // Extract profile parameters for matching
    const profile = {
      age: searchParams.get('age') ? parseInt(searchParams.get('age')) : null,
      income: searchParams.get('income') ? parseFloat(searchParams.get('income')) : null,
      gender: searchParams.get('gender'),
      category: searchParams.get('category'),
      state: searchParams.get('state'),
      occupation: searchParams.get('occupation'),
      hasLand: searchParams.get('hasLand') === 'true',
      isMarried: searchParams.get('isMarried') === 'true',
      hasChildren: searchParams.get('hasChildren') === 'true',
      isPregnant: searchParams.get('isPregnant') === 'true',
      isDisabled: searchParams.get('isDisabled') === 'true',
      isWidow: searchParams.get('isWidow') === 'true',
      isSenior: searchParams.get('isSenior') === 'true' || (searchParams.get('age') && parseInt(searchParams.get('age')) >= 60),
      disabilityPercent: searchParams.get('disabilityPercent') ? parseInt(searchParams.get('disabilityPercent')) : 0,
      location: searchParams.get('location')
    };

    // Filter parameters
    const searchQuery = searchParams.get('search');
    const categoryFilter = searchParams.get('category_filter');
    const levelFilter = searchParams.get('level');
    const cgOnly = searchParams.get('cg') === 'true';

    let schemes = [];

    // Priority 1: If search query provided
    if (searchQuery) {
      schemes = searchSchemes(searchQuery);
    }
    // Priority 2: If category filter
    else if (categoryFilter) {
      schemes = getSchemesByCategory(categoryFilter);
    }
    // Priority 3: If CG-only filter
    else if (cgOnly) {
      schemes = getCGSchemes();
    }
    // Priority 4: If any profile parameters provided, do intelligent matching
    else if (Object.values(profile).some(v => v !== null && v !== false)) {
      schemes = findEligibleSchemes(profile);
    }
    // Default: Return all schemes
    else {
      schemes = getAllSchemes();
      // Parse JSON fields
      schemes.forEach(scheme => {
        if (scheme.eligibility && typeof scheme.eligibility === 'string') {
          try {
            scheme.eligibility = JSON.parse(scheme.eligibility);
          } catch (e) {}
        }
        if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
          try {
            scheme.documents_needed = JSON.parse(scheme.documents_needed);
          } catch (e) {}
        }
      });
    }

    // Apply level filter if specified
    if (levelFilter) {
      schemes = schemes.filter(s => s.level === levelFilter);
    }

    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = (page - 1) * limit;
    const total = schemes.length;
    const paginatedSchemes = schemes.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      schemes: paginatedSchemes,
      count: paginatedSchemes.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      filters_applied: {
        search: searchQuery,
        category: categoryFilter,
        level: levelFilter,
        cg_only: cgOnly,
        profile_matching: Object.values(profile).some(v => v !== null && v !== false)
      }
    });

  } catch (error) {
    console.error('Get schemes error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}
