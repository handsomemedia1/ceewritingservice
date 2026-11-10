import type { MetadataRoute } from 'next';

// Named so the invitation is explicit. A crawler with its own group ignores the "*" rules,
// which is why every agent shares one group and one set of private paths.
const AI_AND_SEARCH_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'CCBot', 'DuckAssistBot', 'MistralAI-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['*', ...AI_AND_SEARCH_CRAWLERS],
        allow: '/',
        disallow: [
          '/admin',
          '/auth',
          '/login',
          '/dashboard',
          '/writers',
          '/api/',
          '/search',
          '/scholarship-check/results',
          '/scholarship-check/profile',
          '/remediation_payload.json',
        ],
      },
    ],
    sitemap: 'https://ceewriting.com/sitemap.xml',
    host: 'https://ceewriting.com',
  };
}
