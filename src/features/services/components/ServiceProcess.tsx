import React from 'react';
import { ProcessStep } from '../types';

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="bg-bg-main border-t border-gold/10 py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-12 md:px-20 lg:px-32">
        
        <div className="text-center mb-24">
          <span className="font-space text-[11px] font-bold tracking-[0.25em] uppercase text-gold/60 block mb-6">
            Methodology
          </span>
          <h2 className="font-space font-bold text-text-primary leading-[1.06] tracking-tight mb-6" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
            Our <span className="text-gold">Process.</span>
          </h2>
          <p className="font-inter text-text-muted text-[17px] leading-[1.9] max-w-2xl mx-auto font-light">
            A transparent, step-by-step methodology ensuring absolute quality and confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col border-t border-gold/15 pt-8">
              <div className="font-space text-[14px] font-bold text-gold tracking-widest mb-6">
                STEP {step.step}
              </div>
              <h3 className="font-space text-[20px] font-bold text-text-primary mb-4 leading-snug">
                {step.title}
              </h3>
              <p className="font-inter text-text-muted text-[15px] leading-[1.85]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
