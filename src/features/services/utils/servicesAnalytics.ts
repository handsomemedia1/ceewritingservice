// src/features/services/utils/servicesAnalytics.ts
// Services Hub conversion analytics

export type ServicesEvent =
  | 'service_page_view'
  | 'category_selected'
  | 'service_card_click'
  | 'service_add_to_cart'
  | 'service_search'
  | 'consultation_cta_click'
  | 'whatsapp_click'
  | 'checkout_start'
  | 'package_view'
  | 'package_add_to_cart'
  | 'resource_download'
  | 'featured_service_click';

export function trackServicesEvent(
  event: ServicesEvent,
  properties: Record<string, string | number | boolean> = {}
) {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Services Analytics] ${event}`, properties);
  }
  // Future: window.gtag?.('event', event, properties);
}
