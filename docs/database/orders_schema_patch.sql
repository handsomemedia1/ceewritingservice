-- ==============================================
-- CEE WRITING SERVICES - ORDERS & TASKS SCHEMA
-- Run this in the Supabase SQL Editor
-- ==============================================

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT,
  service_type TEXT NOT NULL,             -- e.g., 'CV Writing', 'SOP'
  status TEXT DEFAULT 'pending',          -- 'pending', 'in_progress', 'completed'
  payment_status TEXT DEFAULT 'unpaid',   -- 'unpaid', 'paid'
  deadline TIMESTAMP WITH TIME ZONE,
  assigned_writer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  requirements_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Admins can see and edit EVERYTHING
CREATE POLICY "Admins have full access to orders"
  ON orders
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- 4. Writers can only see orders explicitly assigned to them
CREATE POLICY "Writers can view their assigned orders"
  ON orders FOR SELECT
  USING (
    assigned_writer_id = auth.uid()
  );

-- 5. Writers can update their assigned orders (e.g. changing status to 'completed')
CREATE POLICY "Writers can update their assigned orders"
  ON orders FOR UPDATE
  USING (
    assigned_writer_id = auth.uid()
  )
  WITH CHECK (
    assigned_writer_id = auth.uid()
  );

-- ==============================================
-- STORAGE BUCKET FOR CLIENT DOCUMENTS (SECURE)
-- ==============================================

-- Create a private bucket for client CVs and writer drafts
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Admins can do everything with documents
CREATE POLICY "Admins full access to documents"
  ON storage.objects
  USING (
    bucket_id = 'client-documents' AND
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )
  WITH CHECK (
    bucket_id = 'client-documents' AND
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Writers can ONLY upload/read documents if they are logged in
CREATE POLICY "Writers can access documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'client-documents' AND auth.role() = 'authenticated'
  );

CREATE POLICY "Writers can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'client-documents' AND auth.role() = 'authenticated'
  );
