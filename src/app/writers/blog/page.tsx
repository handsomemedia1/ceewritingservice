"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { FileText, PlusCircle, Edit3 } from 'lucide-react';

export default function WriterBlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, status, seo_score, created_at, reads')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>My Articles</h2>
          <p style={{ color: 'var(--muted)' }}>Draft, review, and submit your blog posts here.</p>
        </div>
        <Link href="/writers/blog/new" style={{ 
          background: 'var(--navy)', color: 'white', padding: '12px 20px', 
          borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <PlusCircle size={18} /> New Draft
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading your articles...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <FileText size={48} color="#e2e8f0" style={{ marginBottom: '16px', margin: '0 auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No articles yet</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>You have not written any blog posts. Start a new draft today!</p>
            <Link href="/writers/blog/new" style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              Create First Post
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Article Title</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>SEO</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Reads</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)' }}>
                    {post.title || 'Untitled Draft'}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block',
                      background: post.seo_score === 'green' ? '#10b981' : post.seo_score === 'yellow' ? '#f59e0b' : post.seo_score === 'red' ? '#ef4444' : '#cbd5e1' 
                    }} />
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 500, color: 'var(--navy)' }}>
                    {post.reads || 0}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                     {post.status === 'published' ? (
                        <span style={{ color: '#059669', background: '#dcfce7', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Published</span>
                      ) : post.status === 'pending_review' ? (
                        <span style={{ color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>In Review</span>
                      ) : (
                        <span style={{ color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Draft</span>
                      )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Link href={`/writers/blog/${post.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', background: '#f8fafc', padding: '6px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <Edit3 size={14} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
