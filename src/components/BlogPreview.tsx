"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

export default function BlogPreview({ showViewAll = true }: { showViewAll?: boolean }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content, featured_image, tags, reads, published_at, created_at, profiles(full_name, role)')
        .eq('status', 'published')
        .order('reads', { ascending: false })
        .limit(6);

      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPublishedPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Loading articles...</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Tips and Guides</div>
        <h2 className="section-title" style={{color: 'var(--navy)'}}>Latest Articles</h2>
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>New articles coming soon. Stay tuned!</p>
      </section>
    );
  }

  const featured = posts[0];
  const others = posts.slice(1);

  const getExcerpt = (content: string) => {
    if (!content) return '';
    const plain = content.replace(/<[^>]+>/g, '').replace(/[#*_~`]/g, '');
    return plain.length > 160 ? plain.substring(0, 160) + '...' : plain;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getAuthorName = (post: any) => {
    if (!post?.profiles) return 'Cee Writing';
    if (post.profiles.role === 'admin') return 'Mercy Ogunwale';
    return post.profiles.full_name || 'Writer';
  };

  return (
    <section id="blog" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{textAlign: 'center', marginBottom: '64px'}}>
        <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Tips and Guides</div>
        <h2 className="section-title" style={{color: 'var(--navy)'}}>Most Read Articles</h2>
        <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
          Free tips on writing better and getting ahead.
        </p>
      </div>

      {/* Featured Article — Most Read */}
      <Link href={`/blog/${featured.slug}`} className="glass-card-light blog-featured" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden',
        textDecoration: 'none', color: 'inherit', marginBottom: '32px',
      }}>
        <div style={{ position: 'relative', minHeight: '280px', background: '#0B1F3A' }}>
          {featured.featured_image ? (
            <Image src={featured.featured_image} alt={featured.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '48px' }}>📝</div>
          )}
          <span style={{
            position: 'absolute', top: '16px', left: '16px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            color: 'white', fontSize: '10px', fontWeight: 700, padding: '6px 14px',
            borderRadius: '50px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>🔥 Most Read</span>
        </div>
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {featured.tags && featured.tags[0] && (
              <span style={{
                background: 'rgba(201,147,58,0.12)', color: 'var(--gold)',
                fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '50px',
              }}>{featured.tags[0]}</span>
            )}
            <span style={{ fontSize: '12px', color: 'var(--navy)', fontWeight: 600 }}>By {getAuthorName(featured)}</span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>• {formatDate(featured.published_at || featured.created_at)}</span>
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700,
            color: 'var(--navy)', lineHeight: 1.3, marginBottom: '12px',
          }}>{featured.title}</div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            {getExcerpt(featured.content)}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)' }}>Read Article →</span>
          </div>
        </div>
      </Link>

      {/* Other Articles Grid */}
      {others.length > 0 && (
        <div className="bento-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px',
        }}>
          {others.map((b) => (
            <Link key={b.id} href={`/blog/${b.slug}`} className="glass-card-light" style={{
              display: 'block', overflow: 'hidden', textDecoration: 'none', color: 'inherit',
            }}>
              <div style={{ position: 'relative', height: '200px', background: '#0B1F3A' }}>
                {b.featured_image ? (
                  <Image src={b.featured_image} alt={b.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '36px' }}>📝</div>
                )}
                {b.tags && b.tags[0] && (
                  <span style={{
                    position: 'absolute', top: '12px', left: '14px',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                    color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px',
                    borderRadius: '50px',
                  }}>{b.tags[0]}</span>
                )}
              </div>
              <div style={{padding: '24px'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{fontSize: '12px', color: 'var(--navy)', fontWeight: 600}}>By {getAuthorName(b)}</span>
                  <span style={{fontSize: '11px', color: 'var(--muted)'}}>• {formatDate(b.published_at || b.created_at)}</span>
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700,
                  color: 'var(--navy)', lineHeight: 1.35, marginBottom: '10px',
                }}>{b.title}</div>
                <p style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '14px'}}>{getExcerpt(b.content)}</p>
                <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--gold)'}}>Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showViewAll && (
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--navy)', color: 'white', padding: '14px 32px',
            borderRadius: '50px', fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            View All Articles →
          </Link>
        </div>
      )}
    </section>
  );
}
