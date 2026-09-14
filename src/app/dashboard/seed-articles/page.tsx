'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import seedData from '../../../../seed_data.json';

export default function SeedArticles() {
  const supabase = createClient();

  const [status, setStatus] = useState<string>('Ready');

  const insertArticles = async () => {
    setStatus('Injecting cluster...');
    
    // 1. Get the current user to use as author_id
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      setStatus('Error: You must be logged in as an admin.');
      return;
    }

    const authorId = user.id;

    // 2. Map seed data
    const now = new Date().toISOString();
    const articles = seedData.map((article: any) => ({
      author_id: authorId,
      title: article.title,
      slug: article.slug,
      content: article.content,
      status: 'published',
      featured_image: article.image,
      meta_title: article.meta_title,
      meta_description: article.meta_description,
      focus_keyword: article.focus_keyword,
      topic_pillar: article.topic_pillar,
      subtopic: article.subtopic,
      difficulty: article.difficulty,
      tags: [article.topic_pillar, article.subtopic],
      seo_score: 'green',
      created_at: now,
      published_at: now,
      reads: 0
    }));

    // 3. Upsert articles
    const { data, error } = await supabase.from('blog_posts').upsert(articles, { onConflict: 'slug' }).select();
    
    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus(`Success! Inserted ${data.length} articles.`);
    }
  };

  return (
    <div style={{ padding: '100px', backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'monospace' }}>Seed the 15-Article Advanced Cluster</h1>
      <p style={{ marginBottom: '20px', color: '#888', maxWidth: '600px', lineHeight: 1.6 }}>
        Click the button below to inject the 15 massive, high-quality, interconnected SEO articles directly into the live Knowledge Hub.
        This will bypass RLS via your active admin session.
      </p>
      <button 
        onClick={insertArticles}
        style={{
          padding: '12px 24px',
          backgroundColor: '#C5A059',
          color: '#0A0A0A',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Inject Full Cluster (15 Articles)
      </button>
      <p style={{ marginTop: '20px', fontFamily: 'monospace', color: '#C5A059' }}>Status: <strong>{status}</strong></p>
    </div>
  );
}
