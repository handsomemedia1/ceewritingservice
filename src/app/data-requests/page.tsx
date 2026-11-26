import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import { NDPC_URL, PRIVACY_CONTACT_EMAIL, RIGHTS } from '@/config/privacy';

export const metadata: Metadata = {
  title: 'Your Data Rights | Cee Writing',
  description: 'How to access, correct, delete or export your personal data held by Cee Writing, withdraw consent, or complain to the NDPC.',
  alternates: { canonical: 'https://ceewriting.com/data-requests' },
};

const REQUEST_TYPES = ['Access', 'Correction', 'Deletion', 'Restriction', 'Data portability', 'Objection', 'Withdraw consent', 'Unsubscribe'];

function mailtoFor(type: string) {
  const body = [
    `Request type: ${type}`,
    'Full name:',
    'Email or phone number you used with us:',
    'What your request is about (for example an order, the scholarship check or the newsletter):',
    'Details:',
  ].join('\n');
  return `mailto:${PRIVACY_CONTACT_EMAIL}?subject=${encodeURIComponent(`Data request: ${type}`)}&body=${encodeURIComponent(body)}`;
}

export default function DataRequestsPage() {
  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />

      <article className="mx-auto w-full max-w-4xl flex-1 px-5 pt-36 pb-20 sm:px-8 lg:pt-44">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">Privacy</p>
        <h1 className="mt-4 font-space text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">Your data rights</h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
          You can ask us at any time what personal data we hold about you, have it corrected or deleted, take a copy, or
          withdraw your consent. Requests are free, and we reply within 30 days.
        </p>

        <section className="mt-12" aria-labelledby="start-heading">
          <h2 id="start-heading" className="font-space text-2xl font-bold text-text-primary">Make a request</h2>
          <p className="mt-2 text-text-muted">Choose a request type. It opens an email to us with the details we need already laid out.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REQUEST_TYPES.map((type) => (
              <a key={type} href={mailtoFor(type)} className="flex min-h-12 items-center justify-center rounded-xl border border-gold/30 bg-bg-card px-4 text-center font-space text-sm font-bold text-text-primary transition hover:border-gold hover:text-gold">
                {type}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">
            Prefer to write your own? Email <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className="text-gold underline">{PRIVACY_CONTACT_EMAIL}</a>.
            To change your cookie choices instead, open <CookieSettingsButton className="text-gold underline" />.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="process-heading">
          <h2 id="process-heading" className="font-space text-2xl font-bold text-text-primary">What happens next</h2>
          <ol className="mt-6 space-y-4">
            {[
              'We confirm we have received your request.',
              'We may ask you to verify your identity, so we never give your data to someone else. We only ask for what is needed.',
              'We complete your request within 30 days and tell you what we did. If we cannot do something, we explain why.',
            ].map((step, index) => (
              <li key={step} className="flex gap-4 rounded-xl border border-white/[0.06] bg-bg-card p-5">
                <span className="font-space text-lg font-bold text-gold">{index + 1}</span>
                <span className="leading-relaxed text-text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <h2 id="rights-heading" className="font-space text-2xl font-bold text-text-primary">Your rights under the NDPA</h2>
          <ul className="mt-6 space-y-3 leading-relaxed text-text-muted">
            {RIGHTS.map((r) => (<li key={r.right}><strong className="text-text-primary">{r.right}.</strong> {r.detail}</li>))}
          </ul>
          <p className="mt-6 leading-relaxed text-text-muted">
            If you are not satisfied with our response, you can complain to the{' '}
            <a href={NDPC_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline">Nigeria Data Protection Commission</a>.
            Read the full <Link href="/privacy" className="text-gold underline">Privacy Policy</Link>.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  );
}
