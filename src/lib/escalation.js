// DIDI 2.0 Legal & Accountability Engine
// Escalation Engine — Automatic escalation ladder based on time elapsed

// Escalation levels and timeline
export const ESCALATION_LADDER = [
  { level: 0, name: 'local', days: 0, action: 'Issue created, hyperlocal matching activated' },
  { level: 1, name: 'department', days: 3, action: 'Reminder sent to relevant government department' },
  { level: 2, name: 'cpgrams', days: 7, action: 'Auto-filed on CPGRAMS (Central) or CM Helpline (State)' },
  { level: 3, name: 'rti', days: 14, action: 'RTI application filed asking for status and reasons for delay' },
  { level: 4, name: 'social_media', days: 21, action: 'Social media amplification — tagged government handles' },
  { level: 5, name: 'media', days: 30, action: 'Media alert sent to local journalists' },
  { level: 6, name: 'legal_notice', days: 45, action: 'Legal notice drafted for fundamental rights violation' },
  { level: 7, name: 'writ_petition', days: 60, action: 'Writ petition filed before High Court of Chhattisgarh, Bilaspur' }
];

/**
 * Get current escalation status for an issue
 * @param {Object} issue - Issue object with created_at field
 * @returns {Object} Current escalation level and metadata
 */
export function getEscalationStatus(issue) {
  const createdDate = new Date(issue.created_at);
  const now = new Date();
  const daysSinceCreation = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
  
  // Find the highest escalation level reached based on days elapsed
  let currentLevel = 0;
  for (let i = ESCALATION_LADDER.length - 1; i >= 0; i--) {
    if (daysSinceCreation >= ESCALATION_LADDER[i].days) {
      currentLevel = i;
      break;
    }
  }
  
  const levelData = ESCALATION_LADDER[currentLevel];
  
  return {
    currentLevel,
    levelName: levelData.name,
    action: levelData.action,
    daysSinceCreation,
    daysAtThisLevel: daysSinceCreation - levelData.days
  };
}

/**
 * Get next escalation level and when it will trigger
 * @param {Object} issue - Issue object
 * @returns {Object|null} Next escalation info or null if max level reached
 */
export function getNextEscalation(issue) {
  const current = getEscalationStatus(issue);
  
  // Check if already at max level
  if (current.currentLevel >= ESCALATION_LADDER.length - 1) {
    return null;
  }
  
  const nextLevel = current.currentLevel + 1;
  const nextLevelData = ESCALATION_LADDER[nextLevel];
  const daysUntilNext = nextLevelData.days - current.daysSinceCreation;
  
  return {
    level: nextLevel,
    levelName: nextLevelData.name,
    action: nextLevelData.action,
    daysUntilEscalation: daysUntilNext,
    willEscalateOn: new Date(new Date(issue.created_at).getTime() + (nextLevelData.days * 24 * 60 * 60 * 1000))
  };
}

/**
 * Generate full escalation timeline (past, current, future)
 * @param {Object} issue - Issue object
 * @returns {Array} Timeline with status for each level
 */
export function generateEscalationTimeline(issue) {
  const current = getEscalationStatus(issue);
  const createdDate = new Date(issue.created_at);
  
  return ESCALATION_LADDER.map((level, index) => {
    const triggerDate = new Date(createdDate.getTime() + (level.days * 24 * 60 * 60 * 1000));
    
    let status;
    if (index < current.currentLevel) {
      status = 'completed';
    } else if (index === current.currentLevel) {
      status = 'current';
    } else {
      status = 'pending';
    }
    
    return {
      level: index,
      name: level.name,
      action: level.action,
      daysFromStart: level.days,
      triggerDate,
      status
    };
  });
}

/**
 * Check if issue needs escalation right now
 * @param {Object} issue - Issue object
 * @returns {boolean} True if escalation should happen
 */
export function shouldEscalate(issue) {
  // Don't escalate resolved issues
  if (issue.status === 'resolved' || issue.status === 'closed') {
    return false;
  }
  
  const current = getEscalationStatus(issue);
  const storedLevel = issue.escalation_level || 0;
  
  // Escalate if calculated level is higher than stored level
  return current.currentLevel > storedLevel;
}

/**
 * Get escalation icon for each level
 * @param {string} levelName - Name of escalation level
 * @returns {string} Emoji icon
 */
export function getEscalationIcon(levelName) {
  const icons = {
    local: '📍',
    department: '🏛️',
    cpgrams: '🇮🇳',
    rti: '📄',
    social_media: '📢',
    media: '📰',
    legal_notice: '⚠️',
    writ_petition: '⚖️'
  };
  return icons[levelName] || '📌';
}

/**
 * Get color class for escalation level (Tailwind)
 * @param {string} status - Status of level (completed/current/pending)
 * @returns {string} Tailwind color class
 */
export function getEscalationColor(status) {
  const colors = {
    completed: 'text-green-600 bg-green-50 border-green-300',
    current: 'text-orange-600 bg-orange-50 border-orange-300',
    pending: 'text-gray-400 bg-gray-50 border-gray-200'
  };
  return colors[status] || colors.pending;
}
