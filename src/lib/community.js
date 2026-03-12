// DIDI Samaj Module — Trust Scoring, Gamification, Leaderboards
// Community engagement and reputation system

import { 
  getCitizenById, 
  updateTrustScore as dbUpdateTrustScore,
  getHelpResponsesByCitizen,
  createAchievement,
  getAchievementsByCitizen,
  hasAchievement,
  getCommunityActivity,
  getAllVerifiedCitizens
} from './db';

// ============ TRUST SCORING SYSTEM ============

/**
 * Calculate and update a citizen's trust score
 * Formula:
 *   base = 10 (verified account)
 *   + 5 per completed help response
 *   + 2 per upvote received on help
 *   - 10 per cancelled help (after accepting)
 *   + 20 for skill verification (future)
 *   Cap at 100
 */
export function updateTrustScore(citizenId) {
  const citizen = getCitizenById(citizenId);
  if (!citizen) return null;
  
  let score = 0;
  
  // Base score for verified account
  if (citizen.verified) {
    score += 10;
  }
  
  // Get help response history
  const helpResponses = getHelpResponsesByCitizen(citizenId);
  
  // Count completed helps
  const completedHelps = helpResponses.filter(hr => hr.status === 'completed').length;
  score += completedHelps * 5;
  
  // Count cancelled helps (negative impact)
  const cancelledHelps = helpResponses.filter(hr => hr.status === 'cancelled').length;
  score -= cancelledHelps * 10;
  
  // TODO: Add upvote counting when upvote system is implemented
  // TODO: Add skill verification bonus when verification system is ready
  
  // Cap at 100
  score = Math.max(0, Math.min(100, score));
  
  // Update in database
  dbUpdateTrustScore(citizenId, score);
  
  return score;
}

/**
 * Get trust badge based on score
 */
export function getTrustBadge(score) {
  if (score >= 81) {
    return { level: 5, name: 'Legend', emoji: '⭐', color: 'gold' };
  } else if (score >= 61) {
    return { level: 4, name: 'DIDI Champion', emoji: '🏆', color: 'purple' };
  } else if (score >= 41) {
    return { level: 3, name: 'Community Hero', emoji: '🦸', color: 'blue' };
  } else if (score >= 21) {
    return { level: 2, name: 'Active Helper', emoji: '🤝', color: 'green' };
  } else {
    return { level: 1, name: 'New Member', emoji: '🌱', color: 'gray' };
  }
}

// ============ GAMIFICATION SYSTEM ============

const ACHIEVEMENT_DEFINITIONS = {
  first_responder: {
    key: 'first_responder',
    name: 'First Responder',
    name_hi: 'पहला सहायक',
    description: 'Helped on your first issue',
    description_hi: 'पहली बार किसी समस्या में मदद की',
    icon: '🚀'
  },
  lifesaver: {
    key: 'lifesaver',
    name: 'Lifesaver',
    name_hi: 'जीवनरक्षक',
    description: 'Helped on a P0 emergency issue',
    description_hi: 'एक आपातकालीन P0 समस्या में मदद की',
    icon: '🆘'
  },
  five_star_helper: {
    key: 'five_star_helper',
    name: '5-Star Helper',
    name_hi: '5-स्टार सहायक',
    description: 'Completed 5 help responses',
    description_hi: '5 मदद पूरी की',
    icon: '⭐'
  },
  blood_brother: {
    key: 'blood_brother',
    name: 'Blood Brother/Sister',
    name_hi: 'रक्तदान वीर',
    description: 'Donated blood through DIDI',
    description_hi: 'DIDI के माध्यम से रक्तदान किया',
    icon: '🩸'
  },
  community_builder: {
    key: 'community_builder',
    name: 'Community Builder',
    name_hi: 'समुदाय निर्माता',
    description: 'Registered 5 other citizens',
    description_hi: '5 अन्य नागरिकों को पंजीकृत किया',
    icon: '🏗️'
  },
  voice_of_people: {
    key: 'voice_of_people',
    name: 'Voice of the People',
    name_hi: 'जनता की आवाज',
    description: 'Reported 10+ issues',
    description_hi: '10+ समस्याएं दर्ज कीं',
    icon: '📢'
  },
  justice_seeker: {
    key: 'justice_seeker',
    name: 'Justice Seeker',
    name_hi: 'न्याय खोजी',
    description: 'Escalated an issue to legal level',
    description_hi: 'एक समस्या को कानूनी स्तर तक ले गए',
    icon: '⚖️'
  },
  ward_guardian: {
    key: 'ward_guardian',
    name: 'Ward Guardian',
    name_hi: 'वार्ड रक्षक',
    description: 'Most active helper in a ward (monthly)',
    description_hi: 'एक वार्ड में सबसे सक्रिय सहायक (मासिक)',
    icon: '🛡️'
  }
};

/**
 * Get all achievements for a citizen
 */
export function getAchievements(citizenId) {
  return getAchievementsByCitizen(citizenId);
}

/**
 * Award an achievement to a citizen
 */
export function awardAchievement(citizenId, achievementKey) {
  const def = ACHIEVEMENT_DEFINITIONS[achievementKey];
  if (!def) return null;
  
  // Check if already has achievement
  if (hasAchievement(citizenId, achievementKey)) {
    return null; // Already earned
  }
  
  // Create achievement
  const id = createAchievement({
    citizen_id: citizenId,
    achievement_key: def.key,
    achievement_name: def.name,
    description: def.description,
    icon: def.icon
  });
  
  if (id) {
    // Update trust score when achievement is earned
    updateTrustScore(citizenId);
  }
  
  return id;
}

/**
 * Check and award achievements based on user activity
 */
export function checkAndAwardAchievements(citizenId) {
  const citizen = getCitizenById(citizenId);
  if (!citizen) return [];
  
  const helpResponses = getHelpResponsesByCitizen(citizenId);
  const awarded = [];
  
  // First Responder — helped on first issue
  if (helpResponses.length >= 1 && !hasAchievement(citizenId, 'first_responder')) {
    const id = awardAchievement(citizenId, 'first_responder');
    if (id) awarded.push('first_responder');
  }
  
  // 5-Star Helper — completed 5 help responses
  const completedCount = helpResponses.filter(hr => hr.status === 'completed').length;
  if (completedCount >= 5 && !hasAchievement(citizenId, 'five_star_helper')) {
    const id = awardAchievement(citizenId, 'five_star_helper');
    if (id) awarded.push('five_star_helper');
  }
  
  // TODO: Implement other achievement checks when we track those activities
  // - lifesaver: check if helped on P0 issue
  // - blood_brother: when blood donation tracking is implemented
  // - community_builder: when referral tracking is implemented
  // - voice_of_people: count citizen's created issues
  // - justice_seeker: check escalation_log for citizen's issues
  
  return awarded;
}

// ============ LEADERBOARD SYSTEM ============

/**
 * Get top helpers leaderboard
 * @param {string} ward - Optional ward filter
 * @param {string} period - 'month', 'week', 'all-time'
 * @returns {Array} Leaderboard with ranks
 */
export function getLeaderboard(ward = null, period = 'month') {
  const citizens = getAllVerifiedCitizens();
  
  // Calculate cutoff date based on period
  let cutoffDate = null;
  if (period === 'month') {
    cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - 1);
  } else if (period === 'week') {
    cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
  }
  
  const leaderboardData = [];
  
  for (const citizen of citizens) {
    // Filter by ward if specified
    if (ward && citizen.ward !== ward) continue;
    
    // Get help count (for the period if specified)
    let helpCount = citizen.help_count || 0;
    
    // TODO: Filter help_count by date range when we have timestamp tracking
    // For now, using total help_count
    
    const badge = getTrustBadge(citizen.trust_score || 0);
    
    leaderboardData.push({
      citizen_id: citizen.id,
      name: citizen.name,
      ward: citizen.ward,
      trust_score: citizen.trust_score || 0,
      help_count: helpCount,
      badge: badge
    });
  }
  
  // Sort by help_count descending, then by trust_score
  leaderboardData.sort((a, b) => {
    if (a.help_count !== b.help_count) {
      return b.help_count - a.help_count;
    }
    return b.trust_score - a.trust_score;
  });
  
  // Add ranks
  leaderboardData.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  return leaderboardData;
}

// ============ COMMUNITY FEED ============

/**
 * Get community activity feed
 * @param {string} ward - Optional ward filter
 * @param {number} limit - Number of activities to return
 * @returns {Array} Recent community activity
 */
export function getCommunityFeed(ward = null, limit = 20) {
  const activities = getCommunityActivity({ ward, limit });
  
  // Enhance with time_ago formatting
  return activities.map(activity => {
    const timeAgo = formatTimeAgo(new Date(activity.created_at));
    return {
      ...activity,
      time_ago: timeAgo
    };
  });
}

/**
 * Format timestamp as "X mins ago", "X hours ago", etc.
 */
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

export { ACHIEVEMENT_DEFINITIONS };
