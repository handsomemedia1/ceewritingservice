"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

const TOOLS = [
  {
    id: 'gpa-calculator',
    title: 'GPA Converter & Calculator',
    description: 'Convert a Nigerian 5.0-scale GPA to a 4.0 scale or percentage estimate for international applications.',
    icon: '🎓',
    href: '/tools/gpa-calculator',
    category: 'Calculators',
    tag: 'Academic Planning',
    feature: 'WES & UK Percentage Estimates',
  },
  {
    id: 'statistical-test-selector',
    title: 'Statistical Test Selector',
    description: 'Answer a few guided questions about your variables and study design to identify the most suitable statistical test.',
    icon: '📊',
    href: '/tools/statistical-test-selector',
    category: 'Research',
    tag: 'Decision Engine',
    feature: 'Parametric & Non-Parametric Tests',
  },
  {
    id: 'scholarship-readiness',
    title: 'Scholarship Readiness Check',
    description: 'Review your academic profile against real application criteria for DAAD, Chevening, Erasmus, and Fulbright.',
    icon: '🌍',
    href: '/scholarship-check',
    category: 'Applications',
    tag: 'Global Assessment',
    feature: 'Under 15-Minute Personalized Scoring',
  },
];

const CATEGORIES = ['All tools', 'Calculators', 'Research', 'Applications'];

export default function ToolsCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All tools');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All tools' || tool.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [tool.title, tool.description, tool.category, tool.tag, tool.feature].some((val) =>
          val.toLowerCase().includes(normalizedQuery)
        );
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Filter Toolbar */}
      <div className="rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {/* Search Input Container */}
          <div className="relative block">
            <span className="sr-only">Search tools</span>
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name, topic, or methodology..."
              style={{ paddingLeft: '48px', paddingRight: '40px' }}
              className="min-h-12 w-full rounded-xl border border-[rgba(197,160,89,0.18)] bg-[#0A0A0A] py-3 text-sm text-[#EAEAEA] outline-none transition placeholder:text-[#666666] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#888888] hover:text-white"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" aria-label="Filter tools by category">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`min-h-10 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  category === item
                    ? 'border border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] shadow-[0_2px_12px_rgba(197,160,89,0.25)]'
                    : 'border border-white/[0.08] bg-[#0A0A0A] text-[#999999] hover:border-[rgba(197,160,89,0.3)] hover:text-[#EAEAEA]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" aria-hidden="true" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C5A059]">
              {category === 'All tools' ? 'Available Instruments' : `${category} Instruments`}
            </h2>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-[#141414] px-2.5 py-0.5 text-xs font-semibold text-[#888888]">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <article
                key={tool.id}
                className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-[rgba(197,160,89,0.16)] bg-[#141414] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/60 hover:shadow-[0_16px_40px_rgba(197,160,89,0.1)]"
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#C5A059]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-40"
                />

                {/* Card Top Row */}
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.1)] font-display text-2xl shadow-inner">
                    {tool.icon}
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#999999]">
                    {tool.category}
                  </span>
                </div>

                {/* Tag & Title */}
                <div className="relative mt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                    {tool.tag}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold leading-snug tracking-tight text-white group-hover:text-[#D8B470] transition-colors">
                    {tool.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-[#999999]">
                  {tool.description}
                </p>

                {/* Feature Pill */}
                <div className="relative mt-4 border-t border-white/[0.06] pt-3 text-[11px] font-medium text-[#777777]">
                  <span className="text-[#C5A059]/80 font-semibold">Includes:</span> {tool.feature}
                </div>

                {/* Launch Action Button */}
                <Link
                  href={tool.href}
                  className="relative mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2.5 text-sm font-bold text-[#0A0A0A] shadow-[0_4px_16px_rgba(197,160,89,0.2)] transition-all hover:bg-[#D8B470] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  <span>Open tool</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
                <span className="sr-only">Tool {index + 1} of {filteredTools.length}</span>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[rgba(197,160,89,0.2)] bg-[#141414] px-6 py-16 text-center shadow-sm">
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.1)] text-xl text-[#C5A059]"
              aria-hidden="true"
            >
              🔍
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-white">No matching tools found</h3>
            <p className="mt-2 text-sm text-[#888888]">
              Try searching with different keywords or switch your category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All tools');
              }}
              className="mt-6 inline-flex rounded-xl border border-[#C5A059] bg-[rgba(197,160,89,0.1)] px-5 py-2.5 text-xs font-bold text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#0A0A0A]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
