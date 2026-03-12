import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'didi.db');

// Import seeder to auto-seed schemes on first run
if (typeof window === 'undefined') {
  import('./seed-schemes.js').catch(() => {});
}

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT DEFAULT 'Anonymous',
        whatsapp TEXT NOT NULL,
        email TEXT,
        category TEXT NOT NULL DEFAULT 'other',
        description TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        admin_notes TEXT
      );

      CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        message TEXT NOT NULL,
        lang TEXT DEFAULT 'en',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS citizens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        email TEXT,
        otp TEXT,
        otp_expires DATETIME,
        verified INTEGER DEFAULT 0,
        lat REAL,
        lng REAL,
        address TEXT,
        ward TEXT,
        city TEXT DEFAULT 'Bilaspur',
        state TEXT DEFAULT 'Chhattisgarh',
        skills TEXT,
        resources TEXT,
        blood_group TEXT,
        trust_score REAL DEFAULT 0,
        help_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        citizen_id INTEGER,
        title TEXT,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        severity TEXT NOT NULL DEFAULT 'P3',
        status TEXT DEFAULT 'open',
        lat REAL,
        lng REAL,
        address TEXT,
        ward TEXT,
        media_urls TEXT,
        matched_helpers TEXT,
        resolved_by INTEGER,
        escalation_level INTEGER DEFAULT 0,
        escalation_history TEXT,
        upvotes INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        resolved_at DATETIME,
        FOREIGN KEY (citizen_id) REFERENCES citizens(id)
      );

      CREATE TABLE IF NOT EXISTS help_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        issue_id INTEGER NOT NULL,
        citizen_id INTEGER NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'offered',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (issue_id) REFERENCES issues(id),
        FOREIGN KEY (citizen_id) REFERENCES citizens(id)
      );

      CREATE TABLE IF NOT EXISTS schemes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_hi TEXT,
        description TEXT,
        description_hi TEXT,
        ministry TEXT,
        level TEXT,
        eligibility TEXT,
        benefits TEXT,
        apply_url TEXT,
        documents_needed TEXT,
        category TEXT
      );

      CREATE TABLE IF NOT EXISTS escalation_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        issue_id INTEGER NOT NULL,
        level INTEGER NOT NULL,
        level_name TEXT NOT NULL,
        action_taken TEXT,
        document_generated TEXT,
        document_content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (issue_id) REFERENCES issues(id)
      );

      CREATE TABLE IF NOT EXISTS legal_documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        issue_id INTEGER,
        citizen_id INTEGER,
        doc_type TEXT NOT NULL,
        title TEXT,
        content TEXT NOT NULL,
        content_html TEXT,
        language TEXT DEFAULT 'en',
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (issue_id) REFERENCES issues(id),
        FOREIGN KEY (citizen_id) REFERENCES citizens(id)
      );

      CREATE TABLE IF NOT EXISTS community_activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        citizen_id INTEGER,
        activity_type TEXT NOT NULL,
        reference_id INTEGER,
        description TEXT,
        ward TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (citizen_id) REFERENCES citizens(id)
      );

      CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        citizen_id INTEGER NOT NULL,
        achievement_key TEXT NOT NULL,
        achievement_name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (citizen_id) REFERENCES citizens(id),
        UNIQUE(citizen_id, achievement_key)
      );

      CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
      CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_citizens_phone ON citizens(phone);
      CREATE INDEX IF NOT EXISTS idx_citizens_verified ON citizens(verified);
      CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
      CREATE INDEX IF NOT EXISTS idx_issues_severity ON issues(severity);
      CREATE INDEX IF NOT EXISTS idx_issues_category ON issues(category);
      CREATE INDEX IF NOT EXISTS idx_help_responses_issue ON help_responses(issue_id);
      CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
      CREATE INDEX IF NOT EXISTS idx_escalation_log_issue ON escalation_log(issue_id);
      CREATE INDEX IF NOT EXISTS idx_legal_documents_issue ON legal_documents(issue_id);
      CREATE INDEX IF NOT EXISTS idx_legal_documents_citizen ON legal_documents(citizen_id);
      CREATE INDEX IF NOT EXISTS idx_community_ward ON community_activity(ward);
      CREATE INDEX IF NOT EXISTS idx_community_type ON community_activity(activity_type);
      CREATE INDEX IF NOT EXISTS idx_achievements_citizen ON achievements(citizen_id);
    `);
  }
  return db;
}

// Complaint operations
export function createComplaint({ name, whatsapp, email, category, description }) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO complaints (name, whatsapp, email, category, description) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(name || 'Anonymous', whatsapp, email || null, category, description);
  return result.lastInsertRowid;
}

export function getApprovedComplaints(limit = 50, offset = 0) {
  const db = getDb();
  return db.prepare(
    'SELECT id, name, category, description, status, created_at FROM complaints WHERE status IN (?, ?) ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all('approved', 'resolved', limit, offset);
}

export function getAllComplaints(limit = 100) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM complaints ORDER BY created_at DESC LIMIT ?'
  ).all(limit);
}

export function getPendingComplaints() {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM complaints WHERE status = ? ORDER BY created_at DESC'
  ).all('pending');
}

export function updateComplaintStatus(id, status, adminNotes) {
  const db = getDb();
  return db.prepare(
    'UPDATE complaints SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(status, adminNotes || null, id);
}

// Chat operations
export function saveChatMessage(sessionId, role, message, lang) {
  const db = getDb();
  return db.prepare(
    'INSERT INTO chat_messages (session_id, role, message, lang) VALUES (?, ?, ?, ?)'
  ).run(sessionId, role, message, lang || 'en');
}

export function getChatHistory(sessionId, limit = 50) {
  const db = getDb();
  return db.prepare(
    'SELECT role, message, created_at FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?'
  ).all(sessionId, limit);
}

// ============ CITIZENS OPERATIONS ============
export function createCitizen({ name, phone, email }) {
  const db = getDb();
  const otp = '123456'; // Mock OTP for now
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString().replace('T', ' ').replace('Z', ''); // 10 mins, SQLite-compatible format
  const stmt = db.prepare(
    'INSERT INTO citizens (name, phone, email, otp, otp_expires) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(name, phone, email || null, otp, otpExpires);
  return { id: result.lastInsertRowid, otp };
}

export function verifyCitizen(phone, otp) {
  const db = getDb();
  const citizen = db.prepare(
    "SELECT * FROM citizens WHERE phone = ? AND otp = ? AND otp_expires > datetime('now')"
  ).get(phone, otp);
  
  if (citizen) {
    db.prepare('UPDATE citizens SET verified = 1, otp = NULL, otp_expires = NULL WHERE id = ?').run(citizen.id);
    return { success: true, citizen };
  }
  return { success: false };
}

export function getCitizenByPhone(phone) {
  const db = getDb();
  return db.prepare('SELECT * FROM citizens WHERE phone = ?').get(phone);
}

export function updateCitizenOTP(phone, otp) {
  const db = getDb();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString().replace('T', ' ').replace('Z', '');
  return db.prepare('UPDATE citizens SET otp = ?, otp_expires = ? WHERE phone = ?').run(otp, otpExpires, phone);
}

export function getCitizenById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM citizens WHERE id = ?').get(id);
}

export function updateCitizenProfile(id, updates) {
  const db = getDb();
  const fields = [];
  const values = [];
  
  if (updates.lat !== undefined) { fields.push('lat = ?'); values.push(updates.lat); }
  if (updates.lng !== undefined) { fields.push('lng = ?'); values.push(updates.lng); }
  if (updates.address) { fields.push('address = ?'); values.push(updates.address); }
  if (updates.ward) { fields.push('ward = ?'); values.push(updates.ward); }
  if (updates.skills) { fields.push('skills = ?'); values.push(JSON.stringify(updates.skills)); }
  if (updates.resources) { fields.push('resources = ?'); values.push(JSON.stringify(updates.resources)); }
  if (updates.blood_group) { fields.push('blood_group = ?'); values.push(updates.blood_group); }
  
  if (fields.length === 0) return false;
  
  values.push(id);
  const stmt = db.prepare(`UPDATE citizens SET ${fields.join(', ')} WHERE id = ?`);
  return stmt.run(...values);
}

export function getAllVerifiedCitizens() {
  const db = getDb();
  return db.prepare('SELECT * FROM citizens WHERE verified = 1').all();
}

export function incrementHelpCount(citizenId) {
  const db = getDb();
  return db.prepare('UPDATE citizens SET help_count = help_count + 1 WHERE id = ?').run(citizenId);
}

export function updateTrustScore(citizenId, newScore) {
  const db = getDb();
  return db.prepare('UPDATE citizens SET trust_score = ? WHERE id = ?').run(newScore, citizenId);
}

// ============ ISSUES OPERATIONS ============
export function createIssue({ citizen_id, title, description, category, severity, lat, lng, address, ward, media_urls }) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO issues (citizen_id, title, description, category, severity, lat, lng, address, ward, media_urls)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    citizen_id || null,
    title || null,
    description,
    category,
    severity || 'P3',
    lat || null,
    lng || null,
    address || null,
    ward || null,
    media_urls ? JSON.stringify(media_urls) : null
  );
  return result.lastInsertRowid;
}

export function getIssues({ category, severity, status, ward, limit = 50, offset = 0 }) {
  const db = getDb();
  let query = 'SELECT * FROM issues WHERE 1=1';
  const params = [];
  
  if (category) { query += ' AND category = ?'; params.push(category); }
  if (severity) { query += ' AND severity = ?'; params.push(severity); }
  if (status) { query += ' AND status = ?'; params.push(status); }
  if (ward) { query += ' AND ward = ?'; params.push(ward); }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  return db.prepare(query).all(...params);
}

export function getIssueById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
}

export function updateIssueStatus(id, status, resolvedBy = null) {
  const db = getDb();
  if (status === 'resolved') {
    return db.prepare(
      'UPDATE issues SET status = ?, resolved_by = ?, resolved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(status, resolvedBy, id);
  }
  return db.prepare('UPDATE issues SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
}

export function incrementIssueUpvotes(id) {
  const db = getDb();
  return db.prepare('UPDATE issues SET upvotes = upvotes + 1 WHERE id = ?').run(id);
}

export function updateMatchedHelpers(issueId, helpers) {
  const db = getDb();
  return db.prepare('UPDATE issues SET matched_helpers = ? WHERE id = ?').run(JSON.stringify(helpers), issueId);
}

export function getIssueStats() {
  const db = getDb();
  const total = db.prepare('SELECT COUNT(*) as count FROM issues').get().count;
  const resolved = db.prepare('SELECT COUNT(*) as count FROM issues WHERE status = ?').get('resolved').count;
  return { total, resolved };
}

// ============ HELP RESPONSES OPERATIONS ============
export function createHelpResponse({ issue_id, citizen_id, message }) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO help_responses (issue_id, citizen_id, message) VALUES (?, ?, ?)'
  );
  const result = stmt.run(issue_id, citizen_id, message || null);
  return result.lastInsertRowid;
}

export function getHelpResponsesByIssue(issueId) {
  const db = getDb();
  return db.prepare(
    'SELECT hr.*, c.name, c.phone FROM help_responses hr LEFT JOIN citizens c ON hr.citizen_id = c.id WHERE hr.issue_id = ? ORDER BY hr.created_at DESC'
  ).all(issueId);
}

export function getHelpResponsesByCitizen(citizenId) {
  const db = getDb();
  return db.prepare(
    'SELECT hr.*, i.title, i.description, i.status FROM help_responses hr LEFT JOIN issues i ON hr.issue_id = i.id WHERE hr.citizen_id = ? ORDER BY hr.created_at DESC'
  ).all(citizenId);
}

export function updateHelpResponseStatus(id, status) {
  const db = getDb();
  return db.prepare('UPDATE help_responses SET status = ? WHERE id = ?').run(status, id);
}

// ============ SCHEMES OPERATIONS ============
export function createScheme(scheme) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO schemes (name, name_hi, description, description_hi, ministry, level, eligibility, benefits, apply_url, documents_needed, category)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  return stmt.run(
    scheme.name,
    scheme.name_hi || null,
    scheme.description || null,
    scheme.description_hi || null,
    scheme.ministry || null,
    scheme.level || null,
    scheme.eligibility ? JSON.stringify(scheme.eligibility) : null,
    scheme.benefits || null,
    scheme.apply_url || null,
    scheme.documents_needed ? JSON.stringify(scheme.documents_needed) : null,
    scheme.category || null
  );
}

export function getAllSchemes() {
  const db = getDb();
  return db.prepare('SELECT * FROM schemes').all();
}

export function searchSchemes({ age, income, category, state }) {
  const db = getDb();
  let schemes = db.prepare('SELECT * FROM schemes').all();
  
  // Filter in JS since eligibility is JSON
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

export function getSchemeById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM schemes WHERE id = ?').get(id);
}

// ============ ESCALATION LOG OPERATIONS ============
export function createEscalationLog({ issue_id, level, level_name, action_taken, document_type, document_id }) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO escalation_log (issue_id, level, level_name, action_taken, document_type, document_id)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    issue_id,
    level,
    level_name,
    action_taken || null,
    document_type || null,
    document_id || null
  );
  return result.lastInsertRowid;
}

export function getEscalationLogs(issueId) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM escalation_log WHERE issue_id = ? ORDER BY created_at ASC'
  ).all(issueId);
}

export function getLatestEscalation(issueId) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM escalation_log WHERE issue_id = ? ORDER BY level DESC, created_at DESC LIMIT 1'
  ).get(issueId);
}

export function updateIssueEscalationLevel(issueId, level) {
  const db = getDb();
  return db.prepare(
    'UPDATE issues SET escalation_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(level, issueId);
}

// ============ LEGAL DOCUMENTS OPERATIONS ============
export function createLegalDocument({ issue_id, citizen_id, doc_type, title, content, content_html, language, status }) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO legal_documents (issue_id, citizen_id, doc_type, title, content, content_html, language, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    issue_id || null,
    citizen_id || null,
    doc_type,
    title || null,
    content,
    content_html || null,
    language || 'en',
    status || 'draft'
  );
  return result.lastInsertRowid;
}

export function getLegalDocuments({ limit = 50, offset = 0 }) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM legal_documents ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(limit, offset);
}

export function getLegalDocumentsByIssue(issueId) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM legal_documents WHERE issue_id = ? ORDER BY created_at DESC'
  ).all(issueId);
}

export function getLegalDocumentsByCitizen(citizenId) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM legal_documents WHERE citizen_id = ? ORDER BY created_at DESC'
  ).all(citizenId);
}

export function getLegalDocumentById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM legal_documents WHERE id = ?').get(id);
}

export function updateLegalDocumentStatus(id, status) {
  const db = getDb();
  return db.prepare('UPDATE legal_documents SET status = ? WHERE id = ?').run(status, id);
}

// ============ COMMUNITY ACTIVITY OPERATIONS ============
export function createCommunityActivity({ citizen_id, activity_type, reference_id, description, ward }) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO community_activity (citizen_id, activity_type, reference_id, description, ward) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(citizen_id || null, activity_type, reference_id || null, description || null, ward || null);
  return result.lastInsertRowid;
}

export function getCommunityActivity({ ward, activity_type, limit = 20, offset = 0 }) {
  const db = getDb();
  let query = `SELECT ca.*, c.name as citizen_name 
               FROM community_activity ca 
               LEFT JOIN citizens c ON ca.citizen_id = c.id 
               WHERE 1=1`;
  const params = [];
  
  if (ward) { query += ' AND ca.ward = ?'; params.push(ward); }
  if (activity_type) { query += ' AND ca.activity_type = ?'; params.push(activity_type); }
  
  query += ' ORDER BY ca.created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  return db.prepare(query).all(...params);
}

export function getRecentCommunityActivity(limit = 50) {
  const db = getDb();
  return db.prepare(
    `SELECT ca.*, c.name as citizen_name 
     FROM community_activity ca 
     LEFT JOIN citizens c ON ca.citizen_id = c.id 
     ORDER BY ca.created_at DESC 
     LIMIT ?`
  ).all(limit);
}

export function getCommunityActivityByWard(ward, limit = 20) {
  const db = getDb();
  return db.prepare(
    `SELECT ca.*, c.name as citizen_name 
     FROM community_activity ca 
     LEFT JOIN citizens c ON ca.citizen_id = c.id 
     WHERE ca.ward = ? 
     ORDER BY ca.created_at DESC 
     LIMIT ?`
  ).all(ward, limit);
}

// ============ ACHIEVEMENTS OPERATIONS ============
export function createAchievement({ citizen_id, achievement_key, achievement_name, description, icon }) {
  const db = getDb();
  try {
    const stmt = db.prepare(
      'INSERT INTO achievements (citizen_id, achievement_key, achievement_name, description, icon) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(citizen_id, achievement_key, achievement_name, description || null, icon || null);
    return result.lastInsertRowid;
  } catch (error) {
    // If unique constraint violation (already has achievement), return null
    if (error.message.includes('UNIQUE')) return null;
    throw error;
  }
}

export function getAchievementsByCitizen(citizenId) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM achievements WHERE citizen_id = ? ORDER BY earned_at DESC'
  ).all(citizenId);
}

export function hasAchievement(citizenId, achievementKey) {
  const db = getDb();
  const result = db.prepare(
    'SELECT id FROM achievements WHERE citizen_id = ? AND achievement_key = ?'
  ).get(citizenId, achievementKey);
  return !!result;
}

export function getAllAchievements(limit = 100) {
  const db = getDb();
  return db.prepare(
    `SELECT a.*, c.name as citizen_name 
     FROM achievements a 
     LEFT JOIN citizens c ON a.citizen_id = c.id 
     ORDER BY a.earned_at DESC 
     LIMIT ?`
  ).all(limit);
}
