'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import seedData from '../../../../masters_seed_data.json';

export default function SeedMasters() {
  const supabase = createClient();
  const [status, setStatus] = useState<string>('Ready');

  const insertArticles = async () => {
    setStatus('Injecting cluster...');
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setStatus('Error: You must be logged in as an admin.');
      return;
    }

    const authorId = user.id;
    const now = new Date().toISOString();
    
    // Check for duplicates in DB first to be perfectly safe, or just rely on upsert
    // The instructions say "Before insertion, check for duplicate slugs."
    const slugs = seedData.map((a: any) => a.slug);
    const { data: existing, error: fetchErr } = await supabase
      .from('blog_posts')
      .select('slug')
      .in('slug', slugs);
      
    if (fetchErr) {
      setStatus(`Error checking duplicates: ${fetchErr.message}`);
      return;
    }
    
    if (existing && existing.length > 0) {
      console.warn('Existing slugs found, upserting over them:', existing.map(e => e.slug));
    }

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
      tags: [article.topic_pillar, article.subtopic].filter(Boolean),
      seo_score: 'green',
      created_at: now,
      published_at: now,
      reads: 0
    }));

    // Upsert to handle any partial inserts without destroying other content
    const { data, error } = await supabase.from('blog_posts').upsert(articles, { onConflict: 'slug' }).select();
    
    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus(`Success! Inserted ${data.length} Master's articles.`);
    }
  };

  return (
    <div style={{ padding: '100px', backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'monospace' }}>Seed the {seedData.length}-Article Master's Cluster</h1>
      <p style={{ marginBottom: '20px', color: '#888', maxWidth: '600px', lineHeight: 1.6 }}>
        Click the button below to inject the {seedData.length} new Master's Thesis research articles directly into the live Knowledge Hub.
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
        Inject Master's Cluster ({seedData.length} Articles)
      </button>
      <p style={{ marginTop: '20px', fontFamily: 'monospace', color: '#C5A059' }}>Status: <strong>{status}</strong></p>
    </div>
  );
}
