"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

const TOOLS = [
  { id: 'gpa-calculator', title: 'GPA Converter & Calculator', description: 'Convert a Nigerian 5.0-scale GPA to a 4.0 scale or percentage estimate for international applications.', icon: '🎓', href: '/tools/gpa-calculator', category: 'Calculators', tag: 'Academic', detail: 'Academic planning' },
  { id: 'statistical-test-selector', title: 'Statistical Test Selector', description: 'Answer a few questions about your variables and study design to find a suitable statistical test.', icon: '📊', href: '/tools/statistical-test-selector', category: 'Research', tag: 'Decision guide', detail: 'Research methods' },
  { id: 'scholarship-readiness', title: 'Scholarship Readiness Check', description: 'Review your academic profile against common scholarship application expectations and next steps.', icon: '🌍', href: '/scholarship-check', category: 'Applications', tag: 'Assessment', detail: 'Global opportunities' },
];

const CATEGORIES = ['All tools', 'Calculators', 'Research', 'Applications'];

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
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[#d1d9cd] bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search tools</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#879087]" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.2 4.2" /></svg>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools by name or purpose..." className="min-h-12 w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] py-3 pl-12 pr-4 text-sm text-[#1a231d] outline-none transition placeholder:text-[#7b887e] focus:border-[#244633] focus:bg-white focus:ring-4 focus:ring-[#244633]/10" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filter tools by category">
            {CATEGORIES.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-10 rounded-xl border px-4 py-2 text-xs font-semibold transition sm:text-sm ${category === item ? 'border-[#244633] bg-[#244633] text-white shadow-sm' : 'border-[#d1d9cd] bg-white text-[#5c665f] hover:border-[#a2b29e] hover:text-[#1a231d]'}`}>{item}</button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between border-b border-[#e8efe5] pb-3">
          <h2 className="text-sm font-bold text-[#1a231d] uppercase tracking-wide">{category === 'All tools' ? 'Available Tools' : category}</h2>
          <span className="text-xs font-semibold text-[#7b887e]">{filteredTools.length} result{filteredTools.length === 1 ? '' : 's'}</span>
        </div>
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <article key={tool.id} className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.25rem] border border-[#d1d9cd] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#a2b29e] hover:shadow-md sm:p-7">
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf2e9] font-display text-xl text-[#244633] border border-[#d1d9cd]/50">{tool.icon}</span>
                  <span className="rounded-full bg-[#fcfbf9] border border-[#e8efe5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5c665f]">{tool.category}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-[#1a231d]">{tool.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-6 text-[#5c665f]">{tool.description}</p>
                <Link href={tool.href} className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#1a231d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#244633] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244633]">
                  Open tool
                </Link>
                <span className="sr-only">Tool {index + 1} of {filteredTools.length}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d1d9cd] bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e9] text-xl text-[#4a6b48]" aria-hidden="true">🔍</span>
            <h3 className="mt-4 font-display text-lg font-bold text-[#1a231d]">No matching tools</h3>
            <p className="mt-2 text-sm text-[#7b887e]">Try another search term or choose a different category.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('All tools'); }} className="mt-6 rounded-xl bg-[#edf2e9] px-5 py-2.5 text-sm font-semibold text-[#244633] hover:bg-[#dce6d7]">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
