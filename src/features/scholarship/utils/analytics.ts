export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  // In a real implementation, this would connect to Google Analytics, PostHog, etc.
  // For now, we simulate the tracking and log it in development.
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${eventName}`, data || {});
  }
  
  // Example real integration
  // if (window.gtag) window.gtag('event', eventName, data);
};

export const AnalyticsEvents = {
  ASSESSMENT_START: 'scholarship_assessment_start',
  ASSESSMENT_STEP_COMPLETED: 'scholarship_assessment_step_completed',
  ASSESSMENT_DROP_OFF: 'scholarship_assessment_drop_off',
  ASSESSMENT_COMPLETED: 'scholarship_assessment_completed',
  RESULTS_VIEWED: 'scholarship_results_viewed',
  PDF_DOWNLOADED: 'scholarship_pdf_downloaded',
  CONSULTATION_BOOKED: 'scholarship_consultation_booked',
} as const;
