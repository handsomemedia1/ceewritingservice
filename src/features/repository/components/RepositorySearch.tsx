"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RepositorySearch() {
  const [query, setQuery] = useState('');
  const [discipline, setDiscipline] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (discipline) params.set('discipline', discipline);
    
    router.push(`/repository?${params.toString()}`);
  };

  return (
    <div className="bg-white border-y border-green-dark/10 py-8 relative z-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-0 border border-green-dark/20 rounded-none bg-white">
          <div className="flex-grow relative flex items-center">
            <span className="absolute left-4 text-green-dark/40">🔍</span>
            <input 
              type="text" 
              placeholder="Search papers, authors, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-green-dark placeholder:text-green-dark/40"
            />
          </div>
          
          <div className="w-px bg-green-dark/20 hidden sm:block"></div>
          
          <select 
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className="px-4 py-4 bg-transparent border-t sm:border-t-0 sm:border-none outline-none text-green-dark"
          >
            <option value="">All Disciplines</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Public Health">Public Health</option>
            <option value="Education">Education</option>
            <option value="Economics">Economics</option>
          </select>
          
          <button type="submit" className="px-8 py-4 bg-green-dark text-sage font-bold hover:bg-sage hover:text-green-dark transition-colors whitespace-nowrap">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
