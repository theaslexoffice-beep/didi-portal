import { supabase } from './supabase.js';

/**
 * Supabase Database Abstraction Layer
 * Mirrors ALL functions from db.js but uses Supabase (PostgreSQL) instead of SQLite
 * All functions are async and return Promises
 */

// ============================================
// COMPLAINT OPERATIONS
// ============================================

export async function createComplaint({ name, whatsapp, email, category, description }) {
  const { data, error } = await supabase
    .from('complaints')
    .insert({
      name: name || 'Anonymous',
      whatsapp,
      email: email || null,
      category,
      description
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getApprovedComplaints(limit = 50, offset = 0) {
  const { data, error } = await supabase
    .from('complaints')
    .select('id, name, category, description, status, created_at')
    .in('status', ['approved', 'resolved'])
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data || [];
}

export async function getAllComplaints(limit = 100) {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getPendingComplaints() {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateComplaintStatus(id, status, adminNotes) {
  const { error } = await supabase
    .from('complaints')
    .update({
      status,
      admin_notes: adminNotes || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

// ============================================
// CHAT OPERATIONS
// ============================================

export async function saveChatMessage(sessionId, role, message, lang) {
  const { error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role,
      message,
      lang: lang || 'en'
    });
  
  if (error) throw error;
  return { changes: 1 };
}

export async function getChatHistory(sessionId, limit = 50) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, message, created_at')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

// ============================================
// CITIZENS OPERATIONS
// ============================================

export async function createCitizen({ name, phone, email }) {
  const otp = '123456'; // Mock OTP
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins
  
  const { data, error } = await supabase
    .from('citizens')
    .insert({
      name,
      phone,
      email: email || null,
      otp,
      otp_expires: otpExpires
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return { id: data.id, otp };
}

export async function verifyCitizen(phone, otp) {
  // Check OTP validity
  const { data: citizen, error: fetchError } = await supabase
    .from('citizens')
    .select('*')
    .eq('phone', phone)
    .eq('otp', otp)
    .gt('otp_expires', new Date().toISOString())
    .single();
  
  if (fetchError || !citizen) {
    return { success: false };
  }
  
  // Update verification status
  const { error: updateError } = await supabase
    .from('citizens')
    .update({
      verified: 1,
      otp: null,
      otp_expires: null
    })
    .eq('id', citizen.id);
  
  if (updateError) throw updateError;
  return { success: true, citizen };
}

export async function getCitizenByPhone(phone) {
  const { data, error } = await supabase
    .from('citizens')
    .select('*')
    .eq('phone', phone)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data || null;
}

export async function updateCitizenOTP(phone, otp) {
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  
  const { error } = await supabase
    .from('citizens')
    .update({
      otp,
      otp_expires: otpExpires
    })
    .eq('phone', phone);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function getCitizenById(id) {
  const { data, error } = await supabase
    .from('citizens')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function updateCitizenProfile(id, updates) {
  const payload = {};
  
  if (updates.lat !== undefined) payload.lat = updates.lat;
  if (updates.lng !== undefined) payload.lng = updates.lng;
  if (updates.address) payload.address = updates.address;
  if (updates.ward) payload.ward = updates.ward;
  if (updates.skills) payload.skills = JSON.stringify(updates.skills);
  if (updates.resources) payload.resources = JSON.stringify(updates.resources);
  if (updates.blood_group) payload.blood_group = updates.blood_group;
  
  if (Object.keys(payload).length === 0) return false;
  
  const { error } = await supabase
    .from('citizens')
    .update(payload)
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function getAllVerifiedCitizens() {
  const { data, error } = await supabase
    .from('citizens')
    .select('*')
    .eq('verified', 1);
  
  if (error) throw error;
  return data || [];
}

export async function incrementHelpCount(citizenId) {
  // Supabase doesn't have direct increment, so we need to fetch-increment-update
  const { data: citizen } = await supabase
    .from('citizens')
    .select('help_count')
    .eq('id', citizenId)
    .single();
  
  const { error } = await supabase
    .from('citizens')
    .update({ help_count: (citizen?.help_count || 0) + 1 })
    .eq('id', citizenId);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function updateTrustScore(citizenId, newScore) {
  const { error } = await supabase
    .from('citizens')
    .update({ trust_score: newScore })
    .eq('id', citizenId);
  
  if (error) throw error;
  return { changes: 1 };
}

// ============================================
// ISSUES OPERATIONS
// ============================================

export async function createIssue({ citizen_id, title, description, category, severity, lat, lng, address, ward, media_urls }) {
  const { data, error } = await supabase
    .from('issues')
    .insert({
      citizen_id: citizen_id || null,
      title: title || null,
      description,
      category,
      severity: severity || 'P3',
      lat: lat || null,
      lng: lng || null,
      address: address || null,
      ward: ward || null,
      media_urls: media_urls ? JSON.stringify(media_urls) : null
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getIssues({ category, severity, status, ward, limit = 50, offset = 0 }) {
  let query = supabase.from('issues').select('*');
  
  if (category) query = query.eq('category', category);
  if (severity) query = query.eq('severity', severity);
  if (status) query = query.eq('status', status);
  if (ward) query = query.eq('ward', ward);
  
  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getIssueById(id) {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function updateIssueStatus(id, status, resolvedBy = null) {
  const payload = {
    status,
    updated_at: new Date().toISOString()
  };
  
  if (status === 'resolved') {
    payload.resolved_by = resolvedBy;
    payload.resolved_at = new Date().toISOString();
  }
  
  const { error } = await supabase
    .from('issues')
    .update(payload)
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function incrementIssueUpvotes(id) {
  // Fetch current upvotes, then increment
  const { data: issue } = await supabase
    .from('issues')
    .select('upvotes')
    .eq('id', id)
    .single();
  
  const { error } = await supabase
    .from('issues')
    .update({ upvotes: (issue?.upvotes || 0) + 1 })
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function updateMatchedHelpers(issueId, helpers) {
  const { error } = await supabase
    .from('issues')
    .update({ matched_helpers: JSON.stringify(helpers) })
    .eq('id', issueId);
  
  if (error) throw error;
  return { changes: 1 };
}

export async function getIssueStats() {
  const { count: total } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true });
  
  const { count: resolved } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'resolved');
  
  return { total: total || 0, resolved: resolved || 0 };
}

// ============================================
// HELP RESPONSES OPERATIONS
// ============================================

export async function createHelpResponse({ issue_id, citizen_id, message }) {
  const { data, error } = await supabase
    .from('help_responses')
    .insert({
      issue_id,
      citizen_id,
      message: message || null
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getHelpResponsesByIssue(issueId) {
  const { data, error } = await supabase
    .from('help_responses')
    .select(`
      *,
      citizens (name, phone)
    `)
    .eq('issue_id', issueId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Flatten the joined data to match SQLite format
  return (data || []).map(hr => ({
    ...hr,
    name: hr.citizens?.name,
    phone: hr.citizens?.phone
  }));
}

export async function getHelpResponsesByCitizen(citizenId) {
  const { data, error } = await supabase
    .from('help_responses')
    .select(`
      *,
      issues (title, description, status)
    `)
    .eq('citizen_id', citizenId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return (data || []).map(hr => ({
    ...hr,
    title: hr.issues?.title,
    description: hr.issues?.description,
    status: hr.issues?.status
  }));
}

export async function updateHelpResponseStatus(id, status) {
  const { error } = await supabase
    .from('help_responses')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

// ============================================
// SCHEMES OPERATIONS
// ============================================

export async function createScheme(scheme) {
  const { error } = await supabase
    .from('schemes')
    .insert({
      name: scheme.name,
      name_hi: scheme.name_hi || null,
      description: scheme.description || null,
      description_hi: scheme.description_hi || null,
      ministry: scheme.ministry || null,
      level: scheme.level || null,
      eligibility: scheme.eligibility ? JSON.stringify(scheme.eligibility) : null,
      benefits: scheme.benefits || null,
      apply_url: scheme.apply_url || null,
      documents_needed: scheme.documents_needed ? JSON.stringify(scheme.documents_needed) : null,
      category: scheme.category || null
    });
  
  if (error) throw error;
  return { changes: 1 };
}

export async function getAllSchemes() {
  const { data, error } = await supabase
    .from('schemes')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function searchSchemes({ age, income, category, state }) {
  // Get all schemes first (eligibility is JSON, harder to filter in SQL)
  const schemes = await getAllSchemes();
  
  // Filter in JS like the SQLite version
  return schemes.filter(s => {
    if (!s.eligibility) return true;
    try {
      const elig = JSON.parse(s.eligibility);
      if (age && elig.age_min && age < elig.age_min) return false;
      if (age && elig.age_max && age > elig.age_max) return false;
      if (income && elig.income_max && income > elig.income_max) return false;
      if (state && elig.states && elig.states.length > 0 && !elig.states.includes(state)) return false;
      if (category && elig.categories && elig.categories.length > 0 && !elig.categories.includes(category)) return false;
      return true;
    } catch {
      return true;
    }
  });
}

export async function getSchemeById(id) {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

// Alias exports to match db.js naming
export const getSchemesByCategoryDB = async (category) => {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('category', category);
  
  if (error) throw error;
  return data || [];
};

export const searchSchemesDB = searchSchemes;

export async function countSchemes() {
  const { count, error } = await supabase
    .from('schemes')
    .select('*', { count: 'exact', head: true });
  
  if (error) throw error;
  return count || 0;
}

// ============================================
// ESCALATION LOG OPERATIONS
// ============================================

export async function createEscalationLog({ issue_id, level, level_name, action_taken, document_type, document_id }) {
  const { data, error } = await supabase
    .from('escalation_log')
    .insert({
      issue_id,
      level,
      level_name,
      action_taken: action_taken || null,
      document_type: document_type || null,
      document_id: document_id || null
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getEscalationLogs(issueId) {
  const { data, error } = await supabase
    .from('escalation_log')
    .select('*')
    .eq('issue_id', issueId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getLatestEscalation(issueId) {
  const { data, error } = await supabase
    .from('escalation_log')
    .select('*')
    .eq('issue_id', issueId)
    .order('level', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function updateIssueEscalationLevel(issueId, level) {
  const { error } = await supabase
    .from('issues')
    .update({
      escalation_level: level,
      updated_at: new Date().toISOString()
    })
    .eq('id', issueId);
  
  if (error) throw error;
  return { changes: 1 };
}

// ============================================
// LEGAL DOCUMENTS OPERATIONS
// ============================================

export async function createLegalDocument({ issue_id, citizen_id, doc_type, title, content, content_html, language, status }) {
  const { data, error } = await supabase
    .from('legal_documents')
    .insert({
      issue_id: issue_id || null,
      citizen_id: citizen_id || null,
      doc_type,
      title: title || null,
      content,
      content_html: content_html || null,
      language: language || 'en',
      status: status || 'draft'
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getLegalDocuments({ limit = 50, offset = 0 }) {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data || [];
}

export async function getLegalDocumentsByIssue(issueId) {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .eq('issue_id', issueId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getLegalDocumentsByCitizen(citizenId) {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .eq('citizen_id', citizenId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getLegalDocumentById(id) {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function updateLegalDocumentStatus(id, status) {
  const { error } = await supabase
    .from('legal_documents')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
  return { changes: 1 };
}

// ============================================
// COMMUNITY ACTIVITY OPERATIONS
// ============================================

export async function createCommunityActivity({ citizen_id, activity_type, reference_id, description, ward }) {
  const { data, error } = await supabase
    .from('community_activity')
    .insert({
      citizen_id: citizen_id || null,
      activity_type,
      reference_id: reference_id || null,
      description: description || null,
      ward: ward || null
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

export async function getCommunityActivity({ ward, activity_type, limit = 20, offset = 0 }) {
  let query = supabase
    .from('community_activity')
    .select(`
      *,
      citizens (name)
    `);
  
  if (ward) query = query.eq('ward', ward);
  if (activity_type) query = query.eq('activity_type', activity_type);
  
  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  
  const { data, error } = await query;
  if (error) throw error;
  
  return (data || []).map(ca => ({
    ...ca,
    citizen_name: ca.citizens?.name
  }));
}

export async function getRecentCommunityActivity(limit = 50) {
  const { data, error } = await supabase
    .from('community_activity')
    .select(`
      *,
      citizens (name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(ca => ({
    ...ca,
    citizen_name: ca.citizens?.name
  }));
}

export async function getCommunityActivityByWard(ward, limit = 20) {
  const { data, error } = await supabase
    .from('community_activity')
    .select(`
      *,
      citizens (name)
    `)
    .eq('ward', ward)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(ca => ({
    ...ca,
    citizen_name: ca.citizens?.name
  }));
}

// ============================================
// ACHIEVEMENTS OPERATIONS
// ============================================

export async function createAchievement({ citizen_id, achievement_key, achievement_name, description, icon }) {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        citizen_id,
        achievement_key,
        achievement_name,
        description: description || null,
        icon: icon || null
      })
      .select('id')
      .single();
    
    if (error) {
      // Check for unique constraint violation
      if (error.code === '23505') return null; // PostgreSQL unique violation code
      throw error;
    }
    
    return data.id;
  } catch (error) {
    if (error.code === '23505') return null;
    throw error;
  }
}

export async function getAchievementsByCitizen(citizenId) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('citizen_id', citizenId)
    .order('earned_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

// Alias to match db.js naming
export const getCitizenAchievements = getAchievementsByCitizen;

export async function hasAchievement(citizenId, achievementKey) {
  const { data, error } = await supabase
    .from('achievements')
    .select('id')
    .eq('citizen_id', citizenId)
    .eq('achievement_key', achievementKey)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

export async function getAllAchievements(limit = 100) {
  const { data, error } = await supabase
    .from('achievements')
    .select(`
      *,
      citizens (name)
    `)
    .order('earned_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(a => ({
    ...a,
    citizen_name: a.citizens?.name
  }));
}

// Alias to match db.js
export const getAchievements = getAllAchievements;

// ============================================
// LEADERBOARD & COMMUNITY STRENGTH (NEW)
// ============================================

export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('citizens')
    .select('id, name, phone, trust_score, help_count')
    .eq('verified', 1)
    .order('trust_score', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getCommunityStrengthData() {
  const { count: totalCitizens } = await supabase
    .from('citizens')
    .select('*', { count: 'exact', head: true })
    .eq('verified', 1);
  
  const { count: activeIssues } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open');
  
  const { count: resolvedIssues } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'resolved');
  
  const { data: helpData } = await supabase
    .from('help_responses')
    .select('status', { count: 'exact' });
  
  return {
    totalCitizens: totalCitizens || 0,
    activeIssues: activeIssues || 0,
    resolvedIssues: resolvedIssues || 0,
    helpResponses: helpData?.length || 0
  };
}

// Placeholder for upvoteIssue (alias for incrementIssueUpvotes)
export const upvoteIssue = incrementIssueUpvotes;
