import React from 'react';
import Link from 'next/link';

export default function ComputationalResearchPreview() {
  const hubs = [
    {
      title: 'Machine Learning',
      desc: 'Predictive analytics, deep learning models, and algorithm design for advanced computational research.',
      href: '/research/machine-learning',
      icon: '🤖',
      tools: ['Python', 'TensorFlow', 'Scikit-learn', 'PyTorch']
    },
    {
      title: 'Mathematical Modelling',
      desc: 'Formulate, simulate, and analyze complex systems using differential equations and dynamic models.',
      href: '/research/mathematical-modelling',
      icon: '📐',
      tools: ['MATLAB', 'Simulink', 'Optimization', 'Systems Dynamics']
    }
  ];

  return (
    <section className="py-24 bg-sage/20 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-3 block text-sm">Advanced Research</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-4">
              Computational & Predictive Hubs
            </h2>
            <p className="text-muted text-lg">
              Push the boundaries of your PhD research with advanced machine learning architectures and robust mathematical simulations.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {hubs.map((hub) => (
            <div key={hub.title} className="bg-transparent border-2 border-green-dark/10 hover:border-green-dark/30 transition-all p-8 flex flex-col h-full rounded-none">
              <div className="w-16 h-16 rounded-full bg-green-dark/5 flex items-center justify-center text-3xl mb-6">
                {hub.icon}
              </div>
              <h3 className="text-2xl font-bold font-serif text-green-dark mb-3">{hub.title}</h3>
              <p className="text-muted leading-relaxed mb-6 flex-grow">{hub.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {hub.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 bg-white border border-green-dark/10 rounded-full text-xs font-bold text-green-dark/70">
                    {tool}
                  </span>
                ))}
              </div>

              <Link href={hub.href} className="mt-auto inline-flex items-center text-sm font-bold text-green-dark hover:text-green-dark/70 transition-colors uppercase tracking-wider">
                Enter {hub.title} Hub <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
