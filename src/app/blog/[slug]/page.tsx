import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_title, meta_description, featured_image')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return { title: 'Post Not Found | Cee Writing Blog' };
  }

  return {
    title: post.meta_title || `${post.title} | Cee Writing Blog`,
    description: post.meta_description || '',
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || '',
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the post
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post || error) {
    notFound();
  }

  // Reliable read tracking via Cookies (30 days expiry)
  const cookieStore = await cookies();
  const viewedCookie = cookieStore.get('viewed_posts');
  let viewedPosts: string[] = [];

  try {
    if (viewedCookie?.value) {
      viewedPosts = JSON.parse(viewedCookie.value);
    }
  } catch (e) {
    // ignore parse errors
  }

  // Only increment if this standard user hasn't seen this post recently
  if (!viewedPosts.includes(post.id)) {
    // 1. Increment on DB
    supabase.from('blog_posts').update({ reads: (post.reads || 0) + 1 }).eq('id', post.id).then(() => {});
    
    // 2. Add to local cookie string
    viewedPosts.push(post.id);
    // Keep cookie size manageable (max 100 recent posts)
    if (viewedPosts.length > 100) viewedPosts.shift();
    
    // 3. Save cookie
    cookieStore.set('viewed_posts', JSON.stringify(viewedPosts), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const readTime = Math.max(1, Math.ceil((post.content?.replace(/<[^>]+>/g, '').length || 0) / 1200));

  return (
    <main>
      <Navbar />

      {/* Article Header */}
      <section className="gradient-mesh" style={{
        background: 'linear-gradient(160deg, #061428, #0B1F3A, #112d52)',
        paddingTop: '140px', paddingBottom: '80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-1" />
        <div style={{position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 24px'}}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none',
            marginBottom: '24px', transition: 'color 0.2s',
          }}>
            ← Back to Blog
          </Link>

          {post.tags && post.tags[0] && (
            <div style={{
              display: 'inline-block', background: 'rgba(201,147,58,0.15)',
              border: '1px solid rgba(201,147,58,0.3)',
              color: '#E8B96A', fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px',
              marginBottom: '20px', marginLeft: '12px',
            }}>
              {post.tags[0]}
            </div>
          )}

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '20px',
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            fontSize: '13px', color: 'rgba(255,255,255,0.4)',
          }}>
            <span>{formatDate(post.published_at || post.created_at)}</span>
            <span style={{width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)'}} />
            <span>{readTime} min read</span>
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDFAF5"/>
          </svg>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div style={{ maxWidth: '800px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 4 }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article style={{
        background: 'var(--cream)', padding: '60px 24px 100px',
      }}>
        <div style={{maxWidth: '720px', margin: '0 auto'}}>
          {/* Render HTML content from TipTap editor */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content || '' }} 
          />

          {/* Blog content styling */}
          <style>{`
            .blog-content { font-size: 17px; color: var(--text); line-height: 1.85; }
            .blog-content h2 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--navy); margin-top: 40px; margin-bottom: 16px; }
            .blog-content h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--navy); margin-top: 32px; margin-bottom: 12px; }
            .blog-content p { margin-bottom: 24px; }
            .blog-content ul, .blog-content ol { padding-left: 24px; margin-bottom: 24px; }
            .blog-content li { margin-bottom: 8px; line-height: 1.8; }
            .blog-content blockquote { background: var(--white); border-left: 4px solid var(--gold); border-radius: 0 12px 12px 0; padding: 20px 24px; margin: 28px 0; box-shadow: var(--clay-shadow); font-style: italic; }
            .blog-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
            .blog-content a { color: var(--gold); text-decoration: underline; }
            .blog-content strong { font-weight: 700; }
            .blog-content em { font-style: italic; }
            .blog-content u { text-decoration: underline; }
          `}</style>

          {/* Author CTA */}
          <div style={{
            background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
            borderRadius: '20px', padding: '36px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '20px', marginTop: '40px',
          }}>
            <div>
              <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px'}}>Need Help?</div>
              <div style={{fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'white'}}>
                Let us handle your writing professionally.
              </div>
            </div>
            <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" className="btn-gold" style={{flexShrink: 0}}>
              <span>Chat Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
