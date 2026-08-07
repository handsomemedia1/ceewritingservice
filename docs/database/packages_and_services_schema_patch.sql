-- 1. Create Packages Table
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT DEFAULT 'Package',
  name TEXT NOT NULL,
  desc_text TEXT NOT NULL,
  price INTEGER NOT NULL,
  price_label TEXT NOT NULL,
  save_label TEXT,
  badge TEXT,
  featured BOOLEAN DEFAULT false,
  features TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for packages
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Public can read packages
CREATE POLICY "Public packages are viewable by everyone." ON packages FOR SELECT USING (true);

-- Admins full access to packages
CREATE POLICY "Admins full access to packages" ON packages FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 2. Extend Services Table
ALTER TABLE services ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- 3. Extend Categories Table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 4. Seed initial Package data (Optional, based on existing hardcoded data)
INSERT INTO packages (id, category, name, desc_text, price, price_label, save_label, badge, featured, features, display_order)
VALUES 
  (gen_random_uuid(), 'Package', 'Student Pack', 'Everything a student needs', 70000, '₦70,000', 'Save up to ₦15,000', NULL, false, ARRAY['Proofreading & Editing', 'Plagiarism Check (Turnitin)', 'AI Detection Report', 'Research Paper Formatting'], 1),
  (gen_random_uuid(), 'Package', 'Job Seeker Pack', 'Get hired faster with the complete set', 50000, '₦50,000', 'Save ₦10,000', '⭐ Most Popular', true, ARRAY['CV / Resume Writing', 'Cover Letter Writing', 'LinkedIn Profile Optimization', '1 Professional Email'], 2),
  (gen_random_uuid(), 'Package', 'Complete AI Pack', 'Write → Humanize → Check → Certify', 25000, '₦25,000', 'Save ₦5,000', NULL, false, ARRAY['AI Content Humanizing', 'Full Turnitin Check', 'AI Detection Report', 'Official PDF Certificate'], 3);
