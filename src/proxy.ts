import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// Next.js 16 runs this before matching routes ("proxy" replaced the "middleware" convention).
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Only signed-in areas need the session refresh and role checks. Public pages are served
  // from cache without touching Supabase, which keeps them fast for every visitor.
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/writers/:path*',
    '/login',
    '/auth/:path*',
    '/api/seo',
  ],
}
