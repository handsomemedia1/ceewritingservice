import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/** Cookie-aware client for signed-in areas. Public pages use '@/utils/supabase/public' instead. */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Server Components cannot set cookies; the proxy refreshes sessions instead.
          }
        },
      },
    }
  )
}
