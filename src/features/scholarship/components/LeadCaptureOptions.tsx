'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Icon from '@/components/icons/Icon';

export default function LeadCaptureOptions() {
  return (
    <Card variant="solid" className="p-8 bg-bg-card border-border/10 mt-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-2">Save your results</h3>
      <p className="text-sm text-muted mb-6">Keep a copy of this report, or get new scholarships as they open.</p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 font-bold text-bg-main transition hover:bg-gold-hover"
        >
          <Icon name="download" size={18} style={{ ['--icon-accent' as string]: '#0A0A0A' }} /> Save as PDF
        </button>
        <Link href="/job-alerts" className="flex min-h-11 w-full items-center justify-center rounded-lg border border-gold/40 px-4 font-bold text-gold transition hover:border-gold">
          Get scholarship alerts
        </Link>
      </div>
    </Card>
  );
}
