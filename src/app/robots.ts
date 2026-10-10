import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin interfaces
          '/admin/',
          '/admin',
          // Auth flows
          '/auth/',
          '/auth',
          '/login/',
          '/login',
          // Private user content
          '/dashboard/',
          '/dashboard',
          '/writers/',
          '/writers',
          // Search results
          '/search',
          '/search/',
          // API routes — not content, not for indexing
          '/api/',
          // Scholarship wizard results contain session-specific data
          '/scholarship-check/results',
        ],
      },
    ],
    sitemap: 'https://ceewriting.com/sitemap.xml',
  };
}
