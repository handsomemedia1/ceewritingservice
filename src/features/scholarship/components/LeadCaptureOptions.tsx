import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LeadCaptureOptions() {
  return (
    <Card variant="solid" className="p-8 bg-white border-green-dark/10 mt-6 shadow-sm">
      <h3 className="text-lg font-bold text-green-dark mb-4">Save Your Results</h3>
      <p className="text-sm text-muted mb-6">Enter your email to get a detailed PDF report and join our newsletter for scholarship updates.</p>
      
      <div className="flex flex-col gap-3">
        <input 
          type="email" 
          placeholder="Enter your email..." 
          className="w-full px-4 py-3 rounded-lg border border-green-dark/10 focus:border-green-dark/20 outline-none"
        />
        <Button variant="primary" className="w-full justify-center">
          📥 Download PDF Report
        </Button>
      </div>
    </Card>
  );
}
