import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RepositorySearch from '@/features/repository/components/RepositorySearch';
import PaperCard from '@/features/repository/components/PaperCard';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Research Repository | Cee Writing Hub',
  description: 'Discover, cite, and download open-access research papers, theses, and working papers published by the Cee Writing Hub academic community.',
  alternates: { canonical: '/repository' },
};

export default async function RepositoryHubPage({
  searchParams,
}: {
  searchParams: { q?: string; discipline?: string };
}) {
  const supabase = await createClient();
  const q = searchParams.q || '';
  const discipline = searchParams.discipline || '';

  // Start query for published papers
  let queryBuilder = supabase
    .from('repository_papers')
    .select('*')
    .eq('status', 'published')
    .order('publication_date', { ascending: false });

  // Apply search query if present (simple ilike for now)
  if (q) {
    queryBuilder = queryBuilder.ilike('title', `%${q}%`);
  }

  // Apply discipline filter if present
  if (discipline) {
    queryBuilder = queryBuilder.eq('discipline', discipline);
  }

  const { data: papers, error } = await queryBuilder;

  return (
    <main className="min-h-screen bg-gold/20 selection:bg-gold selection:text-text-primary flex flex-col font-sans text-text-primary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-bg-main text-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-widest text-gold border border-sage/20 bg-gold/5 mb-6">
            Open Access
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Research Repository
          </h1>
          <p className="text-lg md:text-xl text-gold/70 max-w-2xl mx-auto leading-relaxed font-light">
            Discover, cite, and download peer-reviewed research, working papers, and theses from our academic community.
          </p>
        </div>
      </section>

      <RepositorySearch />

      <section className="py-24 flex-grow">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="flex justify-between items-end mb-12 border-b border-border/10 pb-4">
            <h2 className="text-3xl font-serif font-bold text-text-primary">
              {q || discipline ? 'Search Results' : 'Latest Publications'}
            </h2>
            <div className="text-sm font-bold text-text-primary/60 hidden sm:block">
              Showing {papers?.length || 0} result{papers?.length !== 1 ? 's' : ''}
            </div>
          </div>

          {error ? (
            <div className="py-12 text-center text-red-600 border border-red-600/20 bg-red-50 p-6 rounded-none">
              <p className="font-bold">Unable to load repository data.</p>
              <p className="text-sm mt-2">{error.message}</p>
            </div>
          ) : papers && papers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {papers.map((paper: any) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-border/10 bg-bg-card">
              <p className="text-xl font-serif text-text-primary mb-4">No publications found.</p>
              <p className="text-text-primary/60">Try adjusting your search terms or discipline filter.</p>
            </div>
          )}

        </div>
      </section>

      {/* Call to Publish */}
      <section className="py-20 bg-bg-card border-y border-border/5 mt-auto">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-text-primary mb-6">Contribute to the Repository</h2>
          <p className="text-text-primary/70 text-lg mb-8 max-w-2xl mx-auto font-light">
            Have you completed an outstanding thesis, dissertation, or working paper? Publish it here to increase your visibility, get cited, and contribute to global knowledge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:publish@ceewriting.com" className="px-8 py-4 bg-bg-main text-gold font-bold hover:bg-gold hover:text-text-primary transition-colors">
              Submit Your Research
            </a>
            <a href="/services/academic-writing" className="px-8 py-4 bg-gold/20 text-text-primary font-bold hover:bg-gold/40 transition-colors">
              Need Help Formatting?
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
