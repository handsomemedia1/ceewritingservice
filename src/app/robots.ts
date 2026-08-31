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
          '/login/',
          // Private user content
          '/dashboard/',
          '/writers/',
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
