-- Run this in your Supabase SQL Editor to create the schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp_number TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table (for chat history)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'didi', 'admin')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_user ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_created ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_complaint ON messages(complaint_id);
CREATE INDEX IF NOT EXISTS idx_users_whatsapp ON users(whatsapp_number);

-- RLS (Row Level Security) - enable for production
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS, so API routes using service client work fine
-- For additional client-side access, add policies as needed
