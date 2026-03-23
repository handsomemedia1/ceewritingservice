"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Send, Image as ImageIcon, ArrowLeft, ImagePlus, Loader2, Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Quote, Undo, Redo } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';

type BlogEditorProps = {
  postId?: string;
  isAdmin?: boolean;
};

// --- Toolbar Component ---
function Toolbar({ editor, onImageUpload, uploadingImage }: { editor: any, onImageUpload: () => void, uploadingImage: boolean }) {
  if (!editor) return null;

  const btnStyle = (isActive: boolean) => ({
    padding: '6px 8px', background: isActive ? 'var(--navy)' : '#f1f5f9',
    color: isActive ? 'white' : 'var(--navy)', border: 'none', borderRadius: '6px',
    cursor: 'pointer', display: 'flex' as const, alignItems: 'center' as const,
    transition: 'all 0.15s',
  });

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL:', previousUrl);
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '8px 12px',
      borderBottom: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: '12px 12px 0 0',
    }}>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive('bold'))} title="Bold"><Bold size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive('italic'))} title="Italic"><Italic size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive('underline'))} title="Underline"><UnderlineIcon size={16} /></button>
      <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btnStyle(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={btnStyle(editor.isActive('heading', { level: 3 }))} title="Heading 3"><Heading3 size={16} /></button>
      <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive('bulletList'))} title="Bullet List"><List size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive('blockquote'))} title="Quote"><Quote size={16} /></button>
      <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
      <button type="button" onClick={setLink} style={btnStyle(editor.isActive('link'))} title="Add Link"><LinkIcon size={16} /></button>
      <button type="button" onClick={onImageUpload} disabled={uploadingImage} style={{...btnStyle(false), opacity: uploadingImage ? 0.5 : 1}} title="Insert Image">
        {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
      </button>
      <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
      <button type="button" onClick={() => editor.chain().focus().undo().run()} style={btnStyle(false)} title="Undo"><Undo size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} style={btnStyle(false)} title="Redo"><Redo size={16} /></button>
    </div>
  );
}

// --- Main Editor ---
export default function BlogEditor({ postId, isAdmin = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!postId);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');

  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const featuredFileRef = React.useRef<HTMLInputElement>(null);

  const [aiSeoData, setAiSeoData] = useState<{ score: number, color: string, recommendations: string[] } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      ImageExtension.configure({ inline: false, allowBase64: false }),
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: '',
    editorProps: {
      attributes: {
        style: 'min-height: 450px; padding: 16px; outline: none; font-size: 15px; line-height: 1.7; color: var(--text);',
      },
    },
  });

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const supabase = createClient();
        const { data } = await supabase.from('blog_posts').select('*').eq('id', postId).single();
        if (data) {
          setTitle(data.title || '');
          setSlug(data.slug || '');
          setFeaturedImage(data.featured_image || '');
          setMetaTitle(data.meta_title || '');
          setMetaDescription(data.meta_description || '');
          setFocusKeyword(data.focus_keyword || '');
          setTags(data.tags ? data.tags.join(', ') : '');
          setStatus(data.status || 'draft');
          if (editor && data.content) {
            editor.commands.setContent(data.content);
          }
        }
        setInitialLoading(false);
      };
      fetchPost();
    }
  }, [postId, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!postId) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const calculateSEOScore = () => {
    if (aiSeoData && aiSeoData.color) return aiSeoData.color.toLowerCase();
    const content = editor?.getHTML() || '';
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
    const content = editor?.getHTML() || '';
    if (!title || !content) { alert("Please add a Title and some Content before analyzing."); return; }
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
    if (!user) { alert("You must be logged in."); setLoading(false); return; }

    const content = editor?.getHTML() || '';
    const postData = {
      title, slug, content,
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

  // Upload an image into the body of the article
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('File is too large. Max 5MB.'); return; }

    setUploadingImage(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      editor?.chain().focus().setImage({ src: publicUrlData.publicUrl }).run();
    } catch (err: any) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Upload a Featured Image from device
  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('File is too large. Max 5MB.'); return; }

    setUploadingFeatured(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `featured_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `featured/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setFeaturedImage(publicUrlData.publicUrl);
    } catch (err: any) {
      alert("Failed to upload featured image: " + err.message);
    } finally {
      setUploadingFeatured(false);
      if (featuredFileRef.current) featuredFileRef.current.value = '';
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

          {/* WYSIWYG Editor */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 0' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase' }}>Content Editor</label>
            </div>
            <input type="file" accept="image/png, image/jpeg, image/gif, image/webp" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
            <Toolbar editor={editor} onImageUpload={() => fileInputRef.current?.click()} uploadingImage={uploadingImage} />
            <div style={{ flex: 1, cursor: 'text' }} onClick={() => editor?.chain().focus().run()}>
              <EditorContent editor={editor} />
            </div>
            <style>{`
              .tiptap { min-height: 450px; padding: 16px; outline: none; font-size: 15px; line-height: 1.7; }
              .tiptap h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin: 24px 0 12px; }
              .tiptap h3 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: var(--navy); margin: 20px 0 8px; }
              .tiptap p { margin-bottom: 12px; }
              .tiptap ul, .tiptap ol { padding-left: 24px; margin-bottom: 12px; }
              .tiptap li { margin-bottom: 4px; }
              .tiptap blockquote { border-left: 4px solid var(--gold); padding: 12px 20px; margin: 16px 0; background: #f8fafc; border-radius: 0 8px 8px 0; font-style: italic; }
              .tiptap img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
              .tiptap a { color: var(--gold); text-decoration: underline; }
              .tiptap strong { font-weight: 700; }
            `}</style>
          </div>
        </div>

        {/* Sidebar / SEO Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} /> Featured Image
            </h3>
            <input type="file" accept="image/png, image/jpeg, image/gif, image/webp" ref={featuredFileRef} style={{ display: 'none' }} onChange={handleFeaturedUpload} />
            <button
              onClick={() => featuredFileRef.current?.click()}
              disabled={uploadingFeatured}
              style={{ width: '100%', padding: '12px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: uploadingFeatured ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', opacity: uploadingFeatured ? 0.7 : 1 }}
            >
              {uploadingFeatured ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
              {uploadingFeatured ? 'Uploading...' : 'Upload from Device'}
            </button>
            <input 
              type="text" 
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Or paste image URL here..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px', fontSize: '13px' }}
            />
            {featuredImage && (
              <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', backgroundImage: `url(${featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>SEO Configuration</h3>
            
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Focus Keyword</label>
            <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="e.g., resume writing tips" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }} />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Meta Title</label>
            <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO Title (50-60 chars)" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }} />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Meta Description</label>
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="A brief summary for search engines..." style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px', resize: 'none' }} />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Tags (Comma separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="career, cv, interview" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '16px' }} />

            <button
              onClick={analyzeSEO}
              disabled={aiAnalyzing}
              style={{ width: '100%', padding: '12px', background: 'var(--navy)', color: 'white', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: aiAnalyzing ? 'not-allowed' : 'pointer', opacity: aiAnalyzing ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
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
