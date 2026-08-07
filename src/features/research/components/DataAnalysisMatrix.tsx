import React from 'react';
import Link from 'next/link';

export default function DataAnalysisMatrix() {
  const tools = [
    { name: "SPSS", category: "Quantitative", active: true },
    { name: "R", category: "Quantitative", active: true },
    { name: "Python", category: "Quantitative", active: true },
    { name: "Stata", category: "Quantitative", active: false },
    { name: "EViews", category: "Quantitative", active: false },
    { name: "GenStat", category: "Quantitative", active: false },
    { name: "Excel", category: "Quantitative", active: true },
    { name: "NVivo", category: "Qualitative", active: false },
    { name: "ATLAS.ti", category: "Qualitative", active: false },
  ];

  return (
    <section className="py-24 bg-transparent relative border-t border-green-dark/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Data Analysis</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-4">
              Software-Specific Methodologies
            </h2>
            <p className="text-muted text-lg">
              Explore tutorials, interpretation guides, and troubleshooting steps tailored to your specific statistical package.
            </p>
          </div>
          <div>
            <Link href="/research/data-analysis" className="inline-flex items-center text-green-dark font-semibold hover:text-green-dark/70 transition-colors">
              Enter Data Analysis Hub <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tools.map((tool) => (
            <Link 
              key={tool.name} 
              href={tool.active ? `/research/data-analysis?software=${tool.name.toLowerCase()}` : '#'} 
              className={`block rounded-none p-6 text-center transition-all duration-300 border ${
                tool.active 
                  ? 'bg-sage/20 border-green-dark/10 hover:border-green-dark/20/50 hover: cursor-pointer group' 
                  : 'bg-transparent border-dashed border-green-dark/10 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="text-sm font-bold text-green-dark mb-1 group-hover:text-green-dark/70 transition-colors">{tool.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted">{tool.category}</div>
              {!tool.active && (
                <div className="mt-3 inline-block px-2 py-0.5 rounded-full bg-green-dark/5 text-[9px] font-bold text-green-dark/50 uppercase tracking-widest">
                  Coming Soon
                </div>
              )}
            </Link>
          ))}
          
          <div className="col-span-2 md:col-span-3 lg:col-span-1 rounded-none p-6 bg-green-dark text-sage text-center flex flex-col justify-center items-center border border-green-dark-deep">
             <div className="text-sm font-bold mb-2">Need it done for you?</div>
             <Link href="/services" className="text-xs text-green-dark/70 hover:text-green-dark/70-light underline underline-offset-4">
               Hire a Data Analyst
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
