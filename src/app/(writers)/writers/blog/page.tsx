"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function WriterBlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('blog_posts')
          .select('id, title, status, created_at, seo_score')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });
          
        if (data) setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published': return <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={12} /> Published</span>;
      case 'pending_review': return <span style={{ background: '#fffbeb', color: '#d97706', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> In Review</span>;
      default: return <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Draft</span>;
    }
  };

  const getSeoBadge = (score: string) => {
    switch(score) {
      case 'green': return <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} title="Good SEO" />;
      case 'yellow': return <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} title="Needs Improvement" />;
      case 'red': return <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} title="Poor SEO" />;
      default: return <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} title="Not Scored" />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>My Blog Drafts</h2>
          <p style={{ color: 'var(--muted)' }}>Write, optimize, and submit articles for the Cee Writing blog.</p>
        </div>
        <Link href="/writers/blog/new" style={{ 
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'white', 
          padding: '12px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', 
          display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(201,147,58,0.3)'
        }}>
          <PlusCircle size={18} /> Compose New Article
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div style={{ 
          background: 'white', borderRadius: '16px', padding: '64px 24px', textAlign: 'center',
          border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', background: '#f8fafc', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)',
            marginBottom: '16px'
          }}>
            <FileText size={32} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No articles yet</h3>
          <p style={{ color: 'var(--muted)', maxWidth: '400px', marginBottom: '24px' }}>
            Start writing SEO-optimized articles. Drafts build your portfolio and earn you commission when published.
          </p>
          <Link href="/writers/blog/new" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
            Write your first article →
          </Link>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Article Title</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>SEO</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: 'var(--navy)' }}>{post.title || 'Untitled Draft'}</td>
                  <td style={{ padding: '16px 24px' }}>{getSeoBadge(post.seo_score)}</td>
                  <td style={{ padding: '16px 24px' }}>{getStatusBadge(post.status)}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)', fontSize: '14px' }}>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Link href={`/writers/blog/${post.id}`} style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
