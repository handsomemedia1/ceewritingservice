"use client";
import React from 'react';
import { ShieldCheck, Clock, Lock, Award, MessageCircle, Globe } from 'lucide-react';

export default function WhyUs() {
  const reasons = [
    { icon: <ShieldCheck size={24} strokeWidth={2} color="#C9933A" />, title: 'Real Turnitin Access', desc: 'We use the actual Turnitin platform, not free online tools.' },
    { icon: <Clock size={24} strokeWidth={2} color="#C9933A" />, title: 'Fast Delivery', desc: 'Most orders delivered within 24 hours. Same-day available.' },
    { icon: <Lock size={24} strokeWidth={2} color="#C9933A" />, title: '100% Confidential', desc: 'Your work stays private. We never share or reuse documents.' },
    { icon: <Award size={24} strokeWidth={2} color="#C9933A" />, title: 'Quality Guaranteed', desc: 'Not happy? We revise until you are. Satisfaction guaranteed.' },
    { icon: <MessageCircle size={24} strokeWidth={2} color="#C9933A" />, title: 'WhatsApp Orders', desc: 'No complicated forms. Just message us and we get to work.' },
    { icon: <Globe size={24} strokeWidth={2} color="#C9933A" />, title: 'Nigeria and International', desc: 'Serving clients across Nigeria and the diaspora.' },
  ];

  return (
    <section style={{
      padding: '100px 24px', background: 'var(--cream)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div className="why-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'center',
        }}>
          {/* Left - Text */}
          <div className="why-text" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div className="section-label" style={{color: 'var(--gold)'}}>Why Choose Us</div>
            <h2 className="section-title" style={{color: 'var(--navy)', textAlign: 'left'}}>
              What Makes Cee Writing <span style={{color: 'var(--gold)'}}>Different</span>
            </h2>
            <p className="section-subtitle" style={{color: 'var(--muted)', textAlign: 'left'}}>
              Not just another writing service. Here&apos;s what truly sets us apart.
            </p>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" className="btn-gold" style={{marginTop: '32px'}}>
              <span>💬 Get Started Now</span>
            </a>
          </div>

          {/* Right - Bento Grid */}
          <div className="why-cards" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
          }}>
            {reasons.map((r, i) => (
              <div key={i} className="glass-card-light" style={{
                padding: '26px 18px', textAlign: 'center',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(201,147,58,0.12), rgba(201,147,58,0.05))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', margin: '0 auto 12px',
                }}>
                  {r.icon}
                </div>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '14px',
                  color: 'var(--navy)', marginBottom: '6px', fontWeight: 700,
                }}>{r.title}</h4>
                <p style={{fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6}}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
