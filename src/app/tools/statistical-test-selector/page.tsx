import React from 'react';
import type { Metadata } from 'next';
import StatTestSelector from '@/features/tools/statistical-test-selector/components/StatTestSelector';
import ToolFaq from '@/features/tools/components/ToolFaq';

const FAQS = [
  { question: 'How do I choose the right statistical test?', answer: 'Start with three facts about your study: how many groups you are comparing, how your outcome is measured (continuous, ordinal or categorical), and whether the groups are independent or the same participants measured repeatedly. Those three answers point to a small set of suitable tests.' },
  { question: 'When should I use a t-test or ANOVA?', answer: 'Use a t-test to compare the means of exactly two groups, and one-way ANOVA for three or more. Both assume a continuous outcome and approximately normal data, or a sample large enough for that assumption to matter less.' },
  { question: 'What if my data is not normally distributed?', answer: 'Use a non-parametric alternative: Mann-Whitney U instead of an independent t-test, Wilcoxon signed-rank instead of a paired t-test, Kruskal-Wallis instead of one-way ANOVA, and Friedman instead of repeated measures ANOVA.' },
  { question: 'Which test compares yes or no outcomes?', answer: 'Use a chi-square test of independence for separate groups. For the same participants measured twice use McNemar\'s test, and for three or more repeated measurements use Cochran\'s Q test.' },
];

export const metadata: Metadata = {
  title: 'Statistical Test Selector | Cee Writing',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...toolJsonLd, offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' } }) }} />
      
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C5A059]">
          Methodology Decision Engine
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Statistical Test Selector
        </h1>
        <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#999999]">
          Answer 3 quick methodological questions regarding your research variables and design to get a suitable statistical test, with its assumptions explained.
        </p>
      </div>

      {/* Main Interactive Decision Engine */}
      <div className="mx-auto w-full max-w-2xl">
        <StatTestSelector />
      </div>

      <ToolFaq items={FAQS} />
    </div>
  );
}
