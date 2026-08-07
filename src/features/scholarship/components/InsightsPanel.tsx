import React from 'react';
import { Card } from '@/components/ui/Card';

export default function InsightsPanel() {
  return (
    <Card variant="solid" className="p-8 bg-white shadow-sm mt-6">
      <h3 className="text-xl font-bold text-green-dark mb-6">Profile Insights</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
          <h4 className="text-green-800 font-bold mb-3 flex items-center gap-2">
            <span>✅</span> Core Strengths
          </h4>
          <ul className="space-y-2 text-sm text-green-700">
            <li>Strong academic background</li>
            <li>Clear leadership examples</li>
          </ul>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <h4 className="text-orange-800 font-bold mb-3 flex items-center gap-2">
            <span>⚠️</span> Improvement Areas
          </h4>
          <ul className="space-y-2 text-sm text-orange-700">
            <li>Work experience gap</li>
            <li>Lack of international exposure</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
