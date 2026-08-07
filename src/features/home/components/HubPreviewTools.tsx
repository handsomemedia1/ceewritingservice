import React from 'react';

export default function HubPreviewTools() {
  const tools = [
    { name: "Academic Formatting Checker", icon: "📐" },
    { name: "Citation Generator", icon: "📝" },
    { name: "Word Count & Density", icon: "📊" },
    { name: "Turnitin Pre-Check", icon: "🔍" }
  ];

  return (
    <section className="py-24 bg-green-dark text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-green-dark/70-light font-bold tracking-wider uppercase mb-3 block text-sm">Professional Tools</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Automate your academic workflow.
          </h2>
          <p className="text-white/70 text-lg">
            Access our suite of free and premium tools designed to catch formatting errors before your professor does.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-[20px] p-6 text-center hover:bg-white/10 transition-colors cursor-not-allowed opacity-70">
              <div className="text-3xl mb-4">{tool.icon}</div>
              <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
              <div className="text-xs text-green-dark/70-light uppercase tracking-wider font-semibold">Coming Phase 3</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
