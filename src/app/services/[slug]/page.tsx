import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/public';
import { serializeJsonLd } from '@/lib/jsonLd';

export const revalidate = 1800;

export async function generateStaticParams() {
  return [];
}
import { ServiceDetail } from '@/features/services/types';

import ServiceDetailHero from '@/features/services/components/ServiceDetailHero';
import ServiceTargetAudience from '@/features/services/components/ServiceTargetAudience';
import ServiceDeliverables from '@/features/services/components/ServiceDeliverables';
import ServiceProcess from '@/features/services/components/ServiceProcess';
import ServiceTrust from '@/features/services/components/ServiceTrust';
import ServicePricing from '@/features/services/components/ServicePricing';
import ServiceFAQs from '@/features/services/components/ServiceFAQs';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) return { title: 'Service Not Found | Cee Writing', robots: { index: false } };

  const title = service.meta_title || `${service.name} | Cee Writing`;
  const description =
    service.meta_description ||
    service.desc_text ||
    `${service.name.trim()} from Cee Writing: scope, process, pricing and how to order.`;

  return {
    title,
    description: description.length <= 158 ? description : `${description.slice(0, 155).replace(/\s+\S*$/, '')}...`,
    alternates: { canonical: `https://ceewriting.com/services/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ceewriting.com/services/${slug}`,
      siteName: 'Cee Writing Service',
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Cee Writing Service' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // We select *, even if the DB hasn't been migrated yet, Supabase client will return what it can.
  // We handle potential missing JSON fields gracefully.
  const { data: rawService } = await supabase
    .from('services')
    .select('*, categories(title)')
    .eq('slug', slug)
    .single();

  if (!rawService) notFound();


  // Normalize data with fallbacks for legacy rows that don't have the new JSON structures yet
  const service: ServiceDetail = {
    ...rawService,
    category: (rawService.categories as any)?.title || 'Professional Service',
    target_audience: rawService.target_audience || ['Undergraduate Students', 'Master\'s Candidates', 'PhD Researchers', 'Professionals'],
    deliverables: rawService.deliverables || [
      'Comprehensive final document',
      'Plagiarism report (Turnitin)',
      'Quality assurance review',
      'Confidentiality guarantee'
    ],
    process_steps: rawService.process_steps || [
      { step: 1, title: 'Discovery & Consultation', desc: 'We discuss your requirements, timeline, and exact specifications.' },
      { step: 2, title: 'Expert Execution', desc: 'Our specialized team works on your project with rigorous attention to detail.' },
      { step: 3, title: 'Quality Assurance', desc: 'Multi-stage review including human checking and plagiarism scanning.' },
      { step: 4, title: 'Delivery & Review', desc: 'Final files delivered securely with an opportunity for feedback and revisions.' }
    ],
    faqs: rawService.faqs || [
      { question: 'Is my document safe and confidential?', answer: 'Yes. We adhere to strict non-disclosure policies. Your data and documents are never shared with third parties.' },
      { question: 'Do you use AI to write my paper?', answer: 'No. Our services are human-led. We may use AI tools for proofreading or formatting assistance, but the core writing and analysis is done by people.' },
      { question: 'Can I request revisions?', answer: 'Yes, we offer complimentary revisions within 7 days of delivery to ensure the final output meets your initial requirements perfectly.' }
    ]
  };

  // Generate JSON-LD — Service entity with stable @id referencing the org
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://ceewriting.com/services/${slug}#service`,
    name: service.name,
    description: service.desc_text,
    url: `https://ceewriting.com/services/${slug}`,
    provider: {
      '@id': 'https://ceewriting.com/#organization',
    },
    serviceType: service.name,
    areaServed: ['Nigeria', 'United Kingdom', 'United States', 'Canada'],
    ...(rawService.price > 0 ? { offers: { '@type': 'Offer', price: rawService.price, priceCurrency: rawService.currency || 'NGN', url: `https://ceewriting.com/services/${slug}` } } : {}),
  };

  // Server-rendered BreadcrumbList — crawlable immediately, not dependent on JS hydration
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ceewriting.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://ceewriting.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://ceewriting.com/services/${slug}` },
    ],
  };

  const faqJsonLd = service.faqs && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-bg-main selection:bg-bg-main/10/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      )}
      
      <Navbar />
      
      <ServiceDetailHero service={service} />
      <ServiceTargetAudience audiences={service.target_audience || []} />
      <ServiceDeliverables deliverables={service.deliverables || []} />
      <ServiceProcess steps={service.process_steps || []} />
      <ServiceTrust trustIndicators={service.trust_indicators || []} />
      {service.pricing_tiers && <ServicePricing tiers={service.pricing_tiers} />}
      <ServiceFAQs faqs={service.faqs || []} />

      <Footer />
    </main>
  );
}
