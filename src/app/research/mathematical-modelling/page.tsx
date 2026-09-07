import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

import FAQClient from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Mathematical Modelling Hub | MATLAB, Simulink, Systems Dynamics',
  description: 'Formulate, simulate, and analyze complex systems using differential equations, dynamic models, and optimization techniques.',
  alternates: { canonical: 'https://ceewriting.com/research/mathematical-modelling' },
};

const MATH_MODELLING_FAQS = [
  {
    category: 'Mathematical Modelling & Simulation',
    items: [
      { q: 'What tools do you support for mathematical modelling?', a: 'We primarily support MATLAB, Simulink, and Python libraries (like SciPy) for differential equations, optimization, and system dynamics.' },
      { q: 'Can you assist with building mathematical models from scratch?', a: 'Yes. We help researchers translate real-world problems into mathematical equations, ensuring robust formulation and realistic assumptions.' },
      { q: 'Do you cover epidemiological or financial modelling?', a: 'Yes, we provide methodology support for compartmental models (like SIR in epidemiology) as well as stochastic models and time-series forecasting in finance.' },
      { q: 'What is the difference between mathematical modelling and statistical analysis?', a: 'Statistical analysis finds patterns in existing data, while mathematical modelling constructs a theoretical mechanism (often using equations) to simulate how a system behaves, even with limited historical data.' },
      { q: 'Can you help interpret simulation results?', a: 'Absolutely. We help translate simulation outputs, phase portraits, and sensitivity analyses into academic insights suitable for your thesis or journal article.' },
    ]
  }
];

export default async function MathModellingHubPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>
}) {
  const params = await searchParams;
  const focus = params.focus || 'all';

  return (
    <main className="min-h-screen bg-sage/20">
      <Navbar />
      
      {/* Sub-Hub Hero */}
      <section className="pt-32 pb-24 bg-transparent border-b border-green-dark/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-green-dark/5 border border-green-dark/10">
            <span className="text-green-dark text-[10px] font-bold tracking-widest uppercase">
              Research Hub / Mathematical Modelling
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-6">
             Simulation & Systems Dynamics
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Learn how to formulate complex systems, run simulations in MATLAB/Simulink, and interpret dynamic model behaviors.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
             {['all', 'matlab', 'simulink', 'optimization', 'systems-dynamics', 'finance'].map((f) => (
               <Link 
                  key={f}
                  href={`/research/mathematical-modelling${f !== 'all' ? `?focus=${f}` : ''}`}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    focus === f 
                      ? 'bg-green-dark text-sage border-green-dark' 
                      : 'bg-transparent text-green-dark border-green-dark/20 hover:border-green-dark/50'
                  }`}
               >
                 {f.toUpperCase()}
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
           <div className="p-16 border-2 border-dashed border-green-dark/10 rounded-[32px] bg-transparent">
             <div className="text-5xl mb-6">📐</div>
             <h3 className="text-2xl font-serif font-bold text-green-dark mb-4">
               {focus === 'all' ? 'Mathematical Modelling content loading...' : `${focus.toUpperCase()} content loading...`}
             </h3>
             <p className="text-muted max-w-md mx-auto">
               We are currently curating advanced tutorials on differential equations, optimization, and system simulations. 
               Check back soon for comprehensive modelling guides.
             </p>
           </div>
        </div>
      </section>

      {/* Contextual FAQs */}
      <FAQClient faqs={MATH_MODELLING_FAQS} injectSchema={true} />

      <Footer />
    </main>
  );
}
