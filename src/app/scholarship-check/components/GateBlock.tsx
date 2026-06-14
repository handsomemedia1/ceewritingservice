'use client';

import { AlertTriangle, ArrowRight, Repeat } from 'lucide-react';
import type { TrackId } from '../types';
import { TRACKS } from '../constants';

interface GateBlockProps {
  message: string;
  recommendedTrack?: TrackId;
  onContinue: () => void;
  onSwitch: (track: TrackId) => void;
}

export default function GateBlock({
  message,
  recommendedTrack,
  onContinue,
  onSwitch,
}: GateBlockProps) {
  const recommendedName = recommendedTrack
    ? TRACKS[recommendedTrack]?.name
    : null;

  return (
    <div className="sc-gate-block">
      <div className="sc-gate-block-title">
        <AlertTriangle size={22} color="#b45309" />
        Eligibility Notice
      </div>

      <p className="sc-gate-block-message">{message}</p>

      <div className="sc-gate-block-actions">
        <button
          type="button"
          className="sc-btn-secondary"
          onClick={onContinue}
        >
          <span>Continue anyway</span>
          <ArrowRight size={16} />
        </button>

        {recommendedTrack && recommendedName && (
          <button
            type="button"
            className="sc-btn-switch"
            onClick={() => onSwitch(recommendedTrack)}
          >
            <Repeat size={16} />
            <span>Switch to {recommendedName}</span>
          </button>
        )}
      </div>
    </div>
  );
}
