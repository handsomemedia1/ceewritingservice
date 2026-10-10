import React from 'react';
import Link from 'next/link';

interface EducationalResultProps {
  recommendation: string;
  onReset: () => void;
}

export default function EducationalResult({ recommendation, onReset }: EducationalResultProps) {
  const getExplanation = (rec: string) => {
    switch (rec) {
      case 'Independent T-Test':
        return 'Used to compare the means of two independent groups in order to determine whether there is statistical evidence that the associated population means are significantly different.';
      case 'Paired T-Test':
        return 'Used to compare the means of two related groups (e.g., the same subjects measured before and after an intervention) to determine if there is a significant difference.';
      case 'One-Way ANOVA':
        return 'Used to determine whether there are any statistically significant differences between the means of three or more independent (unrelated) groups.';
      case 'Repeated Measures ANOVA':
        return 'The equivalent of the one-way ANOVA, but for related, not independent groups, and is the extension of the dependent t-test.';
      case 'Chi-Square Test of Independence':
        return 'Used to determine if there is a significant relationship between two nominal (categorical) variables.';
      default:
        return 'Your research design is complex and may require a mixed-methods approach, MANOVA, or specialized non-parametric testing.';
    }
  };

  const getAssumptions = (rec: string) => {
    if (rec.includes('T-Test') || rec.includes('ANOVA')) {
      return [
        'Data is normally distributed (or sample size is sufficiently large, N ≥ 30 per group).',
        'Variances across groups are roughly equal (Homogeneity of Variance evaluated via Levene\'s Test).',
        'Observations are independent across groups.'
      ];
    }
    if (rec.includes('Chi-Square')) {
      return [
        'Variables are categorical (nominal or ordinal).',
        'Mutually exclusive categories and independent observations.',
        'Expected frequencies should be at least 5 in 80% or more of contingency table cells.'
      ];
    }
    return ['Assumptions depend on the specific advanced or non-parametric test chosen.'];
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(197,160,89,0.22)] bg-[#141414] shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
      {/* Top Hero Banner */}
      <div className="relative border-b border-[rgba(197,160,89,0.18)] bg-[#0A0A0A] p-8 text-center text-white md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[#C5A059]/15 blur-3xl"
        />
        <p className="relative z-10 text-xs font-bold tracking-widest uppercase text-[#C5A059]">
          Methodological Recommendation
        </p>
        <h2 className="relative z-10 my-3 font-display text-3xl font-extrabold text-white md:text-5xl tracking-tight">
          {recommendation}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="relative z-10 mt-2 inline-flex items-center gap-1.5 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.08)] px-4 py-1.5 text-xs font-bold text-[#C5A059] transition-all hover:bg-[#C5A059] hover:text-[#0A0A0A]"
        >
          <span>&larr;</span> Run Another Query
        </button>
      </div>

      {/* Explanation & Assumptions */}
      <div className="p-6 sm:p-8 md:p-12 space-y-8">
        <div>
          <h3 className="mb-3 text-lg font-bold font-display text-white">
            Why this test applies to your design
          </h3>
          <p className="leading-relaxed text-[#AAAAAA] text-sm sm:text-base">
            {getExplanation(recommendation)}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold font-display text-white">
            Key Statistical Assumptions to Test
          </h3>
          <ul className="space-y-3">
            {getAssumptions(recommendation).map((assumption, idx) => (
              <li key={idx} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-[#0A0A0A] p-3.5">
                <span className="font-bold text-[#C5A059] shrink-0">✓</span>
                <span className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">{assumption}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consulting Cross-Link CTA */}
        <div className="rounded-2xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.05)] p-6 sm:p-8 text-center">
          <h4 className="mb-2 text-lg font-bold font-display text-white">
            Need Expert Assistance Running &amp; Interpreting This Test?
          </h4>
          <p className="mx-auto mb-6 max-w-lg text-xs sm:text-sm text-[#999999] leading-relaxed">
            Our empirical research consultants can run your complete dataset in SPSS, R, Python, or Stata, complete with APA-formatted output tables and publication-ready write-ups.
          </p>
          <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
            <Link
              href="/services"
              className="rounded-xl bg-[#C5A059] px-6 py-3 text-sm font-bold text-[#0A0A0A] shadow-[0_4px_16px_rgba(197,160,89,0.2)] transition-all hover:bg-[#D8B470]"
            >
              Consult a Data Analyst &rarr;
            </Link>
            <Link
              href="/research"
              className="rounded-xl border border-[rgba(197,160,89,0.25)] bg-[#0A0A0A] px-6 py-3 text-sm font-bold text-[#EAEAEA] transition-all hover:border-[#C5A059]"
            >
              Read Methodology Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
