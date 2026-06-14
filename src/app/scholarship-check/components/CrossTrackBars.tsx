'use client';

import type { CrossTrackScore } from '../types';
import { getBandColor } from '../constants';

interface CrossTrackBarsProps {
  scores: CrossTrackScore[];
}

export default function CrossTrackBars({ scores }: CrossTrackBarsProps) {
  if (scores.length === 0) return null;

  return (
    <div className="sc-cross-track">
      {scores.map((s) => {
        const color = getBandColor(s.band);
        const barClass = s.isAssessed ? 'sc-cross-track-bar sc-cross-track-assessed' : 'sc-cross-track-bar';

        return (
          <div key={s.track} className={barClass}>
            <div className="sc-cross-track-bar-label">
              {s.trackName}
              {s.isAssessed && (
                <span style={{
                  marginLeft: '6px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  assessed
                </span>
              )}
            </div>
            <div className="sc-cross-track-bar-track">
              <div
                className="sc-cross-track-fill"
                style={{
                  width: `${Math.max(s.estimatedScore, 5)}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                }}
              >
                <span>{s.estimatedScore}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
