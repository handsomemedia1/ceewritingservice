import type { MetadataRoute } from 'next';
import { LEGACY_LINKS } from '@/config/legacyLinks.mjs';
import { ROADMAPS } from '@/config/roadmaps';
import { glossaryData } from '@/features/research/data/glossary';
import { createClient } from '@/utils/supabase/public';

export const revalidate = 1800;

const BASE_URL = 'https://ceewriting.com';
const redirected = LEGACY_LINKS as Record<string, string>;

const STATIC_PAGES: Array<[path: string, priority: number]> = [
  ['', 1],
  ['/services', 0.9],
  ['/blog', 0.9],
  ['/research', 0.8],
  ['/research/glossary', 0.8],
  ['/scholarship-check', 0.8],
  ['/tools', 0.8],
  ['/tools/statistical-test-selector', 0.7],
  ['/tools/gpa-calculator', 0.7],
  ['/research/data-analysis', 0.7],
  ['/research/machine-learning', 0.7],
  ['/research/mathematical-modelling', 0.7],
  ['/about', 0.7],
  ['/contact', 0.7],
  ['/faq', 0.7],
  ['/resources', 0.6],
  ['/testimonials', 0.5],
  ['/repository', 0.5],
  ['/privacy', 0.2],
  ['/terms', 0.2],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  // Only select columns that exist in production: one unknown column makes the whole query fail.
  const [posts, services, papers] = await Promise.all([
    supabase.from('blog_posts').select('slug, published_at, created_at').eq('status', 'published'),
    supabase.from('services').select('slug, created_at').not('slug', 'is', null),
    supabase.from('repository_papers').select('slug, publication_date, created_at').eq('status', 'published'),
  ]);

  for (const [name, result] of Object.entries({ posts, services, papers })) {
    if (result.error) console.error(`Sitemap: could not load ${name}`, result.error.message);
  }

  return [
    ...STATIC_PAGES.map(([path, priority]) => ({ url: `${BASE_URL}${path}`, priority })),

    ...Object.keys(ROADMAPS).map((id) => ({ url: `${BASE_URL}/research/path/${id}`, priority: 0.8 })),

    ...(services.data ?? []).map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: new Date(service.created_at),
      priority: 0.8,
    })),

    ...(posts.data ?? [])
      .filter((post) => post.slug && !redirected[`/blog/${post.slug}`])
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.published_at ?? post.created_at),
        priority: 0.7,
      })),

    ...(papers.data ?? []).map((paper) => ({
      url: `${BASE_URL}/repository/paper/${paper.slug}`,
      lastModified: new Date(paper.publication_date ?? paper.created_at),
      priority: 0.5,
    })),

    ...glossaryData.map((term) => ({ url: `${BASE_URL}/research/glossary/${term.slug}`, priority: 0.6 })),
  ];
}
