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
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0A0A]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <header className="relative border-b border-[rgba(197,160,89,0.14)] bg-[#0A0A0A] pt-36 pb-12 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        {/* Subtle Luxury Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[640px] rounded-full bg-[#C5A059]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#777777] font-space"
          >
            <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
            <Link href="/research" className="hover:text-[#C5A059] transition-colors">Research</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
            <span className="text-[#C5A059]">Academic Glossary</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] font-space">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" aria-hidden="true" />
              Academic Terminology Explorer
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-space text-3xl font-bold tracking-tight text-[#EAEAEA] sm:text-5xl lg:text-6xl leading-[1.08]">
              Academic &amp; Research <span className="text-[#C5A059]">Glossary</span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="mt-4 font-inter text-base sm:text-lg text-[#999999] leading-relaxed font-light max-w-3xl">
              Explore 156 authoritative, peer-reviewed definitions across research design, statistical inference, econometrics, qualitative inquiry, and academic ethics. Built for university scholars, thesis candidates, and postgraduate researchers.
            </p>

            {/* Key Value Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-[#AAAAAA] font-space">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#141414] px-3 py-1.5">
                <span className="text-[#C5A059] font-bold">✓</span> 156 Authoritative Concepts
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#141414] px-3 py-1.5">
                <span className="text-[#C5A059] font-bold">✓</span> 6 Academic Disciplines
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#141414] px-3 py-1.5">
                <span className="text-[#C5A059] font-bold">✓</span> Empirical Examples &amp; Common Pitfalls
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Glossary Explorer */}
      <section className="flex-1 mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <GlossaryExplorer initialTerms={glossaryData} />
      </section>

      <Footer />
    </main>
  );
}
