"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Send, Image as ImageIcon, ArrowLeft } from 'lucide-react';

type BlogEditorProps = {
  postId?: string;
  isAdmin?: boolean;
};

export default function BlogEditor({ postId, isAdmin = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!postId);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');

  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSeoData, setAiSeoData] = useState<{ score: number, color: string, recommendations: string[] } | null>(null);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.from('blog_posts').select('*').eq('id', postId).single();
        if (data) {
          setTitle(data.title || '');
          setSlug(data.slug || '');
          setContent(data.content || '');
          setFeaturedImage(data.featured_image || '');
          setMetaTitle(data.meta_title || '');
          setMetaDescription(data.meta_description || '');
          setFocusKeyword(data.focus_keyword || '');
          setTags(data.tags ? data.tags.join(', ') : '');
          setStatus(data.status || 'draft');
        }
        setInitialLoading(false);
      };
      fetchPost();
    }
  }, [postId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!postId) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const calculateSEOScore = () => {
    if (aiSeoData && aiSeoData.color) {
      return aiSeoData.color.toLowerCase();
    }
    
    // Fallback to basic if AI hasn't run
    let score = 0;
    if (title.length > 30) score++;
    if (content.length > 300) score++;
    if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) score++;
    if (metaDescription.length > 50) score++;
    
    if (score >= 3) return 'green';
    if (score === 2) return 'yellow';
    return 'red';
  };

  const analyzeSEO = async () => {
    if (!title || !content) {
      alert("Please add a Title and some Content before analyzing.");
      return;
    }
    setAiAnalyzing(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, focusKeyword, metaDescription })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setAiSeoData(data);
    } catch (err: any) {
      alert("AI Analysis failed: " + err.message);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const savePost = async (targetStatus: string) => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const postData = {
      title,
      slug,
      content,
      featured_image: featuredImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyword: focusKeyword,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      seo_score: calculateSEOScore(),
      status: targetStatus,
      author_id: user.id
    };

    let error;
    if (postId) {
      const res = await supabase.from('blog_posts').update(postData).eq('id', postId);
      error = res.error;
    } else {
      const res = await supabase.from('blog_posts').insert([postData]).select();
      error = res.error;
      if (!error && res.data) {
        // If it's a new post, redirect to its edit page to prevent duplicate inserts on double-saves
        const newId = res.data[0].id;
        router.replace(isAdmin ? `/dashboard/blog/${newId}` : `/writers/blog/${newId}`);
      }
    }

    setLoading(false);
    if (error) {
      alert("Error saving post: " + error.message);
    } else {
      alert(`Post successfully saved as ${targetStatus.replace('_', ' ')}!`);
      setStatus(targetStatus);
    }
  };

  if (initialLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Editor...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '64px' }}>
      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)' }}>{postId ? 'Edit Article' : 'New Article'}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => savePost('draft')}
            disabled={loading}
            style={{ padding: '10px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={16} /> Save Draft
          </button>
          
          {isAdmin ? (
            <button 
              onClick={() => savePost('published')}
              disabled={loading}
              style={{ padding: '10px 20px', background: '#10b981', border: 'none', borderRadius: '8px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Send size={16} /> Publish Live
            </button>
          ) : (
             <button 
              onClick={() => savePost('pending_review')}
              disabled={loading}
              style={{ padding: '10px 20px', background: 'var(--gold)', border: 'none', borderRadius: '8px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Send size={16} /> Submit for Review
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>
        {/* Main Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', textTransform: 'uppercase' }}>Article Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={handleTitleChange}
              placeholder="Enter an engaging title..."
              style={{ width: '100%', padding: '16px', fontSize: '18px', fontWeight: 600, borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', textTransform: 'uppercase' }}>URL Slug</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: 'var(--muted)', marginRight: '4px' }}>ceewriting.com/blog/</span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--navy)', fontWeight: 500, width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', textTransform: 'uppercase' }}>Content Editor</label>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Use Markdown or HTML formatting to structure your post.</p>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article here..."
              style={{ width: '100%', minHeight: '500px', padding: '16px', fontSize: '15px', lineHeight: 1.6, borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', resize: 'vertical', fontFamily: 'monospace' }}
            />
          </div>
        </div>

        {/* Sidebar / SEO Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} /> Featured Image
            </h3>
            <input 
              type="text" 
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Paste image URL here..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }}
            />
            {featuredImage && (
              <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', backgroundImage: `url(${featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>SEO Configuration</h3>
            
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Focus Keyword</label>
            <input 
              type="text" 
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="e.g., resume writing tips"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }}
            />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Meta Title</label>
            <input 
              type="text" 
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO Title (50-60 chars)"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }}
            />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Meta Description</label>
            <textarea 
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="A brief summary for search engines..."
              style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px', resize: 'none' }}
            />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Tags (Comma separated)</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="career, cv, interview"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }}
            />

            <button
              onClick={analyzeSEO}
              disabled={aiAnalyzing}
              style={{ width: '100%', padding: '12px', background: 'var(--navy)', color: 'white', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: aiAnalyzing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: aiAnalyzing ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              {aiAnalyzing ? 'AI Analyzing...' : 'Run Smart SEO Audit'}
            </button>

            {aiSeoData && (
              <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: aiSeoData.color === 'green' ? '#f0fdf4' : aiSeoData.color === 'yellow' ? '#fefce8' : '#fef2f2', border: `1px solid ${aiSeoData.color === 'green' ? '#bbf7d0' : aiSeoData.color === 'yellow' ? '#fef08a' : '#fecaca'}` }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: aiSeoData.color === 'green' ? '#166534' : aiSeoData.color === 'yellow' ? '#854d0e' : '#991b1b' }}>
                  SEO Score: {aiSeoData.score}/100
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {aiSeoData.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ lineHeight: 1.5 }}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>Status Info</h3>
             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
               <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '14px' }}>Draft State</span>
               <span style={{ fontWeight: 700, color: 'var(--navy)', textTransform: 'capitalize' }}>{status.replace('_', ' ')}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
