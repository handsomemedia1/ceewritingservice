import { createClient } from '@/utils/supabase/client';

/** Saves a newsletter signup. Returns false when the address could not be stored. */
export async function subscribeToNewsletter(email: string, source: string): Promise<boolean> {
  const address = email.trim().toLowerCase();
  if (!address) return false;

  const { error } = await createClient().from('leads').insert({ email: address, source: `newsletter_${source}` });

  // 23505 means this address already subscribed, which is a success for the visitor.
  return !error || error.code === '23505';
}
