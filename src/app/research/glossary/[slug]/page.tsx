import React from 'react';
import { notFound } from 'next/navigation';
import { glossaryData } from '@/features/research/data/glossary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

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
    return { title: 'Term Not Found | Cee Writing' };
  }

  return {
    title: `What is ${termData.term}? Definition, Examples & Mistakes | Cee Writing Glossary`,
    description: termData.shortDefinition,
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

  return (
    <main className="glossary-page min-h-screen bg-[#fbfaf6] text-[#18251f] flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="flex-1 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-[#5d6c64]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#244633] transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/research" className="hover:text-[#244633] transition-colors">Research</Link>
            <span aria-hidden="true">/</span>
            <Link href="/research/glossary" className="hover:text-[#244633] transition-colors">Glossary</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#244633] font-bold">{termData.term}</span>
          </nav>

          {/* Term Header Card */}
          <header className="rounded-2xl border border-[#d8e2d4] bg-white p-7 sm:p-10 shadow-[0_4px_24px_rgba(24,37,31,0.04)] mb-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#244633]/20 bg-[#edf3ea] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#244633]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" aria-hidden="true" />
                {termData.category}
              </span>
              <Link
                href="/research/glossary"
                className="text-xs font-bold text-[#244633] hover:underline"
              >
                &larr; Back to Terminology Explorer
              </Link>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#18251f] sm:text-4xl lg:text-5xl">
              {termData.term}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#44534a] sm:text-lg">
              {termData.shortDefinition}
            </p>
          </header>

          {/* Comprehensive Content Body */}
          <div className="space-y-8 rounded-2xl border border-[#d8e2d4] bg-white p-7 sm:p-10 shadow-[0_4px_24px_rgba(24,37,31,0.04)]">
            {/* Core Academic Definition */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                Core Academic Definition
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#2f3d36]">
                {termData.definition}
              </p>
            </section>

            {/* Why It Matters */}
            {termData.whyItMatters && (
              <section className="rounded-xl border border-[#dce5d8] bg-[#f7f9f5] p-5 sm:p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#244633] flex items-center gap-1.5">
                  <span>💡 Methodological Significance</span>
                </h2>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#38463f]">
                  {termData.whyItMatters}
                </p>
              </section>
            )}

            {/* How to Interpret */}
            {termData.interpretation && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                  How to Interpret in Research
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#2f3d36]">
                  {termData.interpretation}
                </p>
              </section>
            )}

            {/* Research Literature Example */}
            {termData.example && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#244633]">
                  Real-World Research Example
                </h2>
                <div className="mt-3 rounded-xl border-l-4 border-l-[#244633] bg-[#fbfcf9] p-5 italic leading-relaxed text-[#33423a] text-sm sm:text-base">
                  &ldquo;{termData.example}&rdquo;
                </div>
              </section>
            )}

            {/* Common Mistakes */}
            {termData.commonMistakes && termData.commonMistakes.length > 0 && (
              <section className="rounded-xl border border-[#ecdcd0] bg-[#fdf9f6] p-5 sm:p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#9c4d28]">
                  ⚠️ Common Pitfalls &amp; Misconceptions
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-[#5a4237]">
                  {termData.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-[#b55b33] shrink-0">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Concepts */}
            {termData.relatedTerms && termData.relatedTerms.length > 0 && (
              <section className="border-t border-[#edf2ea] pt-7">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#6e7d75]">
                  Related Concepts in Dictionary
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {termData.relatedTerms.map((rt) => {
                    const relatedObj = glossaryData.find((g) => g.slug === rt);
                    const label = relatedObj ? relatedObj.term : rt;

                    return (
                      <Link
                        key={rt}
                        href={`/research/glossary/${rt}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8e2d4] bg-[#f4f7f2] px-3.5 py-2 text-xs font-semibold text-[#244633] transition hover:border-[#244633] hover:bg-[#244633] hover:text-white"
                      >
                        <span>📖</span>
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Connected Decision Tools & Services */}
            {((termData.relatedTools && termData.relatedTools.length > 0) ||
              (termData.relatedServices && termData.relatedServices.length > 0)) && (
              <section className="rounded-xl border border-[#d4dfd0] bg-[#f3f7f0] p-6">
                <h2 className="text-sm font-bold text-[#244633]">
                  Connected Methodology Tools &amp; Advisory Services
                </h2>
                <p className="mt-1 text-xs text-[#55635c]">
                  Put this methodological concept into practice with Cee Writing research instruments.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {termData.relatedTools?.map((tool) => (
                    <Link
                      key={tool}
                      href={tool}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#244633] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1b3425]"
                    >
                      <span>⚙️</span>
                      <span>
                        {tool.includes('statistical') ? 'Statistical Test Selector' : 'Research Tool'}
                      </span>
                    </Link>
                  ))}
                  {termData.relatedServices?.map((service) => (
                    <Link
                      key={service}
                      href={service}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#d4dfd0] bg-white px-4 py-2 text-xs font-bold text-[#244633] transition hover:border-[#244633]"
                    >
                      <span>📝</span>
                      <span>
                        {service.replace('/services/', '').replace(/-/g, ' ').toUpperCase()} Service
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
