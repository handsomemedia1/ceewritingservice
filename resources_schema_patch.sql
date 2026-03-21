-- RESOURCES TABLE
-- Stores downloadable resources (CV templates, guides, checklists, etc.)

CREATE TABLE public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT CHECK (category IN ('Career', 'Academic', 'Scholarship', 'Other')) DEFAULT 'Career',
  icon TEXT DEFAULT 'FileText',
  downloads INTEGER DEFAULT 0,
  rating TEXT DEFAULT '5.0',
  features TEXT[] DEFAULT '{}',
  file_url TEXT,
  color TEXT DEFAULT 'linear-gradient(135deg, #0B1F3A, #1a3a5c)',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Everyone can view resources
CREATE POLICY "Public resources are viewable by everyone."
  ON public.resources FOR SELECT
  USING (true);

-- Only admins can create/edit/delete resources
CREATE POLICY "Admins full access to resources"
  ON public.resources FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
