"use client";
import React from 'react';
import { Briefcase, GraduationCap, Bot } from 'lucide-react';
import { useCurrency } from '@/lib/CurrencyContext';
import { createClient } from '@/utils/supabase/client';

const hotServicesStyles = [
  { badge: '🔥 #1 Most Ordered', icon: <Briefcase size={42} strokeWidth={1.5} color="white" />, accent: 'linear-gradient(135deg, rgba(201,147,58,0.15), rgba(201,147,58,0.05))', features: ['ATS-optimized layout', 'Keyword targeting', 'Professional formatting', 'Free revisions included'] },
  { badge: '🎓 Admissions Favorite', icon: <GraduationCap size={42} strokeWidth={1.5} color="white" />, accent: 'linear-gradient(135deg, rgba(30,80,160,0.12), rgba(201,147,58,0.05))', features: ['University-specific targeting', 'Powerful narrative structure', 'Grammar & flow perfection', 'Plagiarism check included'] },
  { badge: '🤖 Trending Now', icon: <Bot size={42} strokeWidth={1.5} color="white" />, accent: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(201,147,58,0.05))', features: ['AI Content Humanizing', 'Full Turnitin Check', 'AI Detection Report', 'Official PDF Certificate'] },
];

export default function HotServices() {
  const [services, setServices] = React.useState<any[]>([]);
  const { formatPrice } = useCurrency();

  React.useEffect(() => {
    async function fetchPopular() {
      const supabase = createClient();
      const { data } = await supabase.from('services').select('*').eq('popular', true).limit(3);
      if (data) setServices(data);
    }
    fetchPopular();
  }, []);

  return (
    <section id="services" style={{
      background: 'linear-gradient(180deg, #061428, #0B1F3A 30%, #0B1F3A 70%, #0a1a30)',
      padding: '100px 24px', position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb" style={{width: '350px', height: '350px', background: 'rgba(201,147,58,0.12)', top: '20%', right: '-5%', filter: 'blur(80px)'}} />

      <div style={{maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2}}>
        <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <div className="section-label" style={{color: '#E8B96A', justifyContent: 'center'}}>Most In-Demand</div>
          <h2 className="section-title" style={{color: 'white'}}>
            Top Services People <span className="gradient-text">Order</span>
          </h2>
          <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.45)', margin: '0 auto'}}>
            These three are our most ordered, and our real Turnitin access makes us the best in Nigeria for them.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}} className="bento-grid">
          {services.map((svc, i) => {
            const style = hotServicesStyles[i % 3];
            const badge = svc.badge || style.badge;
            const features = (svc.features && svc.features.length > 0) ? svc.features : style.features;
            return (
              <div key={i} className="glass-card" style={{
                padding: '36px 28px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{position: 'absolute', inset: 0, background: style.accent, pointerEvents: 'none'}} />
                <div style={{position: 'relative', zIndex: 1}}>
                  <div style={{
                    display: 'inline-block', background: 'rgba(232,64,64,0.15)', color: '#ff6b6b',
                    fontSize: '11px', fontWeight: 700, padding: '5px 14px', borderRadius: '50px',
                    marginBottom: '20px',
                  }}>{badge}</div>
                  <div style={{fontSize: '42px', marginBottom: '16px'}}>{style.icon}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700,
                    color: 'white', marginBottom: '10px',
                  }}>{svc.name}</h3>
                  <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '24px'}}>
                    {svc.desc_text}
                  </p>
                  <ul style={{listStyle: 'none', marginBottom: '28px'}}>
                    {features.map((f: string, j: number) => (
                      <li key={j} style={{
                        fontSize: '13px', color: 'rgba(255,255,255,0.65)', padding: '5px 0',
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                        <span style={{color: '#E8B96A', fontSize: '12px'}}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: '6px',
                    padding: '16px 0 0', borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)'}}>From</span>
                    <span style={{
                      fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700,
                      color: '#E8B96A',
                    }}>{formatPrice(svc.price).formatted}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
          <path d="M0,40 C240,80 480,10 720,40 C960,70 1200,20 1440,50 L1440,80 L0,80Z" fill="#FDFAF5"/>
        </svg>
      </div>
    </section>
  );
}
