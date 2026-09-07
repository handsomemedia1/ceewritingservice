import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarshipHero from '@/features/scholarship/components/ScholarshipHero';
import ScholarshipFeatures from '@/features/scholarship/components/ScholarshipFeatures';
import ScholarshipTestimonials from '@/features/scholarship/components/ScholarshipTestimonials';
import FAQClient from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Scholarship Readiness Checker | Cee Writing Hub',
  description: 'Evaluate your profile against real selection criteria for DAAD, Chevening, Erasmus, and Fulbright scholarships. Free, personalised scoring in under 15 minutes. No email required.',
  alternates: { canonical: 'https://ceewriting.com/scholarship-check' },
  openGraph: {
    title: 'Am I Ready for That Scholarship? Find Out Free | Cee Writing Hub',
    description: 'Stop guessing. Evaluate your profile against real scholarship criteria and get a personalised 30/60/90-day action plan. Free, under 15 minutes.',
    type: 'website',
    images: [{ url: '/images/og-scholarship.png', width: 1200, height: 630, alt: 'Scholarship Readiness Checker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Am I Ready for That Scholarship? Free Checker | Cee Writing Hub',
    description: 'Stop guessing. Get your free readiness score for DAAD, Chevening, Erasmus & Fulbright in under 15 minutes.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Scholarship Readiness Checker',
  url: 'https://ceewriting.com/scholarship-check',
  description: 'A free tool to evaluate your scholarship readiness for DAAD, Chevening, Erasmus Mundus, and Fulbright. Get a personalised score and action plan in under 15 minutes.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: { '@id': 'https://ceewriting.com/#organization' },
};

const SCHOLARSHIP_FAQS = [
  {
    category: 'Scholarship Assessment',
    items: [
      { q: 'Is the scholarship readiness checker free?', a: 'Yes, completely free. No email address, no payment, no sign-up required.' },
      { q: 'What does the Scholarship Readiness Checker assess?', a: 'It assesses your academic background, professional experience, leadership evidence, and extracurricular profile against the exact rubrics used by international scholarship panels.' },
      { q: 'Which scholarship programmes are supported?', a: 'The checker currently covers DAAD Helmut-Schmidt, DAAD EPOS, Erasmus Mundus, Chevening, and Fulbright scholarships.' },
      { q: 'What does my readiness score mean?', a: 'Your score indicates how closely your current profile aligns with the expectations of the scholarship committee. It highlights strengths and exposes critical gaps you need to address before applying.' },
      { q: 'How does the 30/60/90-day plan work?', a: 'Based on your specific gaps, we provide a structured timeline. For instance, if you lack leadership evidence, the plan will advise you on how to build it over the next 3 months.' },
    ]
  }
];

export default function ScholarshipLandingPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <Navbar />
      <ScholarshipHero />
      <ScholarshipFeatures />
      <ScholarshipTestimonials />
      <FAQClient faqs={SCHOLARSHIP_FAQS} injectSchema={true} />
      <Footer />
    </main>
  );
}
