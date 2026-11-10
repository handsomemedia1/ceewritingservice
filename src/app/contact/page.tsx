import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_EMAIL, TELEGRAM_CHANNEL_URL, WHATSAPP_URL } from '@/config/site';
import { serializeJsonLd } from '@/lib/jsonLd';

export const metadata: Metadata = {
  title: 'Contact Cee Writing | WhatsApp, Email and Telegram',
  description: 'Contact Cee Writing about research support, data analysis, CVs, statements of purpose and scholarship applications by WhatsApp, email or Telegram.',
  alternates: { canonical: 'https://ceewriting.com/contact' },
};

const CHANNELS = [
  { label: 'WhatsApp', detail: '+234 905 675 2549', note: 'The fastest way to discuss a project or place an order.', href: WHATSAPP_URL },
  { label: 'Email', detail: SITE_EMAIL, note: 'Best for detailed briefs and attached documents.', href: `mailto:${SITE_EMAIL}` },
  { label: 'Telegram', detail: '@ceewritingservice', note: 'Scholarship alerts, job openings and writing tips.', href: TELEGRAM_CHANNEL_URL },
];

const NEXT_STEPS = [
  'Tell us what you need and your deadline.',
  'Share your brief, marking guide or any existing draft.',
  'We confirm the scope and price before any work starts.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://ceewriting.com/contact',
  name: 'Contact Cee Writing',
  about: { '@id': 'https://ceewriting.com/#organization' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Navbar />

      <section className="flex-1 mx-auto w-full max-w-5xl px-5 pt-36 pb-20 sm:px-8 lg:pt-44">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</p>
        <h1 className="mt-4 font-space text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Talk to the Cee Writing team
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
          Tell us about your research, application or document. WhatsApp is the quickest way to reach us.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gold/20 bg-bg-card p-6 transition hover:border-gold"
            >
              <h2 className="font-space text-xl font-bold text-text-primary group-hover:text-gold">{channel.label}</h2>
              <p className="mt-2 break-words font-medium text-gold">{channel.detail}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{channel.note}</p>
            </a>
          ))}
        </div>

        <h2 className="mt-16 font-space text-2xl font-bold text-text-primary">What happens next</h2>
        <ol className="mt-6 space-y-4">
          {NEXT_STEPS.map((step, index) => (
            <li key={step} className="flex gap-4 text-text-muted">
              <span className="font-space font-bold text-gold">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-text-muted">
          Have a general question? See the <Link href="/faq" className="text-gold underline">FAQ</Link> or browse our{' '}
          <Link href="/services" className="text-gold underline">services</Link>.
        </p>
      </section>

      <Footer />
    </main>
  );
}
