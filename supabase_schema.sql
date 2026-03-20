-- 1. PROFILES TABLE
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'writer')),
  can_publish_directly BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles (useful for displaying authors)
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING (true);

-- Allow users to update their own profiles
CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. CREATE A TRIGGER FOR NEW USERS
-- Automatically creates a profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, can_publish_directly)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'writer', false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. BLOG POSTS TABLE (CMS)
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  status TEXT CHECK (status IN ('draft', 'pending_review', 'published')) DEFAULT 'draft',
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  tags TEXT[],
  seo_score TEXT CHECK (seo_score IN ('red', 'yellow', 'green')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  reads INTEGER DEFAULT 0
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Published posts are viewable by everyone
CREATE POLICY "Published posts are viewable by everyone."
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Admins can view/edit/delete any post
CREATE POLICY "Admins have full access to blog_posts"
  ON blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Writers can read/update their own posts
CREATE POLICY "Writers can view their own posts"
  ON blog_posts FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Writers can insert their own posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Writers can update their own posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = author_id);


-- 4. CATEGORIES TABLE
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public categories are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Admins full access to categories" ON categories FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 5. SERVICES TABLE
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  desc_text TEXT,
  price INTEGER NOT NULL,
  priceLabel TEXT NOT NULL,
  high_price TEXT,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public services are viewable by everyone." ON services FOR SELECT USING (true);
CREATE POLICY "Admins full access to services" ON services FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 6. FAQ TABLE
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public FAQs are viewable by everyone." ON faqs FOR SELECT USING (true);
CREATE POLICY "Admins full access to faqs" ON faqs FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 7. SET UP STORAGE BUCKET FOR BLOG IMAGES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'blog-images' );

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );
