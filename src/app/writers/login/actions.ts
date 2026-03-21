'use server'

import { createClient } from '@/utils/supabase/server'

export async function loginWriter(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error || !authData.user) {
    return { error: 'Invalid email or password' }
  }

  // Verify role before allowing
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (profile?.role !== 'writer' && profile?.role !== 'admin' && profile?.role !== 'pending' && profile?.role !== 'revoked') {
    await supabase.auth.signOut()
    return { error: 'Unauthorized: Writer portal access denied' }
  }

  return { error: null }
}

export async function signupWriter(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
