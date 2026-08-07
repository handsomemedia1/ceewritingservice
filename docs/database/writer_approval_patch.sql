-- 1. Add 'pending' and 'revoked' to the role constraint if not present.
-- Postgres CHECK constraints can be tricky to update, so we need to drop the old one and add a new one.
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'writer', 'pending', 'revoked'));

-- 2. Update the handle_new_user trigger function to default to 'pending'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, can_publish_directly)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'pending', false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Add RLS Policy for Admins to update profiles (if not already existing)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Admins can update all profiles.'
    ) THEN
        CREATE POLICY "Admins can update all profiles."
          ON profiles FOR UPDATE
          USING (EXISTS (SELECT 1 FROM profiles AS p WHERE p.id = auth.uid() AND p.role = 'admin'));
    END IF;
END
$$;
