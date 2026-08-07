"use client";

import React from 'react';
import Link from 'next/link';
import { SearchResult } from '../types';
import { trackSearchResultClick } from '../utils/searchAnalytics';

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  const getBadgeStyle = (type: string) => {
    switch(type) {
      case 'Knowledge Hub': return 'bg-green-dark text-white border-green-dark';
      case 'Services': return 'bg-green-dark/10 text-green-dark border-green-dark/20';
      case 'Resources': return 'bg-green-100 text-green-900 border-green-200';
      case 'Scholarships': return 'bg-purple-100 text-purple-900 border-purple-200';
      default: return 'bg-gray-100 text-gray-900 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {results.map((result, idx) => (
        <div key={`${result.type}-${result.id}`} className="group block">
          <div className="bg-white rounded-[24px] p-6 md:p-8 border border-green-dark/10 hover:border-green-dark/20/30 hover:shadow-[0_15px_30px_rgba(11,31,58,0.06)] transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getBadgeStyle(result.type)}`}>
                    {result.type}
                  </span>
                  
                  {result.category && (
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                      {result.category}
                    </span>
                  )}
                  
                  {result.difficulty && (
                    <span className="text-[10px] font-bold text-green-dark/50 uppercase tracking-widest border border-green-dark/10 px-2 py-0.5 rounded-md">
                      {result.difficulty}
                    </span>
                  )}
                </div>

                <Link 
                  href={result.url}
                  onClick={() => trackSearchResultClick(query, result.id, result.type, result.title, idx + 1)}
                  className="block"
                >
                  <h3 className="text-2xl font-serif font-bold text-green-dark mb-3 group-hover:text-green-dark/70 transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-3xl line-clamp-2">
                    {result.description}
                  </p>
                </Link>
                
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted font-medium">
                  {result.readTime && <span>⏱ {result.readTime}</span>}
                  {result.lastUpdated && <span>📅 {result.lastUpdated}</span>}
                  <Link 
                    href={result.url}
                    onClick={() => trackSearchResultClick(query, result.id, result.type, result.title, idx + 1)}
                    className="text-green-dark font-bold hover:text-green-dark/70 transition-colors ml-auto"
                  >
                    View Result →
                  </Link>
                </div>
              </div>
              
              {/* Optional Icon Block */}
              <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-2xl bg-sage/20 items-center justify-center text-3xl border border-green-dark/5 group-hover:bg-green-dark/10/5 transition-colors">
                {result.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
