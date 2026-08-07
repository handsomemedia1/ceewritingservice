import React from 'react';
import Link from 'next/link';

export default function GlossaryPreview() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <section className="py-24 bg-transparent relative border-t border-green-dark/5">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Terminology</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-4">
          The Research Glossary
        </h2>
        <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
          Confused by terms like "heteroscedasticity" or "ontology"? Search our definitive glossary of research and statistical terminology.
        </p>
        
        <div className="bg-sage/20 rounded-none p-8 border border-green-dark/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-green-dark text-sage text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
            Coming Soon
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8 opacity-50 pointer-events-none">
            {letters.map(letter => (
              <span key={letter} className="w-8 h-8 rounded-md bg-transparent border border-green-dark/10 flex items-center justify-center text-sm font-bold text-green-dark/70">
                {letter}
              </span>
            ))}
          </div>
          
          <div className="relative max-w-xl mx-auto opacity-50 pointer-events-none">
            <input 
              type="text" 
              placeholder="Search a term (e.g., ANOVA, Null Hypothesis)..." 
              className="w-full h-14 px-6 rounded-full bg-transparent border border-green-dark/10 outline-none"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
