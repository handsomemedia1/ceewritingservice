import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesHero from '@/features/services/components/ServicesHero';
import TrustSection from '@/features/services/components/TrustSection';
import HowItWorks from '@/features/services/components/HowItWorks';
import ServiceCatalog from '@/features/services/components/ServiceCatalog';
import PackagesSection from '@/features/services/components/PackagesSection';
import ServicesCTA from '@/features/services/components/ServicesCTA';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Services | Cee Writing Hub',
  description: 'Professional plagiarism checks with real Turnitin, CV writing, Statement of Purpose, scholarship essays, AI humanising, data analysis with Python, R & SPSS, and business proposals. Order via WhatsApp.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Professional Writing, Research & Data Analysis | Cee Writing Hub',
    description: 'Expert academic writing, research support and data analysis services for Nigerian students and professionals with global ambitions.',
    type: 'website',
    images: [{ url: '/images/hero/services-hero.png', width: 1200, height: 630, alt: 'Cee Writing Hub Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Writing, Research & Data Analysis | Cee Writing Hub',
    description: 'Expert services for Nigerian students and professionals with global ambitions.',
    images: ['/images/hero/services-hero.png'],
  },
};

// CollectionPage schema for the services hub — references the authoritative org entity
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://ceewriting.com/services#page',
  name: 'Writing and Research Services',
  url: 'https://ceewriting.com/services',
  description: 'Professional academic writing, research methodology, data analysis, CV writing, and scholarship application services.',
  publisher: {
    '@id': 'https://ceewriting.com/#organization',
  },
};

export default async function ServicesPage() {
  const supabase = await createClient();

  const [catRes, srvRes, pkgRes] = await Promise.all([
    supabase.from('categories').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true }),
    supabase.from('services').select('*').order('created_at', { ascending: true }),
    supabase.from('packages').select('*').order('display_order', { ascending: true }),
  ]);

  const categories = catRes.data || [];
  const services = srvRes.data || [];
  const packages = pkgRes.data || [];

  return (
    <main className="min-h-screen bg-bg-main">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />

      <Navbar />
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingTop: '120px', paddingLeft: 'clamp(24px, 6vw, 100px)', paddingRight: 'clamp(24px, 6vw, 100px)' }}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
      </div>
      <ServicesHero />
      <TrustSection />
      <HowItWorks />
      <ServiceCatalog initialCategories={categories} initialServices={services} />
      <PackagesSection initialPackages={packages} />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
