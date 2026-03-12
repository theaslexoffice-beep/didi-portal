import { getAllSchemes } from './db';

/**
 * Advanced Scheme Matching Engine
 * Matches citizen profiles to eligible government schemes
 * Returns schemes with eligibility score and explanation
 */

/**
 * Find eligible schemes for a citizen profile
 * @param {Object} profile - Citizen profile
 * @param {number} profile.age - Age in years
 * @param {number} profile.income - Annual household income in INR
 * @param {string} profile.gender - 'male' or 'female'
 * @param {string} profile.category - 'general', 'sc', 'st', 'obc', 'below_poverty_line', etc.
 * @param {string} profile.state - State name or 'all'
 * @param {string} profile.occupation - Occupation type
 * @param {boolean} profile.hasLand - Owns agricultural land
 * @param {boolean} profile.isMarried - Marital status
 * @param {boolean} profile.hasChildren - Has children
 * @param {boolean} profile.isPregnant - Is pregnant (for women)
 * @param {boolean} profile.isDisabled - Has disability
 * @param {boolean} profile.isWidow - Is widow
 * @param {boolean} profile.isSenior - Is senior citizen (60+)
 * @param {number} profile.disabilityPercent - Disability percentage (0-100)
 * @param {string} profile.location - 'rural' or 'urban'
 * @returns {Array} Matched schemes with score and explanation
 */
export function findEligibleSchemes(profile) {
  const allSchemes = getAllSchemes();
  const matches = [];

  allSchemes.forEach(scheme => {
    const matchResult = checkEligibility(scheme, profile);
    if (matchResult.eligible) {
      matches.push({
        ...scheme,
        match_score: matchResult.score,
        match_reasons: matchResult.reasons,
        missing_requirements: matchResult.missing,
        priority: calculatePriority(scheme, profile)
      });
    }
  });

  // Sort by match score (high to low), then by priority
  matches.sort((a, b) => {
    if (b.match_score !== a.match_score) {
      return b.match_score - a.match_score;
    }
    return b.priority - a.priority;
  });

  // Parse JSON fields
  matches.forEach(scheme => {
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }
  });

  return matches;
}

/**
 * Check if a citizen profile matches a scheme's eligibility
 * @param {Object} scheme - Scheme from database
 * @param {Object} profile - Citizen profile
 * @returns {Object} { eligible: boolean, score: number, reasons: string[], missing: string[] }
 */
function checkEligibility(scheme, profile) {
  let score = 0;
  const reasons = [];
  const missing = [];

  if (!scheme.eligibility) {
    return { eligible: true, score: 50, reasons: ['No specific eligibility criteria'], missing: [] };
  }

  let elig;
  try {
    elig = typeof scheme.eligibility === 'string' ? JSON.parse(scheme.eligibility) : scheme.eligibility;
  } catch {
    return { eligible: true, score: 50, reasons: ['Unable to parse eligibility'], missing: [] };
  }

  // Hard eligibility checks (must pass)
  
  // Age check
  if (profile.age !== undefined && profile.age !== null) {
    if (elig.age_min && profile.age < elig.age_min) {
      return { eligible: false, score: 0, reasons: [`Age below minimum (${elig.age_min} years required)`], missing: [] };
    }
    if (elig.age_max && profile.age > elig.age_max) {
      return { eligible: false, score: 0, reasons: [`Age above maximum (${elig.age_max} years maximum)`], missing: [] };
    }
    score += 20;
    reasons.push('Age requirement met');
  }

  // Income check
  if (profile.income !== undefined && profile.income !== null && elig.income_max) {
    if (profile.income > elig.income_max) {
      return { eligible: false, score: 0, reasons: [`Income above limit (₹${elig.income_max}/year maximum)`], missing: [] };
    }
    score += 15;
    reasons.push(`Income within limit (₹${elig.income_max}/year)`);
  }

  // Category check
  if (elig.categories && elig.categories.length > 0) {
    if (profile.category && !elig.categories.includes(profile.category)) {
      // Check for special mappings
      if (!(elig.categories.includes('below_poverty_line') && profile.category === 'bpl')) {
        missing.push(`Category mismatch (requires: ${elig.categories.join(', ')})`);
      }
    } else if (profile.category) {
      score += 15;
      reasons.push(`Category matches (${profile.category})`);
    }
  }

  // Gender check
  if (elig.gender && elig.gender.length > 0) {
    if (profile.gender && !elig.gender.includes(profile.gender)) {
      return { eligible: false, score: 0, reasons: [`Gender mismatch (requires: ${elig.gender.join(', ')})`], missing: [] };
    }
    if (profile.gender) {
      score += 10;
      reasons.push('Gender requirement met');
    }
  }

  // State check
  if (elig.states && elig.states.length > 0 && !elig.states.includes('all')) {
    if (profile.state) {
      const stateMatch = elig.states.includes(profile.state) || 
                         elig.states.includes(profile.state.toLowerCase()) ||
                         elig.states.some(s => s.toLowerCase().includes(profile.state.toLowerCase()));
      if (!stateMatch) {
        return { eligible: false, score: 0, reasons: [`State mismatch (requires: ${elig.states.join(', ')})`], missing: [] };
      }
      score += 10;
      reasons.push(`Available in ${profile.state}`);
    }
  }

  // Occupation check
  if (elig.occupation && elig.occupation.length > 0) {
    if (profile.occupation) {
      const occupationMatch = elig.occupation.includes(profile.occupation) ||
                              elig.occupation.some(o => o.toLowerCase().includes(profile.occupation.toLowerCase()));
      if (occupationMatch) {
        score += 15;
        reasons.push(`Occupation matches (${profile.occupation})`);
      } else {
        missing.push(`Occupation mismatch (requires: ${elig.occupation.join(', ')})`);
      }
    }
  }

  // Land requirement
  if (elig.land_required) {
    if (profile.hasLand === true) {
      score += 10;
      reasons.push('Land ownership requirement met');
    } else if (profile.hasLand === false) {
      missing.push('Requires land ownership');
    }
  }

  // Soft eligibility (conditional bonuses)

  // Pregnant women schemes
  if (profile.isPregnant && (
    scheme.name.toLowerCase().includes('matru') ||
    scheme.name.toLowerCase().includes('pregnant') ||
    scheme.category === 'women'
  )) {
    score += 20;
    reasons.push('High priority: Pregnant woman');
  }

  // Senior citizen schemes
  if (profile.isSenior && (
    scheme.name.toLowerCase().includes('pension') ||
    scheme.name.toLowerCase().includes('senior') ||
    scheme.category === 'senior'
  )) {
    score += 20;
    reasons.push('High priority: Senior citizen');
  }

  // Disability schemes
  if (profile.isDisabled && elig.special_conditions?.includes('disability')) {
    if (profile.disabilityPercent >= 80) {
      score += 25;
      reasons.push('Disability requirement met (80%+)');
    } else if (profile.disabilityPercent >= 40) {
      score += 15;
      reasons.push('Partial disability requirement met (40%+)');
    }
  }

  // Widow schemes
  if (profile.isWidow && scheme.name.toLowerCase().includes('widow')) {
    score += 20;
    reasons.push('Widow pension scheme');
  }

  // Rural/Urban location
  if (profile.location) {
    if (elig.special_conditions?.includes(profile.location) ||
        scheme.name.toLowerCase().includes(profile.location)) {
      score += 5;
      reasons.push(`Location matches (${profile.location})`);
    }
  }

  // If we have missing requirements but some score, mark as partially eligible
  const eligible = missing.length === 0 || score >= 30;

  return { eligible, score: Math.min(score, 100), reasons, missing };
}

/**
 * Calculate priority level based on scheme type and profile
 * Higher priority = more urgent/essential schemes
 */
function calculatePriority(scheme, profile) {
  let priority = 50; // Base priority

  // P0 schemes (life/health critical)
  if (scheme.category === 'health' && profile.isPregnant) priority += 50;
  if (scheme.name.includes('Ayushman') || scheme.name.includes('PMJAY')) priority += 40;
  if (scheme.name.includes('Emergency') || scheme.name.includes('Ambulance')) priority += 50;

  // P1 schemes (basic needs)
  if (scheme.category === 'health') priority += 30;
  if (scheme.name.includes('Food') || scheme.name.includes('Ration')) priority += 35;
  if (scheme.name.includes('MGNREGA')) priority += 25;
  if (scheme.name.includes('Pension') && profile.age >= 60) priority += 30;

  // P2 schemes (education, housing)
  if (scheme.category === 'education') priority += 20;
  if (scheme.category === 'housing') priority += 20;

  // P3 schemes (livelihood, skill)
  if (scheme.category === 'employment') priority += 15;
  if (scheme.category === 'agriculture' && profile.occupation === 'farmer') priority += 25;

  // Boost state-specific schemes for local residents
  if (scheme.level === 'state' && profile.state === 'Chhattisgarh') priority += 10;

  return priority;
}

/**
 * Get all schemes in a specific category
 * @param {string} category - Category name
 * @returns {Array} Schemes in that category
 */
export function getSchemesByCategory(category) {
  const allSchemes = getAllSchemes();
  const filtered = allSchemes.filter(s => s.category === category);

  // Parse JSON fields
  filtered.forEach(scheme => {
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }
  });

  return filtered;
}

/**
 * Search schemes by keyword (name + description)
 * @param {string} query - Search query
 * @param {string} lang - Language ('en' or 'hi')
 * @returns {Array} Matching schemes
 */
export function searchSchemes(query, lang = 'en') {
  if (!query || query.trim() === '') {
    return getAllSchemes();
  }

  const allSchemes = getAllSchemes();
  const lowerQuery = query.toLowerCase();

  const results = allSchemes.filter(scheme => {
    const searchFields = [
      scheme.name?.toLowerCase(),
      scheme.name_hi,
      scheme.description?.toLowerCase(),
      scheme.description_hi,
      scheme.ministry?.toLowerCase(),
      scheme.benefits?.toLowerCase(),
      scheme.category?.toLowerCase()
    ];

    return searchFields.some(field => field && field.includes(lowerQuery));
  });

  // Parse JSON fields
  results.forEach(scheme => {
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }
  });

  return results;
}

/**
 * Get all Chhattisgarh-specific schemes
 * @returns {Array} CG state schemes
 */
export function getCGSchemes() {
  const allSchemes = getAllSchemes();
  const cgSchemes = allSchemes.filter(s => s.level === 'state');

  // Parse JSON fields
  cgSchemes.forEach(scheme => {
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }
  });

  return cgSchemes;
}

/**
 * Get scheme statistics
 * @returns {Object} Stats object
 */
export function getSchemeStats() {
  const allSchemes = getAllSchemes();

  const stats = {
    total: allSchemes.length,
    central: allSchemes.filter(s => s.level === 'central').length,
    state: allSchemes.filter(s => s.level === 'state').length,
    byCategory: {}
  };

  // Count by category
  allSchemes.forEach(scheme => {
    const cat = scheme.category || 'other';
    stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
  });

  return stats;
}

/**
 * Get recommended schemes for quick access
 * Most popular/essential schemes
 */
export function getRecommendedSchemes() {
  const essentialSchemeNames = [
    'PM-KISAN',
    'PMJAY',
    'PM Awas Yojana',
    'MGNREGA',
    'PM Ujjwala',
    'Ayushman',
    'Rajiv Gandhi Kisan Nyay',
    'Mahtari Vandan',
    'PM POSHAN'
  ];

  const allSchemes = getAllSchemes();
  const recommended = allSchemes.filter(s =>
    essentialSchemeNames.some(name => s.name.includes(name))
  );

  // Parse JSON fields
  recommended.forEach(scheme => {
    if (scheme.eligibility && typeof scheme.eligibility === 'string') {
      scheme.eligibility = JSON.parse(scheme.eligibility);
    }
    if (scheme.documents_needed && typeof scheme.documents_needed === 'string') {
      scheme.documents_needed = JSON.parse(scheme.documents_needed);
    }
  });

  return recommended;
}
