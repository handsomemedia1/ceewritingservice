import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SUGGESTIONS = [
  { label: 'Knowledge Hub', href: '/blog' },
  { label: 'Research Glossary', href: '/research/glossary' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Services', href: '/services' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />
      <section className="flex-1 mx-auto w-full max-w-2xl px-5 pt-40 pb-24 text-center">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">404</p>
        <h1 className="mt-4 font-space text-4xl font-bold text-text-primary sm:text-5xl">We could not find that page</h1>
        <p className="mt-5 text-lg font-light leading-relaxed text-text-muted">
          It may have moved or been removed. These are good places to continue:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SUGGESTIONS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-gold/30 px-5 py-3 font-space text-sm font-bold text-gold transition hover:bg-gold hover:text-bg-main">
              {item.label}
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
