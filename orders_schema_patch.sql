-- 1. CREATE ORDERS TABLE
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  service_type TEXT NOT NULL,
  requirements TEXT,
  client_files TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('new', 'assigned', 'in_progress', 'completed', 'delivered')) DEFAULT 'new',
  deadline TIMESTAMP WITH TIME ZONE,
  assigned_writer_id UUID REFERENCES public.profiles(id) DEFAULT NULL,
  submission_file TEXT DEFAULT NULL,
  writer_notes TEXT DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES FOR ORDERS

-- Admins can view and manage all orders
CREATE POLICY "Admins have full access to orders"
  ON public.orders FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Writers can ONLY view orders assigned to them
CREATE POLICY "Writers can view their assigned orders"
  ON public.orders FOR SELECT
  USING (assigned_writer_id = auth.uid());

-- Writers can update ONLY their assigned orders (to change status or upload submissions)
CREATE POLICY "Writers can update their assigned orders"
  ON public.orders FOR UPDATE
  USING (assigned_writer_id = auth.uid());

-- 4. CREATE STORAGE BUCKET FOR DOCUMENTS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- 5. STORAGE POLICIES

-- Admins can do anything with documents
CREATE POLICY "Admins full storage access"
  ON storage.objects FOR ALL
  USING (bucket_id = 'client-documents' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Writers can read documents (to download client requirements)
CREATE POLICY "Writers can read client documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'client-documents' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'writer'));

-- Writers can upload documents (to submit finished work)
CREATE POLICY "Writers can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'client-documents' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'writer'));
