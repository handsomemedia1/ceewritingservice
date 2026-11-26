'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/lib/newsletter';
import { trackEvent } from '@/lib/analytics';

/** Compact signup form with the notice required at the point of collection (NDPA s.27). */
export default function NewsletterForm({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('saving');
    if (await subscribeToNewsletter(email, source)) {
      trackEvent('newsletter_signup', { location: source });
      setEmail('');
      setState('done');
    } else {
      setState('error');
    }
  };

  if (state === 'done') {
    return <p className="font-inter text-sm text-gold">Thanks, you are subscribed. You can ask us to remove you at any time.</p>;
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor={`newsletter-${source}`} className="sr-only">Email address</label>
      <input
        id={`newsletter-${source}`}
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        className="mb-3 w-full border-0 border-b border-gold/30 bg-transparent pb-3 font-inter text-sm text-text-primary outline-none focus:border-gold"
      />
      <button type="submit" disabled={state === 'saving'} className="w-full bg-text-primary py-3 font-space text-[11px] font-bold uppercase tracking-[0.15em] text-bg-main disabled:opacity-60">
        {state === 'saving' ? 'Subscribing…' : 'Subscribe free'}
      </button>
      {state === 'error' && <p role="alert" className="mt-2 font-inter text-xs text-red-400">We could not save your email. Please try again.</p>}
      <p className="mt-3 font-inter text-xs leading-relaxed text-text-muted">
        We use your email only to send these updates. Unsubscribe any time. <Link href="/privacy" className="text-gold underline">Privacy Policy</Link>
      </p>
    </form>
  );
}
