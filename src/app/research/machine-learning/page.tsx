import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

import FAQClient from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Machine Learning Hub | Python, TensorFlow, Scikit-learn',
  description: 'Advanced predictive analytics, deep learning models, and algorithm design methodologies for computational research.',
  alternates: { canonical: 'https://ceewriting.com/research/machine-learning' },
};

const MACHINE_LEARNING_FAQS = [
  {
    category: 'Machine Learning & Predictive Analysis',
    items: [
      { q: 'What machine learning frameworks do you support?', a: 'We primarily support Python-based frameworks including Scikit-learn for traditional ML, and TensorFlow and PyTorch for deep learning models.' },
      { q: 'Can you help design predictive models for my PhD?', a: 'Yes. We assist in structuring the methodology, selecting the right algorithms (e.g., Random Forests, SVM, Neural Networks), and validating the models against your dataset.' },
      { q: 'Do you help with Natural Language Processing (NLP)?', a: 'Yes, we provide methodology support for NLP tasks such as sentiment analysis, topic modeling, and text classification using modern transformer architectures.' },
      { q: 'How does ML differ from traditional statistical modelling?', a: 'Traditional statistics focuses on inference (understanding relationships between variables), whereas machine learning prioritizes prediction and pattern recognition in large, complex datasets.' },
      { q: 'Can you write the code for my model?', a: 'We provide comprehensive guidance on model architecture and script structuring. If you need bespoke execution, our consultants can provide specialized coding services.' },
    ]
  }
];

export default async function MachineLearningHubPage({
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
              Research Hub / Machine Learning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-6">
             Predictive Analytics & Deep Learning
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Explore advanced computational methodologies, algorithm selection strategies, and predictive modeling tutorials.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
             {['all', 'python', 'scikit-learn', 'tensorflow', 'pytorch', 'nlp'].map((f) => (
               <Link 
                  key={f}
                  href={`/research/machine-learning${f !== 'all' ? `?focus=${f}` : ''}`}
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
             <div className="text-5xl mb-6">🤖</div>
             <h3 className="text-2xl font-serif font-bold text-green-dark mb-4">
               {focus === 'all' ? 'Machine Learning content loading...' : `${focus.toUpperCase()} content loading...`}
             </h3>
             <p className="text-muted max-w-md mx-auto">
               We are currently migrating our advanced computational tutorials into this new hub. 
               Check back soon for comprehensive algorithm guides and predictive modelling methodologies.
             </p>
           </div>
        </div>
      </section>

      {/* Contextual FAQs */}
      <FAQClient faqs={MACHINE_LEARNING_FAQS} injectSchema={true} />

      <Footer />
    </main>
  );
}
