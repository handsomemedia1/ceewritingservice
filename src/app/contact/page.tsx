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
  { label: 'Telegram', detail: '@ceewritingservice', note: 'Free job and scholarship alerts. See how it works on the Job Alerts page.', href: TELEGRAM_CHANNEL_URL },
];

const NEXT_STEPS = [
  'Tell us what you need and your deadline.',
  'Share your brief, marking guide or any existing draft.',
  'We confirm the scope and price before any work starts.',
];

const BRIEF_CHECKLIST = [
  'The type of work: research project, data analysis, CV, SOP, scholarship essay, proposal or editing.',
  'Your level and field, for example BSc Economics or MSc Public Health.',
  'Your deadline, and any word count or page limit.',
  'Your institution\'s guidelines, marking scheme or the scholarship\'s essay prompts.',
  'Anything you have already written, plus your data files for analysis work.',
];

const HELP_AREAS = [
  { label: 'Research projects and theses', href: '/services/bsc-project-writing-undergraduate', note: 'Undergraduate projects, Masters dissertations and PhD theses.' },
  { label: 'Data analysis', href: '/services/data-analysis', note: 'SPSS, R and Python analysis with results written up.' },
  { label: 'CVs and cover letters', href: '/services/cv-resume-writing', note: 'For jobs in Nigeria and abroad.' },
  { label: 'SOPs and scholarship essays', href: '/services/statement-of-purpose', note: 'Masters, PhD and scholarship applications.' },
  { label: 'Plagiarism and AI checks', href: '/services/plagiarism-ai-detection', note: 'Turnitin similarity and AI-detection reports.' },
  { label: 'Free tools', href: '/tools', note: 'GPA converter, statistical test selector and scholarship readiness check.' },
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

        <h2 className="mt-16 font-space text-2xl font-bold text-text-primary">What to include in your first message</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
          A complete brief lets us quote accurately and start sooner. Where you can, send:
        </p>
        <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 leading-relaxed text-text-muted marker:text-gold">
          {BRIEF_CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-16 font-space text-2xl font-bold text-text-primary">What we can help with</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_AREAS.map((area) => (
            <Link key={area.href} href={area.href} className="group rounded-xl border border-gold/15 p-5 transition hover:border-gold">
              <h3 className="font-space text-base font-bold text-text-primary group-hover:text-gold">{area.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{area.note}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 font-space text-2xl font-bold text-text-primary">Your information</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
          We use what you send only to quote for and deliver your work. See our{' '}
          <Link href="/privacy" className="text-gold underline">Privacy Policy</Link> for how long we keep it and how to ask
          for a copy or deletion through the <Link href="/data-requests" className="text-gold underline">data request page</Link>.
        </p>

        <p className="mt-12 text-text-muted">
          Have a general question? See the <Link href="/faq" className="text-gold underline">FAQ</Link> or browse our{' '}
          <Link href="/services" className="text-gold underline">services</Link>.
        </p>
      </section>

      <Footer />
    </main>
  );
}
