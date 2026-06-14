'use client';

import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { CalibrationEntry } from '../types';

interface CalibrationTableProps {
  entries: CalibrationEntry[];
}

function getGapConfig(gap: number) {
  if (gap < 0) {
    // Self > AI → overconfident
    return { label: 'Overconfident', className: 'sc-calibration-gap sc-gap-overconfident', icon: TrendingDown };
  }
  if (gap > 0) {
    // AI > Self → underconfident
    return { label: 'Underconfident', className: 'sc-calibration-gap sc-gap-underconfident', icon: TrendingUp };
  }
  return { label: 'Aligned', className: 'sc-calibration-gap sc-gap-aligned', icon: Minus };
}

function ScoreDots({ score, color }: { score: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: n <= score ? color : 'rgba(0,0,0,0.08)',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
      <span style={{ marginLeft: '6px', fontWeight: 700, fontSize: '13px' }}>{score}</span>
    </div>
  );
}

export default function CalibrationTable({ entries }: CalibrationTableProps) {
  if (entries.length === 0) return null;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="sc-calibration-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Score</th>
            <th>AI Score</th>
            <th>Gap</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const gapConfig = getGapConfig(entry.gap);
            const GapIcon = gapConfig.icon;
            return (
              <tr key={entry.questionId || i}>
                <td style={{ maxWidth: '240px' }}>
                  {entry.questionText}
                </td>
                <td>
                  <ScoreDots score={entry.selfScore} color="var(--navy)" />
                </td>
                <td>
                  <ScoreDots score={entry.aiScore} color="var(--gold)" />
                </td>
                <td>
                  <span className={gapConfig.className}>
                    <GapIcon size={14} />
                    {entry.gap > 0 ? `+${entry.gap}` : entry.gap}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {entry.meaning}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
