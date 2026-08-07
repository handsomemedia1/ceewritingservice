'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ScoreDashboard from '@/features/scholarship/components/ScoreDashboard';
import InsightsPanel from '@/features/scholarship/components/InsightsPanel';
import ActionPlan from '@/features/scholarship/components/ActionPlan';
import ExpertGuidance from '@/features/scholarship/components/ExpertGuidance';
import LeadCaptureOptions from '@/features/scholarship/components/LeadCaptureOptions';
import { loadProgress } from '@/features/scholarship/utils/storage';
import { TRACKS } from '@/app/scholarship-check/constants';
import { getBandForScore } from '@/app/scholarship-check/constants';
import type { TrackId } from '@/app/scholarship-check/types';

function ResultsContent() {
  const searchParams = useSearchParams();
  const trackId = (searchParams?.get('track') || 'chevening') as TrackId;
  const track = TRACKS[trackId];
  const [score, setScore] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const data = loadProgress();
    if (data && data.answers && Object.keys(data.answers).length > 2) {
      setScore(78);
    } else {
      setScore(45);
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  const band = getBandForScore(score);

  const bandColors: Record<string, string> = {
    green: '#10b981',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444',
  };
  const bandColor = bandColors[band.band] || '#C5A059';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Score Hero Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: '80px',
          paddingBottom: '80px',
          borderBottom: '1px solid rgba(197,160,89,0.15)',
          marginBottom: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left: messaging */}
        <div>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '24px',
            }}
          >
            {track?.flag} {track?.name} — Assessment Complete
          </p>
          <h1
            className="font-space"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            {band.label}
          </h1>
          <p
            className="font-inter"
            style={{
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#888888',
              fontWeight: 300,
            }}
          >
            {band.action}. Review your score breakdown and follow your personalised action plan below.
          </p>
        </div>

        {/* Right: Score display */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
            borderLeft: '1px solid rgba(197,160,89,0.1)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              marginBottom: '24px',
            }}
          >
            <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(197,160,89,0.1)" strokeWidth="8" />
              <circle
                cx="80" cy="80" r="68"
                fill="none"
                stroke={bandColor}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 68}`}
                strokeDashoffset={`${2 * Math.PI * 68 * (1 - score / 100)}`}
                strokeLinecap="butt"
                style={{ transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="font-space"
                style={{ fontSize: '52px', fontWeight: 700, color: bandColor, lineHeight: 1 }}
              >
                {score}
              </span>
              <span
                className="font-space"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666' }}
              >
                / 100
              </span>
            </div>
          </div>

          <span
            className="font-space"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: bandColor,
              textAlign: 'center',
            }}
          >
            {band.band === 'green' ? 'Competitive' : band.band === 'yellow' ? 'Almost Ready' : band.band === 'orange' ? 'Needs Work' : 'Not Ready Yet'}
          </span>
        </div>
      </div>

      {/* Main results layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <ScoreDashboard score={score} band={score > 70 ? 'green' : 'yellow'} />
          <InsightsPanel />
          <ActionPlan />
          <ExpertGuidance />
        </div>

        {/* Sidebar */}
        <div style={{ borderLeft: '1px solid rgba(197,160,89,0.1)', paddingLeft: '48px', position: 'sticky', top: '100px' }}>
          <LeadCaptureOptions />

          {/* Restart CTA */}
          <div style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
            <p
              className="font-space"
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(197,160,89,0.5)',
                marginBottom: '16px',
              }}
            >
              Try Another Track
            </p>
            <Link
              href="/scholarship-check/tracks"
              className="font-space"
              style={{
                display: 'block',
                padding: '14px 20px',
                border: '1px solid rgba(197,160,89,0.2)',
                color: '#EAEAEA',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'border-color 0.2s ease',
              }}
            >
              Restart Assessment →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal app header — step 3 */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(10,10,10,0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          padding: '18px clamp(24px, 6vw, 100px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="/scholarship-check" style={{ textDecoration: 'none' }}>
          <span className="font-space" style={{ fontSize: '13px', fontWeight: 700, color: '#EAEAEA' }}>Cee Writing</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)' }}>
            Step 3 of 3
          </span>
          <div style={{ width: '80px', height: '2px', backgroundColor: 'rgba(197,160,89,0.15)' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#C5A059' }} />
          </div>
        </div>
        <a href="/scholarship-check" className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666', textDecoration: 'none' }}>
          Done
        </a>
      </header>

      <div style={{ flex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
        <div
          style={{
            borderBottom: '1px solid rgba(197,160,89,0.1)',
            paddingBottom: '48px',
            paddingTop: '48px',
            paddingLeft: 'clamp(24px, 6vw, 80px)',
            paddingRight: 'clamp(24px, 6vw, 80px)',
            maxWidth: '1100px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <p
            className="font-space"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.5)',
              marginBottom: '8px',
            }}
          >
            Assessment Complete
          </p>
        </div>

        <div style={{ paddingTop: '64px' }}>
          <Suspense fallback={
            <div style={{ textAlign: 'center', padding: '120px 0', color: '#666666' }}>
              <p className="font-space" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Calculating your results...</p>
            </div>
          }>
            <ResultsContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
