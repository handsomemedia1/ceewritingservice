import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cookie-less client for public, read-only content. Reading cookies would force every
 * page to render per request, so public pages use this client and can be cached.
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
