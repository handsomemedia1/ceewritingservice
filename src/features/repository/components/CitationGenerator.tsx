"use client";

import React, { useState } from 'react';
import { RepositoryPaper } from '../types';

interface CitationGeneratorProps {
  paper: RepositoryPaper;
}

type Format = 'APA' | 'MLA' | 'Chicago' | 'BibTeX' | 'RIS';

export default function CitationGenerator({ paper }: CitationGeneratorProps) {
  const [format, setFormat] = useState<Format>('APA');
  const [copied, setCopied] = useState(false);

  // Author formatting
  const authors = paper.authors || [];
  
  // Format dates
  const pubDate = new Date(paper.publication_date);
  const year = pubDate.getFullYear();
  const dateString = pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Generators
  const generateAPA = () => {
    const authorStr = authors.length > 0 
      ? authors.map(a => {
          const parts = a.name.split(' ');
          const last = parts.pop();
          const firstInitials = parts.map(p => p[0] + '.').join(' ');
          return `${last}, ${firstInitials}`;
        }).join(', & ')
      : 'Unknown Author';
      
    return `${authorStr} (${year}). ${paper.title}. Cee Writing Hub Repository. https://ceewriting.com/repository/paper/${paper.slug}`;
  };

  const generateMLA = () => {
    const authorStr = authors.length > 0
      ? authors.map((a, idx) => {
          const parts = a.name.split(' ');
          const last = parts.pop();
          const rest = parts.join(' ');
          return idx === 0 ? `${last}, ${rest}` : a.name;
        }).join(', and ')
      : 'Unknown Author';
      
    return `${authorStr}. "${paper.title}." Cee Writing Hub Repository, ${dateString}, https://ceewriting.com/repository/paper/${paper.slug}.`;
  };

  const generateChicago = () => {
    const authorStr = authors.length > 0
      ? authors.map((a, idx) => {
          const parts = a.name.split(' ');
          const last = parts.pop();
          const rest = parts.join(' ');
          return idx === 0 ? `${last}, ${rest}` : a.name;
        }).join(', and ')
      : 'Unknown Author';
      
    return `${authorStr}. "${paper.title}." Cee Writing Hub Repository. ${year}. https://ceewriting.com/repository/paper/${paper.slug}.`;
  };

  const generateBibTeX = () => {
    const authorStr = authors.map(a => a.name).join(' and ');
    return `@article{ceewriting${year}${paper.slug.substring(0,5)},
  title={${paper.title}},
  author={${authorStr}},
  year={${year}},
  journal={Cee Writing Hub Repository},
  url={https://ceewriting.com/repository/paper/${paper.slug}}
}`;
  };

  const generateRIS = () => {
    let ris = `TY  - JOUR\nT1  - ${paper.title}\n`;
    authors.forEach(a => {
      ris += `AU  - ${a.name}\n`;
    });
    ris += `PY  - ${year}\nJO  - Cee Writing Hub Repository\nUR  - https://ceewriting.com/repository/paper/${paper.slug}\nER  -`;
    return ris;
  };

  const getCitation = () => {
    switch (format) {
      case 'APA': return generateAPA();
      case 'MLA': return generateMLA();
      case 'Chicago': return generateChicago();
      case 'BibTeX': return generateBibTeX();
      case 'RIS': return generateRIS();
      default: return generateAPA();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCitation());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-sage/20 rounded-3xl p-8 border border-green-dark/10 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-green-dark">Cite this Paper</h3>
        
        <div className="flex flex-wrap gap-2">
          {['APA', 'MLA', 'Chicago', 'BibTeX', 'RIS'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt as Format)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${format === fmt ? 'bg-green-dark text-white' : 'bg-white text-green-dark border border-green-dark/20 hover:border-green-dark/40'}`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <pre className="p-6 bg-white rounded-xl border border-green-dark/10 text-sm text-green-dark whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
          {getCitation()}
        </pre>
        
        <button 
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-sage/20 hover:bg-green-dark/10 hover:text-green-dark text-green-dark/50 rounded-lg transition-colors"
          title="Copy Citation"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
}
