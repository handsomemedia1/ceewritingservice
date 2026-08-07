// src/features/blog/utils/blogAnalytics.ts
// Knowledge Hub analytics tracking

export type BlogAnalyticsEvent =
  | 'article_view'
  | 'reading_completion'
  | 'toc_click'
  | 'internal_link_click'
  | 'cta_click'
  | 'filter_applied'
  | 'search_query';

export function trackBlogEvent(
  event: BlogAnalyticsEvent,
  properties: Record<string, string | number | boolean> = {}
) {
  if (typeof window === 'undefined') return;

  // Log for now; swap to your analytics provider (Plausible, GA4, PostHog) later
  if (process.env.NODE_ENV === 'development') {
    console.log(`[KH Analytics] ${event}`, properties);
  }

  // Future: window.gtag?.('event', event, properties);
  // Future: window.plausible?.(event, { props: properties });
}

export function trackScrollDepth(slug: string) {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 90];
  const fired = new Set<number>();

  const handler = () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = Math.round((scrolled / total) * 100);

    for (const threshold of thresholds) {
      if (pct >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackBlogEvent(threshold >= 90 ? 'reading_completion' : 'article_view', {
          slug,
          scroll_depth: threshold,
        });
      }
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}
