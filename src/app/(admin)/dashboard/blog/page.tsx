"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // In a real scenario we might join with profiles to get the author's name
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, status, seo_score, created_at, reads, profiles(full_name)')
      .order('created_at', { ascending: false });
      
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePublish = async (id: string) => {
    const supabase = createClient();
    await supabase.from('blog_posts').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', id);
    fetchPosts();
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Blog Controller</h2>
          <p style={{ color: 'var(--muted)' }}>Manage all articles, review writer submissions, and publish to the live site.</p>
        </div>
        <Link href="/dashboard/blog/new" style={{ 
          background: 'var(--navy)', color: 'white', padding: '12px 20px', 
          borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none'
        }}>
          + Write Admin Post
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input type="text" placeholder="Search articles..." style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
          <button style={{ padding: '0 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--navy)' }}>
            <Filter size={18} /> Filter Status
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <FileText size={48} color="#e2e8f0" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No articles found</h3>
            <p style={{ color: 'var(--muted)' }}>No drafts or published posts yet in the system.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Article Title</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Author</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>SEO</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Reads</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #e2e8f0', background: post.status === 'pending_review' ? '#fffbeb' : 'white' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: 'var(--navy)' }}>
                    {post.title || 'Untitled'}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)', fontSize: '14px' }}>
                    {post.profiles?.full_name || 'Admin'}
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
                      <span style={{ color: '#059669', fontSize: '13px', fontWeight: 600 }}>Published</span>
                    ) : post.status === 'pending_review' ? (
                      <span style={{ color: '#d97706', fontSize: '13px', fontWeight: 600 }}>Needs Review</span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Draft</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {post.status === 'pending_review' && (
                      <button 
                        onClick={() => handlePublish(post.id)}
                        style={{ padding: '6px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Publish
                      </button>
                    )}
                    {/* The editor maps via ID to load the exact same interface the writer uses but with Admin privileges */}
                    <Link href={`/dashboard/blog/${post.id}`} style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                      Review / Edit
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
