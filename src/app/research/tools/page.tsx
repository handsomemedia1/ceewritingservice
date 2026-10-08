import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { researchTools } from '@/features/research/data/tools';
import { glossaryData } from '@/features/research/data/glossary';

export const metadata = {
  title: 'Research Tools for Students & Researchers | Cee Writing',
  description: 'Interactive tools for planning, analyzing, and completing academic research. Use our Statistical Test Selector, GPA Calculator, and more.',
  alternates: { canonical: 'https://ceewriting.com/research/tools' },
};

export default function ResearchToolsPage({ searchParams }: { searchParams: { category?: string } }) {
  const categoryFilter = searchParams.category || '';
  const availableTools = researchTools.filter((tool) => tool.status === 'available');
  const plannedTools = researchTools.filter((tool) => tool.status === 'planned');
  const categories = Array.from(new Set(availableTools.map((tool) => tool.category))).sort();
  const filteredTools = availableTools.filter((tool) => !categoryFilter || tool.category === categoryFilter);

  return (
    <main className="min-h-screen bg-bg-main text-text-primary flex flex-col">
      <Navbar />

      <section className="relative isolate overflow-hidden border-b border-[var(--border)] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.13), transparent 62%)' }} />
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">Research tools hub</span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">Practical tools for better research</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">Plan your study, choose an appropriate statistical test, and estimate key academic metrics with focused tools built for students and researchers.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted">
            <span className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1.5">Research planning</span>
            <span className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1.5">Statistics & data analysis</span>
            <span className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1.5">Academic utilities</span>
          </div>
        </div>
      </section>

      <section className="w-full flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[var(--border)] bg-bg-card p-5 sm:p-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-text-primary">Browse tools</h2>
              <nav aria-label="Tool categories" className="mt-4 flex flex-wrap gap-2 lg:flex-col">
                <Link href="/research/tools" aria-current={!categoryFilter ? 'page' : undefined} className={`rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${!categoryFilter ? 'border-gold/40 bg-gold/10 text-gold' : 'border-transparent text-muted hover:border-[var(--border)] hover:bg-white/[0.03] hover:text-text-primary'}`}>All tools</Link>
                {categories.map((category) => (
                  <Link key={category} href={`/research/tools?category=${encodeURIComponent(category)}`} aria-current={categoryFilter === category ? 'page' : undefined} className={`rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${categoryFilter === category ? 'border-gold/40 bg-gold/10 text-gold' : 'border-transparent text-muted hover:border-[var(--border)] hover:bg-white/[0.03] hover:text-text-primary'}`}>
                    {category}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-gold/[0.09] to-transparent p-5 sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Need expert support?</div>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">Turn your results into a clear research plan.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Get hands-on help with data analysis, methodology, and interpreting your findings.</p>
              <Link href="/services/data-analysis" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold px-4 py-3 text-sm font-bold text-[#0A0A0A] transition hover:bg-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Explore data services <span aria-hidden="true" className="ml-2">↗</span></Link>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Tools you can use now</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Available tools</h2>
              </div>
              <p className="text-sm text-muted">{filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredTools.map((tool) => (
                <article key={tool.slug} className="group flex min-w-0 flex-col rounded-2xl border border-[var(--border)] bg-bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-[#181715] sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-md bg-gold/[0.09] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{tool.category}</span>
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-lg text-gold transition group-hover:bg-gold group-hover:text-[#0A0A0A]">↗</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-snug text-text-primary sm:text-2xl">{tool.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{tool.description}</p>
                  {tool.relatedTerms && tool.relatedTerms.length > 0 && (
                    <div className="mt-5 border-t border-[var(--border)] pt-4">
                      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Related concepts</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.relatedTerms.slice(0, 4).map((termSlug) => {
                          const glossaryItem = glossaryData.find((item) => item.slug === termSlug);
                          if (!glossaryItem) return null;
                          return <Link key={termSlug} href={`/research/glossary/${termSlug}`} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-muted transition hover:border-gold/40 hover:text-gold">{glossaryItem.term}</Link>;
                        })}
                      </div>
                    </div>
                  )}
                  <Link href={tool.href} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-[#0A0A0A] transition hover:bg-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Open {tool.name} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
              {filteredTools.length === 0 && <div className="col-span-full rounded-2xl border border-[var(--border)] bg-bg-card p-10 text-center"><h3 className="font-display text-xl font-bold text-text-primary">No tools in this category yet</h3><p className="mt-2 text-sm text-muted">Choose another category to see available tools.</p><Link href="/research/tools" className="mt-5 inline-flex rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-gold hover:bg-white/[0.03]">View all tools</Link></div>}
            </div>

            {!categoryFilter && plannedTools.length > 0 && (
              <section className="mt-12 border-t border-[var(--border)] pt-9">
                <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">What we’re working on</p><h2 className="mt-2 font-display text-xl font-bold text-text-primary sm:text-2xl">Planned tools</h2></div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {plannedTools.map((tool) => <article key={tool.slug} className="rounded-2xl border border-dashed border-[var(--border)] bg-white/[0.015] p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted">{tool.category}</span><span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">Planned</span></div><h3 className="mt-3 font-display text-lg font-semibold text-text-primary">{tool.name}</h3><p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p></article>)}
                </div>
              </section>
            )}

            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/[0.08] to-transparent p-5 sm:flex-row sm:items-center sm:p-6">
              <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-gold">Build your research confidence</p><h3 className="mt-2 font-display text-lg font-bold text-text-primary">Unsure about a research or statistics term?</h3><p className="mt-1 max-w-xl text-sm leading-6 text-muted">Browse the glossary for clear explanations, examples, and links to related tools.</p></div>
              <Link href="/research/glossary" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-gold/35 px-4 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10">Explore glossary <span aria-hidden="true" className="ml-2">→</span></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
