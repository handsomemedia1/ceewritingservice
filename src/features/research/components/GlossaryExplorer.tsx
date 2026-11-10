"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { GlossaryTerm } from '@/features/research/data/glossary';

const firstLetter = (term: GlossaryTerm) => term.term.trim().charAt(0).toUpperCase();

function matchesQuery(term: GlossaryTerm, query: string): boolean {
  return [term.term, term.shortDefinition, term.definition, term.category, term.whyItMatters, ...(term.relatedTerms ?? [])]
    .some((value) => value?.toLowerCase().includes(query));
}

function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.06)] px-2 py-0.5 font-space text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
      {children}
    </span>
  );
}

function TermCard({ term, selected, expanded, onSelect, onToggle }: {
  term: GlossaryTerm;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  // On desktop the title previews the term beside the list; on touch screens it opens the full page.
  const handleTitleClick = (event: React.MouseEvent) => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      onClick={onSelect}
      className={`rounded-2xl border p-4 transition-colors sm:p-5 lg:cursor-pointer ${
        selected
          ? 'border-white/[0.07] bg-[#141414] lg:border-[#C5A059] lg:bg-[rgba(197,160,89,0.06)]'
          : 'border-white/[0.07] bg-[#141414] lg:hover:border-[rgba(197,160,89,0.35)]'
      }`}
    >
      <CategoryBadge>{term.category}</CategoryBadge>
      <h3 className="mt-2 font-space text-lg font-bold leading-snug text-[#EAEAEA]">
        <Link href={`/research/glossary/${term.slug}`} onClick={handleTitleClick} className="transition-colors hover:text-[#C5A059]">
          {term.term}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#999999]">{term.shortDefinition}</p>

      <div className="mt-3 lg:hidden">
        <button
          type="button"
          onClick={(event) => { event.stopPropagation(); onToggle(); }}
          aria-expanded={expanded}
          className="min-h-11 font-space text-sm font-bold text-[#C5A059]"
        >
          {expanded ? 'Hide definition ▲' : 'Read definition ▼'}
        </button>

        {expanded && (
          <div className="mt-2 space-y-3 border-t border-white/[0.08] pt-4 text-sm leading-relaxed text-[#CCCCCC]">
            <p>{term.definition}</p>
            {term.whyItMatters && (
              <div className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.04)] p-3">
                <strong className="block font-space text-xs font-bold uppercase tracking-wider text-[#C5A059]">Why it matters</strong>
                <p className="mt-1">{term.whyItMatters}</p>
              </div>
            )}
            {term.example && <p className="border-l-2 border-[#C5A059] pl-3 italic text-[#BBBBBB]">{term.example}</p>}
            <Link href={`/research/glossary/${term.slug}`} className="inline-block min-h-11 py-2 font-space font-bold text-[#C5A059]">
              Open full entry &rarr;
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

function TermPreview({ term, allTerms, onSelect }: {
  term: GlossaryTerm;
  allTerms: GlossaryTerm[];
  onSelect: (slug: string) => void;
}) {
  const related = (term.relatedTerms ?? [])
    .map((slug) => allTerms.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is GlossaryTerm => Boolean(candidate));

  return (
    <div data-lenis-prevent className="sticky top-28 max-h-[calc(100vh-8.5rem)] space-y-6 overflow-y-auto rounded-2xl border border-[rgba(197,160,89,0.2)] bg-[#141414] p-8">
      <header className="border-b border-white/[0.08] pb-5">
        <div className="flex items-center justify-between gap-4">
          <CategoryBadge>{term.category}</CategoryBadge>
          <Link href={`/research/glossary/${term.slug}`} className="shrink-0 font-space text-sm font-bold text-[#C5A059] hover:underline">
            Open full entry &rarr;
          </Link>
        </div>
        <h2 className="mt-4 font-space text-3xl font-bold tracking-tight text-white">{term.term}</h2>
        <p className="mt-3 leading-relaxed text-[#CCCCCC]">{term.shortDefinition}</p>
      </header>

      <section>
        <h3 className="font-space text-xs font-bold uppercase tracking-wider text-[#C5A059]">Definition</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#BBBBBB]">{term.definition}</p>
      </section>

      {term.whyItMatters && (
        <section className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.05)] p-5">
          <h3 className="font-space text-xs font-bold uppercase tracking-wider text-[#C5A059]">Why it matters</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#CCCCCC]">{term.whyItMatters}</p>
        </section>
      )}

      {term.example && (
        <section>
          <h3 className="font-space text-xs font-bold uppercase tracking-wider text-[#C5A059]">Example</h3>
          <p className="mt-2 border-l-2 border-[#C5A059] pl-4 text-[15px] italic leading-relaxed text-[#CCCCCC]">{term.example}</p>
        </section>
      )}

      {term.commonMistakes && term.commonMistakes.length > 0 && (
        <section>
          <h3 className="font-space text-xs font-bold uppercase tracking-wider text-red-400">Common mistakes</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#BBBBBB]">
            {term.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-white/[0.08] pt-5">
          <h3 className="font-space text-xs font-bold uppercase tracking-wider text-[#888888]">Related terms</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelect(item.slug)}
                className="rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3 py-1.5 text-sm text-[#AAAAAA] transition hover:border-[#C5A059] hover:text-[#C5A059]"
              >
                {item.term}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function GlossaryExplorer({ initialTerms }: { initialTerms: GlossaryTerm[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState(initialTerms[0]?.slug ?? '');
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    const counts = new Map<string, number>([['All', initialTerms.length]]);
    initialTerms.forEach((term) => counts.set(term.category, (counts.get(term.category) ?? 0) + 1));
    return [...counts.entries()];
  }, [initialTerms]);

  const letters = useMemo(
    () => [...new Set(initialTerms.map(firstLetter))].filter((letter) => /[A-Z]/.test(letter)).sort(),
    [initialTerms],
  );

  const filteredTerms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialTerms
      .filter((term) => selectedCategory === 'All' || term.category === selectedCategory)
      .filter((term) => !selectedLetter || firstLetter(term) === selectedLetter)
      .filter((term) => !query || matchesQuery(term, query))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [initialTerms, searchQuery, selectedCategory, selectedLetter]);

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    filteredTerms.forEach((term) => map.set(firstLetter(term), [...(map.get(firstLetter(term)) ?? []), term]));
    return [...map.entries()];
  }, [filteredTerms]);

  const activeTerm = filteredTerms.find((term) => term.slug === activeSlug) ?? filteredTerms[0] ?? null;
  const hasFilters = Boolean(searchQuery || selectedLetter || selectedCategory !== 'All');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLetter(null);
  };

  const toggleExpanded = (slug: string) => {
    setExpandedSlugs((previous) => {
      const next = new Set(previous);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });
  };

  const selectRelated = (slug: string) => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLetter(null);
    setActiveSlug(slug);
  };

  return (
    <div className="w-full space-y-8">
      <div className="rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search the glossary</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C5A059]">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search terms, e.g. ANOVA or p-value"
              className="min-h-12 w-full rounded-xl border border-[rgba(197,160,89,0.22)] bg-[#0A0A0A] py-3 pl-12 pr-4 text-base text-[#EAEAEA] outline-none transition focus:border-[#C5A059]"
            />
          </label>

          <div className="flex items-center justify-between gap-3">
            <p className="font-space text-sm font-bold text-[#C5A059]" aria-live="polite">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
            </p>
            {hasFilters && (
              <button type="button" onClick={resetFilters} className="min-h-11 rounded-xl border border-white/[0.1] px-3.5 text-sm font-semibold text-[#999999] transition hover:border-[#C5A059] hover:text-[#C5A059]">
                Reset
              </button>
            )}
          </div>
        </div>

        <div data-lenis-prevent className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by discipline">
          {categories.map(([name, count]) => {
            const active = selectedCategory === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => { setSelectedCategory(name); setSelectedLetter(null); }}
                aria-pressed={active}
                className={`min-h-10 shrink-0 rounded-full border px-3.5 font-space text-sm font-semibold transition-colors ${
                  active ? 'border-[#C5A059] bg-[#C5A059] font-bold text-[#0A0A0A]' : 'border-white/[0.08] bg-[#0A0A0A] text-[#999999] hover:border-[rgba(197,160,89,0.3)] hover:text-[#EAEAEA]'
                }`}
              >
                {name} <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-1 rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-2" role="group" aria-label="Filter by first letter">
          <button
            type="button"
            onClick={() => setSelectedLetter(null)}
            aria-pressed={selectedLetter === null}
            className={`h-10 rounded-lg px-3 font-space text-sm font-bold transition-colors ${selectedLetter === null ? 'bg-[#C5A059] text-[#0A0A0A]' : 'text-[#999999] hover:text-[#C5A059]'}`}
          >
            All
          </button>
          {letters.map((letter) => {
            const active = selectedLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(active ? null : letter)}
                aria-pressed={active}
                aria-label={`Terms starting with ${letter}`}
                className={`h-10 w-10 rounded-lg font-space text-sm font-bold transition-colors ${active ? 'bg-[#C5A059] text-[#0A0A0A]' : 'text-[#999999] hover:bg-white/[0.05] hover:text-white'}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-5">
            {groups.map(([letter, terms]) => (
              <section key={letter} aria-label={`Terms starting with ${letter}`} className="space-y-3">
                <h2 className="flex items-center gap-2 border-b border-[rgba(197,160,89,0.15)] pb-2 font-space text-xl font-bold text-[#C5A059]">
                  {letter}
                  <span className="text-xs font-semibold text-[#777777]">{terms.length}</span>
                </h2>
                {terms.map((term) => (
                  <TermCard
                    key={term.slug}
                    term={term}
                    selected={activeTerm?.slug === term.slug}
                    expanded={expandedSlugs.has(term.slug)}
                    onSelect={() => setActiveSlug(term.slug)}
                    onToggle={() => toggleExpanded(term.slug)}
                  />
                ))}
              </section>
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block lg:sticky lg:top-28">
            {activeTerm && <TermPreview term={activeTerm} allTerms={initialTerms} onSelect={selectRelated} />}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-10 text-center">
          <p className="font-space text-lg font-bold text-white">No terms match your search</p>
          <p className="mt-2 text-sm text-[#888888]">Try a different word, or clear your filters.</p>
          <button type="button" onClick={resetFilters} className="mt-4 min-h-11 rounded-xl border border-[#C5A059] px-4 text-sm font-bold text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#0A0A0A]">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
