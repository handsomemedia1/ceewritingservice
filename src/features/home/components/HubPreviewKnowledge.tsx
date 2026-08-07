import React from 'react';
import Link from 'next/link';

export default function HubPreviewKnowledge() {
  return (
    <section className="py-24 bg-green-dark text-white relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-green-dark/70-light text-sm font-bold tracking-wider uppercase mb-4 block">The Knowledge Hub</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
              Struggling to structure your thesis or methodology?
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Navigating academic writing standards doesn't have to be overwhelming. Our Knowledge Hub provides free, peer-reviewed guides on everything from writing a compelling abstract to choosing the right statistical test.
            </p>
            <ul className="space-y-4 mb-10 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70-light mt-1">✓</span>
                <span>Step-by-step thesis structuring frameworks.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70-light mt-1">✓</span>
                <span>Academic formatting guides (APA, Harvard, Chicago).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70-light mt-1">✓</span>
                <span>Plagiarism prevention and ethical AI usage tips.</span>
              </li>
            </ul>
            <Link href="/blog" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-green-dark/10 text-green-dark font-bold hover:bg-green-dark/10-light transition-colors">
              Access Free Guides
            </Link>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-green-dark/10/10 blur-[80px] rounded-full" />
             <div className="relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                <div className="text-sm text-green-dark/70-light font-medium mb-4">Trending Now</div>
                <div className="space-y-4">
                  {[
                    "How to Write a First-Class Literature Review",
                    "Qualitative vs Quantitative: Choosing Your Approach",
                    "Understanding Turnitin Similarity Reports"
                  ].map((title, i) => (
                    <Link key={i} href="/blog" className="block p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/5 cursor-pointer">
                      <div className="font-serif font-bold text-lg mb-1">{title}</div>
                      <div className="text-xs text-white/50">Read guide →</div>
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
