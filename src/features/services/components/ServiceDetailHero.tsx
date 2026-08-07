import React from 'react';
import { ServiceDetail } from '../types';
import FlexibleCTA from './FlexibleCTA';

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <section className="relative w-full min-h-[70vh] bg-bg-main flex items-end overflow-hidden">
      
      {/* Background Image / Glow (Cinematic dark theme) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/90 to-bg-main/30" />
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-12 md:px-20 lg:px-32 pb-24 pt-48">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/20 font-space text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-8">
            {service.category}
          </div>
          
          <h1 className="font-space font-bold text-text-primary leading-[1.04] tracking-tight mb-8"
              style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
            {service.hero_title || service.name}
          </h1>
          
          <p className="font-inter text-text-muted text-[17px] leading-[1.9] mb-12 max-w-2xl font-light">
            {service.hero_subtitle || service.desc_text}
          </p>

          {/* Flexible CTA */}
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <FlexibleCTA 
              action={{ type: 'whatsapp', label: 'Order via WhatsApp' }} 
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 !py-4 px-8"
            />
            <FlexibleCTA 
              action={{ type: 'consultation', label: 'Book Consultation' }} 
              className="btn-secondary w-full sm:w-auto flex items-center justify-center !py-4 px-8"
            />
          </div>

          {/* Timeline & Expectations */}
          <div className="mt-16 pt-8 border-t border-gold/10 flex flex-wrap gap-x-10 gap-y-4 font-space text-[12px] font-bold uppercase tracking-widest text-text-muted/60">
            {service.estimated_duration && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gold rounded-full" />
                Est: {service.estimated_duration}
              </div>
            )}
            {service.starting_price && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gold rounded-full" />
                Starts at {service.starting_price}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gold rounded-full" />
              100% Confidential
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
