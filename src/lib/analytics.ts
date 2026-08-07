'use client';

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Valid event names for strict typing and consistency.
 */
export type AnalyticsEventName =
  | 'page_view'
  | 'service_enquiry'
  | 'consultation_request'
  | 'whatsapp_cta_click'
  | 'newsletter_signup'
  | 'scholarship_assessment_started'
  | 'scholarship_assessment_completed'
  | 'search_performed'
  | 'resource_download'
  | 'repository_pdf_download'
  | 'tool_started'
  | 'tool_completed'
  | 'tool_abandonment'
  | 'tool_ecosystem_click'
  | 'blog_article_opened'
  | 'scroll_depth'
  | 'outbound_link_click'
  | 'search'
  | 'search_suggestion'
  | 'toc_click';

/**
 * Reusable analytics helper for event tracking.
 * 
 * @param eventName The standardized event name
 * @param eventParams Optional contextual parameters (e.g., service_id, search_term)
 */
export function trackEvent(eventName: AnalyticsEventName, eventParams?: Record<string, string | number | boolean>) {
  try {
    sendGAEvent('event', eventName, (eventParams || {}) as any);
  } catch (error) {
    console.warn(`Failed to track event: ${eventName}`, error);
  }
}
