import React from 'react';
import { PricingTier } from '../types';
import FlexibleCTA from './FlexibleCTA';

interface ServicePricingProps {
  tiers: PricingTier[];
}

export default function ServicePricing({ tiers }: ServicePricingProps) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <section className="bg-bg-card border-t border-gold/10 py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-12 md:px-20 lg:px-32">
        
        <div className="mb-24 pb-12 border-b border-gold/10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="font-space text-[11px] font-bold tracking-[0.25em] uppercase text-gold/60 block mb-6">
              Transparent Value
            </span>
            <h2 className="font-space font-bold text-text-primary leading-[1.06] tracking-tight" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
              Pricing &amp; <span className="text-gold">Timelines.</span>
            </h2>
          </div>
          <p className="font-inter text-text-muted text-[16px] leading-[1.8] max-w-sm">
            Clear pricing based on your required turnaround time and project scope. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {tiers.map((tier, idx) => (
            <div key={idx} className="flex flex-col relative">
              {tier.isPopular && (
                <div className="absolute -top-10 left-0 font-space text-[10px] font-bold tracking-[0.25em] uppercase text-gold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                  Most Popular
                </div>
              )}
              
              <div className="border-b border-gold/10 pb-8 mb-8">
                <h3 className="font-space text-[24px] font-bold text-text-primary mb-4">{tier.name}</h3>
                <div className="font-space text-[48px] font-bold text-gold mb-3 leading-none">{tier.price}</div>
                <div className="font-space text-[11px] font-bold tracking-widest uppercase text-text-muted/60">
                  Delivery: {tier.timeline}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <span className="text-gold mt-1 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-inter text-[15px] text-text-muted leading-[1.7]">{feature}</span>
                  </li>
                ))}
              </ul>

              <FlexibleCTA 
                action={{ type: 'whatsapp', label: 'Select Plan' }} 
                className={`w-full py-5 text-center font-space text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  tier.isPopular ? 'bg-gold text-bg-main hover:bg-gold/90' : 'border border-gold/20 text-text-primary hover:border-gold hover:text-gold'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
