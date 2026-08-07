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
    <div className="bg-white rounded-3xl overflow-hidden border border-green-dark/10 shadow-xl">
      <div className="p-8 md:p-12 text-center bg-green-dark text-white relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-navy to-navy pointer-events-none" />
        <p className="text-white/70 font-semibold mb-2 relative z-10">Based on your variables, we recommend:</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-dark/70 mb-6 relative z-10">{recommendation}</h2>
        <button onClick={onReset} className="relative z-10 text-sm font-bold text-white hover:text-green-dark/70 transition-colors">
          ↺ Start Over
        </button>
      </div>

      <div className="p-8 md:p-12">
        <h3 className="text-xl font-bold text-green-dark mb-4">Why this test?</h3>
        <p className="text-muted leading-relaxed mb-8">{getExplanation(recommendation)}</p>

        <h3 className="text-xl font-bold text-green-dark mb-4">Key Assumptions to Check First</h3>
        <ul className="space-y-3 mb-10">
          {getAssumptions(recommendation).map((assumption, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-green-dark/70 font-bold">✓</span>
              <span className="text-muted">{assumption}</span>
            </li>
          ))}
        </ul>

        {/* Ecosystem Cross-Link CTA */}
        <div className="bg-sage/20 rounded-2xl p-8 border border-green-dark/5 text-center">
          <h4 className="text-lg font-bold text-green-dark mb-2">Need Expert Assistance?</h4>
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            Our data analysis consultants can run this test for you using SPSS, R, or Python, complete with full interpretation for your thesis or journal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/data-analysis" className="px-6 py-3 bg-green-dark text-white font-bold rounded-xl hover:bg-green-dark-mid transition-colors">
              View Data Analysis Service
            </Link>
            <Link href="/research/data-analysis" className="px-6 py-3 bg-white border border-green-dark/10 text-green-dark font-bold rounded-xl hover:bg-sage/20 transition-colors">
              Read DIY Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
