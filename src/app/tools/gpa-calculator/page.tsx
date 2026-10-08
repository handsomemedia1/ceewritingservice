import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    <main className="min-h-screen bg-bg-main text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <Navbar />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.12), transparent 58%)' }} />
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">Academic utility</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">GPA converter</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">Estimate how your Nigerian 5.0-scale CGPA translates to a US 4.0 scale or a UK percentage for early application planning.</p>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-muted">This is a planning estimate, not an official credential evaluation. Universities and credential evaluators may apply different rules.</p>
        </div>
        <div className="mx-auto mt-9 w-full max-w-3xl">
          <GPACalculator />
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-bg-card/70 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Input</p><p className="mt-2 text-sm leading-6 text-muted">Enter a CGPA from 0.00 to 5.00.</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-bg-card/70 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Choose a scale</p><p className="mt-2 text-sm leading-6 text-muted">Select the US 4.0 scale or UK percentage estimate.</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-bg-card/70 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Verify officially</p><p className="mt-2 text-sm leading-6 text-muted">Confirm requirements with your target institution.</p></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
