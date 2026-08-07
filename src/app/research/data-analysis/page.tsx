import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Analysis Hub | SPSS, R, Python, Stata',
  description: 'Master quantitative and qualitative data analysis. Software-specific methodologies, tutorials, and interpretation guides.',
  alternates: { canonical: 'https://ceewriting.com/research/data-analysis' },
};

export default function DataAnalysisHubPage({
  searchParams,
}: {
  searchParams: { software?: string }
}) {
  const selectedSoftware = searchParams.software || 'all';

  return (
    <main className="min-h-screen bg-sage/20">
      <Navbar />
      
      {/* Sub-Hub Hero */}
      <section className="pt-32 pb-24 bg-transparent border-b border-green-dark/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-green-dark/5 border border-green-dark/10">
            <span className="text-green-dark text-[10px] font-bold tracking-widest uppercase">
              Research Hub / Data Analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-6">
             Software-Specific Methodologies
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Select your statistical package to view tailored tutorials, data preparation guides, and result interpretation frameworks.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
             {['all', 'spss', 'r', 'python', 'excel'].map((software) => (
               <Link 
                  key={software}
                  href={`/research/data-analysis${software !== 'all' ? `?software=${software}` : ''}`}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    selectedSoftware === software 
                      ? 'bg-green-dark text-sage border-green-dark' 
                      : 'bg-transparent text-green-dark border-green-dark/20 hover:border-green-dark/50'
                  }`}
               >
                 {software.toUpperCase()}
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
           <div className="p-16 border-2 border-dashed border-green-dark/10 rounded-[32px] bg-transparent">
             <div className="text-5xl mb-6">📊</div>
             <h3 className="text-2xl font-serif font-bold text-green-dark mb-4">
               {selectedSoftware === 'all' ? 'Select a software package' : `${selectedSoftware.toUpperCase()} content loading...`}
             </h3>
             <p className="text-muted max-w-md mx-auto">
               We are currently migrating our software-specific tutorials into this new hub. 
               Check back soon for comprehensive {selectedSoftware !== 'all' ? selectedSoftware.toUpperCase() : 'analysis'} guides.
             </p>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
