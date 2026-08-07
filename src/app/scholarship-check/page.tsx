import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarshipHero from '@/features/scholarship/components/ScholarshipHero';
import ScholarshipFeatures from '@/features/scholarship/components/ScholarshipFeatures';
import ScholarshipTestimonials from '@/features/scholarship/components/ScholarshipTestimonials';

export const metadata: Metadata = {
  title: 'Scholarship Readiness Checker | Cee Writing Hub',
  description: 'Evaluate your profile against real selection criteria for DAAD, Chevening, Erasmus, and Fulbright scholarships. Free, personalised scoring in under 15 minutes. No email required.',
  alternates: { canonical: '/scholarship-check' },
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
  creator: { '@type': 'Organization', name: 'Cee Writing Hub', url: 'https://ceewriting.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the scholarship readiness checker free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No email address, no payment, no sign-up required.' },
    },
    {
      '@type': 'Question',
      name: 'Which scholarships does the checker cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'The checker covers DAAD Helmut-Schmidt, DAAD EPOS, Erasmus Mundus, Chevening, and Fulbright scholarships.' },
    },
    {
      '@type': 'Question',
      name: 'How long does the assessment take?',
      acceptedAnswer: { '@type': 'Answer', text: 'The full assessment takes under 15 minutes depending on the scholarship track you select.' },
    },
    {
      '@type': 'Question',
      name: 'What do I get at the end?',
      acceptedAnswer: { '@type': 'Answer', text: 'You receive a personalised readiness score, an analysis of your gaps, and a prioritised 30/60/90-day action plan.' },
    },
  ],
};

export default function ScholarshipLandingPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <ScholarshipHero />
      <ScholarshipFeatures />
      <ScholarshipTestimonials />
      <Footer />
    </main>
  );
}
