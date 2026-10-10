import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { glossaryData } from '@/features/research/data/glossary';
import GlossaryExplorer from '@/features/research/components/GlossaryExplorer';

export const metadata: Metadata = {
  title: 'Academic & Research Glossary | Methodology & Statistics Dictionary | Cee Writing',
  description:
    'Explore 156 authoritative, peer-reviewed definitions spanning research methodology, statistics, econometrics, qualitative analysis, and academic ethics. Includes practical examples and common mistakes to avoid.',
  alternates: {
    canonical: 'https://ceewriting.com/research/glossary',
  },
  openGraph: {
    title: 'Academic & Research Glossary | Cee Writing Hub',
    description:
      'Explore 156 clear, practical definitions for research methodology, statistics, econometrics, and academic research concepts.',
    url: 'https://ceewriting.com/research/glossary',
    type: 'website',
  },
};

export default function GlossaryPage() {
  // JSON-LD Structured Data for DefinedTermSet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Cee Writing Academic & Research Glossary',
    description:
      'Comprehensive academic terminology dictionary covering methodology, statistics, econometrics, qualitative analysis, and research ethics.',
    url: 'https://ceewriting.com/research/glossary',
    hasDefinedTerm: glossaryData.slice(0, 30).map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.shortDefinition,
      url: `https://ceewriting.com/research/glossary/${term.slug}`,
    })),
  };

  return (
    <main className="glossary-page min-h-screen bg-[#fbfaf6] text-[#18251f] flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-12 lg:pt-36 border-b border-[#e5ece2] bg-[#f8f7f2]">
        {/* Subtle Ambient Orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#e3ede0] opacity-60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#f4ecd8] opacity-50 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#5d6c64]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#244633] transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/research" className="hover:text-[#244633] transition-colors">Research</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#244633] font-bold">Glossary</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2ded0] bg-white/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#244633] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
              ACADEMIC TERMINOLOGY EXPLORER
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[#18251f] sm:text-5xl lg:text-5xl">
              Research &amp; Academic Glossary
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#4e5c54] sm:text-lg">
              Explore clear, authoritative definitions across research design, statistical inference, econometrics, qualitative inquiry, and ethics. Built for university students, thesis candidates, and scholars.
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-[#425249]">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#244633]">✓</span> {glossaryData.length} Authoritative Concepts
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#244633]">✓</span> 6 Academic Disciplines
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#244633]">✓</span> Practical Examples &amp; Common Pitfalls
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Explorer Section */}
      <section className="flex-1 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <GlossaryExplorer initialTerms={glossaryData} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
