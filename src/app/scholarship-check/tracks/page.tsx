import React from 'react';
import type { Metadata } from 'next';
import TrackGrid from '@/features/scholarship/components/TrackGrid';

export const metadata: Metadata = {
  title: 'Select Your Scholarship Track | Readiness Checker',
  description: 'Choose a scholarship program to evaluate your readiness. Supported tracks include Chevening, DAAD EPOS, Helmut-Schmidt, Erasmus Mundus, and Fulbright.',
  robots: { index: false, follow: false },
};

export default function ScholarshipTracksPage() {
  return (
    <main
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal app header — no full Navbar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          padding: '20px clamp(24px, 6vw, 100px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="/scholarship-check" style={{ textDecoration: 'none' }}>
          <span
            className="font-space"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#EAEAEA',
            }}
          >
            Cee Writing
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            className="font-space"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
            }}
          >
            Step 1 of 3
          </span>
          <div
            style={{
              width: '80px',
              height: '2px',
              backgroundColor: 'rgba(197,160,89,0.15)',
              borderRadius: 0,
            }}
          >
            <div
              style={{
                width: '33%',
                height: '100%',
                backgroundColor: '#C5A059',
              }}
            />
          </div>
        </div>
        <a
          href="/scholarship-check"
          className="font-space"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#666666',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          Exit
        </a>
      </header>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ marginBottom: '64px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '24px',
            }}
          >
            Step 1 — Select Target
          </p>
          <h1
            className="font-space"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            Which scholarship<br />are you targeting?
          </h1>
          <p
            className="font-inter"
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#888888',
              fontWeight: 300,
              maxWidth: '560px',
            }}
          >
            Select the specific programme you intend to apply for. Our assessment engine will evaluate your profile against the actual scoring matrix used by selectors.
          </p>
        </div>

        {/* Thin divider */}
        <div style={{ borderTop: '2px solid rgba(197,160,89,0.2)', marginBottom: '0' }} />

        <TrackGrid />
      </div>
    </main>
  );
}
