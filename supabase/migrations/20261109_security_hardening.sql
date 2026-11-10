-- Security hardening. Run once in the Supabase SQL Editor, AFTER deploying the
-- matching application code and setting SUPABASE_SERVICE_ROLE_KEY in Vercel.
-- The whole script runs in one transaction, so a failure changes nothing.

BEGIN;

-- ---------------------------------------------------------------------------
-- Role helpers. SECURITY DEFINER so policies can read profiles without recursion.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

CREATE OR REPLACE FUNCTION public.is_active_staff()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'));
$$;

CREATE OR REPLACE FUNCTION public.can_publish_posts()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR (role = 'writer' AND can_publish_directly))
  );
$$;

-- Existing SECURITY DEFINER functions must not resolve names through the caller's search_path.
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;
DO $$
BEGIN
  IF to_regprocedure('public.increment_resource_download(uuid)') IS NOT NULL THEN
    ALTER FUNCTION public.increment_resource_download(uuid) SET search_path = public, pg_temp;
  END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- profiles: nobody but an admin may change a role or publishing rights.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.guard_profile_privileges()
RETURNS trigger LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
BEGIN
  -- auth.uid() is NULL for the SQL Editor and the service role.
  IF auth.uid() IS NOT NULL
     AND NOT public.is_admin()
     AND (NEW.role IS DISTINCT FROM OLD.role
          OR NEW.can_publish_directly IS DISTINCT FROM OLD.can_publish_directly) THEN
    RAISE EXCEPTION 'Only an admin can change role or publishing rights'
      USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_profile_privileges ON public.profiles;
CREATE TRIGGER guard_profile_privileges
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.guard_profile_privileges();

-- Profiles are created by the signup trigger; clients must never choose their own role.
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

-- ---------------------------------------------------------------------------
-- blog_posts: approved staff only, and only permitted writers may publish.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Writers can view their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Writers can insert their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Writers can update their own posts" ON public.blog_posts;

CREATE POLICY "Writers can view their own posts"
  ON public.blog_posts FOR SELECT
  USING (auth.uid() = author_id AND public.is_active_staff());

CREATE POLICY "Writers can insert their own posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (
    auth.uid() = author_id
    AND public.is_active_staff()
    AND (status IN ('draft', 'pending_review') OR public.can_publish_posts())
  );

CREATE POLICY "Writers can update their own posts"
  ON public.blog_posts FOR UPDATE
  USING (auth.uid() = author_id AND public.is_active_staff())
  WITH CHECK (
    auth.uid() = author_id
    AND public.is_active_staff()
    AND (status IN ('draft', 'pending_review') OR public.can_publish_posts())
  );

-- ---------------------------------------------------------------------------
-- orders: active writers only, limited to the fields their workflow changes.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Writers can view their assigned orders" ON public.orders;
DROP POLICY IF EXISTS "Writers can update their assigned orders" ON public.orders;

CREATE POLICY "Writers can view their assigned orders"
  ON public.orders FOR SELECT
  USING (assigned_writer_id = auth.uid() AND public.is_active_staff());

CREATE POLICY "Writers can update their assigned orders"
  ON public.orders FOR UPDATE
  USING (assigned_writer_id = auth.uid() AND public.is_active_staff())
  WITH CHECK (assigned_writer_id = auth.uid() AND public.is_active_staff());

CREATE OR REPLACE FUNCTION public.guard_order_writer_update()
RETURNS trigger LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE
  writer_fields constant text[] := ARRAY['status', 'writer_notes', 'submission_file', 'updated_at'];
BEGIN
  IF auth.uid() IS NOT NULL
     AND NOT public.is_admin()
     AND (to_jsonb(NEW) - writer_fields) IS DISTINCT FROM (to_jsonb(OLD) - writer_fields) THEN
    RAISE EXCEPTION 'Writers can only update status, notes and the submission file'
      USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_order_writer_update ON public.orders;
CREATE TRIGGER guard_order_writer_update
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.guard_order_writer_update();

-- ---------------------------------------------------------------------------
-- client-documents: private, and scoped to the writer's assigned orders.
-- ---------------------------------------------------------------------------
UPDATE storage.buckets SET public = false WHERE id = 'client-documents';

DROP POLICY IF EXISTS "Writers can access documents" ON storage.objects;
DROP POLICY IF EXISTS "Writers can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Assigned writers can read order documents" ON storage.objects;
DROP POLICY IF EXISTS "Assigned writers can upload submissions" ON storage.objects;

-- client_files / submission_file may hold a bare path or a legacy full URL, so
-- match the object name anywhere inside the stored value.
CREATE POLICY "Assigned writers can read order documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'client-documents'
    AND public.is_active_staff()
    AND EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.assigned_writer_id = auth.uid()
        AND (
          position(objects.name IN COALESCE(to_jsonb(o) ->> 'client_files', '')) > 0
          OR position(objects.name IN COALESCE(to_jsonb(o) ->> 'submission_file', '')) > 0
          OR starts_with(objects.name, o.id::text || '_submission_')
        )
    )
  );

CREATE POLICY "Assigned writers can upload submissions"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'client-documents'
    AND public.is_active_staff()
    AND EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.assigned_writer_id = auth.uid()
        AND starts_with(objects.name, o.id::text || '_submission_')
    )
  );

-- ---------------------------------------------------------------------------
-- blog-images: staff uploads only, raster images only (SVG can carry script).
-- ---------------------------------------------------------------------------
UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'blog-images';

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "Staff can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can replace blog images" ON storage.objects;

CREATE POLICY "Staff can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND public.is_active_staff());

CREATE POLICY "Admins can replace blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'blog-images' AND public.is_admin());

-- ---------------------------------------------------------------------------
-- Tables written only by trusted server code using the service role.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Bot can read posted items" ON public.bot_posted_items;
DROP POLICY IF EXISTS "Bot can insert posted items" ON public.bot_posted_items;

-- These two tables have no definition in this repository, so remove whatever
-- policies exist on them and leave admin read access only.
DO $$
DECLARE
  target text;
  existing record;
BEGIN
  FOREACH target IN ARRAY ARRAY['scholarship_leads', 'assessment_sessions'] LOOP
    IF to_regclass('public.' || target) IS NULL THEN
      RAISE NOTICE 'Skipping missing table %', target;
      CONTINUE;
    END IF;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', target);

    FOR existing IN
      SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = target
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', existing.policyname, target);
    END LOOP;

    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR SELECT USING (public.is_admin())',
      'Admins can read ' || target, target
    );
  END LOOP;
END;
$$;

COMMIT;
