import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Features
import ResearchHero from '@/features/research/components/ResearchHero';
import ResearchRoadmaps from '@/features/research/components/ResearchRoadmaps';
import DataAnalysisMatrix from '@/features/research/components/DataAnalysisMatrix';
import ResearchToolsPreview from '@/features/research/components/ResearchToolsPreview';
import GlossaryPreview from '@/features/research/components/GlossaryPreview';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research Hub | Methodology & Data Analysis Guides',
  description: 'The definitive educational centre for research methodology and data analysis. Master SPSS, R, qualitative research, and more with our curated learning journeys.',
  alternates: { canonical: 'https://ceewriting.com/research' },
  openGraph: {
    title: 'Research Hub | Cee Writing Hub',
    description: 'Master research methodology and data analysis with our expert guides and tools.',
    type: 'website',
  }
};

const researchHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Research Hub',
  description: 'The definitive educational centre for research methodology and data analysis.',
  url: 'https://ceewriting.com/research',
  publisher: {
    '@type': 'Organization',
    name: 'Cee Writing Hub'
  }
};

export default async function ResearchHubPage() {
  const supabase = await createClient();
  
  // Fetch latest methodology guides to show in a feed
  const { data: latestGuides } = await supabase
    .from('blog_posts')
    .select('title, slug, read_time, difficulty, published_at')
    .in('topic_pillar', ['Research', 'Data Analysis'])
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(4);

  return (
    <main className="min-h-screen bg-sage/20">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchHubSchema) }} />
      
      <ResearchHero />
      <ResearchRoadmaps />
      
      {/* Latest Methodology Feed */}
      <section className="py-24 bg-transparent relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Latest Articles</span>
              <h2 className="text-3xl font-serif font-bold text-green-dark">
                Methodology & Insights
              </h2>
            </div>
            <Link href="/blog?topic=Research" className="text-sm font-semibold text-green-dark hover:text-green-dark/70 transition-colors">
              View All Research Guides →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {latestGuides && latestGuides.length > 0 ? (
              latestGuides.map((guide, idx) => (
                <Link key={idx} href={`/blog/${guide.slug}`} className="group p-6 rounded-none border border-green-dark/10 hover:border-green-dark/20/30 hover: transition-all block">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-green-dark/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-dark/60">
                      {guide.difficulty || 'Guide'}
                    </span>
                    <span className="text-xs text-muted font-medium">{guide.read_time || '5 min read'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-dark group-hover:text-green-dark/70 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <div className="text-sm font-semibold text-green-dark/70 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    Read Guide →
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center border border-dashed border-green-dark/20 rounded-none bg-sage/20">
                <p className="text-muted">No research guides published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <DataAnalysisMatrix />
      <ResearchToolsPreview />
      <GlossaryPreview />
      
      {/* Ecosystem Conversion Strip */}
      <section className="py-20 bg-green-dark text-sage text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-2xl font-serif font-bold mb-4">Need expert execution?</h2>
          <p className="text-sage/70 mb-8 leading-relaxed">
            If you're stuck on your methodology or struggling with statistical software, our consultants can jump in and deliver guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services" className="px-8 py-4 bg-green-dark/10 text-green-dark font-bold rounded-full hover:bg-green-dark/10-light transition-colors">
              Explore Research Services
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
