import React from 'react';
import { Card } from '@/components/ui/Card';

export default function ActionPlan() {
  return (
    <Card variant="glass-light" className="p-8 bg-white mt-6">
      <h3 className="text-xl font-bold text-green-dark mb-6">Your 90-Day Roadmap</h3>
      <div className="space-y-4">
        {[
          { time: 'Next 30 Days', task: 'Revise your leadership essays using the STAR method.' },
          { time: 'Next 60 Days', task: 'Secure two strong academic references.' },
          { time: 'Next 90 Days', task: 'Finalise your research proposal and format.' }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl border border-green-dark/5 bg-sage/20">
            <div className="font-bold text-green-dark whitespace-nowrap">{item.time}</div>
            <div className="text-muted text-sm">{item.task}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
