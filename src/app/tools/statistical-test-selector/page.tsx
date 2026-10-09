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
      
      <div className="mb-10 text-center">
        <span className="inline-flex items-center rounded-full border border-[#d1d9cd] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a6b48]">
          Decision Engine
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1a231d] sm:text-4xl">
          Statistical Test Selector
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#5c665f]">
          Answer three quick questions about your research variables to discover exactly which statistical test you should use.
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <StatTestSelector />
      </div>
    </div>
  );
}
