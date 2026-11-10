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
import ComputationalResearchPreview from '@/features/research/components/ComputationalResearchPreview';
import { createClient } from '@/utils/supabase/public';
import Link from 'next/link';

import FAQClient from '@/components/FAQ';

export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Research Hub | Methodology & Data Analysis Guides',
  description: 'The definitive educational centre for research methodology and data analysis. Master SPSS, R, qualitative research, and more with our curated learning journeys.',
  alternates: { canonical: 'https://ceewriting.com/research' },
  openGraph: {
    title: 'Research Hub | Cee Writing',
    description: 'Master research methodology and data analysis with our expert guides and tools.',
    type: 'website',
  }
};

const RESEARCH_FAQS = [
  {
    category: 'Research Methodology Support',
    items: [
      { q: 'What research support does Cee Writing provide?', a: 'We provide end-to-end guidance for academic research, covering methodology formulation, gap identification, literature reviews, quantitative/qualitative analysis, and final chapter drafting.' },
      { q: 'Do you support quantitative and qualitative research?', a: 'Yes. Our quantitative support involves survey design and statistical modelling, while our qualitative support includes interview structuring and thematic analysis using tools like NVivo.' },
      { q: 'Do you support PhD research?', a: 'Yes, we specialize in high-level PhD research support. Our consultants have extensive experience aligning doctoral theses with strict institutional standards.' },
      { q: 'What statistical tools are supported?', a: 'We work extensively with SPSS, R, Python, Stata, and EViews to analyze empirical data and build complex models.' },
    ]
  }
];

const researchHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://ceewriting.com/research#page',
  name: 'Research Hub',
  description: 'The definitive educational centre for research methodology and data analysis.',
  url: 'https://ceewriting.com/research',
  publisher: {
    '@id': 'https://ceewriting.com/#organization',
  },
};

export default async function ResearchHubPage() {
  const supabase = await createClient();
  
  // Fetch latest methodology guides to show in a feed
  const { data: latestGuides } = await supabase
    .from('blog_posts')
    .select('title, slug, published_at, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(4);

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchHubSchema) }} />
      
      <ResearchHero />
      <ResearchRoadmaps />
      
      {/* Latest Methodology Feed */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(180deg, #0d0d12 0%, #0A0A0A 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
                Latest Articles
              </div>
              <div className="section-divider" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                Methodology &amp; Insights
              </h2>
            </div>
            <Link href="/blog?topic=Research" style={{ fontSize: '13px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}>
              View All Research Guides →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {latestGuides && latestGuides.length > 0 ? (
              latestGuides.map((guide, idx) => (
                <Link key={idx} href={`/blog/${guide.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '50px', background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#C5A059' }}>Guide</span>
                      <span style={{ fontSize: '11px', color: 'rgba(234,234,234,0.35)', fontWeight: 500 }}>5 min read</span>
                    </div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: '16px', flex: 1 }}>
                      {guide.title}
                    </h3>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Read Guide →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', borderRadius: '20px', border: '1px dashed rgba(197,160,89,0.12)' }}>
                <p style={{ color: 'rgba(234,234,234,0.35)', fontSize: '15px' }}>No research guides published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <DataAnalysisMatrix />
      <ComputationalResearchPreview />
      <ResearchToolsPreview />
      <GlossaryPreview />
      
      {/* Contextual FAQs */}
      <FAQClient faqs={RESEARCH_FAQS} injectSchema={true} />
      
      {/* CTA Strip */}
      <section style={{
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.03) 100%)',
        borderTop: '1px solid rgba(197,160,89,0.12)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Need expert execution?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.8, marginBottom: '36px' }}>
            If you are stuck on your methodology or struggling with statistical software, our consultants can jump in and deliver guaranteed results.
          </p>
          <Link href="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #C5A059, #D8B470)',
            color: '#0A0A0A', padding: '14px 32px', borderRadius: '8px',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', boxShadow: '0 8px 32px rgba(197,160,89,0.25)',
          }}>
            Explore Research Services
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
