import React from 'react';
import { notFound } from 'next/navigation';
import { glossaryData, type GlossaryTerm } from '@/features/research/data/glossary';
import { serializeJsonLd } from '@/lib/jsonLd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/icons/Icon';

function entryTitle(term: string): string {
  const forms = [`What Is ${term}? Definition & Examples | Cee Writing`, `${term}: Definition & Examples | Cee Writing`, `${term} | Cee Writing Glossary`];
  return forms.find((form) => form.length <= 60) ?? `${term} | Cee Writing`;
}

function entryDescription(term: GlossaryTerm): string {
  const text = `${term.term}: ${term.shortDefinition}`;
  return text.length <= 158 ? text : `${text.slice(0, 155).replace(/\s+\S*$/, '')}...`;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryData.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const termData = glossaryData.find((t) => t.slug === slug);

  if (!termData) {
    return { title: 'Term Not Found | Cee Writing', robots: { index: false } };
  }

  return {
    title: entryTitle(termData.term),
    description: entryDescription(termData),
    alternates: {
      canonical: `https://ceewriting.com/research/glossary/${termData.slug}`,
    },
    openGraph: {
      title: `What is ${termData.term}? | Research Glossary | Cee Writing`,
      description: termData.shortDefinition,
      url: `https://ceewriting.com/research/glossary/${termData.slug}`,
      type: 'article',
    },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const termData = glossaryData.find((t) => t.slug === slug);

  if (!termData) {
    notFound();
  }

  // Structured Data (DefinedTerm)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: termData.term,
    description: termData.shortDefinition,
    inDefinedTermSet: 'https://ceewriting.com/research/glossary',
    url: `https://ceewriting.com/research/glossary/${termData.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ceewriting.com' },
      { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://ceewriting.com/research' },
      { '@type': 'ListItem', position: 3, name: 'Glossary', item: 'https://ceewriting.com/research/glossary' },
      { '@type': 'ListItem', position: 4, name: termData.term, item: `https://ceewriting.com/research/glossary/${termData.slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What is ${termData.term}?`, acceptedAnswer: { '@type': 'Answer', text: termData.definition } },
      ...(termData.whyItMatters ? [{ '@type': 'Question', name: `Why does ${termData.term} matter in research?`, acceptedAnswer: { '@type': 'Answer', text: termData.whyItMatters } }] : []),
    ],
  };

  const relatedTerms = (termData.relatedTerms ?? [])
    .map((slug) => glossaryData.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is GlossaryTerm => Boolean(candidate));

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0A0A]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />

      <article className="flex-1 px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#777777] font-space"
          >
            <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
            <Link href="/research" className="hover:text-[#C5A059] transition-colors">Research</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
            <Link href="/research/glossary" className="hover:text-[#C5A059] transition-colors">Glossary</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
            <span className="text-[#C5A059]">{termData.term}</span>
          </nav>

          {/* Term Header Card */}
          <header className="rounded-2xl border border-[rgba(197,160,89,0.2)] bg-[#141414] p-5 sm:p-10 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C5A059] font-space">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
                {termData.category}
              </span>
              <Link
                href="/research/glossary"
                className="text-xs font-bold text-[#888888] hover:text-[#C5A059] transition font-space"
              >
                &larr; Back to Terminology Explorer
              </Link>
            </div>

            <h1 className="font-space text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08] break-words">
              {termData.term}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#CCCCCC] font-inter font-light">
              {termData.shortDefinition}
            </p>
          </header>

          {/* Comprehensive Content Body */}
          <div className="space-y-8 rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-5 sm:p-10">
            {/* Core Academic Definition */}
            <section>
              <h2 className="font-space text-xl font-bold text-white">What is {termData.term}?</h2>
              <p className="mt-3 text-base leading-relaxed text-[#AAAAAA] font-inter">
                {termData.definition}
              </p>
            </section>

            {/* Why It Matters */}
            {termData.whyItMatters && (
              <section className="rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.05)] p-4 sm:p-6">
                <h2 className="font-space text-xl font-bold text-white">Why does it matter?</h2>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#CCCCCC] font-inter">
                  {termData.whyItMatters}
                </p>
              </section>
            )}

            {/* How to Interpret */}
            {termData.interpretation && (
              <section>
                <h2 className="font-space text-xl font-bold text-white">How do you interpret it?</h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#AAAAAA] font-inter">
                  {termData.interpretation}
                </p>
              </section>
            )}

            {/* Research Literature Example */}
            {termData.example && (
              <section>
                <h2 className="font-space text-xl font-bold text-white">Example</h2>
                <div className="mt-3 rounded-xl border border-white/[0.06] border-l-2 border-l-[#C5A059] bg-[#0A0A0A] p-5 italic leading-relaxed text-[#CCCCCC] text-sm sm:text-base font-inter">
                  &ldquo;{termData.example}&rdquo;
                </div>
              </section>
            )}

            {/* Common Mistakes */}
            {termData.commonMistakes && termData.commonMistakes.length > 0 && (
              <section className="rounded-xl border border-red-900/30 bg-red-950/15 p-4 sm:p-6">
                <h2 className="font-space text-xl font-bold text-white">Common mistakes</h2>
                <ul className="mt-3.5 space-y-2.5 text-sm text-red-200/80 font-inter">
                  {termData.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Icon name="cross" size={16} className="mt-1 text-red-400" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Concepts */}
            {relatedTerms.length > 0 && (
              <section className="border-t border-white/[0.08] pt-8">
                <h2 className="font-space text-xl font-bold text-white">Related terms</h2>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  {relatedTerms.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/research/glossary/${related.slug}`}
                      className="inline-flex min-h-10 items-center rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3.5 py-2 text-sm font-medium text-[#AAAAAA] transition hover:border-[#C5A059] hover:text-[#C5A059]"
                    >
                      {related.term}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Consulting Advisory Banner */}
            <section className="rounded-2xl border border-[rgba(197,160,89,0.22)] bg-[#0A0A0A] p-5 sm:p-8 text-center">
              <h3 className="font-space text-lg font-bold text-white sm:text-xl">
                Need Assistance Applying {termData.term} in Your Research?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#888888] max-w-xl mx-auto leading-relaxed">
                Our quantitative and qualitative methodology consultants can assist with chapter structuring, statistical test verification, and complete APA results interpretation.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#C5A059] px-6 py-3 text-sm font-bold text-[#0A0A0A] transition hover:bg-[#D8B470]"
                >
                  Talk to a Research Specialist &rarr;
                </Link>
                <Link
                  href="/research/glossary"
                  className="rounded-xl border border-[rgba(197,160,89,0.3)] bg-[#141414] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#EAEAEA] transition hover:border-[#C5A059]"
                >
                  Explore Full Glossary
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
