import React from 'react';
import type { Metadata } from 'next';
import GPACalculator from '@/features/tools/gpa-calculator/components/GPACalculator';

export const metadata: Metadata = {
  title: 'GPA Converter & Calculator | Cee Writing Hub',
  description: 'Convert your Nigerian 5.0 scale GPA to the US 4.0 scale or UK percentage standard for international scholarship and university applications.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C5A059]">
          Academic Planning Instrument
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          GPA Converter &amp; Calculator
        </h1>
        <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#999999]">
          Instantly convert your Nigerian 5.0-scale CGPA to an estimated US 4.0 scale or UK percentage standard for global scholarship planning.
        </p>
      </div>

      {/* Main Calculator Widget */}
      <div className="mx-auto w-full max-w-2xl">
        <GPACalculator />
      </div>
      
      {/* Feature Guidance Cards */}
      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">01 • Input</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Enter an accredited CGPA from 0.00 to 5.00.</p>
        </div>
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">02 • Benchmark</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Select target conversion standard (US 4.0 or UK %).</p>
        </div>
        <div className="rounded-xl border border-[rgba(197,160,89,0.15)] bg-[#141414] p-5 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">03 • Verify</p>
          <p className="mt-2 text-xs leading-5 text-[#888888]">Use as a planning guide before official credential evaluation.</p>
        </div>
      </div>
    </div>
  );
}
