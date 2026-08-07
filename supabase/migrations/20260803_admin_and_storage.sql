-- Phase 13: Storage, Leads Table, and RLS for Admins

-- 1. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    source TEXT NOT NULL, -- e.g., 'newsletter', 'waitlist_tools', 'scholarship_check'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Anyone can insert a lead (public)
CREATE POLICY "Anyone can insert lead" ON public.leads FOR INSERT WITH CHECK (true);
-- Only admins can read leads
CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Update RLS on existing tables for Admins

-- repository_papers
CREATE POLICY "Admins can insert repository_papers" ON public.repository_papers FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update repository_papers" ON public.repository_papers FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete repository_papers" ON public.repository_papers FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- repository_authors
CREATE POLICY "Admins can insert repository_authors" ON public.repository_authors FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update repository_authors" ON public.repository_authors FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete repository_authors" ON public.repository_authors FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- blog_posts (Knowledge Hub)
CREATE POLICY "Admins can insert blog_posts" ON public.blog_posts FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update blog_posts" ON public.blog_posts FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete blog_posts" ON public.blog_posts FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Storage Bucket for Papers
-- This requires the storage schema which might already exist in Supabase
INSERT INTO storage.buckets (id, name, public) VALUES ('papers', 'papers', true) ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public Access to Papers" ON storage.objects FOR SELECT USING ( bucket_id = 'papers' );
CREATE POLICY "Admin Upload Access to Papers" ON storage.objects FOR INSERT WITH CHECK ( 
    bucket_id = 'papers' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') 
);
CREATE POLICY "Admin Update Access to Papers" ON storage.objects FOR UPDATE USING ( 
    bucket_id = 'papers' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') 
);
CREATE POLICY "Admin Delete Access to Papers" ON storage.objects FOR DELETE USING ( 
    bucket_id = 'papers' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') 
);
