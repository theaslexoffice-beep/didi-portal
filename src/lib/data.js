/**
 * Smart Database Adapter
 * Auto-selects Supabase (PostgreSQL) or SQLite based on environment configuration
 * Provides async wrappers for all database operations
 * 
 * Usage: Import from '@/lib/data' instead of '@/lib/db'
 * All functions are async and must be awaited
 */

// Check if Supabase is configured
const useSupabase = 
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project');

console.log(`[DB Adapter] Using ${useSupabase ? 'Supabase (PostgreSQL)' : 'SQLite'} as database backend`);

// Import the appropriate database module
let db;

if (useSupabase) {
  // Use Supabase (async)
  db = await import('./db-supabase.js');
} else {
  // Use SQLite (sync, but we'll wrap in async)
  const sqliteDb = await import('./db.js');
  
  // Wrap all SQLite functions to return Promises for consistency
  db = {};
  for (const [key, fn] of Object.entries(sqliteDb)) {
    if (typeof fn === 'function') {
      db[key] = async (...args) => fn(...args);
    } else {
      db[key] = fn;
    }
  }
}

// Re-export all functions
// Complaint operations
export const createComplaint = db.createComplaint;
export const getApprovedComplaints = db.getApprovedComplaints;
export const getAllComplaints = db.getAllComplaints;
export const getPendingComplaints = db.getPendingComplaints;
export const updateComplaintStatus = db.updateComplaintStatus;

// Chat operations
export const saveChatMessage = db.saveChatMessage;
export const getChatHistory = db.getChatHistory;

// Citizens operations
export const createCitizen = db.createCitizen;
export const verifyCitizen = db.verifyCitizen;
export const getCitizenByPhone = db.getCitizenByPhone;
export const getCitizenById = db.getCitizenById;
export const updateCitizenProfile = db.updateCitizenProfile;
export const updateCitizenOTP = db.updateCitizenOTP;
export const getAllVerifiedCitizens = db.getAllVerifiedCitizens;
export const incrementHelpCount = db.incrementHelpCount;
export const updateTrustScore = db.updateTrustScore;

// Issues operations
export const createIssue = db.createIssue;
export const getIssues = db.getIssues;
export const getIssueById = db.getIssueById;
export const updateIssueStatus = db.updateIssueStatus;
export const incrementIssueUpvotes = db.incrementIssueUpvotes;
export const upvoteIssue = db.upvoteIssue || db.incrementIssueUpvotes;
export const updateMatchedHelpers = db.updateMatchedHelpers;
export const getIssueStats = db.getIssueStats;

// Help responses operations
export const createHelpResponse = db.createHelpResponse;
export const getHelpResponsesByIssue = db.getHelpResponsesByIssue;
export const getHelpResponsesByCitizen = db.getHelpResponsesByCitizen;
export const updateHelpResponseStatus = db.updateHelpResponseStatus;

// Schemes operations
export const createScheme = db.createScheme;
export const getAllSchemes = db.getAllSchemes;
export const searchSchemes = db.searchSchemes;
export const getSchemeById = db.getSchemeById;
export const getSchemesByCategoryDB = db.getSchemesByCategoryDB || db.getSchemesByCategory;
export const searchSchemesDB = db.searchSchemesDB || db.searchSchemes;
export const countSchemes = db.countSchemes;

// Escalation log operations
export const createEscalationLog = db.createEscalationLog;
export const getEscalationLogs = db.getEscalationLogs;
export const getLatestEscalation = db.getLatestEscalation;
export const updateIssueEscalationLevel = db.updateIssueEscalationLevel;

// Legal documents operations
export const createLegalDocument = db.createLegalDocument;
export const getLegalDocuments = db.getLegalDocuments;
export const getLegalDocumentsByIssue = db.getLegalDocumentsByIssue;
export const getLegalDocumentsByCitizen = db.getLegalDocumentsByCitizen;
export const getLegalDocumentById = db.getLegalDocumentById;
export const updateLegalDocumentStatus = db.updateLegalDocumentStatus;

// Community activity operations
export const createCommunityActivity = db.createCommunityActivity;
export const getCommunityActivity = db.getCommunityActivity;
export const getRecentCommunityActivity = db.getRecentCommunityActivity;
export const getCommunityActivityByWard = db.getCommunityActivityByWard;

// Achievements operations
export const createAchievement = db.createAchievement;
export const getAchievements = db.getAchievements || db.getAllAchievements;
export const getAchievementsByCitizen = db.getAchievementsByCitizen;
export const getCitizenAchievements = db.getCitizenAchievements || db.getAchievementsByCitizen;
export const hasAchievement = db.hasAchievement;
export const getAllAchievements = db.getAllAchievements || db.getAchievements;

// Leaderboard & Community Strength
export const getLeaderboard = db.getLeaderboard;
export const getCommunityStrengthData = db.getCommunityStrengthData;
