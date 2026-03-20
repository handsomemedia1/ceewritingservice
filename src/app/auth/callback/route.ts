import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  const supabase = createClient()

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Get user session to determine role
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Fetch user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role

  if (role === 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } else if (role === 'writer') {
    return NextResponse.redirect(new URL('/writers', request.url))
  }

  // Fallback if no specific role or unknown
  return NextResponse.redirect(new URL('/', request.url))
}
