import React from 'react';
import type { Metadata } from 'next';
import GPACalculator from '@/features/tools/gpa-calculator/components/GPACalculator';
import ToolFaq from '@/features/tools/components/ToolFaq';

const FAQS = [
  { question: 'How do I convert a Nigerian 5.0 CGPA to a 4.0 GPA?', answer: 'A simple linear estimate is CGPA divided by 5, multiplied by 4, so a 4.50 CGPA is about 3.60. Credential evaluators such as WES use their own grade tables, which can give a different result.' },
  { question: 'What CGPA is a First Class in Nigeria?', answer: 'On the 5-point scale a First Class is usually 4.50 to 5.00, Second Class Upper 3.50 to 4.49, Second Class Lower 2.40 to 3.49, and Third Class 1.50 to 2.39. Check your institution\'s handbook, as some differ.' },
  { question: 'Will universities accept this converted GPA?', answer: 'Treat it as a planning estimate. Universities may require an official evaluation or compare your degree classification directly, so confirm the requirement with each institution.' },
];

export const metadata: Metadata = {
  title: 'Nigerian CGPA Converter: 5.0 to 4.0 GPA | Cee Writing',
  description: 'Convert a Nigerian 5.0 CGPA to an estimated US 4.0 GPA and see your degree classification for scholarship and university applications.',
  alternates: { canonical: 'https://ceewriting.com/tools/gpa-calculator' },
};

export default function GPACalculatorPage() {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GPA Converter & Calculator',
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
          Academic Planning Instrument
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          GPA Converter &amp; Calculator
        </h1>
        <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#999999]">
          Instantly convert your Nigerian 5.0-scale CGPA to an estimated US 4.0 GPA, or see your degree classification, for scholarship planning.
        </p>
      </div>

      {/* Main Calculator Widget */}
      <div className="mx-auto w-full max-w-2xl">
        <GPACalculator />
      </div>

      <ToolFaq items={FAQS} />
      
      {/* Feature Guidance Cards */}
      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">01 • Input</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Enter an accredited CGPA from 0.00 to 5.00.</p>
        </div>
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">02 • Benchmark</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Choose the US 4.0 estimate or your degree classification.</p>
        </div>
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">03 • Verify</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Use as a planning guide before official credential evaluation.</p>
        </div>
      </div>
    </div>
  );
}
