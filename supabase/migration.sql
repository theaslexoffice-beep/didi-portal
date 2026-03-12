-- DIDI 2.0 PostgreSQL Migration
-- Converted from SQLite to PostgreSQL for Supabase deployment
-- Run this in Supabase SQL Editor after creating your project

-- ============================================
-- 1. COMPLAINTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT 'Anonymous',
  whatsapp TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  admin_notes TEXT
);

-- ============================================
-- 2. CHAT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  lang TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CITIZENS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS citizens (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  otp TEXT,
  otp_expires TIMESTAMPTZ,
  verified INTEGER DEFAULT 0,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  address TEXT,
  ward TEXT,
  city TEXT DEFAULT 'Bilaspur',
  state TEXT DEFAULT 'Chhattisgarh',
  skills TEXT,
  resources TEXT,
  blood_group TEXT,
  trust_score DOUBLE PRECISION DEFAULT 0,
  help_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. ISSUES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  citizen_id INTEGER REFERENCES citizens(id),
  title TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'P3',
  status TEXT DEFAULT 'open',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  address TEXT,
  ward TEXT,
  media_urls TEXT,
  matched_helpers TEXT,
  resolved_by INTEGER,
  escalation_level INTEGER DEFAULT 0,
  escalation_history TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ============================================
-- 5. HELP RESPONSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS help_responses (
  id SERIAL PRIMARY KEY,
  issue_id INTEGER NOT NULL REFERENCES issues(id),
  citizen_id INTEGER NOT NULL REFERENCES citizens(id),
  message TEXT,
  status TEXT DEFAULT 'offered',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. SCHEMES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS schemes (
  id SERIAL PRIMARY KEY,
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

-- ============================================
-- 7. ESCALATION LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS escalation_log (
  id SERIAL PRIMARY KEY,
  issue_id INTEGER NOT NULL REFERENCES issues(id),
  level INTEGER NOT NULL,
  level_name TEXT NOT NULL,
  action_taken TEXT,
  document_type TEXT,
  document_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. LEGAL DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS legal_documents (
  id SERIAL PRIMARY KEY,
  issue_id INTEGER REFERENCES issues(id),
  citizen_id INTEGER REFERENCES citizens(id),
  doc_type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  content_html TEXT,
  language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. COMMUNITY ACTIVITY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS community_activity (
  id SERIAL PRIMARY KEY,
  citizen_id INTEGER REFERENCES citizens(id),
  activity_type TEXT NOT NULL,
  reference_id INTEGER,
  description TEXT,
  ward TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  citizen_id INTEGER NOT NULL REFERENCES citizens(id),
  achievement_key TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(citizen_id, achievement_key)
);

-- ============================================
-- INDEXES
-- ============================================
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

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- For now, create permissive policies (allow all operations)
-- TODO: Tighten these policies based on actual security requirements

-- Complaints policies
CREATE POLICY "Allow all on complaints" ON complaints FOR ALL USING (true) WITH CHECK (true);

-- Chat messages policies
CREATE POLICY "Allow all on chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Citizens policies
CREATE POLICY "Allow all on citizens" ON citizens FOR ALL USING (true) WITH CHECK (true);

-- Issues policies
CREATE POLICY "Allow all on issues" ON issues FOR ALL USING (true) WITH CHECK (true);

-- Help responses policies
CREATE POLICY "Allow all on help_responses" ON help_responses FOR ALL USING (true) WITH CHECK (true);

-- Schemes policies (read-only for most users)
CREATE POLICY "Allow all on schemes" ON schemes FOR ALL USING (true) WITH CHECK (true);

-- Escalation log policies
CREATE POLICY "Allow all on escalation_log" ON escalation_log FOR ALL USING (true) WITH CHECK (true);

-- Legal documents policies
CREATE POLICY "Allow all on legal_documents" ON legal_documents FOR ALL USING (true) WITH CHECK (true);

-- Community activity policies
CREATE POLICY "Allow all on community_activity" ON community_activity FOR ALL USING (true) WITH CHECK (true);

-- Achievements policies
CREATE POLICY "Allow all on achievements" ON achievements FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- Next steps:
-- 1. Run supabase/seed-schemes.sql to populate 58 government schemes
-- 2. Update .env.local with your Supabase credentials
-- 3. Deploy to Vercel
