// DIDI Notifications & Alerts System
// Generate alerts for matching, escalations, and community events

import { getSeverityLabel } from './severity';

/**
 * Generate alerts for matching helpers to issues
 * @param {Object} issue - Issue object
 * @param {Object} helper - Helper citizen object with distance
 * @returns {Object} Alert message for different channels
 */
export function generateMatchAlert(issue, helper) {
  const severity = issue.severity;
  const distance = helper.distance_km;
  const location = issue.address || issue.ward || 'your area';
  const description = issue.description;
  
  let message = '';
  let title = '';
  let urgency = 'normal';
  
  switch (severity) {
    case 'P0': // Life Threat
      urgency = 'critical';
      title = '🚨 EMERGENCY ALERT';
      message = `🚨 EMERGENCY: ${description} at ${location}. You are ${distance}km away. Can you help? Reply YES to respond.`;
      break;
      
    case 'P1': // Basic Needs
      urgency = 'high';
      title = '🆘 Help Needed';
      message = `🆘 Someone near you needs help: ${description}. You are ${distance}km away with matching skills. Tap to help.`;
      break;
      
    case 'P2': // Safety & Rights
      urgency = 'high';
      title = '⚠️ Safety Alert';
      message = `⚠️ Safety alert in your area: ${description}. If you can assist, tap here.`;
      break;
      
    case 'P3': // Infrastructure
      urgency = 'normal';
      title = '📢 Community Issue';
      message = `📢 Community issue near you: ${description}. Upvote or help resolve it.`;
      break;
      
    case 'P4': // Quality of Life
      urgency = 'low';
      title = '📢 Community Notice';
      message = `📢 Community issue near you: ${description}. Upvote or help resolve it.`;
      break;
      
    default:
      urgency = 'normal';
      title = '📢 Community Issue';
      message = `📢 Issue near you: ${description}. Tap to view.`;
  }
  
  return {
    // WhatsApp format (short, actionable)
    whatsapp: message,
    
    // App notification format
    app: {
      title,
      body: message,
      urgency,
      data: {
        issue_id: issue.id,
        deeplink: `/issues/${issue.id}`
      }
    },
    
    // SMS format (ultra-short)
    sms: `DIDI: ${getSeverityLabel(severity, 'en')} alert ${distance}km away. ${description.substring(0, 80)}... Reply HELP to respond.`
  };
}

/**
 * Generate alerts for issue creators
 */
export function generateIssueCreatedAlert(issue) {
  const severity = getSeverityLabel(issue.severity, 'en');
  
  return {
    whatsapp: `✅ Your issue has been registered with DIDI.\n\n📋 Category: ${issue.category}\n🚦 Priority: ${severity}\n📍 Location: ${issue.address || issue.ward}\n\nWe're finding helpers near you. You'll be notified when someone responds.`,
    
    app: {
      title: '✅ Issue Registered',
      body: `Your ${severity} issue has been registered. We're finding help.`,
      urgency: 'normal',
      data: { issue_id: issue.id }
    }
  };
}

/**
 * Generate alerts when someone offers to help
 */
export function generateHelpOfferedAlert(issue, helper) {
  return {
    whatsapp: `🤝 Good news! ${helper.name} is ${helper.distance_km}km away and has offered to help with your issue.\n\n💬 Message: ${helper.message || 'Ready to help'}\n📞 Contact: ${helper.phone}\n\nReply ACCEPT to confirm or DETAILS for more info.`,
    
    app: {
      title: '🤝 Help Offered',
      body: `${helper.name} (${helper.distance_km}km away) offered to help`,
      urgency: 'high',
      data: { 
        issue_id: issue.id,
        helper_id: helper.citizen_id 
      }
    }
  };
}

/**
 * Generate alerts when issue is resolved
 */
export function generateIssueResolvedAlert(issue, resolver) {
  return {
    whatsapp: `✅ Your issue has been marked as RESOLVED!\n\n🦸 Resolved by: ${resolver.name}\n📍 Issue: ${issue.description}\n\nThank you for using DIDI. Help us improve by rating your experience: Reply 1-5 stars.`,
    
    app: {
      title: '✅ Issue Resolved',
      body: `Your issue was resolved by ${resolver.name}`,
      urgency: 'normal',
      data: { issue_id: issue.id }
    }
  };
}

/**
 * Generate escalation notification for issue creator
 * @param {Object} issue - Issue object
 * @param {number} newLevel - New escalation level (0-6)
 * @returns {Object} Notification for different channels
 */
export function generateEscalationAlert(issue, newLevel) {
  const escalationSteps = {
    0: { name: 'Community Level', action: 'Matching with nearby helpers', days: 3 },
    1: { name: 'Ward Officer', action: 'Forwarded to ward-level authority', days: 7 },
    2: { name: 'Municipal Corporation', action: 'Escalated to city officials', days: 7 },
    3: { name: 'CPGRAMS Filing', action: 'Filed with Central Govt grievance system', days: 30 },
    4: { name: 'RTI Application', action: 'RTI filed for status update', days: 30 },
    5: { name: 'Legal Notice', action: 'Legal notice drafted', days: 15 },
    6: { name: 'Court Filing', action: 'Preparing writ petition for High Court', days: null }
  };
  
  const step = escalationSteps[newLevel] || escalationSteps[0];
  const nextStepDays = step.days;
  
  let message = `⚡ Your issue has been escalated to Level ${newLevel}: ${step.name}\n\n`;
  message += `📋 Action: ${step.action}\n`;
  message += `📍 Issue: ${issue.description}\n\n`;
  
  if (nextStepDays) {
    message += `⏰ If unresolved in ${nextStepDays} days, we'll escalate to the next level automatically.\n\n`;
  } else {
    message += `⚖️ This is the highest escalation level. Legal action is being initiated.\n\n`;
  }
  
  message += `Track your issue: https://didi.org.in/issues/${issue.id}`;
  
  return {
    whatsapp: message,
    
    app: {
      title: `⚡ Escalated to Level ${newLevel}`,
      body: `${step.name}: ${step.action}`,
      urgency: 'high',
      data: { 
        issue_id: issue.id,
        escalation_level: newLevel 
      }
    },
    
    email: {
      subject: `DIDI: Your issue has been escalated to ${step.name}`,
      body: message
    }
  };
}

/**
 * Generate emergency broadcast alert
 * For P0 issues, send to ALL nearby citizens regardless of skills
 */
export function generateEmergencyBroadcast(issue, nearestHospital, emergencyServices) {
  let message = `🚨🚨 EMERGENCY BROADCAST 🚨🚨\n\n`;
  message += `📍 ${issue.address || issue.ward}\n`;
  message += `📋 ${issue.description}\n\n`;
  message += `⚠️ If you are nearby and can help:\n`;
  message += `• Call 112 (Emergency)\n`;
  
  if (nearestHospital) {
    message += `• Nearest hospital: ${nearestHospital.name} (${nearestHospital.distance}km)\n`;
  }
  
  message += `\n✅ Reply YES if you can assist\n`;
  message += `❌ Reply NO to stop emergency alerts\n\n`;
  message += `Emergency contact: 112`;
  
  return {
    whatsapp: message,
    
    sms: `EMERGENCY: ${issue.description} at ${issue.ward}. Call 112. Reply YES to help.`,
    
    app: {
      title: '🚨 EMERGENCY NEARBY',
      body: issue.description,
      urgency: 'critical',
      sound: 'emergency.wav',
      vibrate: true,
      data: { 
        issue_id: issue.id,
        type: 'emergency',
        emergency_number: '112'
      }
    }
  };
}

/**
 * Generate achievement earned notification
 */
export function generateAchievementAlert(citizen, achievement) {
  return {
    whatsapp: `🎉 Congratulations ${citizen.name}!\n\nYou've earned a new achievement:\n\n${achievement.icon} ${achievement.achievement_name}\n${achievement.description}\n\nKeep helping your community! 💪`,
    
    app: {
      title: '🎉 Achievement Unlocked!',
      body: `${achievement.icon} ${achievement.achievement_name}`,
      urgency: 'normal',
      data: {
        type: 'achievement',
        achievement_key: achievement.achievement_key
      }
    }
  };
}

/**
 * Generate weekly community digest
 */
export function generateCommunityDigest(stats) {
  let message = `📊 Your Weekly DIDI Community Digest\n\n`;
  message += `✅ Issues resolved: ${stats.resolved_count}\n`;
  message += `🤝 Helps offered: ${stats.help_count}\n`;
  message += `🦸 New helpers joined: ${stats.new_helpers}\n`;
  message += `⭐ Your trust score: ${stats.trust_score}\n`;
  message += `🏆 Your rank: #${stats.rank} in ${stats.ward}\n\n`;
  message += `Keep making a difference! 💪\n\n`;
  message += `View full stats: https://didi.org.in/community`;
  
  return {
    whatsapp: message,
    
    app: {
      title: '📊 Weekly Digest',
      body: `${stats.resolved_count} issues resolved, ${stats.help_count} helps offered`,
      urgency: 'low',
      data: { type: 'digest' }
    }
  };
}

/**
 * Generate reminder for pending help response
 */
export function generateHelpReminderAlert(issue, helper) {
  return {
    whatsapp: `⏰ Reminder: You offered to help with an issue ${helper.days_ago} days ago.\n\n📋 Issue: ${issue.description}\n📍 Location: ${issue.ward}\n\nHave you completed the help? Reply DONE if resolved, or VIEW for details.`,
    
    app: {
      title: '⏰ Help Reminder',
      body: `Update on your help offer from ${helper.days_ago} days ago`,
      urgency: 'low',
      data: { 
        issue_id: issue.id,
        help_response_id: helper.help_response_id 
      }
    }
  };
}
