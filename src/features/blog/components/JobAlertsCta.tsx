import Link from 'next/link';
import { IconTile } from '@/components/icons/Icon';
import { TELEGRAM_CHANNEL_URL } from '@/config/site';

/** Shown on career and scholarship articles, where readers are most likely to want alerts. */
export default function JobAlertsCta({ topic }: { topic: string }) {
  const isScholarship = topic === 'Scholarships';

  return (
    <aside className="my-12 flex flex-col gap-5 rounded-2xl border border-gold/25 bg-gold/5 p-6 sm:flex-row sm:items-center sm:p-8" aria-label="Job and scholarship alerts">
      <IconTile name={isScholarship ? 'cap' : 'briefcase'} size={52} />
      <div className="flex-1">
        <p className="font-space text-lg font-bold text-text-primary">
          {isScholarship ? 'Get new scholarships as they open' : 'Get new job openings as they are posted'}
        </p>
        <p className="mt-1 text-text-muted">
          Free alerts for Nigerian, NYSC and remote jobs plus funded scholarships on our Telegram channel.{' '}
          <Link href="/job-alerts" className="text-gold underline">How it works</Link>
        </p>
      </div>
      <a
        href={TELEGRAM_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gold px-6 py-3 font-space text-sm font-bold uppercase tracking-wider text-bg-main transition hover:bg-gold-hover"
      >
        Join free
      </a>
    </aside>
  );
}
