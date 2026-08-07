export interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  features: string[];
  isPopular?: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TrustIndicator {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  category: string;
  desc_text: string;
  
  // Rich Optional Fields
  hero_title?: string;
  hero_subtitle?: string;
  featured_image?: string;
  estimated_duration?: string;
  starting_price?: string;
  
  target_audience?: string[]; // E.g. ["Master's students", "PhD researchers"]
  related_services?: string[]; // Slugs of related services
  overview_html?: string;
  
  process_steps?: ProcessStep[];
  deliverables?: string[];
  pricing_tiers?: PricingTier[];
  faqs?: FAQ[];
  trust_indicators?: TrustIndicator[];
  
  meta_title?: string;
  meta_description?: string;
}

export type ActionType = 'whatsapp' | 'consultation' | 'checkout' | 'email';

export interface ActionConfig {
  type: ActionType;
  label: string;
  url?: string; // e.g. https://wa.me/... or mailto:...
}
