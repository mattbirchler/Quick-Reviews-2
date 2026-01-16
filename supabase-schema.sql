-- Quick Reviews Database Schema
-- Run this SQL in your Supabase project's SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (synced from Clerk via webhook)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  title TEXT NOT NULL,
  metadata TEXT,
  review_text TEXT,
  score INTEGER DEFAULT 4 CHECK (score BETWEEN 1 AND 4),

  -- Poster
  poster_url TEXT,
  poster_source TEXT CHECK (poster_source IN ('upload', 'url')),

  -- Customization
  theme_key TEXT DEFAULT 'home',
  custom_colors JSONB,
  score_names TEXT[] DEFAULT ARRAY['Didn''t Like It', 'Decent', 'Liked It', 'Loved It!'],
  font_sizes JSONB DEFAULT '{"title": 48, "metadata": 28, "body": 26}'::jsonb,

  -- Metadata
  media_type TEXT CHECK (media_type IN ('movie', 'tv', 'music', 'game', 'book', 'other')),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences (for default settings)
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  default_theme TEXT DEFAULT 'home',
  default_score_names TEXT[],
  default_layout TEXT CHECK (default_layout IN ('standard', 'square')) DEFAULT 'standard'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_public ON reviews(is_public) WHERE is_public = true;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to reviews table
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Reviews policies
CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  );

CREATE POLICY "Anyone can view public reviews" ON reviews
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  );

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  );

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  );

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  );

-- Storage bucket for posters (run in Supabase dashboard > Storage)
-- Create a bucket called "posters" with public access
-- The SQL below won't work directly, but here's the policy:
/*
INSERT INTO storage.buckets (id, name, public)
VALUES ('posters', 'posters', true);

CREATE POLICY "Anyone can view posters" ON storage.objects
  FOR SELECT USING (bucket_id = 'posters');

CREATE POLICY "Authenticated users can upload posters" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'posters' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own posters" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'posters' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own posters" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'posters' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
*/
