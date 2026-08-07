/**
 * Tools Hub Analytics
 * Tracks tool usage to guide future features and content.
 */

import { trackEvent } from '@/lib/analytics';

export const trackToolStart = (toolId: string) => {
  trackEvent('tool_started', { tool_id: toolId });
};

export const trackToolCompletion = (toolId: string, resultData?: Record<string, unknown>) => {
  const params: Record<string, string | number | boolean> = { tool_id: toolId };
  if (resultData) params.result_summary = JSON.stringify(resultData);
  trackEvent('tool_completed', params);
};

export const trackToolAbandonment = (toolId: string, dropoffStep: string) => {
  // Map this to a custom event if you add it to EventName type, or use a generic tracker
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'tool_abandonment', {
      tool_id: toolId,
      step: dropoffStep
    });
  }
};

export const trackEcosystemLinkClick = (toolId: string, linkType: 'service' | 'knowledge' | 'resource', linkTarget: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'tool_ecosystem_click', {
      tool_id: toolId,
      link_type: linkType,
      link_target: linkTarget
    });
  }
};
