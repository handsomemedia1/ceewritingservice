import { createClient } from '@/utils/supabase/server';
import { SearchResult } from '../types';

export async function performUnifiedSearch(query: string): Promise<SearchResult[]> {
  const supabase = await createClient();
  const lowerQuery = query.toLowerCase();
  const searchPattern = `%${lowerQuery}%`;

  // Phase 1 Search Engine: Parallel ILIKE queries across core tables
  const [blogRes, servicesRes, resourcesRes, tracksRes] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, title, meta_description, slug, topic_pillar, difficulty, estimated_read_time, published_at')
      .eq('status', 'published')
      .or(`title.ilike.${searchPattern},meta_description.ilike.${searchPattern},content.ilike.${searchPattern},tags.ilike.${searchPattern}`)
      .limit(20),
      
    supabase
      .from('services')
      .select('id, name, description, slug, category')
      .or(`name.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .limit(10),

    supabase
      .from('resources')
      .select('id, title, description, category, download_url, created_at')
      .or(`title.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .limit(10),

    supabase
      .from('scholarship_tracks')
      .select('id, name, description, slug')
      .eq('is_active', true)
      .or(`name.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .limit(10)
  ]);

  const results: SearchResult[] = [];

  // Normalize Blog Posts (Knowledge Hub)
  if (blogRes.data) {
    blogRes.data.forEach(post => {
      results.push({
        id: post.id,
        type: 'Knowledge Hub',
        title: post.title,
        description: post.meta_description || 'Read more in our Knowledge Hub.',
        url: `/blog/${post.slug}`,
        icon: '📚',
        category: post.topic_pillar,
        difficulty: post.difficulty,
        readTime: post.estimated_read_time ? `${post.estimated_read_time} min read` : undefined,
        lastUpdated: post.published_at ? new Date(post.published_at).toLocaleDateString() : undefined,
        _exactTitleMatch: post.title.toLowerCase() === lowerQuery,
        _exactDescMatch: post.meta_description?.toLowerCase().includes(lowerQuery)
      });
    });
  }

  // Normalize Services
  if (servicesRes.data) {
    servicesRes.data.forEach(service => {
      results.push({
        id: service.id,
        type: 'Services',
        title: service.name,
        description: service.description || '',
        url: service.slug ? `/services/${service.slug}` : `/services`, // Future-proof for detail pages
        icon: '🤝',
        category: service.category,
        _exactTitleMatch: service.name.toLowerCase() === lowerQuery,
        _exactDescMatch: service.description?.toLowerCase().includes(lowerQuery)
      });
    });
  }

  // Normalize Resources
  if (resourcesRes.data) {
    resourcesRes.data.forEach(resource => {
      results.push({
        id: resource.id,
        type: 'Resources',
        title: resource.title,
        description: resource.description || '',
        url: resource.download_url || '/resources',
        icon: '📝',
        category: resource.category,
        lastUpdated: resource.created_at ? new Date(resource.created_at).toLocaleDateString() : undefined,
        _exactTitleMatch: resource.title.toLowerCase() === lowerQuery,
        _exactDescMatch: resource.description?.toLowerCase().includes(lowerQuery)
      });
    });
  }

  // Normalize Scholarships
  if (tracksRes.data) {
    tracksRes.data.forEach(track => {
      results.push({
        id: track.id,
        type: 'Scholarships',
        title: track.name,
        description: track.description || '',
        url: `/scholarship-check/${track.slug}`,
        icon: '🎓',
        _exactTitleMatch: track.name.toLowerCase() === lowerQuery,
        _exactDescMatch: track.description?.toLowerCase().includes(lowerQuery)
      });
    });
  }

  // Ranking Logic
  // 1. Exact title matches first
  // 2. Exact description/content matches
  // 3. Everything else (alphabetical or original DB order)
  results.sort((a, b) => {
    if (a._exactTitleMatch && !b._exactTitleMatch) return -1;
    if (!a._exactTitleMatch && b._exactTitleMatch) return 1;
    
    if (a._exactDescMatch && !b._exactDescMatch) return -1;
    if (!a._exactDescMatch && b._exactDescMatch) return 1;
    
    return 0; // Maintain fetched order for ties
  });

  return results;
}
