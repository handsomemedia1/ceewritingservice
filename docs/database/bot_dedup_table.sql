-- ==============================================
-- DEDUPLICATION TABLE FOR BOT CHANNEL POSTS
-- Run this in the Supabase SQL Editor
-- Prevents the bot from ever reposting the same scholarship/job
-- ==============================================

CREATE TABLE bot_posted_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,          -- e.g. 'rss_scholarships', 'rss_jobs', 'jsearch'
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  fingerprint TEXT UNIQUE NOT NULL, -- MD5 hash of (url + title) for dedup
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast dedup lookups
CREATE INDEX idx_bot_posted_fingerprint ON bot_posted_items(fingerprint);

-- Allow public read (bot uses anon key)
ALTER TABLE bot_posted_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Bot can read posted items" ON bot_posted_items FOR SELECT USING (true);
CREATE POLICY "Bot can insert posted items" ON bot_posted_items FOR INSERT WITH CHECK (true);
