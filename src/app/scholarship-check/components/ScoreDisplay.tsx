'use client';

import { useEffect, useState } from 'react';
import type { ScoreBand } from '../types';
import { getBandColor } from '../constants';

interface ScoreDisplayProps {
  score: number;
  band: ScoreBand;
  label: string;
}

export default function ScoreDisplay({ score, band, label }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = getBandColor(band);

  // SVG circle calculations
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Animated count-up
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const bandClass = `sc-score-band-${band}` as const;

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="sc-score-circle">
        <svg viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            className="score-bg"
            cx="100"
            cy="100"
            r={radius}
          />
          {/* Animated score ring */}
          <circle
            className="score-ring"
            cx="100"
            cy="100"
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ color }}
          />
        </svg>

        {/* Score number */}
        <div className="sc-score-number" style={{ color }}>
          {displayScore}
        </div>
      </div>

      {/* Label */}
      <p className={`sc-score-label ${bandClass}`}>
        {label}
      </p>
    </div>
  );
}
