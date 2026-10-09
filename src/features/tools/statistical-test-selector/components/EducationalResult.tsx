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
        'Data is normally distributed (or sample size is large enough).',
        'Variances across groups are roughly equal (Homogeneity of Variance).',
        'Observations are independent.'
      ];
    }
    if (rec.includes('Chi-Square')) {
      return [
        'Variables are categorical (nominal or ordinal).',
        'Observations are independent.',
        'Expected frequencies should be at least 5 in most cells.'
      ];
    }
    return ['Assumptions depend on the specific advanced test chosen.'];
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d1d9cd] bg-white shadow-sm">
      <div className="relative bg-[#244633] p-8 text-center text-white md:p-12">
        <p className="relative z-10 mb-2 font-semibold text-[#a2b29e]">Based on your variables, we recommend:</p>
        <h2 className="relative z-10 mb-6 font-display text-4xl font-bold md:text-5xl">{recommendation}</h2>
        <button onClick={onReset} className="relative z-10 text-sm font-bold text-[#c5a059] transition-colors hover:text-[#d8b470]">
          ← Start Over
        </button>
      </div>

      <div className="p-8 md:p-12">
        <h3 className="mb-4 text-xl font-bold text-[#1a231d]">Why this test?</h3>
        <p className="mb-8 leading-relaxed text-[#5c665f]">{getExplanation(recommendation)}</p>

        <h3 className="mb-4 text-xl font-bold text-[#1a231d]">Key Assumptions to Check First</h3>
        <ul className="mb-10 space-y-3">
          {getAssumptions(recommendation).map((assumption, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="font-bold text-[#4a6b48]">✓</span>
              <span className="text-[#5c665f]">{assumption}</span>
            </li>
          ))}
        </ul>

        {/* Ecosystem Cross-Link CTA */}
        <div className="rounded-2xl border border-[#e8efe5] bg-[#fcfbf9] p-8 text-center">
          <h4 className="mb-2 text-lg font-bold text-[#1a231d]">Need Expert Assistance?</h4>
          <p className="mx-auto mb-6 max-w-md text-sm text-[#5c665f]">
            Our data analysis consultants can run this test for you using SPSS, R, or Python, complete with full interpretation for your thesis or journal.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/services" className="rounded-xl bg-[#244633] px-6 py-3 font-bold text-white transition-colors hover:bg-[#1b3425]">
              View Data Analysis Service
            </Link>
            <Link href="/research" className="rounded-xl border border-[#d1d9cd] bg-white px-6 py-3 font-bold text-[#1a231d] transition-colors hover:bg-[#edf2e9]">
              Read DIY Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
