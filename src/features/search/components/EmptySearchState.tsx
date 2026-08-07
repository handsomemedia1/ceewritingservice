import React from 'react';
import Link from 'next/link';

export default function EmptySearchState({ query }: { query: string }) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-3xl font-serif font-bold text-green-dark mb-4">
          No direct matches found for "{query}"
        </h2>
        <p className="text-muted text-lg">
          We couldn't find exactly what you were looking for, but your journey doesn't stop here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Help / Contact CTA */}
        <div className="bg-green-dark rounded-3xl p-8 text-white relative overflow-hidden border border-green-dark-deep shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-dark/10/10 rounded-bl-full pointer-events-none" />
          <h3 className="text-2xl font-serif font-bold mb-4">Need Expert Assistance?</h3>
          <p className="text-white/70 leading-relaxed mb-8">
            Can't find the guide or service you need? Speak directly with our research consultants. We provide custom execution plans for complex academic challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/services#consultation" className="px-6 py-3 bg-green-dark/10 text-green-dark font-bold rounded-full text-center hover:bg-green-dark/10-light transition-colors">
              Book a Consultation
            </Link>
            <a href="https://wa.me/447738337770" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 text-white font-bold rounded-full text-center hover:bg-white/20 border border-white/20 transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Suggested Searches & Resources */}
        <div className="bg-white rounded-3xl p-8 border border-green-dark/10 shadow-sm">
          <h3 className="text-lg font-bold text-green-dark mb-6">Suggested Searches</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {['SPSS Data Analysis', 'Chevening Scholarship', 'Master\'s Thesis', 'Plagiarism Check', 'CV Writing'].map(suggestion => (
              <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} className="px-4 py-2 rounded-full bg-sage/20 text-green-dark text-sm font-semibold hover:bg-green-dark/10 hover:text-green-dark transition-colors border border-green-dark/5">
                {suggestion}
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-bold text-green-dark mb-4 border-t border-green-dark/10 pt-6">Popular Hubs</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/research" className="text-green-dark font-medium hover:text-green-dark/70 flex items-center justify-between group">
                <span>Research Methodology Guides</span>
                <span className="opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </Link>
            </li>
            <li>
              <Link href="/scholarship-check" className="text-green-dark font-medium hover:text-green-dark/70 flex items-center justify-between group">
                <span>Scholarship Readiness Check</span>
                <span className="opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-green-dark font-medium hover:text-green-dark/70 flex items-center justify-between group">
                <span>Professional Writing Services</span>
                <span className="opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
