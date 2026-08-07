'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

export default function PaperDownloadButton({ version }: { version: string }) {
  const handleDownload = () => {
    trackEvent('repository_pdf_download', { version });
    alert('PDF download will begin shortly.');
  };

  return (
    <button 
      onClick={handleDownload}
      className="w-full py-4 bg-green-dark/10 text-green-dark font-bold rounded-xl hover:bg-green-dark/10-light transition-all mb-4 shadow-[0_4px_20px_rgba(201,147,58,0.2)]"
    >
      Download PDF
    </button>
  );
}
