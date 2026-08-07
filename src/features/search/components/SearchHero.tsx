"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchCategory } from '../types';
import { trackSearchRefinement } from '../utils/searchAnalytics';

interface SearchHeroProps {
  initialQuery: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: string[];
}

export default function SearchHero({ initialQuery, activeFilter, onFilterChange, filters }: SearchHeroProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== initialQuery) {
      if (initialQuery) {
        trackSearchRefinement(initialQuery, query, activeFilter);
      }
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="pt-32 pb-12 bg-green-dark text-white relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-dark/10/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          Search the Ecosystem
        </h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-8">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-green-dark/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search methodology, services, scholarships..."
            className="w-full h-16 pl-14 pr-32 rounded-full bg-white text-green-dark placeholder-navy/40 outline-none focus:ring-4 ring-gold/30 text-lg shadow-xl"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 px-8 rounded-full bg-green-dark text-white font-bold hover:bg-green-dark-mid transition-colors"
          >
            Search
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                activeFilter === filter 
                  ? 'bg-green-dark/10 text-green-dark border-green-dark/20' 
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
