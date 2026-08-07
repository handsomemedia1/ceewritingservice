import React from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function ExpertGuidance() {
  return (
    <Card variant="solid" className="p-8 bg-green-dark text-white mt-6 shadow-lg">
      <h3 className="text-2xl font-serif font-bold mb-4 text-white">Need Expert Guidance?</h3>
      <p className="text-white/80 text-sm mb-6 max-w-lg">
        Our premium CV and SOP review services are designed to close the exact gaps identified in your assessment. Let an expert help you rewrite your narrative.
      </p>
      <Link href="/services" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-dark/10 text-green-dark font-bold hover:bg-green-dark/10-light transition-colors">
        Book a Consultation
      </Link>
    </Card>
  );
}
