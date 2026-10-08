"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

const TOOLS = [
  { id: 'gpa-calculator', title: 'GPA Converter & Calculator', description: 'Convert a Nigerian 5.0-scale GPA to a 4.0 scale or percentage estimate for international applications.', icon: '01', href: '/tools/gpa-calculator', category: 'Academic', tag: 'Popular' },
  { id: 'statistical-test-selector', title: 'Statistical Test Selector', description: 'Answer a few questions about your variables and study design to find a suitable statistical test.', icon: '02', href: '/tools/statistical-test-selector', category: 'Research', tag: 'Decision guide' },
  { id: 'scholarship-readiness', title: 'Scholarship Readiness Check', description: 'Review your academic profile against common scholarship application expectations and next steps.', icon: '03', href: '/scholarship-check', category: 'Applications', tag: 'Assessment' },
];

const UPCOMING = [
  { title: 'Sample Size Calculator', category: 'Research', description: 'Estimate a survey sample size using confidence level, margin of error, and population assumptions.' },
  { title: 'Research Design Selector', category: 'Research planning', description: 'Compare research designs against your question and study constraints.' },
  { title: 'Citation Generator', category: 'Writing utility', description: 'Format common academic references with less repetitive work.' },
  { title: 'Methodology Builder', category: 'Research planning', description: 'Organise the core elements of a methodology section.' },
];

const CATEGORIES = ['All tools', 'Research', 'Academic', 'Applications'];

export default function ToolsCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All tools');
  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All tools' || tool.category === category;
      const matchesQuery = !normalizedQuery || [tool.title, tool.description, tool.category, tool.tag].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="bg-bg-main px-5 pb-20 pt-8 text-text-primary sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-[var(--border)] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Your workspace</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">Choose a tool to get started</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">Focused utilities for academic planning, research decisions, and applications — all in one place.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted"><span className="inline-flex h-2 w-2 rounded-full bg-gold" aria-hidden="true" />{TOOLS.length} tools available</div>
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-[var(--border)] bg-bg-card p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <label className="relative block">
            <span className="sr-only">Search tools</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.2 4.2" /></svg>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search calculators, research tools, applications…" className="min-h-12 w-full rounded-xl border border-[var(--border)] bg-black/20 py-3 pl-12 pr-4 text-sm text-text-primary outline-none transition placeholder:text-muted/70 focus:border-gold/60 focus:ring-2 focus:ring-gold/10" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filter tools by category">
            {CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-10 rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${category === item ? 'border-gold/50 bg-gold/10 text-gold' : 'border-[var(--border)] text-muted hover:border-gold/30 hover:text-text-primary'}`}>{item}</button>)}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3"><h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted">{category === 'All tools' ? 'Available tools' : category}</h3><span className="text-xs text-muted">{filteredTools.length} result{filteredTools.length === 1 ? '' : 's'}</span></div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool) => <article key={tool.id} className="group flex min-h-[270px] flex-col rounded-2xl border border-[var(--border)] bg-bg-card p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/40 hover:bg-[#171613] sm:p-6">
              <div className="flex items-start justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.08] font-display text-sm font-bold text-gold">{tool.icon}</span><span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{tool.tag}</span></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">{tool.category}</p>
              <h4 className="mt-2 font-display text-lg font-bold leading-snug text-text-primary">{tool.title}</h4>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{tool.description}</p>
              <Link href={tool.href} className="mt-6 inline-flex min-h-11 items-center justify-between rounded-xl border border-gold/35 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Open tool <span aria-hidden="true" className="text-base transition-transform group-hover:translate-x-1">→</span></Link>
            </article>)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-12 text-center"><h4 className="font-display text-lg font-bold">No matching tools</h4><p className="mt-2 text-sm text-muted">Try another search term or choose a different category.</p><button type="button" onClick={() => { setQuery(''); setCategory('All tools'); }} className="mt-4 rounded-xl border border-gold/35 px-4 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">Clear filters</button></div>
        )}

        <section className="mt-12 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-gold/[0.08] via-bg-card to-bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">On the roadmap</p><h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">More tools are in development</h3><p className="mt-2 text-sm leading-6 text-muted">We’re expanding this workspace with practical research-planning and academic-writing utilities. These are planned features, not available tools yet.</p></div><Link href="/research" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-gold/35 px-4 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10">Explore research hub <span className="ml-2" aria-hidden="true">↗</span></Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{UPCOMING.map((tool) => <div key={tool.title} className="rounded-xl border border-dashed border-[var(--border)] bg-black/10 p-4"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold text-text-primary">{tool.title}</span><span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">Planned</span></div><p className="mt-2 text-xs leading-5 text-muted">{tool.description}</p></div>)}</div>
        </section>
      </div>
    </section>
  );
}
