"use client";

import React, { useState } from 'react';
import { FAQ } from '../types';

interface ServiceFAQsProps {
  faqs: FAQ[];
}

export default function ServiceFAQs({ faqs }: ServiceFAQsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-28 lg:py-36 bg-bg-main border-t border-gold/10">
      <div className="max-w-3xl mx-auto px-12 md:px-20 lg:px-32">
        <div className="text-center mb-20">
          <span className="font-space text-[11px] font-bold tracking-[0.25em] uppercase text-gold/60 block mb-6">
            FAQ
          </span>
          <h2 className="font-space font-bold text-text-primary leading-[1.06] tracking-tight mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Frequently Asked <span className="text-gold">Questions.</span>
          </h2>
          <p className="font-inter text-text-muted text-[17px] leading-[1.9] max-w-xl mx-auto font-light">
            Clear answers to your most pressing questions.
          </p>
        </div>

        <div className="space-y-0 border-t border-gold/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-gold/15 transition-all"
              >
                <button
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span className="font-space text-[20px] font-bold text-text-primary pr-8 group-hover:text-gold transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className={`text-gold/60 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pb-8 pr-12 font-inter text-[16px] text-text-muted leading-[1.8] font-light">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
