'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, FileText, Calendar } from 'lucide-react';
import { TRACKS, TRACK_ORDER } from './constants';

const features = [
  {
    icon: Target,
    title: 'Personalised scoring across 5 major scholarships',
    desc: 'Evaluate your readiness for DAAD, Erasmus, Chevening, and Fulbright with weighted, criterion-based scoring.',
  },
  {
    icon: FileText,
    title: 'AI-powered CV and SOP review',
    desc: 'Get line-by-line feedback on your documents against each scholarship\'s actual selection criteria.',
  },
  {
    icon: Calendar,
    title: 'Instant gap analysis with 30/60/90-day action plan',
    desc: 'Know exactly what to fix and when. No generic advice — just a prioritised roadmap built for your profile.',
  },
];

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    setTimeout(() => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach((el) => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="gradient-mesh"
        style={{
          background: 'linear-gradient(165deg, #061428 0%, #0B1F3A 40%, #112d52 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="section-label"
            style={{ color: 'var(--gold)', justifyContent: 'center', marginBottom: '24px' }}
          >
            SCHOLARSHIP READINESS CHECKER
          </div>

          <h1
            className="section-title gradient-text"
            style={{
              fontSize: 'clamp(32px, 6vw, 60px)',
              marginBottom: '24px',
              lineHeight: 1.1,
            }}
          >
            Are you actually ready for that scholarship?
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto 40px',
            }}
          >
            Check your readiness across 5 major scholarships — free, in under 15 minutes.
          </p>

          <Link
            href="/scholarship-check/profile"
            className="btn-gold"
            style={{
              padding: '18px 48px',
              fontSize: '16px',
              borderRadius: '50px',
              display: 'inline-flex',
            }}
          >
            <span>Check My Readiness — Free</span>
          </Link>

          <p
            style={{
              marginTop: '24px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '500px',
              margin: '24px auto 0',
              lineHeight: 1.6,
            }}
          >
            Your documents are processed securely and permanently deleted after results are
            generated. We never store your files.
          </p>
        </div>
      </section>

      {/* ── Feature Strip ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card-light reveal"
              style={{
                padding: '36px 28px',
                textAlign: 'center',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(201,147,58,0.12), rgba(201,147,58,0.04))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <f.icon size={24} color="var(--gold)" />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '10px',
                  lineHeight: 1.35,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Five Tracks ── */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label reveal" style={{ color: 'var(--gold)', justifyContent: 'center' }}>
            5 TRACKS AVAILABLE
          </div>
          <h2
            className="section-title reveal"
            style={{ color: 'var(--navy)', marginBottom: '48px' }}
          >
            Choose your scholarship
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '20px',
            }}
          >
            {TRACK_ORDER.map((id, i) => {
              const t = TRACKS[id];
              return (
                <div
                  key={id}
                  className="glass-card-light reveal"
                  style={{
                    padding: '28px 20px',
                    textAlign: 'center',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{t.flag}</div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      marginBottom: '6px',
                    }}
                  >
                    {t.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{t.destination}</p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--gold)',
                      marginTop: '8px',
                      fontWeight: 500,
                    }}
                  >
                    {t.degreeLevel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Credibility ── */}
      <section
        className="reveal"
        style={{
          background: 'var(--cream)',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500 }}>
          Built on official 2026 scholarship requirements. Updated June 2026.
        </p>
      </section>

      {/* ── Elitech Hub Badge ── */}
      <section
        style={{
          background: 'var(--cream)',
          padding: '0 24px 60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://elitechub.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))',
            border: '1px solid rgba(100,116,139,0.2)',
            padding: '10px 24px',
            borderRadius: '50px',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: 'rgba(148,163,184,0.8)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Built &amp; Secured by
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#e2e8f0',
                letterSpacing: '0.5px',
              }}
            >
              ELITECH HUB
            </span>
          </div>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: '#60a5fa',
              background: 'rgba(96,165,250,0.1)',
              border: '1px solid rgba(96,165,250,0.2)',
              padding: '3px 10px',
              borderRadius: '50px',
              letterSpacing: '1px',
            }}
          >
            2026 AUDITED
          </span>
        </a>
      </section>

      <Footer />
    </main>
  );
}
