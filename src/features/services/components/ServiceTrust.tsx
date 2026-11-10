import React from 'react';
import { TrustIndicator } from '../types';
import { IconTile, type IconName } from '@/components/icons/Icon';

interface ServiceTrustProps {
  trustIndicators: TrustIndicator[];
}

const TRUST_GLYPHS: Record<string, IconName> = { lock: 'lock', eye: 'eye', shield: 'shield', clock: 'clock', check: 'checkCircle', star: 'star', document: 'document' };

/** Trust items may come from the database with older emoji or free-text icon values. */
function trustGlyph(value: string): IconName {
  return TRUST_GLYPHS[value] ?? 'shield';
}

export default function ServiceTrust({ trustIndicators }: ServiceTrustProps) {
  // Fallback default trust indicators if none provided
  const items = trustIndicators && trustIndicators.length > 0 ? trustIndicators : [
    { icon: 'lock', title: '100% Confidential', desc: 'Strict non-disclosure agreements for all client data and documents.' },
    { icon: 'eye', title: 'Human Review', desc: 'Every document undergoes rigorous multi-stage human review.' },
    { icon: 'shield', title: 'Plagiarism Free', desc: 'Verified with genuine Turnitin similarity reports.' }
  ];

  return (
    <section className="py-24 bg-bg-card border-y border-gold/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-20 items-start">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col border-t border-gold/15 pt-8 group">
              <div className="mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                <IconTile name={trustGlyph(item.icon)} size={48} />
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
