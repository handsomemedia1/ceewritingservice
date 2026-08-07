import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AssessmentForm from '@/features/scholarship/components/AssessmentForm';
import { TRACKS, TRACK_ORDER } from '@/app/scholarship-check/constants';
import type { TrackId } from '@/app/scholarship-check/types';

interface PageProps {
  params: Promise<{ track: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track } = await params;
  const trackId = track as TrackId;
  const trackData = TRACKS[trackId];
  if (!trackData) return { title: 'Track Not Found' };
  
  return {
    title: `${trackData.name} Readiness Assessment | Cee Writing Hub`,
    description: `Evaluate your readiness for the ${trackData.name} scholarship. ${trackData.description}`,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return TRACK_ORDER.map((track) => ({ track }));
}

export default async function ScholarshipAssessmentPage({ params }: PageProps) {
  const { track } = await params;
  const trackId = track as TrackId;
  const trackData = TRACKS[trackId];
  
  if (!trackData) notFound();

  return (
    <main
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Slim progress bar — top of viewport */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '2px',
          backgroundColor: 'rgba(197,160,89,0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: '#C5A059',
            width: '66%',
          }}
        />
      </div>

      {/* Minimal app header */}
      <header
        style={{
          position: 'fixed',
          top: '2px',
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
        <a href="/scholarship-check/tracks" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="font-space" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}>
            {trackData!.flag} {trackData!.name}
          </span>
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)' }}>
            Step 2 of 3
          </span>
          <div style={{ width: '80px', height: '2px', backgroundColor: 'rgba(197,160,89,0.15)' }}>
            <div style={{ width: '66%', height: '100%', backgroundColor: '#C5A059' }} />
          </div>
        </div>

        <a
          href="/scholarship-check"
          className="font-space"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666', textDecoration: 'none' }}
        >
          Exit
        </a>
      </header>

      {/* Main quiz content */}
      <div
        style={{
          flex: 1,
          paddingTop: '110px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AssessmentForm trackId={trackId} />
      </div>
    </main>
  );
}
