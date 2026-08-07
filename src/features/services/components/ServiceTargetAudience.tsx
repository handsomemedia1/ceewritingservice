import React from 'react';

interface ServiceTargetAudienceProps {
  audiences: string[];
}

export default function ServiceTargetAudience({ audiences }: ServiceTargetAudienceProps) {
  if (!audiences || audiences.length === 0) return null;

  return (
    <section className="py-24 bg-bg-card border-t border-gold/10">
      <div className="max-w-5xl mx-auto px-12 md:px-20 lg:px-32 text-center">
        <h2 className="font-space text-[28px] lg:text-[36px] font-bold text-text-primary mb-12">
          Who This Service Is For
        </h2>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {audiences.map((audience, idx) => (
            <div key={idx} className="px-8 py-4 bg-transparent border border-gold/20 font-inter text-text-primary text-[15px] hover:border-gold/50 transition-colors duration-300">
              {audience}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
