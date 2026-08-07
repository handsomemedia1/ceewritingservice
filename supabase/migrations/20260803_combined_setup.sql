-- Migration for Phase 11: Research Repository Hub

-- 1. Authors Table
CREATE TABLE IF NOT EXISTS public.repository_authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    bio TEXT,
    institution TEXT,
    avatar_url TEXT,
    orcid TEXT, -- Optional persistent identifier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Repository Papers Table
CREATE TABLE IF NOT EXISTS public.repository_papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    abstract TEXT NOT NULL,
    
    -- Metadata
    discipline TEXT NOT NULL,
    paper_type TEXT NOT NULL, -- e.g. Journal Article, Thesis, Working Paper, Whitepaper
    publication_date DATE NOT NULL,
    language TEXT DEFAULT 'English',
    keywords JSONB, -- Array of strings
    subject_areas JSONB, -- Array of strings
    
    -- Identifiers & Licensing
    doi TEXT UNIQUE,
    isbn TEXT,
    license TEXT DEFAULT 'All Rights Reserved',
    
    -- Institutional & Funding
    institution TEXT,
    supervisor TEXT,
    funding_info TEXT,
    
    -- File Management
    pdf_url TEXT,
    version_string TEXT DEFAULT '1.0',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
    
    -- Metrics
    views_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Paper Authors Junction Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.repository_paper_authors (
    paper_id UUID REFERENCES public.repository_papers(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.repository_authors(id) ON DELETE CASCADE,
    author_order INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (paper_id, author_id)
);

-- Enable RLS
ALTER TABLE public.repository_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repository_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repository_paper_authors ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access for published papers" 
ON public.repository_papers FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public read access for authors" 
ON public.repository_authors FOR SELECT 
USING (true);

CREATE POLICY "Public read access for paper_authors relations" 
ON public.repository_paper_authors FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.repository_papers 
        WHERE id = repository_paper_authors.paper_id 
        AND status = 'published'
    )
);

-- Indexes for performance
CREATE INDEX idx_repo_papers_slug ON public.repository_papers(slug);
CREATE INDEX idx_repo_authors_slug ON public.repository_authors(slug);
CREATE INDEX idx_repo_papers_status ON public.repository_papers(status);
CREATE INDEX idx_repo_papers_discipline ON public.repository_papers(discipline);
CREATE INDEX idx_repo_papers_type ON public.repository_papers(paper_type);
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
