import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { glossaryData } from '@/features/research/data/glossary';

export const metadata = {
  title: 'Research Glossary & Methodology Dictionary | Cee Writing',
  description: 'Explore our comprehensive research glossary. Clear, practical definitions for research methodology, statistics, econometrics, and qualitative research terms.',
  alternates: {
    canonical: 'https://ceewriting.com/research/glossary',
  }
};

export default function GlossaryLandingPage({ searchParams }: { searchParams: { q?: string, category?: string } }) {
  const q = searchParams.q?.toLowerCase() || '';
  const categoryFilter = searchParams.category || '';

  // Get unique categories
  const categories = Array.from(new Set(glossaryData.map(t => t.category))).sort();

  // Filter terms
  const filteredTerms = glossaryData.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(q) || term.shortDefinition.toLowerCase().includes(q);
    const matchesCategory = categoryFilter ? term.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  // Group by first letter if no active search/category filter
  const isDefaultView = !q && !categoryFilter;
  
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryData>);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(ellipse at top, var(--gold), transparent 70%)' }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="section-label mb-4">Terminology</div>
          <h1 className="section-title text-text-primary mb-6">Research Glossary</h1>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Explore clear, practical definitions of research methodology, statistics, econometrics, qualitative research, and academic research concepts.
          </p>
          
          {/* Search Bar */}
          <form className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              name="q"
              defaultValue={searchParams.q}
              placeholder="Search terms (e.g., ANOVA, Hypothesis)..." 
              className="w-full bg-bg-card border border-[var(--border)] rounded-full py-4 pl-12 pr-6 text-text-primary focus:outline-none focus:border-gold transition-colors shadow-lg"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted">🔍</span>
            {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
          </form>
        </div>
      </section>

      <section className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12">
          
          {/* Sidebar / Categories */}
          <aside className="w-full md:w-64 shrink-0">
            <h2 className="text-xl font-serif font-bold text-gold mb-6">Categories</h2>
            <div className="flex flex-col gap-2">
              <Link 
                href="/research/glossary"
                className={`block py-2 px-4 rounded-lg transition-colors ${!categoryFilter ? 'bg-gold/10 text-gold border border-gold/20' : 'text-text-primary hover:bg-bg-card'}`}
              >
                All Terms
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat}
                  href={`/research/glossary?category=${encodeURIComponent(cat)}`}
                  className={`block py-2 px-4 rounded-lg transition-colors ${categoryFilter === cat ? 'bg-gold/10 text-gold border border-gold/20' : 'text-text-primary hover:bg-bg-card'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {(q || categoryFilter) ? (
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-text-primary mb-2">
                  {filteredTerms.length} Results {q && `for "${q}"`}
                </h2>
                <div className="section-divider mb-8" />
                
                {filteredTerms.length === 0 ? (
                  <div className="p-12 text-center bg-bg-card rounded-2xl border border-[var(--border)]">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <h3 className="text-xl text-text-primary mb-2">No terms found</h3>
                    <p className="text-muted mb-6">We couldn't find any glossary terms matching your criteria.</p>
                    <Link href="/research/glossary" className="btn-secondary">Clear Search</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTerms.map(term => (
                      <Link key={term.slug} href={`/research/glossary/${term.slug}`} className="glass-card p-6 block group">
                        <div className="text-xs text-gold uppercase tracking-widest mb-2">{term.category}</div>
                        <h3 className="text-xl font-serif font-bold text-text-primary mb-3 group-hover:text-gold transition-colors">{term.term}</h3>
                        <p className="text-sm text-muted line-clamp-3">{term.shortDefinition}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {letters.map(letter => (
                  <div key={letter} className="mb-12">
                    <h2 className="text-4xl font-serif font-bold text-gold mb-6 border-b border-[var(--border)] pb-2">{letter}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupedTerms[letter].map(term => (
                        <Link key={term.slug} href={`/research/glossary/${term.slug}`} className="group flex items-center gap-3 p-4 bg-bg-card rounded-xl border border-[var(--border)] hover:border-gold/40 hover:bg-gold/5 transition-all">
                          <span className="font-medium text-text-primary group-hover:text-gold transition-colors">{term.term}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
