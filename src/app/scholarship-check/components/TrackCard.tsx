'use client';

import type { TrackProfile, EligibilityCheck, TrackId } from '../types';
import EligibilityBadge from './EligibilityBadge';

interface TrackCardProps {
  track: TrackProfile;
  eligibility: EligibilityCheck;
  onClick: (trackId: TrackId) => void;
}

export default function TrackCard({ track, eligibility, onClick }: TrackCardProps) {
  return (
    <button
      type="button"
      className="sc-track-card"
      onClick={() => onClick(track.id)}
      style={{ textAlign: 'left', width: '100%' }}
    >
      {/* Flag */}
      <div className="sc-track-flag" aria-hidden="true">
        {track.flag}
      </div>

      {/* Name */}
      <h3 className="sc-track-name">{track.name}</h3>

      {/* Description */}
      <p className="sc-track-description">{track.description}</p>

      {/* Quick facts */}
      <div className="sc-track-facts">
        {track.quickFacts.map((fact, i) => (
          <span key={i} className="sc-track-fact">{fact}</span>
        ))}
      </div>

      {/* Eligibility badge */}
      <div style={{ marginTop: '8px' }}>
        <EligibilityBadge
          status={eligibility.status}
          text={eligibility.badgeText}
          reasons={eligibility.reasons}
        />
      </div>
    </button>
  );
}
