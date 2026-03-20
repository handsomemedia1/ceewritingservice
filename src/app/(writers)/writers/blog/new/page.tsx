"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Send, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = !params.id; // if accessed via /writers/blog/new vs /writers/blog/[id]
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [tags, setTags] = useState('');
  
  // Real-time SEO Scoring calculation
  const [seoScore, setSeoScore] = useState<'red' | 'yellow' | 'green'>('red');
  const [seoFeedback, setSeoFeedback] = useState<string[]>([]);

  // Calculate SEO score whenever relevant fields change
  useEffect(() => {
    let score = 0;
    const feedback = [];
    
    if (focusKeyword.length > 2) {
      const keywordLower = focusKeyword.toLowerCase();
      
      // 1. Keyword in Title?
      if (title.toLowerCase().includes(keywordLower)) {
        score += 30;
        feedback.push('✓ Focus keyword in title');
      } else {
        feedback.push('✗ Add focus keyword to title');
      }
      
      // 2. Meta description length & keyword
      if (metaDescription.length > 120 && metaDescription.length < 160) {
        score += 20;
        feedback.push('✓ Meta description is optimal length');
      } else {
        feedback.push('✗ Meta description should be 120-160 chars');
      }
      
      if (metaDescription.toLowerCase().includes(keywordLower)) {
        score += 20;
        feedback.push('✓ Focus keyword in meta description');
      } else {
        feedback.push('✗ Add focus keyword to meta desc');
      }
      
      // 3. Content Length
      if (content.length > 1500) {
        score += 15;
        feedback.push('✓ Content length is good (>300 words)');
      } else {
        feedback.push('✗ Content is too short');
      }
      
      // 4. Keyword density in content
      const contentLower = content.toLowerCase();
      const keywordCount = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
      if (keywordCount > 1 && keywordCount < 15) {
        score += 15;
        feedback.push('✓ Keyword density is optimal');
      } else if (keywordCount === 0) {
        feedback.push('✗ Focus keyword missing from content');
      } else {
        feedback.push('✗ Keyword density might be too high (keyword stuffing)');
      }
    } else {
      feedback.push('Please set a Focus Keyword first.');
    }
    
    setSeoFeedback(feedback);
    
    if (score >= 80) setSeoScore('green');
    else if (score >= 50) setSeoScore('yellow');
    else setSeoScore('red');
    
  }, [title, content, focusKeyword, metaTitle, metaDescription]);

  const handleSave = async (status: 'draft' | 'pending_review') => {
    setSaving(true);
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not logged in');

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

      const postData = {
        title,
        slug: slug || `draft-${Date.now()}`,
        content,
        meta_title: metaTitle,
        meta_description: metaDescription,
        focus_keyword: focusKeyword,
        tags: tagsArray,
        seo_score: seoScore,
        status,
        author_id: user.id
      };

      if (isNew) {
        const { error } = await supabase.from('blog_posts').insert([postData]);
        if (error) throw error;
        router.push('/writers/blog');
      } else {
        const { error } = await supabase.from('blog_posts').update(postData).eq('id', params.id);
        if (error) throw error;
        if (status === 'pending_review') router.push('/writers/blog');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
      {/* Editor Main */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <input 
            type="text" 
            placeholder="Add article title..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ 
              width: '100%', fontSize: '32px', fontWeight: 700, border: 'none', 
              outline: 'none', color: 'var(--navy)', fontFamily: "'Playfair Display', serif" 
            }}
          />
        </div>
        
        {/* Simple rich text area placeholder */}
        <div style={{ padding: '0 24px' }}>
          <textarea 
            placeholder="Start writing or pasting your Markdown content here..." 
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ 
              width: '100%', minHeight: '600px', border: 'none', outline: 'none', 
              padding: '24px 0', fontSize: '16px', lineHeight: 1.8, color: 'var(--text)',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* SEO & Settings Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Actions */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => handleSave('draft')}
            disabled={saving}
            style={{ 
              padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', 
              cursor: 'pointer', fontWeight: 600, color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
            }}>
            <Save size={18} /> Save as Draft
          </button>
          <button 
            onClick={() => handleSave('pending_review')}
            disabled={saving || seoScore === 'red'}
            style={{ 
              padding: '12px', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', border: 'none', borderRadius: '8px', 
              cursor: seoScore === 'red' ? 'not-allowed' : 'pointer', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: seoScore === 'red' ? 0.6 : 1 
            }}>
            <Send size={18} /> Submit for Review
          </button>
          {seoScore === 'red' && <p style={{fontSize: '12px', color: '#ef4444', textAlign: 'center', margin: 0}}>Improve SEO before submitting.</p>}
        </div>

        {/* SEO Tools */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }}>Cee SEO Optimization</h3>
            <div style={{ 
              width: '36px', height: '16px', borderRadius: '10px', display: 'flex',
              background: seoScore === 'green' ? '#10b981' : seoScore === 'yellow' ? '#f59e0b' : '#ef4444'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Focus Keyword</label>
              <input type="text" value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="e.g. proofreading service" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>SEO Title (optional)</label>
              <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder={title || "Title tag..."} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Meta Description</label>
              <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', resize: 'vertical' }} placeholder="Summary for search engines..." />
              <div style={{ textAlign: 'right', fontSize: '11px', color: metaDescription.length > 160 ? '#ef4444' : 'var(--muted)', marginTop: '4px' }}>{metaDescription.length} / 160</div>
            </div>

            {/* SEO Feedback Checklist */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px', letterSpacing: '0.5px' }}>Analysis Results</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {seoFeedback.map((text, i) => (
                  <li key={i} style={{ fontSize: '13px', color: text.startsWith('✓') ? '#059669' : '#b91c1c', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Categories & Tags */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>Organization</h3>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Tags (comma separated)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="admission, scholarship, tips" />
          </div>
        </div>

      </div>
    </div>
  );
}
