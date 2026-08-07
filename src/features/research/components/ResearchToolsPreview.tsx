import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function ResearchToolsPreview() {
  const tools = [
    {
      title: "Statistical Test Selector",
      desc: "Answer a few questions about your variables and get a recommendation on which test to run.",
      icon: "🎯"
    },
    {
      title: "Sample Size Calculator",
      desc: "Determine the exact sample size needed for your population, margin of error, and confidence level.",
      icon: "🔢"
    },
    {
      title: "Methodology Builder",
      desc: "Interactive tool to help structure your research design, philosophy, and approach.",
      icon: "🏗️"
    }
  ];

  return (
    <section className="py-24 bg-sage/20 relative border-t border-green-dark/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Interactive Tools</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-4">
            Research Decision Tools
          </h2>
          <p className="text-muted text-lg">
            Remove the guesswork from your research design. (Tools currently in development)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <Card key={idx} variant="solid" className="p-8 flex flex-col bg-transparent border-dashed border-green-dark/15 relative overflow-hidden opacity-70">
               {/* Coming Soon Banner */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-dark/5 text-green-dark/50 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Coming Soon
              </div>
              
              <div className="text-4xl mb-6 grayscale">{tool.icon}</div>
              <h3 className="text-xl font-bold text-green-dark mb-3">{tool.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {tool.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
