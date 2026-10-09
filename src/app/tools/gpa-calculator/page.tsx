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
      
      <div className="mb-10 text-center">
        <span className="inline-flex items-center rounded-full border border-[#d1d9cd] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a6b48]">
          Academic utility
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1a231d] sm:text-4xl">
          GPA Converter
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#5c665f]">
          Estimate how your Nigerian 5.0-scale CGPA translates to a US 4.0 scale or a UK percentage for early application planning.
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <GPACalculator />
      </div>
      
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#d1d9cd] bg-white p-5 shadow-sm text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a6b48]">Input</p>
          <p className="mt-2 text-sm leading-6 text-[#5c665f]">Enter a CGPA from 0.00 to 5.00.</p>
        </div>
        <div className="rounded-xl border border-[#d1d9cd] bg-white p-5 shadow-sm text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a6b48]">Choose a scale</p>
          <p className="mt-2 text-sm leading-6 text-[#5c665f]">Select the US 4.0 scale or UK percentage estimate.</p>
        </div>
        <div className="rounded-xl border border-[#d1d9cd] bg-white p-5 shadow-sm text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a6b48]">Verify officially</p>
          <p className="mt-2 text-sm leading-6 text-[#5c665f]">Confirm requirements with your target institution.</p>
        </div>
      </div>
    </div>
  );
}
