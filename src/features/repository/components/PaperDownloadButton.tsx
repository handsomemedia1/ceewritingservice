'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

export default function PaperDownloadButton({ version, pdfUrl }: { version: string; pdfUrl: string }) {
  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('repository_pdf_download', { version })}
      className="block w-full py-4 text-center bg-gold text-bg-main font-bold rounded-xl hover:bg-gold-hover transition-all mb-4"
    >
      Download PDF
    </a>
  );
}
