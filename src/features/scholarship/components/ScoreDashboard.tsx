import React from 'react';
import { Card } from '@/components/ui/Card';

export default function ScoreDashboard({ score, band }: { score: number, band: string }) {
  const getBandColor = () => {
    if (band === 'green') return 'text-green-600 bg-green-50 border-green-200';
    if (band === 'yellow') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (band === 'orange') return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <Card variant="solid" className="p-8 text-center bg-white shadow-lg">
      <h2 className="text-xl font-bold text-green-dark mb-2">Overall Readiness</h2>
      <div className="flex justify-center items-center my-6">
        <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-8 ${getBandColor()}`}>
          <span className="text-5xl font-black">{score}</span>
          <span className="text-sm font-bold uppercase mt-1">/ 100</span>
        </div>
      </div>
      <p className="text-muted text-sm">
        This score is based on the actual weighting matrix used by selectors.
      </p>
    </Card>
  );
}
