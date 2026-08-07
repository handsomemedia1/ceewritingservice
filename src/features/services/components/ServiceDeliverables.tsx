import React from 'react';

interface ServiceDeliverablesProps {
  deliverables: string[];
}

export default function ServiceDeliverables({ deliverables }: ServiceDeliverablesProps) {
  if (!deliverables || deliverables.length === 0) return null;

  return (
    <section className="bg-bg-main border-t border-gold/10 py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-12 md:px-20 lg:px-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
          
          {/* Header */}
          <div>
            <span className="font-space text-[11px] font-bold tracking-[0.25em] uppercase text-gold/60 block mb-6">
              What You Get
            </span>
            <h2 className="font-space font-bold text-text-primary leading-[1.06] tracking-tight mb-6" style={{ fontSize: 'clamp(34px, 4vw, 48px)' }}>
              Clear, quantifiable <span className="text-gold">deliverables.</span>
            </h2>
          </div>

          {/* Deliverables List (Editorial List, no cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex flex-col border-t border-gold/15 pt-8">
                <span className="font-space text-[11px] font-bold tracking-widest text-gold/40 mb-4 block">
                  0{idx + 1}
                </span>
                <p className="font-inter text-text-primary text-[16px] leading-[1.7]">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
