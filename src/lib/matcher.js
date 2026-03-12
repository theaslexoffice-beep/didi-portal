// Advanced Hyperlocal Matching Engine
// Find nearest helpers using Haversine distance formula with enhanced matching logic

import { getAllVerifiedCitizens, getIssueById, getHelpResponsesByIssue } from './db';

// Haversine formula to calculate distance between two coordinates in km
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// ============ EMERGENCY MATCHING (P0) ============

/**
 * Emergency matching for P0 issues
 * Prioritizes: drivers with vehicles > medical professionals > anyone nearby
 * @param {Object} issue - Issue object with lat, lng, description, category
 * @returns {Object} { helpers, emergencyNumber, nearestHospital, suggestedAction }
 */
export function emergencyMatch(issue) {
  if (!issue.lat || !issue.lng) {
    return { helpers: [], emergencyNumber: '112', error: 'No location data' };
  }
  
  const citizens = getAllVerifiedCitizens();
  const radiusKm = 10; // Wider radius for emergencies
  const description = (issue.description || '').toLowerCase();
  
  const potentialHelpers = [];
  
  for (const citizen of citizens) {
    if (!citizen.lat || !citizen.lng) continue;
    
    const distance = haversineDistance(issue.lat, issue.lng, citizen.lat, citizen.lng);
    if (distance > radiusKm) continue;
    
    let priority = 0;
    let reason = '';
    
    // Parse skills and resources
    const skills = citizen.skills ? JSON.parse(citizen.skills) : [];
    const resources = citizen.resources ? JSON.parse(citizen.resources) : [];
    
    const hasVehicle = resources.some(r => r.toLowerCase().includes('car') || r.toLowerCase().includes('vehicle'));
    const hasFirstAid = resources.some(r => r.toLowerCase().includes('first_aid') || r.toLowerCase().includes('medical_kit'));
    const isMedical = skills.some(s => ['doctor', 'nurse', 'paramedic', 'medical'].includes(s.toLowerCase()));
    const hasFireExt = resources.some(r => r.toLowerCase().includes('fire_extinguisher'));
    
    // ACCIDENT SCENARIO
    if (description.includes('accident') || description.includes('collision') || description.includes('crash')) {
      if (hasVehicle && hasFirstAid) {
        priority = 100;
        reason = 'Has vehicle + first aid kit';
      } else if (hasVehicle) {
        priority = 90;
        reason = 'Has vehicle for transport';
      } else if (isMedical) {
        priority = 85;
        reason = 'Medical professional';
      } else {
        priority = 50;
        reason = 'Can provide assistance';
      }
    }
    // MEDICAL EMERGENCY
    else if (description.includes('medical') || description.includes('heart') || description.includes('breathing') || 
             description.includes('unconscious') || description.includes('bleeding')) {
      if (isMedical) {
        priority = 100;
        reason = 'Medical professional';
      } else if (hasFirstAid) {
        priority = 80;
        reason = 'Has first aid kit';
      } else if (hasVehicle) {
        priority = 70;
        reason = 'Can transport to hospital';
      } else {
        priority = 50;
        reason = 'Can assist';
      }
    }
    // FIRE
    else if (description.includes('fire') || description.includes('burning') || description.includes('smoke')) {
      if (hasFireExt) {
        priority = 100;
        reason = 'Has fire extinguisher';
      } else if (hasVehicle) {
        priority = 70;
        reason = 'Can help evacuate';
      } else {
        priority = 50;
        reason = 'Can assist';
      }
    }
    // VIOLENCE / CRIME
    else if (description.includes('attack') || description.includes('violence') || description.includes('assault') || 
             description.includes('harassment') || description.includes('threat')) {
      priority = 60; // All nearby helpers equally important for witness/safety
      reason = 'Nearby for assistance';
    }
    // GENERAL EMERGENCY
    else {
      if (hasVehicle) {
        priority = 80;
        reason = 'Has vehicle';
      } else if (isMedical) {
        priority = 75;
        reason = 'Medical professional';
      } else {
        priority = 60;
        reason = 'Nearby helper';
      }
    }
    
    potentialHelpers.push({
      citizen_id: citizen.id,
      name: citizen.name,
      phone: citizen.phone,
      distance_km: Math.round(distance * 10) / 10,
      skills: skills,
      resources: resources,
      trust_score: citizen.trust_score || 0,
      priority: priority,
      reason: reason
    });
  }
  
  // Sort by priority first, then distance, then trust score
  potentialHelpers.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    if (a.distance_km !== b.distance_km) return a.distance_km - b.distance_km;
    return b.trust_score - a.trust_score;
  });
  
  // Get nearest hospital (mock data - should come from bilaspur-data.js)
  const nearestHospital = {
    name: 'CIMS Bilaspur (Govt Medical College)',
    distance: 2.5,
    phone: '07752-222222',
    emergency: true
  };
  
  // Suggested action
  let suggestedAction = 'Call 112 immediately. ';
  if (description.includes('medical') || description.includes('accident')) {
    suggestedAction += 'Nearest hospital: CIMS Bilaspur (2.5km).';
  } else if (description.includes('fire')) {
    suggestedAction += 'Call Fire Brigade: 101.';
  } else if (description.includes('violence') || description.includes('crime')) {
    suggestedAction += 'Call Police: 100. Stay in a safe location.';
  }
  
  return {
    helpers: potentialHelpers.slice(0, 10), // Top 10 helpers
    emergencyNumber: '112',
    nearestHospital: nearestHospital,
    suggestedAction: suggestedAction
  };
}

// ============ RESOURCE MATCHING (P1) ============

/**
 * Resource matching for P1 issues (basic needs)
 * Finds citizens with specific resources
 */
export function resourceMatch(issue) {
  if (!issue.lat || !issue.lng) {
    return { helpers: [], error: 'No location data' };
  }
  
  const citizens = getAllVerifiedCitizens();
  const radiusKm = 5;
  const description = (issue.description || '').toLowerCase();
  
  const helpers = [];
  
  for (const citizen of citizens) {
    if (!citizen.lat || !citizen.lng) continue;
    if (!citizen.resources) continue;
    
    const distance = haversineDistance(issue.lat, issue.lng, citizen.lat, citizen.lng);
    if (distance > radiusKm) continue;
    
    const resources = JSON.parse(citizen.resources);
    let matchScore = 0;
    let matchedResources = [];
    
    // Match resource keywords
    for (const resource of resources) {
      const resLower = resource.toLowerCase();
      
      // Books
      if (description.includes('book') && resLower.includes('book')) {
        matchScore += 10;
        matchedResources.push(resource);
      }
      // Medicine/pharmacy
      if ((description.includes('medicine') || description.includes('medical')) && 
          (resLower.includes('medicine') || resLower.includes('pharmacy'))) {
        matchScore += 10;
        matchedResources.push(resource);
      }
      // Food
      if (description.includes('food') && resLower.includes('food')) {
        matchScore += 10;
        matchedResources.push(resource);
      }
      // Shelter
      if (description.includes('shelter') && 
          (resLower.includes('shelter') || resLower.includes('room') || resLower.includes('accommodation'))) {
        matchScore += 10;
        matchedResources.push(resource);
      }
      // Clothing
      if (description.includes('cloth') && resLower.includes('cloth')) {
        matchScore += 10;
        matchedResources.push(resource);
      }
      // Water
      if (description.includes('water') && resLower.includes('water')) {
        matchScore += 10;
        matchedResources.push(resource);
      }
    }
    
    if (matchScore > 0) {
      helpers.push({
        citizen_id: citizen.id,
        name: citizen.name,
        phone: citizen.phone,
        distance_km: Math.round(distance * 10) / 10,
        resources: matchedResources,
        all_resources: resources,
        trust_score: citizen.trust_score || 0,
        match_score: matchScore
      });
    }
  }
  
  // Sort by match score, then distance, then trust
  helpers.sort((a, b) => {
    if (a.match_score !== b.match_score) return b.match_score - a.match_score;
    if (a.distance_km !== b.distance_km) return a.distance_km - b.distance_km;
    return b.trust_score - a.trust_score;
  });
  
  return { helpers: helpers.slice(0, 15) };
}

// ============ ENHANCED SKILL MATCHING ============

/**
 * Enhanced skill matching with trust score, availability, and completion rate
 */
export function skillMatch(category, lat, lng, radiusKm = 5) {
  const requiredSkills = suggestSkillsForCategory(category);
  const citizens = getAllVerifiedCitizens();
  
  const helpers = [];
  
  for (const citizen of citizens) {
    if (!citizen.lat || !citizen.lng) continue;
    
    const distance = haversineDistance(lat, lng, citizen.lat, citizen.lng);
    if (distance > radiusKm) continue;
    
    if (!citizen.skills) continue;
    const skills = JSON.parse(citizen.skills);
    
    // Check skill match
    const matchingSkills = requiredSkills.filter(reqSkill => 
      skills.some(s => s.toLowerCase() === reqSkill.toLowerCase())
    );
    
    if (matchingSkills.length === 0) continue;
    
    // Calculate completion rate (mock - should come from help_responses stats)
    const helpCount = citizen.help_count || 0;
    const completionRate = helpCount > 0 ? 0.85 : 0.5; // Assume 85% completion for active helpers
    
    // Check availability (not currently helping more than 3 issues)
    // TODO: Query help_responses with status='offered' or 'in_progress'
    const currentlyHelping = 0; // Mock
    const isAvailable = currentlyHelping < 3;
    
    // Calculate overall score
    let score = 0;
    score += matchingSkills.length * 20; // Skill match
    score += (citizen.trust_score || 0) * 0.5; // Trust score weight
    score += completionRate * 20; // Completion rate
    score += isAvailable ? 10 : 0; // Availability bonus
    score -= distance * 2; // Distance penalty
    
    helpers.push({
      citizen_id: citizen.id,
      name: citizen.name,
      phone: citizen.phone,
      distance_km: Math.round(distance * 10) / 10,
      skills: matchingSkills,
      all_skills: skills,
      trust_score: citizen.trust_score || 0,
      help_count: helpCount,
      completion_rate: Math.round(completionRate * 100),
      is_available: isAvailable,
      overall_score: Math.round(score)
    });
  }
  
  // Sort by overall score
  helpers.sort((a, b) => b.overall_score - a.overall_score);
  
  return helpers.slice(0, 10);
}

// ============ BLOOD DONOR MATCHING ============

/**
 * Find compatible blood donors with proper blood compatibility
 */
export function findCompatibleDonors(bloodGroup, lat, lng, radius = 15) {
  const citizens = getAllVerifiedCitizens();
  
  // Blood compatibility chart
  const compatibility = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'] // Can only give to AB+
  };
  
  const donors = [];
  
  for (const citizen of citizens) {
    if (!citizen.lat || !citizen.lng) continue;
    if (!citizen.blood_group) continue;
    
    const distance = haversineDistance(lat, lng, citizen.lat, citizen.lng);
    if (distance > radius) continue;
    
    const donorGroup = citizen.blood_group.trim();
    const canDonateToGroups = compatibility[donorGroup] || [];
    
    if (canDonateToGroups.includes(bloodGroup)) {
      const isExactMatch = donorGroup === bloodGroup;
      
      donors.push({
        citizen_id: citizen.id,
        name: citizen.name,
        phone: citizen.phone,
        distance_km: Math.round(distance * 10) / 10,
        blood_group: donorGroup,
        trust_score: citizen.trust_score || 0,
        compatibility_type: isExactMatch ? 'exact_match' : 'compatible',
        priority: isExactMatch ? 100 : 80
      });
    }
  }
  
  // Sort by priority (exact match first), then distance
  donors.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.distance_km - b.distance_km;
  });
  
  return donors.slice(0, 20);
}

// ============ COMMUNITY STRENGTH INDEX ============

/**
 * Calculate community strength for a ward
 */
export function getCommunityStrength(ward) {
  const citizens = getAllVerifiedCitizens();
  
  // Filter by ward
  const wardCitizens = ward ? citizens.filter(c => c.ward === ward) : citizens;
  
  const totalCitizens = wardCitizens.length;
  const verifiedHelpers = wardCitizens.filter(c => c.help_count > 0).length;
  
  // Skill coverage
  const skillCoverage = {};
  const importantSkills = ['doctor', 'nurse', 'driver', 'lawyer', 'teacher', 'plumber', 'electrician', 'contractor'];
  
  for (const skill of importantSkills) {
    skillCoverage[skill] = wardCitizens.filter(c => {
      if (!c.skills) return false;
      const skills = JSON.parse(c.skills);
      return skills.some(s => s.toLowerCase() === skill);
    }).length;
  }
  
  // Resource coverage
  const resourceCoverage = {
    vehicles: wardCitizens.filter(c => {
      if (!c.resources) return false;
      const resources = JSON.parse(c.resources);
      return resources.some(r => r.toLowerCase().includes('car') || r.toLowerCase().includes('vehicle'));
    }).length,
    first_aid: wardCitizens.filter(c => {
      if (!c.resources) return false;
      const resources = JSON.parse(c.resources);
      return resources.some(r => r.toLowerCase().includes('first_aid') || r.toLowerCase().includes('medical_kit'));
    }).length
  };
  
  // Blood bank status
  const bloodBankStatus = {};
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  for (const group of bloodGroups) {
    bloodBankStatus[group] = wardCitizens.filter(c => c.blood_group === group).length;
  }
  
  // Calculate strength score (0-100)
  let strengthScore = 0;
  strengthScore += Math.min(totalCitizens / 10, 20); // 20 points for citizen count (max at 100 citizens)
  strengthScore += Math.min(verifiedHelpers / 5, 20); // 20 points for helpers (max at 25 helpers)
  strengthScore += Math.min(Object.values(skillCoverage).reduce((a, b) => a + b, 0) / 2, 30); // 30 points for skill coverage
  strengthScore += Math.min(resourceCoverage.vehicles / 2, 15); // 15 points for vehicles
  strengthScore += Math.min(Object.values(bloodBankStatus).reduce((a, b) => a + b, 0) / 5, 15); // 15 points for blood donors
  
  strengthScore = Math.round(Math.min(strengthScore, 100));
  
  // Identify gaps
  const gaps = [];
  if (skillCoverage.doctor === 0) gaps.push('No doctor within ward');
  if (skillCoverage.lawyer === 0) gaps.push('No lawyer within ward');
  if (resourceCoverage.vehicles < 2) gaps.push(`Only ${resourceCoverage.vehicles} vehicle(s) available`);
  if (totalCitizens < 10) gaps.push('Low citizen participation');
  if (verifiedHelpers === 0) gaps.push('No active helpers yet');
  
  return {
    ward: ward || 'All Wards',
    totalCitizens,
    verifiedHelpers,
    skillCoverage,
    resourceCoverage,
    bloodBankStatus,
    strengthScore,
    gaps
  };
}

// ============ BASIC HELPER FUNCTIONS (from original) ============

/**
 * Find nearest verified citizens with matching skills
 */
export function findNearestHelpers(issueLat, issueLng, requiredSkills = [], radiusKm = 5, limit = 10) {
  const citizens = getAllVerifiedCitizens();
  
  const helpers = [];
  
  for (const citizen of citizens) {
    if (!citizen.lat || !citizen.lng) continue;
    
    const distance = haversineDistance(issueLat, issueLng, citizen.lat, citizen.lng);
    if (distance > radiusKm) continue;
    
    let hasMatchingSkill = requiredSkills.length === 0;
    
    if (requiredSkills.length > 0 && citizen.skills) {
      try {
        const citizenSkills = JSON.parse(citizen.skills);
        hasMatchingSkill = requiredSkills.some(skill => 
          citizenSkills.some(cs => cs.toLowerCase() === skill.toLowerCase())
        );
      } catch {
        hasMatchingSkill = false;
      }
    }
    
    if (hasMatchingSkill || requiredSkills.length === 0) {
      helpers.push({
        citizen_id: citizen.id,
        name: citizen.name,
        phone: citizen.phone,
        distance_km: Math.round(distance * 10) / 10,
        skills: citizen.skills ? JSON.parse(citizen.skills) : [],
        resources: citizen.resources ? JSON.parse(citizen.resources) : [],
        blood_group: citizen.blood_group,
        trust_score: citizen.trust_score || 0,
        help_count: citizen.help_count || 0
      });
    }
  }
  
  helpers.sort((a, b) => {
    if (a.distance_km !== b.distance_km) {
      return a.distance_km - b.distance_km;
    }
    return b.trust_score - a.trust_score;
  });
  
  return helpers.slice(0, limit);
}

/**
 * Find helpers by blood group (basic, for backwards compatibility)
 */
export function findBloodDonors(issueLat, issueLng, bloodGroup, radiusKm = 10, limit = 20) {
  // Use the new compatible donors function
  return findCompatibleDonors(bloodGroup, issueLat, issueLng, radiusKm);
}

/**
 * Suggest skills based on issue category
 */
export function suggestSkillsForCategory(category) {
  const skillMap = {
    health: ['doctor', 'nurse', 'paramedic', 'pharmacist'],
    infrastructure: ['contractor', 'engineer', 'plumber', 'electrician'],
    safety: ['lawyer', 'social_worker', 'police'],
    education: ['teacher', 'tutor', 'librarian'],
    legal: ['lawyer', 'advocate', 'paralegal'],
    environment: ['environmentalist', 'engineer'],
    livelihood: ['business_owner', 'contractor', 'trainer']
  };
  
  return skillMap[category] || [];
}
