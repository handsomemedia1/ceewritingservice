import React from 'react';
import { TrustIndicator } from '../types';

interface ServiceTrustProps {
  trustIndicators: TrustIndicator[];
}

export default function ServiceTrust({ trustIndicators }: ServiceTrustProps) {
  // Fallback default trust indicators if none provided
  const items = trustIndicators && trustIndicators.length > 0 ? trustIndicators : [
    { icon: '🔒', title: '100% Confidential', desc: 'Strict non-disclosure agreements for all client data and documents.' },
    { icon: '👤', title: 'Human Review', desc: 'Every document undergoes rigorous multi-stage human review.' },
    { icon: '🛡️', title: 'Plagiarism Free', desc: 'Verified with genuine Turnitin similarity reports.' }
  ];

  return (
    <section className="py-24 bg-bg-card border-y border-gold/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24 items-start">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col border-t border-gold/15 pt-8 group">
              <div className="text-3xl mb-6 opacity-70 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-space font-bold text-[20px] text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="font-inter text-[15px] text-text-muted leading-[1.8]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
