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
