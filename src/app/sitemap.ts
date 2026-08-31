import type { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ceewriting.com';
  const supabase = await createClient();

  // Fetch all published/active content in parallel
  const [postsRes, servicesRes, papersRes] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('slug, published_at, created_at, updated_at')
      .eq('status', 'published'),
    supabase
      .from('services')
      .select('slug, updated_at, created_at')
      .not('slug', 'is', null),
    supabase
      .from('repository_papers')
      .select('slug, publication_date, updated_at, created_at')
      .eq('status', 'published'),
  ]);

  const blogUrls = (postsRes.data || [])
    .filter((post) => post.slug && post.slug.trim() !== '')
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || post.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const serviceUrls = (servicesRes.data || [])
    .filter((s) => s.slug && s.slug.trim() !== '')
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(service.updated_at || service.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const paperUrls = (papersRes.data || [])
    .filter((p) => p.slug && p.slug.trim() !== '')
    .map((paper) => ({
      url: `${baseUrl}/repository/paper/${paper.slug}`,
      lastModified: new Date(
        paper.updated_at || paper.publication_date || paper.created_at || new Date()
      ),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [
    // --- Core hub pages ---
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/scholarship-check`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/repository`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    // Legal pages — low priority, rarely change
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    // Public interactive tools hub
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/gpa-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/tools/statistical-test-selector`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },

    // --- Dynamic commercial service pages ---
    ...serviceUrls,

    // --- Dynamic Knowledge Hub articles ---
    ...blogUrls,

    // --- Dynamic Research Repository papers ---
    ...paperUrls,
  ];
}
