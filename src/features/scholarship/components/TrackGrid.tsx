import React from 'react';
import Link from 'next/link';
import { TRACKS, TRACK_ORDER } from '@/app/scholarship-check/constants';

export default function TrackGrid() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {TRACK_ORDER.map((trackId, i) => {
        const track = TRACKS[trackId];
        return (
          <Link
            key={trackId}
            href={`/scholarship-check/${trackId}`}
            className="group"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              padding: '36px 0',
              borderBottom: '1px solid rgba(197,160,89,0.1)',
              textDecoration: 'none',
              transition: 'padding-left 0.3s ease',
            }}
          >
            {/* Left: index + flag + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flex: '1 1 300px' }}>
              <span
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'rgba(197,160,89,0.3)',
                  flexShrink: 0,
                  minWidth: '24px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '28px', flexShrink: 0 }}>{track.flag}</span>
              <div>
                <h3
                  className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: '8px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {track.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span
                    className="font-space"
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(197,160,89,0.6)',
                    }}
                  >
                    {track.destination}
                  </span>
                  <span style={{ width: '1px', height: '10px', backgroundColor: 'rgba(197,160,89,0.2)' }} />
                  <span
                    className="font-space"
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#555555',
                    }}
                  >
                    {track.degreeLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: description + deadline */}
            <div style={{ flex: '2 1 300px' }}>
              <p
                className="font-inter"
                style={{ fontSize: '14px', lineHeight: 1.7, color: '#888888', fontWeight: 300, marginBottom: '8px' }}
              >
                {track.description}
              </p>
              <span
                className="font-space"
                style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555555' }}
              >
                {track.applicationWindow}
              </span>
            </div>

            {/* Right: CTA arrow */}
            <div
              style={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.6)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                Start
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5A059"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'transform 0.3s ease' }}
                className="group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
