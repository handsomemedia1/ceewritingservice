import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/admin')
  const isWriterRoute = request.nextUrl.pathname.startsWith('/writers')
  const isAdminLogin = request.nextUrl.pathname.startsWith('/admin/login')
  const isWriterLogin = request.nextUrl.pathname.startsWith('/writers/login')

  // If there's NO user
  if (!user) {
    if (isAdminRoute && !isAdminLogin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (isWriterRoute && !isWriterLogin) {
      return NextResponse.redirect(new URL('/writers/login', request.url))
    }
    return supabaseResponse
  }

  // If there IS a user, check their role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  const role = profile?.role

  // Prevent logged-in users from seeing login pages
  if (user && isAdminLogin) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/dashboard' : '/writers', request.url))
  }
  if (user && isWriterLogin) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/dashboard' : '/writers', request.url))
  }

  // Enforce access control
  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL(role === 'writer' ? '/writers' : '/', request.url))
  }
  
  const isPendingRoute = request.nextUrl.pathname.startsWith('/writers/pending')
  const isRevokedRoute = request.nextUrl.pathname.startsWith('/writers/revoked')

  if (isWriterRoute && !isWriterLogin && !isPendingRoute && !isRevokedRoute) {
    if (role === 'pending') {
      return NextResponse.redirect(new URL('/writers/pending', request.url))
    }
    if (role === 'revoked') {
      return NextResponse.redirect(new URL('/writers/revoked', request.url))
    }
    if (role !== 'writer' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Prevent users from accessing pending/revoked pages if they shouldn't be there
  if (isPendingRoute && role !== 'pending') {
    return NextResponse.redirect(new URL(role === 'writer' || role === 'admin' ? '/writers' : '/', request.url))
  }
  if (isRevokedRoute && role !== 'revoked') {
    return NextResponse.redirect(new URL(role === 'writer' || role === 'admin' ? '/writers' : '/', request.url))
  }

  return supabaseResponse
}
