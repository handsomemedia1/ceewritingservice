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
    <div className="w-full max-w-6xl mx-auto px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      {/* App Workspace Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[rgba(197,160,89,0.14)] pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C5A059]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
            Decision &amp; Analysis Instruments
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Tools that move your research forward.
          </h1>
          <p className="mt-3.5 text-base leading-relaxed text-[#999999] sm:text-lg">
            Purpose-built academic utilities for students and scholars. Calculate conversion metrics, determine appropriate statistical tests, and evaluate scholarship readiness.
          </p>
        </div>
        
        {/* Quick Help Status */}
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-[rgba(197,160,89,0.18)] bg-[#141414] px-4 py-2.5 text-xs text-[#999999]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <span>Interactive Calculators Active</span>
        </div>
      </div>
      
      {/* Tools Catalog Component */}
      <ToolsCatalog />
    </div>
  );
}
