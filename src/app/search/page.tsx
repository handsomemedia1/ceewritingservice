import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientSearchWrapper from '@/features/search/components/ClientSearchWrapper';
import { performUnifiedSearch } from '@/features/search/utils/SearchEngine';

export const metadata: Metadata = {
  title: 'Search | Cee Writing Hub',
  description: 'Search across the entire Cee Writing Hub ecosystem including services, research guides, and scholarships.',
  robots: 'noindex, follow', // Do not index search results pages
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || '';
  
  // Phase 1 Search Engine Execution
  const results = query ? await performUnifiedSearch(query) : [];

  return (
    <main className="min-h-screen flex flex-col bg-sage/20">
      <Navbar />
      
      <div className="flex-grow">
        <ClientSearchWrapper initialQuery={query} results={results} />
      </div>

      <Footer />
    </main>
  );
}
