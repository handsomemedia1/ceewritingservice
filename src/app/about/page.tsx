import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Cee Writing Service',
  description: 'Learn about Cee Writing Service. Trusted by 500+ clients globally for professional CV writing, SOPs, proposals, and Turnitin plagiarism checks.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
