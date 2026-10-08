import { createClient } from '@/utils/supabase/server';
import { SearchResult } from '../types';

export async function performUnifiedSearch(query: string): Promise<SearchResult[]> {
  const supabase = await createClient();
  const lowerQuery = query.toLowerCase();
  const searchPattern = `%${lowerQuery}%`;

  // 1. Fetch categories for offline mapping (if needed, though we can join directly)
  const { data: categories, error: categoriesError } = await supabase.from('categories').select('id, title');
  if (categoriesError) {
    console.error('SearchEngine categories error:', categoriesError);
  }
  const catMap = new Map(categories?.map(c => [c.id, c.title]) || []);

  // 2. Safely query verified tables ONLY. No missing columns.
  const [blogRes, servicesRes, packagesRes, resourcesRes] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, title, meta_description, slug, published_at, tags, content')
      .eq('status', 'published')
      .or(`title.ilike.${searchPattern},meta_description.ilike.${searchPattern},content.ilike.${searchPattern}`)
      .limit(30),

    supabase
      .from('services')
      .select('id, name, desc_text, slug, category_id')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30),

    supabase
      .from('packages')
      .select('id, name, desc_text')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30),

    supabase
      .from('resources')
      .select('id, title, subtitle, description, category, features')
      .or(`title.ilike.${searchPattern},subtitle.ilike.${searchPattern},description.ilike.${searchPattern},category.ilike.${searchPattern}`)
      .limit(30)
  ]);

  // Log errors explicitly instead of silently swallowing them
  if (blogRes.error) console.error('SearchEngine blog error:', blogRes.error);
  if (servicesRes.error) console.error('SearchEngine services error:', servicesRes.error);
  if (packagesRes.error) console.error('SearchEngine packages error:', packagesRes.error);
  if (resourcesRes.error) console.error('SearchEngine resources error:', resourcesRes.error);

  const results: (SearchResult & { _score: number })[] = [];

  // Helper for scoring
  const calculateScore = (
    exactTitle: string,
    exactDesc: string,
    content: string = '',
    tagsArray: string[] = [],
    categoryName: string = ''
  ) => {
    let score = 0;
    const t = exactTitle.toLowerCase();
    const d = exactDesc.toLowerCase();
    const c = content.toLowerCase();

    if (t === lowerQuery) score += 100;
    else if (t.includes(lowerQuery)) score += 50;

    if (d.includes(lowerQuery) || c.includes(lowerQuery)) score += 20;

    if (categoryName.toLowerCase().includes(lowerQuery)) score += 10;

    if (tagsArray.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 10;

    return score;
  };

  // Normalize Blog Posts
  if (blogRes.data) {
    blogRes.data.forEach(post => {
      // TypeScript manual fallback for tags array search and verifying content match
      const matchesText = post.title.toLowerCase().includes(lowerQuery) ||
                          (post.meta_description && post.meta_description.toLowerCase().includes(lowerQuery)) ||
                          (post.content && post.content.toLowerCase().includes(lowerQuery));
      const matchesTag = post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery));

      // If we didn't match via Supabase (since we omitted tags from .or), we check it here
      if (!matchesText && !matchesTag) return;

      const score = calculateScore(post.title, post.meta_description || '', post.content || '', post.tags || [], '');

      results.push({
        id: post.id,
        type: 'Knowledge Hub',
        title: post.title,
        description: post.meta_description || 'Read more in our Knowledge Hub.',
        url: `/blog/${post.slug}`,
        icon: '??',
        lastUpdated: post.published_at ? new Date(post.published_at).toLocaleDateString() : undefined,
        _score: score
      });
    });
  }

  // Normalize Services
  if (servicesRes.data) {
    servicesRes.data.forEach(service => {
      const catName = catMap.get(service.category_id) || 'Service';
      const score = calculateScore(service.name, service.desc_text || '', '', [], catName);

      results.push({
        id: service.id,
        type: 'Services',
        title: service.name,
        description: service.desc_text || '',
        url: service.slug ? `/services/${service.slug}` : `/services`,
        icon: '??',
        category: catName,
        _score: score
      });
    });
  }

  // Normalize Packages
  if (packagesRes.data) {
    packagesRes.data.forEach(pkg => {
      const score = calculateScore(pkg.name, pkg.desc_text || '', '', [], '');
      results.push({
        id: pkg.id,
        type: 'Packages',
        title: pkg.name,
        description: pkg.desc_text || '',
        url: `/#packages`,
        icon: '??',
        category: 'Bundle',
        _score: score
      });
    });
  }

  // Normalize Resources
  if (resourcesRes.data) {
    resourcesRes.data.forEach(resource => {
      const matchesText = resource.title.toLowerCase().includes(lowerQuery) ||
                          (resource.subtitle && resource.subtitle.toLowerCase().includes(lowerQuery)) ||
                          (resource.description && resource.description.toLowerCase().includes(lowerQuery)) ||
                          (resource.category && resource.category.toLowerCase().includes(lowerQuery));
      const matchesFeature = resource.features && resource.features.some((f: string) => f.toLowerCase().includes(lowerQuery));

      if (!matchesText && !matchesFeature) return;

      const score = calculateScore(
        resource.title,
        (resource.subtitle || '') + ' ' + (resource.description || ''),
        '',
        resource.features || [],
        resource.category || ''
      );

      results.push({
        id: resource.id,
        type: 'Resources',
        title: resource.title,
        description: resource.subtitle || resource.description || 'Download this resource from our hub.',
        url: `/resources`,
        icon: '??',
        category: resource.category || undefined,
        _score: score
      });
    });
  }

  // Rank by score descending, then alphabetical
  results.sort((a, b) => {
    if (b._score !== a._score) {
      return b._score - a._score;
    }
    return a.title.localeCompare(b.title);
  });

  return results.map(({ _score, ...rest }) => rest);
}
