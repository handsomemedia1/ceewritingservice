import type { Metadata } from 'next';
import { ScholarshipProvider } from '@/lib/ScholarshipContext';
import './scholarship-check.css';

export const metadata: Metadata = {
  title: 'Scholarship Readiness Checker | Cee Writing',
  description:
    'Check your readiness across 5 major scholarships — DAAD Helmut-Schmidt, DAAD EPOS, Erasmus Mundus, Chevening, and Fulbright. Free, personalised scoring in under 15 minutes.',
};

export default function ScholarshipCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ScholarshipProvider>{children}</ScholarshipProvider>;
}
