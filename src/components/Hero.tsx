"use client";
import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, Lock, ClipboardCheck, Bot, PenTool, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background Image Slider (Full Bleed) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, display: 'flex',
        animation: 'heroImgScroll 90s linear infinite', width: 'max-content',
      }}>
        {[
          '/images/hero/bg1.png',
          '/images/hero/1.png',
          '/images/hero/2.png',
          '/images/hero/3.png',
          '/images/hero/4.png',
          '/images/hero/5.png',
          // Duplicated for seamless infinite scroll
          '/images/hero/bg1.png',
          '/images/hero/1.png',
          '/images/hero/2.png',
          '/images/hero/3.png',
          '/images/hero/4.png',
          '/images/hero/5.png',
        ].map((url, i) => (
          <div key={i} style={{
            width: '100vw', height: '100%', flexShrink: 0,
            background: `url("${url}") center/cover no-repeat`,
            filter: 'grayscale(15%)',
          }} />
        ))}
      </div>

      {/* Navy/Gold Brand Overlay tinting the images */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(160deg, rgba(6,20,40,0.85) 0%, rgba(11,31,58,0.95) 60%, rgba(6,20,40,0.98) 100%)',
      }} />

      {/* Animated background shapes for extra depth */}
      <div className="gradient-mesh" style={{position:'absolute', inset:0, zIndex:1, opacity: 0.5}}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="hero-grid" style={{
        maxWidth: '1280px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px',
        alignItems: 'center', position: 'relative', zIndex: 2,
      }}>
        {/* Left - Content */}
        <div className="hero-content" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(201,147,58,0.12)', border: '1px solid rgba(201,147,58,0.25)',
            color: '#E8B96A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', padding: '8px 18px', borderRadius: '50px',
            marginBottom: '28px',
          }}>
            <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#25d366', boxShadow: '0 0 8px #25d366'}} />
            Available Now
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 900,
            lineHeight: 1.08, letterSpacing: '-1px',
            color: 'white', marginBottom: '24px',
          }}>
            Your Words,
            <br />
            <span className="gradient-text" style={{display: 'inline-block', paddingTop: '4px'}}>
              Perfected.
            </span>
          </h1>

          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px',
            lineHeight: 1.8, marginBottom: '36px',
          }}>
            Professional plagiarism checks, AI humanizing, CV writing, and more. Trusted by 500+ clients across Nigeria and the diaspora.
          </p>

          <div className="hero-buttons" style={{display: 'flex', gap: '14px', marginBottom: '44px', flexWrap: 'wrap'}}>
            <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" className="btn-gold">
              <span>Order on WhatsApp</span>
            </a>
            <Link href="/services" className="btn-glass">
              Explore Services →
            </Link>
          </div>

          <div className="hero-badges" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            {[
              { icon: <CheckCircle2 size={12} strokeWidth={3} />, text: 'Real Turnitin', color: '#10b981' },
              { icon: <Zap size={12} strokeWidth={3} />, text: 'Same-Day Delivery', color: '#E8B96A' },
              { icon: <Lock size={12} strokeWidth={3} />, text: '100% Confidential', color: '#60a5fa' },
            ].map((badge, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50px', padding: '6px 14px', fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
              }}>
                <span style={{color: badge.color, fontSize: '11px'}}>{badge.icon}</span> {badge.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Bento Glass Cards */}
        <div className="hero-cards-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
        }}>
          {[
            { icon: <ClipboardCheck size={32} strokeWidth={1.5} color="white" />, title: 'Plagiarism Check', price: 'From ₦2,500', tag: '#1 Service' },
            { icon: <Bot size={32} strokeWidth={1.5} color="white" />, title: 'AI Humanizing', price: 'From ₦4,000', tag: 'Trending' },
            { icon: <PenTool size={32} strokeWidth={1.5} color="white" />, title: 'Proofreading', price: 'From ₦3,000', tag: 'In Demand' },
            { icon: <FileText size={32} strokeWidth={1.5} color="white" />, title: 'CV Writing', price: 'From ₦6,000', tag: 'Popular' },
          ].map((card, i) => (
            <div key={i} className="glass-card" style={{ padding: '28px 22px', cursor: 'pointer' }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, color: '#E8B96A',
                textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{width: '16px', height: '1px', background: '#C9933A'}} />
                {card.tag}
              </div>
              <div style={{fontSize: '32px', marginBottom: '12px'}}>{card.icon}</div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: '17px',
                fontWeight: 700, color: 'white', marginBottom: '8px',
              }}>{card.title}</div>
              <div style={{fontSize: '14px', color: 'rgba(201,147,58,0.8)', fontWeight: 600}}>{card.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
          <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,100 L0,100Z" fill="#C9933A"/>
        </svg>
      </div>
    </section>
  );
}
