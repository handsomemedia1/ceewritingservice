-- This script forcibly confirms the email address for all existing users 
-- who are stuck in the "Waiting for verification" state.
-- It sets their email_confirmed_at to the current timestamp.
-- 
-- Note for the Future: If you want writers to be able to log in instantly
-- upon signup, you should go to your Supabase Dashboard -> Authentication ->
-- Providers -> Email -> and toggle "Confirm email" to OFF.

UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;
