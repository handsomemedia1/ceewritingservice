"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { GlossaryTerm } from '@/features/research/data/glossary';

interface GlossaryExplorerProps {
  initialTerms: GlossaryTerm[];
}

export default function GlossaryExplorer({ initialTerms }: GlossaryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>(initialTerms[0]?.slug || '');
  const [expandedMobileSlugs, setExpandedMobileSlugs] = useState<Set<string>>(new Set());

  // Distinct Categories with item counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialTerms.length };
    initialTerms.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [initialTerms]);

  // Distinct Available Letters (only letters with real terms)
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    initialTerms.forEach((t) => {
      const firstChar = t.term.trim().charAt(0).toUpperCase();
      if (firstChar >= 'A' && firstChar <= 'Z') {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, [initialTerms]);

  // Filtered terms based on search query, category, and letter
  const filteredTerms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialTerms
      .filter((term) => {
        // Category filter
        if (selectedCategory !== 'All' && term.category !== selectedCategory) {
          return false;
        }

        // Letter filter
        if (selectedLetter) {
          const firstChar = term.term.trim().charAt(0).toUpperCase();
          if (firstChar !== selectedLetter) {
            return false;
          }
        }

        // Search text matching
        if (query) {
          const matchName = term.term.toLowerCase().includes(query);
          const matchShort = term.shortDefinition.toLowerCase().includes(query);
          const matchDef = term.definition.toLowerCase().includes(query);
          const matchCat = term.category.toLowerCase().includes(query);
          const matchWhy = term.whyItMatters?.toLowerCase().includes(query);
          const matchRelated = term.relatedTerms?.some((rt) => rt.toLowerCase().includes(query));

          return matchName || matchShort || matchDef || matchCat || matchWhy || matchRelated;
        }

        return true;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [initialTerms, searchQuery, selectedCategory, selectedLetter]);

  // Selected term in the right-side dossier panel
  const activeTerm = useMemo(() => {
    if (!filteredTerms.length) return null;
    const found = filteredTerms.find((t) => t.slug === activeSlug);
    return found || filteredTerms[0];
  }, [filteredTerms, activeSlug]);

  // Group terms by letter for the listing when not actively searching
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term.trim().charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const activeGroupLetters = useMemo(() => Object.keys(groupedTerms).sort(), [groupedTerms]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLetter(null);
  };

  // Toggle mobile accordion
  const toggleMobileExpand = (slug: string) => {
    setExpandedMobileSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <div className="w-full space-y-10">
      {/* Control Station: Search, Categories, Alphabet Bar */}
      <div className="rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Main Search Input & Filter Stats */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <span className="sr-only">Search academic terms</span>
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, tests, formulas, or methods (e.g., ANOVA, p-value, Triangulation)..."
              style={{ paddingLeft: '48px', paddingRight: '40px' }}
              className="min-h-12 w-full rounded-xl border border-[rgba(197,160,89,0.22)] bg-[#0A0A0A] py-3.5 text-sm text-[#EAEAEA] outline-none transition placeholder:text-[#666666] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/15"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs font-bold text-[#888888] hover:bg-white/[0.08] hover:text-[#EAEAEA]"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Summary & Reset Action */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-4 py-2.5 text-xs font-bold text-[#C5A059] font-space">
              <span className="h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
              <span>
                {filteredTerms.length} {filteredTerms.length === 1 ? 'Term Found' : 'Terms Found'}
              </span>
            </div>
            {(searchQuery || selectedCategory !== 'All' || selectedLetter) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-xl border border-white/[0.1] bg-[#0A0A0A] px-3.5 py-2.5 text-xs font-semibold text-[#888888] transition hover:border-[#C5A059] hover:text-[#C5A059]"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Discipline Filter Pills */}
        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 shrink-0 font-space text-[11px] font-bold uppercase tracking-wider text-[#777777]">
              Discipline:
            </span>
            {categoriesWithCounts.map(({ name, count }) => {
              const isActive = selectedCategory === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(name);
                    setSelectedLetter(null);
                  }}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 font-space text-xs font-semibold transition-all ${
                    isActive
                      ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] shadow-[0_2px_12px_rgba(197,160,89,0.25)] font-bold'
                      : 'border-white/[0.08] bg-[#0A0A0A] text-[#888888] hover:border-[rgba(197,160,89,0.3)] hover:text-[#EAEAEA]'
                  }`}
                >
                  <span>{name}</span>
                  <span
                    className={`ml-1.5 text-[10px] font-bold ${
                      isActive ? 'text-[#0A0A0A]/80' : 'text-[#666666]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alphabet Navigation Strip */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-2">
          <button
            type="button"
            onClick={() => setSelectedLetter(null)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition font-space ${
              selectedLetter === null
                ? 'bg-[#C5A059] text-[#0A0A0A] shadow-sm'
                : 'text-[#888888] hover:text-[#C5A059] hover:bg-white/[0.04]'
            }`}
          >
            A–Z (All)
          </button>
          <div className="h-4 w-px bg-white/[0.1] shrink-0" aria-hidden="true" />
          {availableLetters.map((letter) => {
            const isActive = selectedLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(isActive ? null : letter)}
                aria-pressed={isActive}
                className={`h-8 w-8 shrink-0 rounded-lg text-xs font-bold transition flex items-center justify-center font-space ${
                  isActive
                    ? 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_2px_8px_rgba(197,160,89,0.3)]'
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Presentation Area: Two Columns (Terms List + Editorial Dossier) */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Term Listing (5 of 12 cols = ~42%) */}
          <div className="space-y-6 lg:col-span-5">
            {searchQuery || selectedLetter ? (
              /* Flat Search/Letter Results List */
              <div className="space-y-3">
                {filteredTerms.map((term) => {
                  const isSelected = activeTerm?.slug === term.slug;
                  const isExpanded = expandedMobileSlugs.has(term.slug);

                  return (
                    <article
                      key={term.slug}
                      onClick={() => setActiveSlug(term.slug)}
                      className={`group cursor-pointer rounded-2xl border p-5 transition-all ${
                        isSelected
                          ? 'border-[#C5A059] bg-[rgba(197,160,89,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] lg:border-l-4 lg:border-l-[#C5A059]'
                          : 'border-white/[0.07] bg-[#141414] hover:border-[rgba(197,160,89,0.35)] hover:bg-[#181818]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block rounded border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.06)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                            {term.category}
                          </span>
                          <h3 className="mt-2 font-space text-lg font-bold text-[#EAEAEA] group-hover:text-[#C5A059] transition-colors">
                            {term.term}
                          </h3>
                        </div>
                        <span className="hidden text-sm font-bold text-[#C5A059] lg:inline-block">
                          {isSelected ? '●' : '○'}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#888888] font-inter line-clamp-2">
                        {term.shortDefinition}
                      </p>

                      {/* Mobile Expand Accordion Trigger (< lg) */}
                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 lg:hidden">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMobileExpand(term.slug);
                          }}
                          className="text-xs font-bold text-[#C5A059] hover:underline"
                        >
                          {isExpanded ? 'Hide definition ▲' : 'Read definition ▼'}
                        </button>
                        <Link
                          href={`/research/glossary/${term.slug}`}
                          className="text-xs font-semibold text-[#888888] hover:text-[#C5A059]"
                        >
                          Full page &rarr;
                        </Link>
                      </div>

                      {/* Mobile Expanded Drawer (< lg) */}
                      {isExpanded && (
                        <div className="mt-4 space-y-3.5 border-t border-white/[0.08] pt-4 text-xs text-[#AAAAAA] lg:hidden">
                          <div>
                            <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                              Academic Definition
                            </strong>
                            <p className="mt-1 leading-relaxed text-[#CCCCCC]">{term.definition}</p>
                          </div>
                          {term.whyItMatters && (
                            <div className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.04)] p-3.5">
                              <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                                💡 Why It Matters
                              </strong>
                              <p className="mt-1 leading-relaxed text-[#CCCCCC]">{term.whyItMatters}</p>
                            </div>
                          )}
                          {term.example && (
                            <div className="rounded-lg border-l-2 border-l-[#C5A059] bg-[#0A0A0A] p-3 italic text-[#BBBBBB]">
                              &ldquo;{term.example}&rdquo;
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              /* A-Z Letter Grouped Listing */
              activeGroupLetters.map((letter) => (
                <section key={letter} className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-[rgba(197,160,89,0.15)] pb-1.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(197,160,89,0.12)] border border-[rgba(197,160,89,0.3)] font-space text-xs font-bold text-[#C5A059] shadow-sm">
                      {letter}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#777777] font-space">
                      ({groupedTerms[letter].length} {groupedTerms[letter].length === 1 ? 'term' : 'terms'})
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {groupedTerms[letter].map((term) => {
                      const isSelected = activeTerm?.slug === term.slug;
                      const isExpanded = expandedMobileSlugs.has(term.slug);

                      return (
                        <article
                          key={term.slug}
                          onClick={() => setActiveSlug(term.slug)}
                          className={`group cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all ${
                            isSelected
                              ? 'border-[#C5A059] bg-[rgba(197,160,89,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] lg:border-l-4 lg:border-l-[#C5A059]'
                              : 'border-white/[0.07] bg-[#141414] hover:border-[rgba(197,160,89,0.35)] hover:bg-[#181818]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="inline-block rounded border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.06)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                                {term.category}
                              </span>
                              <h3 className="mt-1.5 font-space text-base font-bold text-[#EAEAEA] group-hover:text-[#C5A059] transition-colors">
                                {term.term}
                              </h3>
                            </div>
                            <span className="hidden text-xs font-bold text-[#C5A059] lg:inline-block">
                              {isSelected ? '●' : '○'}
                            </span>
                          </div>

                          <p className="mt-2 text-xs leading-relaxed text-[#888888] font-inter line-clamp-2">
                            {term.shortDefinition}
                          </p>

                          {/* Mobile Expand Action (< lg) */}
                          <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.08] pt-2.5 lg:hidden">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileExpand(term.slug);
                              }}
                              className="text-xs font-bold text-[#C5A059]"
                            >
                              {isExpanded ? 'Hide definition ▲' : 'Read definition ▼'}
                            </button>
                            <Link
                              href={`/research/glossary/${term.slug}`}
                              className="text-xs font-semibold text-[#888888] hover:text-[#C5A059]"
                            >
                              Open page &rarr;
                            </Link>
                          </div>

                          {/* Mobile Expanded Drawer (< lg) */}
                          {isExpanded && (
                            <div className="mt-3.5 space-y-3 border-t border-white/[0.08] pt-3 text-xs text-[#AAAAAA] lg:hidden">
                              <div>
                                <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                                  Academic Definition
                                </strong>
                                <p className="mt-1 leading-relaxed text-[#CCCCCC]">{term.definition}</p>
                              </div>
                              {term.whyItMatters && (
                                <div className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.04)] p-3">
                                  <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                                    💡 Why It Matters
                                  </strong>
                                  <p className="mt-1 leading-relaxed text-[#CCCCCC]">{term.whyItMatters}</p>
                                </div>
                              )}
                              {term.example && (
                                <div className="rounded-lg border-l-2 border-l-[#C5A059] bg-[#0A0A0A] p-3 italic text-[#BBBBBB]">
                                  &ldquo;{term.example}&rdquo;
                                </div>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))
            )}
          </div>

          {/* Right Column: Interactive Editorial Term Dossier (7 of 12 cols = ~58%) */}
          <div className="hidden lg:col-span-7 lg:block">
            {activeTerm ? (
              <div className="sticky top-32 rounded-2xl border border-[rgba(197,160,89,0.2)] bg-[#141414] p-8 xl:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-7">
                {/* Dossier Header */}
                <div className="border-b border-white/[0.08] pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-space">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
                      {activeTerm.category}
                    </span>
                    <Link
                      href={`/research/glossary/${activeTerm.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[rgba(197,160,89,0.25)] bg-[#0A0A0A] px-3.5 py-1.5 text-xs font-bold text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#0A0A0A]"
                    >
                      <span>Direct permalink page</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>

                  <h2 className="mt-4 font-space text-3xl font-bold tracking-tight text-white xl:text-4xl">
                    {activeTerm.term}
                  </h2>
                  <p className="mt-3 text-base font-inter font-light leading-relaxed text-[#CCCCCC]">
                    {activeTerm.shortDefinition}
                  </p>
                </div>

                {/* Extended Academic Definition */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] font-space">
                    Academic Definition
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#AAAAAA] font-inter">
                    {activeTerm.definition}
                  </p>
                </div>

                {/* Methodological Significance ("Why It Matters") */}
                {activeTerm.whyItMatters && (
                  <div className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.05)] p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059] font-space">
                      <span>💡 Methodological Significance</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#CCCCCC] font-inter">
                      {activeTerm.whyItMatters}
                    </p>
                  </div>
                )}

                {/* Practical Research Example in Literature */}
                {activeTerm.example && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] font-space">
                      Empirical Example in Literature
                    </h3>
                    <div className="mt-2.5 rounded-xl border border-white/[0.06] border-l-2 border-l-[#C5A059] bg-[#0A0A0A] p-4 text-sm italic leading-relaxed text-[#CCCCCC]">
                      &ldquo;{activeTerm.example}&rdquo;
                    </div>
                  </div>
                )}

                {/* Interpretation Guidelines (if available) */}
                {activeTerm.interpretation && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] font-space">
                      How to Interpret Results
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#AAAAAA] font-inter">
                      {activeTerm.interpretation}
                    </p>
                  </div>
                )}

                {/* Common Pitfalls & Mistakes (if available) */}
                {activeTerm.commonMistakes && activeTerm.commonMistakes.length > 0 && (
                  <div className="rounded-xl border border-red-900/30 bg-red-950/15 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 font-space flex items-center gap-1.5">
                      <span>⚠️ Common Methodological Mistakes</span>
                    </h3>
                    <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-red-200/80 font-inter">
                      {activeTerm.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-bold text-red-400">✕</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Concepts (Interactive Clickable Tags) */}
                {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                  <div className="border-t border-white/[0.08] pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#777777] font-space">
                      Related Concepts in Dictionary
                    </h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {activeTerm.relatedTerms.map((rt) => {
                        const relatedObj = initialTerms.find((t) => t.slug === rt);
                        const label = relatedObj ? relatedObj.term : rt;

                        return (
                          <button
                            key={rt}
                            type="button"
                            onClick={() => {
                              setActiveSlug(rt);
                              setSelectedLetter(null);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3 py-1.5 text-xs font-medium text-[#AAAAAA] transition hover:border-[#C5A059] hover:text-[#C5A059]"
                          >
                            <span>{label}</span>
                            <span className="text-[#C5A059]">&rarr;</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Consulting Cross-Link Advisory Banner */}
                <div className="rounded-xl border border-[rgba(197,160,89,0.18)] bg-[#0A0A0A] p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#EAEAEA] font-space">
                      Need help applying this concept in your dissertation or thesis?
                    </p>
                    <p className="text-[11px] text-[#888888]">
                      Our consultants provide methodology structuring and empirical analysis.
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="shrink-0 rounded-lg bg-[rgba(197,160,89,0.15)] border border-[#C5A059]/40 px-3.5 py-1.5 text-xs font-bold text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#0A0A0A]"
                  >
                    Consult Us &rarr;
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Empty Filter State */
        <div className="rounded-2xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-12 text-center text-[#888888]">
          <p className="font-space text-lg font-bold text-white">No academic terms matched your filter criteria.</p>
          <p className="mt-2 text-xs">Try clearing your search query or choosing another discipline category.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 rounded-xl border border-[#C5A059] bg-[rgba(197,160,89,0.1)] px-4 py-2 text-xs font-bold text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0A0A] transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
