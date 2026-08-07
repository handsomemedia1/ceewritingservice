-- Knowledge Hub: Phase 4 Schema Migration
-- Run this in Supabase SQL Editor

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS topic_pillar text,
  ADD COLUMN IF NOT EXISTS subtopic text,
  ADD COLUMN IF NOT EXISTS difficulty text CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  ADD COLUMN IF NOT EXISTS learning_path text,
  ADD COLUMN IF NOT EXISTS estimated_read_time int,
  ADD COLUMN IF NOT EXISTS last_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS executive_summary text,
  ADD COLUMN IF NOT EXISTS references_list text,
  ADD COLUMN IF NOT EXISTS faq jsonb;

-- Create index for faster topic filtering
CREATE INDEX IF NOT EXISTS idx_blog_topic_pillar ON blog_posts(topic_pillar);
CREATE INDEX IF NOT EXISTS idx_blog_difficulty ON blog_posts(difficulty);
CREATE INDEX IF NOT EXISTS idx_blog_status_published ON blog_posts(status, published_at DESC);
