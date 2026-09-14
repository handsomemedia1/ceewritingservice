import React from 'react';
import Link from 'next/link';

export default function ResearchHero() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden', minHeight: '80vh',
      display: 'flex', alignItems: 'center',
      background: 'linear-gradient(160deg, #030810 0%, #060c18 40%, #0A0A0A 100%)',
    }}>
      {/* Ambient orbs */}
      <div className="gradient-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.7 }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      {/* Gold grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,160,89,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{
        maxWidth: '900px', margin: '0 auto', width: '100%',
        padding: 'clamp(120px, 18vh, 200px) clamp(24px, 6vw, 80px) 80px',
        position: 'relative', zIndex: 2, textAlign: 'center',
      }}>
        {/* Label pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)',
          borderRadius: '50px', padding: '7px 18px', marginBottom: '28px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: '#C5A059',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A059', boxShadow: '0 0 8px #C5A059' }} />
          The Definitive Educational Centre
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900,
          lineHeight: 1.08, letterSpacing: '-2px',
          color: 'white', marginBottom: '12px',
        }}>
          Master Research Methodology
        </h1>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900,
          lineHeight: 1.08, letterSpacing: '-2px',
          marginBottom: '28px',
        }}>
          <span className="gradient-text">&amp; Data Analysis.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(234,234,234,0.55)',
          lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 44px',
        }}>
          From formulating your first research question to publishing your findings. Explore
          our curated learning journeys, interactive decision tools, and advanced statistical guides.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#roadmaps" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #C5A059, #D8B470)',
            color: '#0A0A0A', padding: '14px 32px', borderRadius: '8px',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px rgba(197,160,89,0.3)',
          }}>
            Start a Learning Journey
          </Link>
          <Link href="/research/data-analysis" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(197,160,89,0.25)',
            color: '#C5A059', padding: '14px 32px', borderRadius: '8px',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
          }}>
            Data Analysis Hub →
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
      }} />
    </section>
  );
}
