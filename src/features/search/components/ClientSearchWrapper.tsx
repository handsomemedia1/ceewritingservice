"use client";

import React, { useState, useEffect } from 'react';
import SearchHero from './SearchHero';
import SearchResults from './SearchResults';
import EmptySearchState from './EmptySearchState';
import { SearchResult, SearchCategory } from '../types';
import { trackSearchQuery } from '../utils/searchAnalytics';

interface ClientSearchWrapperProps {
  initialQuery: string;
  results: SearchResult[];
}

const FILTERS: SearchCategory[] = ['All', 'Knowledge Hub', 'Services', 'Resources', 'Scholarships'];

export default function ClientSearchWrapper({ initialQuery, results }: ClientSearchWrapperProps) {
  const [activeFilter, setActiveFilter] = useState<SearchCategory>('All');
  
  // Track the initial search execution
  useEffect(() => {
    if (initialQuery) {
      trackSearchQuery(initialQuery, results.length);
    }
  }, [initialQuery, results.length]);

  const filteredResults = activeFilter === 'All' 
    ? results 
    : results.filter(r => r.type === activeFilter);

  return (
    <>
      <SearchHero 
        initialQuery={initialQuery}
        activeFilter={activeFilter}
        onFilterChange={(f) => setActiveFilter(f as SearchCategory)}
        filters={FILTERS}
      />
      
      <section className="py-24 bg-gold/20 min-h-[50vh]">
        <div className="container mx-auto px-6 max-w-5xl">
          {!initialQuery ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif font-bold text-text-primary mb-4">Enter a search term to begin</h2>
              <p className="text-muted">Use the search bar above to explore the Cee Writing Hub ecosystem.</p>
            </div>
          ) : results.length === 0 ? (
            <EmptySearchState query={initialQuery} />
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-text-primary">
                  Search Results <span className="text-muted text-lg font-normal ml-2">({filteredResults.length})</span>
                </h2>
                {activeFilter !== 'All' && (
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className="text-sm font-bold text-text-primary/70 hover:text-text-primary transition-colors"
                  >
                    Clear Filter ✕
                  </button>
                )}
              </div>
              
              {filteredResults.length === 0 ? (
                 <div className="text-center py-12 bg-bg-card rounded-3xl border border-border/10">
                   <h3 className="text-lg font-bold text-text-primary mb-2">No {activeFilter} found for "{initialQuery}"</h3>
                   <button onClick={() => setActiveFilter('All')} className="text-text-primary/70 font-bold hover:underline">
                     View all {results.length} results
                   </button>
                 </div>
              ) : (
                <SearchResults query={initialQuery} results={filteredResults} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
