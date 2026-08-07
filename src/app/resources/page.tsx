import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourcesHero from '@/features/resources/components/ResourcesHero';
import ResourcesClient from '@/components/ResourcesClient';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Free Resources | Cee Writing Hub',
  description: 'Free CV templates, SOP guides, scholarship checklists and writing tools for Nigerian students and professionals. 830+ downloads. No signup required.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Free Resources | Cee Writing Hub',
    description: 'Free CV templates, SOP guides, scholarship checklists and writing tools. 830+ downloads.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resources | Cee Writing Hub',
    description: 'Free CV templates, SOP guides, scholarship checklists and writing tools. 830+ downloads.',
  },
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  const allResources = resources || [];

  return (
    <main className="bg-bg-main min-h-screen text-text-primary selection:bg-gold/20 selection:text-gold">
      <Navbar />
      <ResourcesHero totalCount={allResources.length} />

      {/* SEO-friendly static resource list (hidden from view, visible to crawlers) */}
      <div className="sr-only" aria-hidden="true">
        {allResources.map((r: any) => (
          <div key={r.id}>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            {r.file_url && <a href={r.file_url}>Download {r.title}</a>}
          </div>
        ))}
      </div>

      {/* Interactive client component */}
      <ResourcesClient initialResources={allResources} />

      {/* Related hub links */}
      <section className="bg-bg-card py-24 px-6 lg:px-16 border-t border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="font-space text-[11px] font-bold tracking-[0.25em] uppercase text-gold/60 mb-4">
              Continue Learning
            </p>
            <h2 className="font-space text-2xl lg:text-3xl font-bold text-text-primary">
              Want to go deeper? Explore more.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/blog" className="btn-secondary !rounded-none !py-3 !px-6 !text-sm">
              Knowledge Hub
            </a>
            <a href="/services" className="btn-secondary !rounded-none !py-3 !px-6 !text-sm">
              Our Services
            </a>
            <a href="/scholarship-check" className="btn-secondary !rounded-none !py-3 !px-6 !text-sm">
              Scholarship Check
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
