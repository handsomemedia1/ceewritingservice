import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/writers/'],
    },
    sitemap: 'https://ceewritingservice.com/sitemap.xml',
  };
}
