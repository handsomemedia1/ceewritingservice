'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import roadmapSeed from './roadmap_seed.json';

export default function SeedRoadmapCluster() {
  const supabase = createClient();
  const [status, setStatus] = useState<string>('Ready');
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const inject = async () => {
    setStatus('Running...');
    setLog([]);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setStatus('Error: Must be logged in as admin.');
      return;
    }

    const authorId = user.id;
    const now = new Date().toISOString();

    let inserted = 0;
    let updated = 0;
    let errors = 0;

    for (const article of roadmapSeed as any[]) {
      const payload: any = {
        author_id: authorId,
        slug: article.slug,
        title: article.title,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        focus_keyword: article.focus_keyword,
        tags: article.tags,
        featured_image: article.featured_image,
        status: 'published',
        published_at: now,
        reads: 0,
      };

      // Only include content if the article has new content (new articles)
      if (article.content) {
        payload.content = article.content;
        payload.created_at = now;
      }

      const { error } = await supabase
        .from('blog_posts')
        .upsert(payload, { onConflict: 'slug' });

      if (error) {
        addLog(`ERROR: ${article.slug} — ${error.message}`);
        errors++;
      } else {
        addLog(`OK: ${article.slug}${article.content ? ' (new content)' : ' (metadata updated)'}`);
        if (article.content) inserted++; else updated++;
      }
    }

    setStatus(`Done. ${inserted} inserted, ${updated} metadata-updated, ${errors} errors.`);
  };

  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '12px', fontFamily: 'monospace' }}>
        Seed: Undergraduate Dissertation Roadmap Cluster
      </h1>
      <p style={{ marginBottom: '8px', color: '#888', lineHeight: 1.6, fontSize: '14px' }}>
        This injects the 8-article Undergraduate Dissertation roadmap cluster.
      </p>
      <ul style={{ color: '#888', fontSize: '13px', marginBottom: '24px', lineHeight: 1.8 }}>
        <li>New articles (Steps 2, 3, 5, 6, 7): full content inserted</li>
        <li>Existing articles (Steps 1, 4, 8): metadata + tags updated only</li>
        <li>Requires admin session to bypass RLS</li>
      </ul>
      <button
        onClick={inject}
        style={{
          padding: '12px 24px', backgroundColor: '#C5A059', color: '#0A0A0A',
          border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '14px',
        }}
      >
        Inject Roadmap Cluster (8 Articles)
      </button>
      <p style={{ marginTop: '20px', fontFamily: 'monospace', color: '#C5A059', fontSize: '14px' }}>
        Status: <strong>{status}</strong>
      </p>
      {log.length > 0 && (
        <div style={{ marginTop: '24px', background: '#111', padding: '20px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 2 }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: l.startsWith('ERROR') ? '#ef4444' : '#4ade80' }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}
