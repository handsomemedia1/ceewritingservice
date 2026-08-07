import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Phase 6 Refactored Homepage Feature Components
import HeroSection from '@/features/home/components/HeroSection';
import Credibility from '@/features/home/components/Credibility';
import HowWeHelp from '@/features/home/components/HowWeHelp';
import ProofOfExpertise from '@/features/home/components/ProofOfExpertise';
import SuccessStories from '@/features/home/components/SuccessStories';
import HomepageTestimonials from '@/features/home/components/HomepageTestimonials';
import FeaturedServices from '@/features/home/components/FeaturedServices';
import EcosystemHubs from '@/features/home/components/EcosystemHubs';
import FeaturedOpportunities from '@/features/home/components/FeaturedOpportunities';
import GlobalSearch from '@/features/home/components/GlobalSearch';
import Newsletter from '@/features/home/components/Newsletter';

export const metadata: Metadata = {
  title: 'Cee Writing Hub | Premium Academic Research & Professional Writing',
  description: 'The complete ecosystem for your academic journey. Expert research consultancy, advanced data analysis, CV writing, and global scholarship assessments.',
  alternates: { canonical: 'https://ceewriting.com' },
  openGraph: {
    title: 'Cee Writing Hub | Global Standards',
    description: 'Expert research consultancy, advanced data analysis, and premium writing services tailored for scholars and professionals worldwide.',
    url: 'https://ceewriting.com',
    siteName: 'Cee Writing Hub',
    images: [
      {
        url: '/images/hero/hero_academic_research.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
};

// JSON-LD structured data for AI Discoverability and SEO
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cee Writing Hub',
  url: 'https://ceewriting.com',
  logo: 'https://ceewriting.com/images/logo.png',
  sameAs: [
    'https://twitter.com/ceewriting',
    'https://linkedin.com/company/ceewriting'
  ],
  description: 'Premium academic research consultancy and professional writing services.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://ceewriting.com',
  name: 'Cee Writing Hub',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ceewriting.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export default function Home() {
  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <Navbar />
      
      {/* AI Discoverability Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      
      <HeroSection />
      <Credibility />
      <HowWeHelp />
      <FeaturedOpportunities />
      <ProofOfExpertise />
      <SuccessStories />
      <HomepageTestimonials />
      <FeaturedServices />
      <EcosystemHubs />
      <GlobalSearch />
      <Newsletter />
      
      <Footer />
    </main>
  );
}
