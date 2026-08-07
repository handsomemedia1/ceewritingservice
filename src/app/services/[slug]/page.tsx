import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
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
    .select('name, desc_text, meta_title, meta_description')
    .eq('slug', slug)
    .single();

  if (!service) return { title: 'Service Not Found | Cee Writing Hub' };

  return {
    title: service.meta_title || `${service.name} | Cee Writing Hub`,
    description: service.meta_description || service.desc_text || `Professional ${service.name} service by Cee Writing Hub.`,
    alternates: { canonical: `/services/${slug}` },
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

  if (!rawService) {
    return (
      <main className="min-h-screen bg-sage/20">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-40 text-center">
          <p className="text-6xl mb-6">🔍</p>
          <h1 className="font-serif font-bold text-green-dark text-3xl mb-4">Service Not Found</h1>
          <p className="text-muted mb-8">This service may have been moved or removed.</p>
          <a href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-dark text-white font-bold text-sm hover:bg-green-dark-mid transition-all">
            ← Browse All Services
          </a>
        </div>
        <Footer />
      </main>
    );
  }

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
      { question: 'Do you use AI to write my paper?', answer: 'No. Our services are human-led. We may use AI tools for proofreading or formatting assistance, but all core execution is strictly human to pass AI detection.' },
      { question: 'Can I request revisions?', answer: 'Yes, we offer complimentary revisions within 7 days of delivery to ensure the final output meets your initial requirements perfectly.' }
    ]
  };

  // Generate JSON-LD
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.desc_text,
    provider: {
      '@type': 'Organization',
      name: 'Cee Writing Hub'
    }
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
    <main className="min-h-screen bg-sage/20 selection:bg-green-dark/10/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
