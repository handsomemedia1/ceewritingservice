import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  tags: string[] | null;
  reads?: number;
  published_at: string | null;
  created_at: string;
  topic_pillar: string | null;
  difficulty?: string | null;
  estimated_read_time: number | null;
  profiles: { full_name: string | null; role: string } | null;
}

interface ArticleGridProps {
  showViewAll?: boolean;
  limit?: number;
  topicFilter?: string | null;
  difficultyFilter?: string | null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function calcReadTime(html: string) {
  return Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, '').length / 1200));
}

function excerpt(html: string, len = 140) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > len ? text.slice(0, len) + '…' : text;
}

function getAuthorName(profiles: Post['profiles']): string {
  if (!profiles) return 'Cee Writing Hub';
  if (profiles.role === 'admin') return 'Mercy Ogunwale';
  return profiles.full_name || 'Cee Writing Hub';
}

export default async function ArticleGrid({
  showViewAll = true,
  limit = 12,
  topicFilter,
  difficultyFilter,
}: ArticleGridProps) {
  const supabase = await createClient();

  // Primary query — includes profiles join and extra columns
  let { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, content, featured_image, tags, published_at, created_at, topic_pillar, estimated_read_time, profiles(full_name, role)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  // Fallback: retry with only safe base columns if profiles join fails
  if (error) {
    const fallback = await supabase
      .from('blog_posts')
      .select('id, title, slug, content, featured_image, tags, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (fallback.error || !fallback.data) {
      return (
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <p className="font-space" style={{ color: '#ff4444', fontSize: '14px' }}>Unable to load Knowledge Hub data.</p>
        </div>
      );
    }
    data = fallback.data as any;
  }

  const posts = (data as Post[]) || [];

  if (posts.length === 0) {
    return (
      <div style={{ padding: '120px 0', textAlign: 'center' }}>
        <p className="font-space" style={{ fontSize: '24px', color: '#EAEAEA', marginBottom: '16px' }}>No articles found.</p>
        <p className="font-inter" style={{ color: '#888888' }}>Try adjusting your topic filters or check back soon.</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;
  const featuredAuthor = getAuthorName(featured.profiles);

  return (
    <section style={{ backgroundColor: '#0A0A0A', paddingBottom: '120px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        {/* Featured article - Newspaper Spread */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '80px',
            paddingTop: '80px',
            paddingBottom: '120px',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(197,160,89,0.2)',
          }}
        >
          {/* Text side */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C5A059',
                }}
              >
                {featured.topic_pillar || 'Featured'}
              </span>
              <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(197,160,89,0.3)' }} />
              <span
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#888888',
                }}
              >
                {featured.estimated_read_time || calcReadTime(featured.content)} MIN READ
              </span>
            </div>
            
            <h2
              className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '32px',
                transition: 'color 0.3s ease',
              }}
            >
              {featured.title}
            </h2>
            
            <p
              className="font-inter"
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                marginBottom: '48px',
                maxWidth: '540px',
              }}
            >
              {excerpt(featured.content, 220)}
            </p>
            
            {/* Author + Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#C5A059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  className="font-space"
                  style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0A' }}
                >
                  {featuredAuthor[0]}
                </span>
              </div>
              <div>
                <span
                  className="font-space"
                  style={{ fontSize: '13px', fontWeight: 700, color: '#EAEAEA', display: 'block', marginBottom: '2px' }}
                >
                  {featuredAuthor}
                </span>
                <span
                  className="font-space"
                  style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}
                >
                  {formatDate(featured.published_at || featured.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Image side */}
          {featured.featured_image && (
            <div style={{ flex: '1 1 400px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={featured.featured_image} 
                  alt={featured.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(30%)',
                    transition: 'transform 0.6s ease, filter 0.4s ease',
                  }}
                  className="group-hover:scale-[1.02] group-hover:grayscale-0"
                />
              </div>
            </div>
          )}
        </Link>

        {/* List of remaining articles — editorial rows */}
        {rest.length > 0 && (
          <div style={{ borderBottom: '1px solid rgba(197,160,89,0.1)', marginBottom: '80px' }}>
            {rest.map((post) => {
              const author = getAuthorName(post.profiles);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '40px',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                    borderTop: '1px solid rgba(197,160,89,0.1)',
                    textDecoration: 'none',
                  }}
                >
                  {/* Thumbnail */}
                  {post.featured_image && (
                    <div
                      style={{
                        flex: '0 0 120px',
                        width: '120px',
                        height: '80px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(40%)',
                          transition: 'filter 0.4s ease, transform 0.4s ease',
                        }}
                        className="group-hover:grayscale-0 group-hover:scale-[1.05]"
                      />
                    </div>
                  )}

                  {/* Date / Category */}
                  <div style={{ flex: '0 1 140px' }}>
                    <span
                      className="font-space"
                      style={{
                        display: 'block',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(197,160,89,0.6)',
                        marginBottom: '6px',
                      }}
                    >
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span
                      className="font-space"
                      style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555555' }}
                    >
                      {post.topic_pillar || 'Article'}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <div style={{ flex: '3 1 300px' }}>
                    <h3
                      className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
                      style={{
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        marginBottom: '10px',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {post.title}
                    </h3>
                    <span
                      className="font-space"
                      style={{ fontSize: '11px', fontWeight: 700, color: '#666666', letterSpacing: '0.05em' }}
                    >
                      By {author}
                    </span>
                  </div>
                  
                  {/* Read Time */}
                  <div style={{ flex: '0 1 100px', textAlign: 'right', flexShrink: 0 }}>
                    <span
                      className="font-space"
                      style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}
                    >
                      {post.estimated_read_time || calcReadTime(post.content)} MIN READ
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {showViewAll && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <Link
              href="/blog"
              className="font-space"
              style={{
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                backgroundColor: '#EAEAEA',
                padding: '16px 32px',
                textDecoration: 'none',
              }}
            >
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
