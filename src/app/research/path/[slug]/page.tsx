import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  // Format slug to title (e.g., first-project -> First Project)
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: `${title} | Research Learning Path`,
    description: `A curated learning journey for ${title}.`,
  };
}

export default async function LearningPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="min-h-screen bg-gold/20 flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-transparent border-b border-border/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-bg-main/5 border border-border/10">
            <span className="text-text-primary text-[10px] font-bold tracking-widest uppercase">
              Learning Journey
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
             {title}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            This roadmap is currently being curated by our methodology experts.
          </p>
        </div>
      </section>

      <section className="flex-grow flex items-center justify-center py-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="p-16 border-2 border-dashed border-border/10 rounded-[32px] bg-transparent">
             <div className="text-5xl mb-6">🗺️</div>
             <h3 className="text-2xl font-serif font-bold text-text-primary mb-4">
               Roadmap in Development
             </h3>
             <p className="text-muted max-w-md mx-auto mb-8">
               We are assembling the best guides, templates, and tools to create a step-by-step pathway for this journey.
             </p>
             <Link href="/research" className="text-sm font-bold text-text-primary/70 hover:text-text-primary/70-light transition-colors underline underline-offset-4">
               Back to Research Hub
             </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
