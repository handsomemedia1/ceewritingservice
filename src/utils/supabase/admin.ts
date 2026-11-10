import 'server-only';

import { createClient } from '@supabase/supabase-js';

/**
 * Service-role client for trusted server code. It bypasses row level security,
 * so callers must validate their input. Returns null when the key is not set,
 * so routes can fail closed instead of falling back to the public key.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
