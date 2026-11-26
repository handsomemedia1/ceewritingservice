import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Icon, { IconTile, type IconName } from '@/components/icons/Icon';
import { TELEGRAM_CHANNEL_URL } from '@/config/site';
import { tagsForTopic } from '@/config/articleTopics';
import { serializeJsonLd } from '@/lib/jsonLd';
import { createClient } from '@/utils/supabase/public';

export const revalidate = 1800;

const PAGE_URL = 'https://ceewriting.com/job-alerts';
const PREVIEW_URL = 'https://t.me/s/ceewritingservice';

export const metadata: Metadata = {
  title: 'Free Job and Scholarship Alerts on Telegram | Cee Writing',
  description: 'Join the free Cee Writing Telegram channel for Nigerian, NYSC and remote job alerts plus scholarship opportunities, each with a link to apply at the source.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free job and scholarship alerts on Telegram',
    description: 'Nigerian, NYSC and remote job alerts plus scholarship opportunities, free on Telegram.',
    url: PAGE_URL,
    type: 'website',
  },
};

const WHAT_WE_POST: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'briefcase', title: 'Job alerts', text: 'Nigerian openings, NYSC and graduate trainee roles, and remote jobs you can do from anywhere. Each post summarises the role, location and requirements.' },
  { icon: 'cap', title: 'Scholarship alerts', text: 'Funded scholarships and fellowships open to Nigerian and African applicants, with the deadline and who can apply.' },
  { icon: 'insight', title: 'Career and application tips', text: 'Short, practical advice on CVs, cover letters and statements of purpose, so you are ready when the right opening appears.' },
];

const STEPS = [
  'Open the channel on Telegram using the button on this page.',
  'Tap Join. It is free, and you can mute or leave at any time.',
  'Open any post and use its link to apply directly on the original listing.',
];

const FAQS = [
  { question: 'Is the job alert channel free to join?', answer: 'Yes. Joining the Cee Writing Telegram channel is free. We never charge for job or scholarship alerts.' },
  { question: 'What kind of jobs are posted?', answer: 'Nigerian job openings, NYSC and graduate trainee roles, and remote jobs. Each alert summarises the role and links to the original listing so you apply at the source.' },
  { question: 'Do you post scholarships too?', answer: 'Yes. The channel shares funded scholarships and fellowships open to Nigerian and African applicants, including deadlines and eligibility.' },
  { question: 'Do I need the Telegram app?', answer: 'Joining needs Telegram, but you can preview recent posts in any web browser before you join.' },
  { question: 'Will anyone ask me to pay to get a job?', answer: 'No. Genuine employers do not charge application fees. We only link to original listings, and you should never pay anyone who promises a job in return.' },
];

async function getRelatedGuides() {
  const tags = [...tagsForTopic('Career'), ...tagsForTopic('Scholarships')];
  const { data } = await createClient()
    .from('blog_posts')
    .select('title, slug')
    .eq('status', 'published')
    .overlaps('tags', tags)
    .order('published_at', { ascending: false })
    .limit(6);
  return data ?? [];
}

export default async function JobAlertsPage() {
  const guides = await getRelatedGuides();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Free job and scholarship alerts on Telegram',
      description: metadata.description,
      about: { '@id': 'https://ceewriting.com/#organization' },
      significantLink: [TELEGRAM_CHANNEL_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ceewriting.com' },
        { '@type': 'ListItem', position: 2, name: 'Job and Scholarship Alerts', item: PAGE_URL },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Navbar />

      <section className="mx-auto w-full max-w-5xl px-5 pt-36 pb-16 sm:px-8 lg:pt-44">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">Free on Telegram</p>
        <h1 className="mt-4 max-w-3xl font-space text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Job and scholarship alerts, <span className="text-gold">straight to your phone</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
          Join the free Cee Writing channel on Telegram for Nigerian, NYSC and remote job openings and funded scholarships
          for African applicants. Every alert links to the original listing, so you always apply at the source.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gold px-8 py-4 font-space text-sm font-bold uppercase tracking-wider text-bg-main transition hover:bg-gold-hover"
          >
            Join the channel <Icon name="arrowRight" size={18} style={{ ['--icon-accent' as string]: '#0A0A0A' }} />
          </a>
          <a
            href={PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-gold/30 px-8 py-4 font-space text-sm font-bold uppercase tracking-wider text-gold transition hover:border-gold"
          >
            Preview recent posts
          </a>
        </div>
        <p className="mt-4 text-sm text-text-muted">Free to join. Mute or leave whenever you like.</p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8" aria-labelledby="what-heading">
        <h2 id="what-heading" className="font-space text-2xl font-bold text-text-primary sm:text-3xl">What gets posted</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {WHAT_WE_POST.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gold/15 bg-bg-card p-6">
              <IconTile name={item.icon} size={48} />
              <h3 className="mt-5 font-space text-lg font-bold text-text-primary">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8" aria-labelledby="join-heading">
        <h2 id="join-heading" className="font-space text-2xl font-bold text-text-primary sm:text-3xl">How to join</h2>
        <ol className="mt-6 space-y-4">
          {STEPS.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-xl border border-white/[0.06] bg-bg-card p-5">
              <span className="font-space text-lg font-bold text-gold">{index + 1}</span>
              <span className="leading-relaxed text-text-muted">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 p-5">
          <Icon name="shield" size={22} className="mt-0.5 text-text-primary" />
          <p className="leading-relaxed text-text-muted">
            <strong className="text-text-primary">Stay safe:</strong> genuine employers never charge application fees.
            Apply only through the original listing, and never pay anyone who promises you a job.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-space text-2xl font-bold text-text-primary sm:text-3xl">Common questions</h2>
        <div className="mt-6 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.question} className="border-t border-white/[0.08] pt-5">
              <h3 className="font-space text-lg font-bold text-text-primary">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="font-space text-2xl font-bold text-text-primary sm:text-3xl">Get ready to apply</h2>
          <p className="mt-2 text-text-muted">Free guides to help you stand out when the right opening appears.</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/blog/${guide.slug}`} className="flex h-full items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-bg-card p-5 text-text-primary transition hover:border-gold/40">
                  <span className="font-medium leading-snug">{guide.title}</span>
                  <Icon name="arrowRight" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto mb-20 w-full max-w-5xl px-5 sm:px-8">
        <div className="rounded-2xl border border-gold/25 bg-bg-card p-8 text-center sm:p-12">
          <h2 className="font-space text-2xl font-bold text-text-primary sm:text-3xl">Never miss an opening</h2>
          <p className="mx-auto mt-3 max-w-xl text-text-muted">New jobs and scholarships are posted to the channel as they are found.</p>
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-gold px-8 py-4 font-space text-sm font-bold uppercase tracking-wider text-bg-main transition hover:bg-gold-hover"
          >
            Join free on Telegram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
