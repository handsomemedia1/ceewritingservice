import React from 'react';
import type { Metadata } from 'next';
import StatTestSelector from '@/features/tools/statistical-test-selector/components/StatTestSelector';

export const metadata: Metadata = {
  title: 'Statistical Test Selector | Cee Writing Hub',
  description: 'Interactive decision engine to help researchers and students choose the correct statistical test (ANOVA, T-Test, Chi-Square, etc.) for their data analysis.',
  alternates: { canonical: 'https://ceewriting.com/tools/statistical-test-selector' },
};

export default function StatTestSelectorPage() {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Statistical Test Selector',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: metadata.description,
    provider: { '@id': 'https://ceewriting.com/#organization' },
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C5A059]">
          Methodology Decision Engine
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Statistical Test Selector
        </h1>
        <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#999999]">
          Answer 3 quick methodological questions regarding your research variables and design to receive an authoritative statistical test recommendation.
        </p>
      </div>

      {/* Main Interactive Decision Engine */}
      <div className="mx-auto w-full max-w-2xl">
        <StatTestSelector />
      </div>
    </div>
  );
}
