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
    <div className="w-full">
      {/* Control Station: Search, Categories, Alphabet Bar */}
      <div className="mb-10 space-y-6">
        {/* Main Search Input & Filter Stats */}
        <div className="rounded-2xl border border-[#d8e2d4] bg-white p-4 shadow-[0_4px_24px_rgba(24,37,31,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <span className="sr-only">Search academic terms</span>
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#244633]">
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
                className="min-h-12 w-full rounded-xl border border-[#d8e2d4] bg-[#fbfaf6] py-3 text-sm text-[#18251f] outline-none transition placeholder:text-[#6e7d75] focus:border-[#244633] focus:bg-white focus:ring-4 focus:ring-[#244633]/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs font-bold text-[#7a8881] hover:bg-[#edf2ea] hover:text-[#18251f]"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Summary & Reset Action */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#d8e2d4] bg-[#f4f7f2] px-3.5 py-2 text-xs font-bold text-[#244633]">
                <span className="h-2 w-2 rounded-full bg-[#244633]" aria-hidden="true" />
                <span>
                  {filteredTerms.length} {filteredTerms.length === 1 ? 'Term Found' : 'Terms Found'}
                </span>
              </div>
              {(searchQuery || selectedCategory !== 'All' || selectedLetter) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-xl border border-[#d8e2d4] bg-white px-3.5 py-2 text-xs font-semibold text-[#55635c] transition hover:border-[#244633] hover:text-[#244633]"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 border-t border-[#edf2ea] pt-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="shrink-0 font-bold uppercase tracking-wider text-[#6e7d75]">
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
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 font-semibold transition ${
                      isActive
                        ? 'border-[#244633] bg-[#244633] text-white shadow-sm'
                        : 'border-[#d8e2d4] bg-white text-[#4a5852] hover:border-[#244633]/60 hover:text-[#18251f]'
                    }`}
                  >
                    <span>{name}</span>
                    <span
                      className={`ml-1.5 text-[10px] font-bold ${
                        isActive ? 'text-[#d8e8d5]' : 'text-[#7e8e86]'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alphabet Navigation Strip (Only Real Letters) */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-[#dce4d9] bg-white/90 p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedLetter(null)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              selectedLetter === null
                ? 'bg-[#244633] text-white shadow-sm'
                : 'text-[#55635c] hover:bg-[#edf3ea] hover:text-[#18251f]'
            }`}
          >
            A–Z (All)
          </button>
          <div className="h-4 w-px bg-[#dce4d9]" aria-hidden="true" />
          {availableLetters.map((letter) => {
            const isActive = selectedLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(isActive ? null : letter)}
                aria-pressed={isActive}
                className={`h-8 w-8 shrink-0 rounded-lg text-xs font-bold transition flex items-center justify-center font-display ${
                  isActive
                    ? 'bg-[#244633] text-white shadow-sm ring-2 ring-[#244633]/20'
                    : 'text-[#425249] hover:bg-[#edf3ea] hover:text-[#244633]'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Presentation Area */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Term Listing (42% width on desktop) */}
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
                          ? 'border-[#244633] bg-[#edf4eb] shadow-sm lg:border-l-4 lg:border-l-[#244633]'
                          : 'border-[#dce4d9] bg-white hover:border-[#244633]/50 hover:bg-[#fbfcf9]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block rounded-md bg-[#e3ecde] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#244633]">
                            {term.category}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-bold text-[#18251f] group-hover:text-[#244633] transition-colors">
                            {term.term}
                          </h3>
                        </div>
                        <span className="hidden text-sm font-bold text-[#244633] lg:inline-block">
                          {isSelected ? '●' : '○'}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#55635c] line-clamp-2">
                        {term.shortDefinition}
                      </p>

                      {/* Mobile Expand Accordion Trigger (< lg) */}
                      <div className="mt-4 flex items-center justify-between border-t border-[#e2e8df] pt-3 lg:hidden">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMobileExpand(term.slug);
                          }}
                          className="text-xs font-bold text-[#244633] hover:underline"
                        >
                          {isExpanded ? 'Hide definition ▲' : 'Read definition ▼'}
                        </button>
                        <Link
                          href={`/research/glossary/${term.slug}`}
                          className="text-xs font-semibold text-[#C5A059] hover:underline"
                        >
                          Full page &rarr;
                        </Link>
                      </div>

                      {/* Mobile Expanded Drawer (< lg) */}
                      {isExpanded && (
                        <div className="mt-4 space-y-3 border-t border-[#d8e2d4] pt-4 text-xs text-[#2a3731] lg:hidden">
                          <div>
                            <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#244633]">
                              Definition
                            </strong>
                            <p className="mt-1 leading-relaxed text-[#414e47]">{term.definition}</p>
                          </div>
                          {term.whyItMatters && (
                            <div>
                              <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#244633]">
                                Methodological Importance
                              </strong>
                              <p className="mt-1 leading-relaxed text-[#414e47]">{term.whyItMatters}</p>
                            </div>
                          )}
                          {term.example && (
                            <div className="rounded-lg border-l-2 border-l-[#244633] bg-[#f4f7f2] p-3 italic">
                              {term.example}
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
                  <div className="flex items-center gap-2 border-b border-[#d8e2d4] pb-1.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#244633] font-display text-sm font-bold text-white shadow-sm">
                      {letter}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6e7d75]">
                      ({groupedTerms[letter].length} terms)
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
                              ? 'border-[#244633] bg-[#edf4eb] shadow-sm lg:border-l-4 lg:border-l-[#244633]'
                              : 'border-[#dce4d9] bg-white hover:border-[#244633]/50 hover:bg-[#fbfcf9]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="inline-block rounded-md bg-[#e3ecde] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#244633]">
                                {term.category}
                              </span>
                              <h3 className="mt-1.5 font-display text-base font-bold text-[#18251f] group-hover:text-[#244633] transition-colors">
                                {term.term}
                              </h3>
                            </div>
                            <span className="hidden text-xs font-bold text-[#244633] lg:inline-block">
                              {isSelected ? '●' : '○'}
                            </span>
                          </div>

                          <p className="mt-2 text-xs leading-relaxed text-[#55635c] line-clamp-2">
                            {term.shortDefinition}
                          </p>

                          {/* Mobile Expand Action (< lg) */}
                          <div className="mt-3.5 flex items-center justify-between border-t border-[#edf2ea] pt-2.5 lg:hidden">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileExpand(term.slug);
                              }}
                              className="text-xs font-bold text-[#244633]"
                            >
                              {isExpanded ? 'Hide definition ▲' : 'Read definition ▼'}
                            </button>
                            <Link
                              href={`/research/glossary/${term.slug}`}
                              className="text-xs font-semibold text-[#C5A059]"
                            >
                              Open page &rarr;
                            </Link>
                          </div>

                          {/* Mobile Expanded Drawer (< lg) */}
                          {isExpanded && (
                            <div className="mt-3.5 space-y-3 border-t border-[#d8e2d4] pt-3 text-xs text-[#2a3731] lg:hidden">
                              <div>
                                <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#244633]">
                                  Full Definition
                                </strong>
                                <p className="mt-1 leading-relaxed text-[#414e47]">{term.definition}</p>
                              </div>
                              {term.whyItMatters && (
                                <div>
                                  <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#244633]">
                                    Why It Matters
                                  </strong>
                                  <p className="mt-1 leading-relaxed text-[#414e47]">{term.whyItMatters}</p>
                                </div>
                              )}
                              {term.example && (
                                <div className="rounded-lg border-l-2 border-l-[#244633] bg-[#f4f7f2] p-3 italic">
                                  {term.example}
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

          {/* Right Column: Interactive Term Dossier (58% width on desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            {activeTerm ? (
              <div className="sticky top-28 rounded-2xl border border-[#d8e2d4] bg-white p-7 xl:p-9 shadow-[0_8px_30px_rgba(24,37,31,0.05)] space-y-7">
                {/* Dossier Header */}
                <div className="border-b border-[#edf2ea] pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#244633]/20 bg-[#edf3ea] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#244633]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" aria-hidden="true" />
                      {activeTerm.category}
                    </span>
                    <Link
                      href={`/research/glossary/${activeTerm.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#d8e2d4] bg-[#fbfaf6] px-3.5 py-1.5 text-xs font-bold text-[#244633] transition hover:border-[#244633] hover:bg-white"
                    >
                      <span>Direct permalink page</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#18251f] xl:text-4xl">
                    {activeTerm.term}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#47544e]">
                    {activeTerm.shortDefinition}
                  </p>
                </div>

                {/* Extended Academic Definition */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                    Academic Definition
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#313e38]">
                    {activeTerm.definition}
                  </p>
                </div>

                {/* Methodological Significance ("Why It Matters") */}
                {activeTerm.whyItMatters && (
                  <div className="rounded-xl border border-[#dce5d8] bg-[#f7f9f5] p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244633]">
                      <span>💡 Methodological Significance</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#3a4841]">
                      {activeTerm.whyItMatters}
                    </p>
                  </div>
                )}

                {/* Practical Research Example */}
                {activeTerm.example && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                      Empirical Example in Literature
                    </h3>
                    <div className="mt-2 rounded-xl border-l-4 border-l-[#244633] bg-[#fbfcf9] p-4 text-sm italic leading-relaxed text-[#36443e]">
                      &ldquo;{activeTerm.example}&rdquo;
                    </div>
                  </div>
                )}

                {/* Interpretation Guidelines (if available) */}
                {activeTerm.interpretation && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                      How to Interpret Results
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3a4841]">
                      {activeTerm.interpretation}
                    </p>
                  </div>
                )}

                {/* Common Pitfalls & Mistakes (if available) */}
                {activeTerm.commonMistakes && activeTerm.commonMistakes.length > 0 && (
                  <div className="rounded-xl border border-[#ecdcd0] bg-[#fdf9f6] p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#9c4d28]">
                      ⚠️ Common Methodological Mistakes
                    </h3>
                    <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#5a4237]">
                      {activeTerm.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-bold text-[#b55b33]">✕</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Concepts (Interactive Clickable Tags) */}
                {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                  <div className="border-t border-[#edf2ea] pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6e7d75]">
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
                              // Clear letter filter if it would hide this term
                              setSelectedLetter(null);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#d8e2d4] bg-[#f4f7f2] px-3 py-1.5 text-xs font-semibold text-[#244633] transition hover:border-[#244633] hover:bg-[#244633] hover:text-white"
                          >
                            <span>📖</span>
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Connected Tools & Consultation CTAs */}
                <div className="rounded-xl border border-[#d4dfd0] bg-[#f3f7f0] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[#244633]">Need empirical guidance?</span>
                    <p className="text-[#55635c]">Explore our data analysis decision tools or consult an advisor.</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/tools/statistical-test-selector"
                      className="rounded-lg bg-[#244633] px-3 py-1.5 font-bold text-white transition hover:bg-[#1b3425]"
                    >
                      Test Selector &rarr;
                    </Link>
                    <Link
                      href="/research"
                      className="rounded-lg border border-[#d4dfd0] bg-white px-3 py-1.5 font-semibold text-[#244633] hover:bg-[#edf2ea]"
                    >
                      Research Hub
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-[#d8e2d4] bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ea] text-2xl text-[#244633]">
            📖
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-[#18251f]">
            No matching terms found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#6e7d75]">
            We could not find any research or statistical concepts matching &ldquo;{searchQuery}&rdquo; in the selected filter.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 inline-flex rounded-xl bg-[#244633] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#1b3425] shadow-sm"
          >
            Reset all search filters
          </button>
        </div>
      )}
    </div>
  );
}
