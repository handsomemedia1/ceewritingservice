'use server'

import { createClient } from '@/utils/supabase/server'

export async function loginAdmin(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error || !authData.user) {
    return { error: 'Invalid email or password' }
  }

  // Verify role before allowing redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (profile?.role !== 'admin') {
    // Sign out unauthorized user
    await supabase.auth.signOut()
    return { error: 'Unauthorized: Admin access required' }
  }

  return { error: null }
}
