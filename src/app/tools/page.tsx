import React from 'react';
import type { Metadata } from 'next';
import ToolsCatalog from '@/features/tools/components/ToolsCatalog';

export const metadata: Metadata = {
  title: 'Academic & Research Tools Workspace | Cee Writing',
  description: 'A workspace with practical academic and research tools, including GPA conversion, statistical test selection, and scholarship readiness.',
  alternates: { canonical: 'https://ceewriting.com/tools' },
};

export default function ToolsHubPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#edf2e9] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#4a6b48]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5b805e]" aria-hidden="true" />
            Cee Writing Workspace
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#1a231d] sm:text-4xl">
            Tools that move your work forward.
          </h1>
          <p className="mt-3 text-base leading-7 text-[#5c665f]">
            Start with what you need today. Each tool is designed to help you answer a specific question and make a more informed decision.
          </p>
        </div>
      </div>
      
      <ToolsCatalog />
    </div>
  );
}
