"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

const TOOLS = [
  { id: 'gpa-calculator', title: 'GPA Converter & Calculator', description: 'Convert a Nigerian 5.0-scale GPA to a 4.0 scale or percentage estimate for international applications.', icon: '↗', href: '/tools/gpa-calculator', category: 'Academic', tag: 'Popular', detail: 'Academic planning' },
  { id: 'statistical-test-selector', title: 'Statistical Test Selector', description: 'Answer a few questions about your variables and study design to find a suitable statistical test.', icon: '⌁', href: '/tools/statistical-test-selector', category: 'Research', tag: 'Decision guide', detail: 'Research methods' },
  { id: 'scholarship-readiness', title: 'Scholarship Readiness Check', description: 'Review your academic profile against common scholarship application expectations and next steps.', icon: '✳', href: '/scholarship-check', category: 'Applications', tag: 'Assessment', detail: 'Global opportunities' },
];

const UPCOMING = [
  { title: 'Sample Size Calculator', description: 'Estimate a survey sample size using confidence level, margin of error, and population assumptions.', type: 'Research methods' },
  { title: 'Research Design Selector', description: 'Compare research designs against your question and study constraints.', type: 'Planning' },
  { title: 'Citation Generator', description: 'Format common academic references with less repetitive work.', type: 'Writing support' },
  { title: 'Methodology Builder', description: 'Organise the core elements of a methodology section.', type: 'Planning' },
];

const CATEGORIES = ['All tools', 'Research', 'Academic', 'Applications'];

export default function ToolsCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All tools');
  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All tools' || tool.category === category;
      const matchesQuery = !normalizedQuery || [tool.title, tool.description, tool.category, tool.tag, tool.detail].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="bg-[#f7f5ef] px-5 pb-16 pt-10 text-[#18251f] sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-[#deded5] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#557653]">Find your next step</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.04em] sm:text-4xl">Tools that move your work forward.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#657067] sm:text-base">Start with what you need today. Each tool is designed to help you answer a specific question and make a more informed decision.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d8dfd2] bg-white px-4 py-2.5 text-sm font-semibold text-[#38563d]"><span className="h-2 w-2 rounded-full bg-[#5b805e]" aria-hidden="true" /> {TOOLS.length} tools available</span>
        </div>

        <div className="mt-7 rounded-2xl border border-[#e3e1d8] bg-white p-4 shadow-[0_8px_30px_rgba(36,52,40,.045)] sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search tools</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#879087]" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.2 4.2" /></svg>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools by name or purpose…" className="min-h-12 w-full rounded-xl border border-[#e2e4dc] bg-[#fafaf7] py-3 pl-12 pr-4 text-sm text-[#24352a] outline-none transition placeholder:text-[#90978f] focus:border-[#719071] focus:bg-white focus:ring-4 focus:ring-[#719071]/10" />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Filter tools by category">
              {CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${category === item ? 'border-[#244633] bg-[#244633] text-white shadow-sm' : 'border-[#e0e3db] bg-white text-[#626d64] hover:border-[#8ca28a] hover:text-[#244633]'}`}>{item}</button>)}
            </div>
          </div>
        </div>

        <div className="mb-4 mt-9 flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-[#384a3d]">{category === 'All tools' ? 'Available now' : category}</h3><span className="text-xs font-medium text-[#788178]">{filteredTools.length} result{filteredTools.length === 1 ? '' : 's'}</span></div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <article key={tool.id} className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[1.4rem] border border-[#e0e2d9] bg-white p-6 shadow-[0_8px_28px_rgba(30,49,35,.035)] transition duration-300 hover:-translate-y-1 hover:border-[#b7c8b0] hover:shadow-[0_20px_44px_rgba(30,49,35,.09)] sm:p-7">
                <div aria-hidden="true" className="absolute right-0 top-0 h-28 w-28 rounded-bl-[5rem] bg-[#edf2e9] transition duration-300 group-hover:h-36 group-hover:w-36" />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#244633] font-display text-xl text-white shadow-sm">{tool.icon}</span>
                  <span className="rounded-full bg-[#f3f5ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#5c725c]">{tool.tag}</span>
                </div>
                <p className="relative mt-5 text-xs font-semibold text-[#6c8269]">{tool.detail}</p>
                <h4 className="relative mt-2 max-w-[19rem] font-display text-xl font-bold leading-snug tracking-[-.025em] text-[#1d2d22]">{tool.title}</h4>
                <p className="relative mt-3 flex-1 text-sm leading-6 text-[#69736a]">{tool.description}</p>
                <Link href={tool.href} className="relative mt-5 inline-flex min-h-12 items-center justify-between rounded-xl bg-[#f0f4ed] px-4 py-3 text-sm font-bold text-[#2f5237] transition hover:bg-[#244633] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244633]">
                  Open tool <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <span className="sr-only">Tool {index + 1} of {filteredTools.length}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#cfd8cb] bg-white px-6 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e9] text-xl text-[#557653]" aria-hidden="true">⌕</span>
            <h4 className="mt-4 font-display text-xl font-bold text-[#25372b]">No matching tools</h4>
            <p className="mt-2 text-sm text-[#6b756d]">Try another search term or choose a different category.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('All tools'); }} className="mt-5 rounded-full bg-[#244633] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#315a40]">Clear filters</button>
          </div>
        )}

        <section className="relative mt-14 overflow-hidden rounded-[1.6rem] bg-[#e8eee3] p-6 sm:p-9 lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[36px] border-white/35" />
          <div className="relative grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#587454]">Coming into focus</p>
              <h3 className="mt-3 max-w-md font-display text-2xl font-bold leading-tight tracking-[-.035em] text-[#203b2a] sm:text-3xl">More support for the work that matters.</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#5f6f60]">We’re planning additional research and writing utilities. These are roadmap ideas, not tools you can use yet.</p>
              <Link href="/research" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2e5638] underline decoration-[#a3b79d] underline-offset-4 hover:decoration-[#2e5638]">Explore the research hub <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {UPCOMING.map((tool, index) => <div key={tool.title} className="rounded-2xl border border-white/80 bg-white/70 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2"><span className="font-display text-sm font-bold text-[#2c4230]">{tool.title}</span><span className="text-xs font-semibold text-[#81917d]">0{index + 1}</span></div>
                <p className="mt-2 text-xs leading-6 text-[#6b766b]">{tool.description}</p>
                <span className="mt-3 inline-flex rounded-full bg-[#edf2e9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#60785d]">{tool.type}</span>
              </div>)}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
