import { LEGACY_LINKS } from '@/config/legacyLinks.mjs';
import { absoluteUrl, processArticle, resolveArticleImage } from '@/lib/articleContent';
import { createClient } from '@/utils/supabase/public';
import { getServicePrice } from '@/lib/servicePricing';

export interface PublishedArticle {
  slug: string;
  url: string;
  title: string;
  summary: string;
  topics: string[];
  image: string;
  publishedAt: string;
  wordCount: number;
  markdown: string;
}

export interface PublicService {
  slug: string;
  url: string;
  name: string;
  description: string;
  /** Human-readable price, e.g. "₦15,000 – ₦30,000". Empty when priced on request. */
  price: string;
  priceFrom: number | null;
  priceTo: number | null;
  priceUnit: string | null;
  currency: string;
  category: string | null;
}

const redirected = LEGACY_LINKS as Record<string, string>;

/** Published articles, repaired and ready for feeds. Articles that now redirect are left out. */
export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  const { data } = await createClient()
    .from('blog_posts')
    .select('slug, title, content, featured_image, meta_description, tags, published_at, created_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (data ?? [])
    .filter((post) => post.slug && !redirected[`/blog/${post.slug}`])
    .map((post) => {
      const image = resolveArticleImage(post.featured_image, post.slug);
      const processed = processArticle(post.content ?? '', post.title, image);
      return {
        slug: post.slug,
        url: `https://ceewriting.com/blog/${post.slug}`,
        title: post.title,
        summary: post.meta_description ?? '',
        topics: post.tags ?? [],
        image: absoluteUrl(image),
        publishedAt: post.published_at ?? post.created_at,
        wordCount: processed.wordCount,
        markdown: processed.markdown,
      };
    });
}

export async function getPublicServices(): Promise<PublicService[]> {
  const { data } = await createClient()
    .from('services')
    .select('slug, name, desc_text, price, max_price, currency, pricing_type, pricing_unit, categories(title)')
    .not('slug', 'is', null)
    .order('name');

  return (data ?? []).map((service) => {
    const price = getServicePrice(service);
    return {
      slug: service.slug,
      url: `https://ceewriting.com/services/${service.slug}`,
      name: service.name.trim(),
      description: service.desc_text ?? '',
      price: price?.label ?? '',
      priceFrom: price?.low ?? null,
      priceTo: price?.high ?? null,
      priceUnit: price?.unit ?? null,
      currency: price?.currency ?? 'NGN',
      category: (service.categories as unknown as { title?: string } | null)?.title ?? null,
    };
  });
}
