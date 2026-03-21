import React from 'react';
import WriterClientLayout from './WriterClientLayout';

export const dynamic = 'force-dynamic';

export default function WriterLayout({ children }: { children: React.ReactNode }) {
  return <WriterClientLayout>{children}</WriterClientLayout>;
}
