"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Send, Image as ImageIcon, ArrowLeft, ImagePlus, Loader2 } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';
import EditorToolbar from './EditorToolbar';
import MetaPanel from './MetaPanel';

type BlogEditorProps = {
  postId?: string;
  isAdmin?: boolean;
};

export default function BlogEditor({ postId, isAdmin = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!postId);

  // Core fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('draft');
  const [tags, setTags] = useState('');

  // SEO fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSeoData, setAiSeoData] = useState<{ score: number; color: string; recommendations: string[] } | null>(null);

  // Knowledge Hub classification fields
  const [topicPillar, setTopicPillar] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [learningPath, setLearningPath] = useState('');
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [referencesList, setReferencesList] = useState('');

  // Image upload
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const featuredFileRef = React.useRef<HTMLInputElement>(null);

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
        class: 'min-h-[450px] p-5 outline-none text-sm leading-relaxed text-green-dark',
      },
    },
  });

  useEffect(() => {
    if (postId) {
      const fetch = async () => {
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
          setTopicPillar(data.topic_pillar || '');
          setSubtopic(data.subtopic || '');
          setDifficulty(data.difficulty || '');
          setLearningPath(data.learning_path || '');
          setExecutiveSummary(data.executive_summary || '');
          setReferencesList(data.references_list || '');
          if (editor && data.content) editor.commands.setContent(data.content);
        }
        setInitialLoading(false);
      };
      fetch();
    }
  }, [postId, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTitle(v);
    if (!postId) setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const calculateSEOScore = () => {
    if (aiSeoData?.color) return aiSeoData.color.toLowerCase();
    const content = editor?.getHTML() || '';
    let score = 0;
    if (title.length > 30) score++;
    if (content.length > 300) score++;
    if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) score++;
    if (metaDescription.length > 50) score++;
    return score >= 3 ? 'green' : score === 2 ? 'yellow' : 'red';
  };

  const analyzeSEO = async () => {
    const content = editor?.getHTML() || '';
    if (!title || !content) { alert('Please add a Title and Content first.'); return; }
    setAiAnalyzing(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, focusKeyword, metaDescription }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiSeoData(data);
    } catch (err: any) {
      alert('AI Analysis failed: ' + err.message);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const savePost = async (targetStatus: string) => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert('You must be logged in.'); setLoading(false); return; }

    const content = editor?.getHTML() || '';
    const wordCount = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).length;
    const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

    const postData = {
      title, slug, content,
      featured_image: featuredImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyword: focusKeyword,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      seo_score: calculateSEOScore(),
      status: targetStatus,
      author_id: user.id,
      // Knowledge Hub fields
      topic_pillar: topicPillar || null,
      subtopic: subtopic || null,
      difficulty: difficulty || null,
      learning_path: learningPath || null,
      executive_summary: executiveSummary || null,
      references_list: referencesList || null,
      estimated_read_time: estimatedReadTime,
      last_updated_at: new Date().toISOString(),
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
    if (error) alert('Error saving post: ' + error.message);
    else { alert(`Saved as ${targetStatus.replace('_', ' ')}!`); setStatus(targetStatus); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
    setUploadingImage(true);
    try {
      const supabase = createClient();
      const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${file.name.split('.').pop()}`;
      const { error: err } = await supabase.storage.from('blog-images').upload(`uploads/${fileName}`, file);
      if (err) throw err;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(`uploads/${fileName}`);
      editor?.chain().focus().setImage({ src: urlData.publicUrl }).run();
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
    setUploadingFeatured(true);
    try {
      const supabase = createClient();
      const fileName = `featured_${Math.random().toString(36).slice(2)}_${Date.now()}.${file.name.split('.').pop()}`;
      const { error: err } = await supabase.storage.from('blog-images').upload(`featured/${fileName}`, file);
      if (err) throw err;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(`featured/${fileName}`);
      setFeaturedImage(urlData.publicUrl);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingFeatured(false);
      if (featuredFileRef.current) featuredFileRef.current.value = '';
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-green-dark" size={28} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <button onClick={() => router.back()}
        className="flex items-center gap-2 text-muted font-semibold text-sm mb-6 hover:text-green-dark transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-green-dark font-serif">{postId ? 'Edit Article' : 'New Article'}</h2>
        <div className="flex gap-3">
          <button onClick={() => savePost('draft')} disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-green-dark/15 text-green-dark font-bold text-sm hover:border-green-dark/40 transition-all">
            <Save size={15} /> Save Draft
          </button>
          {isAdmin ? (
            <button onClick={() => savePost('published')} disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all">
              <Send size={15} /> Publish Live
            </button>
          ) : (
            <button onClick={() => savePost('pending_review')} disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-green-dark font-bold text-sm transition-all"
              style={{ background: 'var(--gold)' }}>
              <Send size={15} /> Submit for Review
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6">
        {/* Left: editor */}
        <div className="space-y-5">
          {/* Title + Slug */}
          <div className="bg-white rounded-2xl border border-green-dark/8 p-6">
            <label className="block text-xs font-bold text-green-dark mb-2 uppercase tracking-wider">Article Title</label>
            <input type="text" value={title} onChange={handleTitleChange}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 text-lg font-bold rounded-xl border border-green-dark/10 outline-none focus:border-green-dark/20 transition-colors" />
            <div className="mt-4">
              <label className="block text-xs font-bold text-green-dark mb-2 uppercase tracking-wider">URL Slug</label>
              <div className="flex items-center bg-sage/20 rounded-xl border border-green-dark/10 px-4 py-3 text-sm">
                <span className="text-muted mr-1">ceewriting.com/blog/</span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-none outline-none text-green-dark font-medium flex-1" />
              </div>
            </div>
          </div>

          {/* TipTap Editor */}
          <div className="bg-white rounded-2xl border border-green-dark/8 overflow-hidden">
            <div className="px-5 pt-4 pb-0">
              <label className="block text-xs font-bold text-green-dark uppercase tracking-wider">Content Editor</label>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
            <EditorToolbar editor={editor} onImageUpload={() => fileInputRef.current?.click()} uploadingImage={uploadingImage} />
            <div className="cursor-text" onClick={() => editor?.chain().focus().run()}>
              <EditorContent editor={editor} />
            </div>
            <style>{`
              .tiptap { min-height: 450px; padding: 20px; outline: none; font-size: 15px; line-height: 1.8; }
              .tiptap h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0B1F3A; margin: 24px 0 12px; }
              .tiptap h3 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #0B1F3A; margin: 20px 0 8px; }
              .tiptap p { margin-bottom: 14px; }
              .tiptap ul, .tiptap ol { padding-left: 24px; margin-bottom: 14px; }
              .tiptap li { margin-bottom: 6px; }
              .tiptap blockquote { border-left: 4px solid #C9933A; padding: 12px 20px; margin: 16px 0; background: #FDFAF5; border-radius: 0 8px 8px 0; font-style: italic; }
              .tiptap img { max-width: 100%; height: auto; border-radius: 12px; margin: 16px 0; }
              .tiptap a { color: #C9933A; text-decoration: underline; }
              .tiptap strong { font-weight: 700; }
            `}</style>
          </div>
        </div>

        {/* Right: sidepanels */}
        <div className="space-y-5">
          {/* Featured Image */}
          <div className="bg-white rounded-2xl border border-green-dark/8 p-5">
            <h3 className="font-bold text-green-dark text-sm flex items-center gap-2 mb-4">
              <ImageIcon size={16} /> Featured Image
            </h3>
            <input type="file" accept="image/*" ref={featuredFileRef} className="hidden" onChange={handleFeaturedUpload} />
            <button onClick={() => featuredFileRef.current?.click()} disabled={uploadingFeatured}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-dark text-white font-bold text-sm mb-3 hover:bg-green-dark-mid transition-all">
              {uploadingFeatured ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
              {uploadingFeatured ? 'Uploading...' : 'Upload from Device'}
            </button>
            <input type="text" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Or paste image URL..." className="w-full px-3 py-2.5 rounded-lg border border-green-dark/10 text-xs outline-none focus:border-green-dark/20 mb-3 transition-colors" />
            {featuredImage && (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-green-dark/5">
                <img src={featuredImage} alt="Featured preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* SEO Panel */}
          <div className="bg-white rounded-2xl border border-green-dark/8 p-5 space-y-4">
            <h3 className="font-bold text-green-dark text-sm">SEO Configuration</h3>
            {[
              { label: 'Focus Keyword', value: focusKeyword, setter: setFocusKeyword, placeholder: 'e.g. research methodology' },
              { label: 'Meta Title', value: metaTitle, setter: setMetaTitle, placeholder: 'SEO Title (50-60 chars)' },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-green-dark mb-1.5 uppercase tracking-wider">{label}</label>
                <input type="text" value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                  className="w-full px-3 py-2.5 rounded-lg border border-green-dark/10 text-sm outline-none focus:border-green-dark/20 transition-colors" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold text-green-dark mb-1.5 uppercase tracking-wider">Meta Description</label>
              <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief summary for search engines..." rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-green-dark/10 text-sm outline-none focus:border-green-dark/20 transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-green-dark mb-1.5 uppercase tracking-wider">Tags</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
                placeholder="scholarship, research, cv" className="w-full px-3 py-2.5 rounded-lg border border-green-dark/10 text-sm outline-none focus:border-green-dark/20 transition-colors" />
            </div>
            <button onClick={analyzeSEO} disabled={aiAnalyzing}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-dark text-white font-bold text-sm transition-all">
              {aiAnalyzing ? <><Loader2 size={14} className="animate-spin" /> Analyzing...</> : '✨ Run Smart SEO Audit'}
            </button>
            {aiSeoData && (
              <div className={`p-4 rounded-xl text-sm ${aiSeoData.color === 'green' ? 'bg-green-50 text-green-800' : aiSeoData.color === 'yellow' ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-2">SEO Score: {aiSeoData.score}/100</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  {aiSeoData.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Knowledge Hub classification */}
          <MetaPanel
            topicPillar={topicPillar} setTopicPillar={setTopicPillar}
            subtopic={subtopic} setSubtopic={setSubtopic}
            difficulty={difficulty} setDifficulty={setDifficulty}
            learningPath={learningPath} setLearningPath={setLearningPath}
            executiveSummary={executiveSummary} setExecutiveSummary={setExecutiveSummary}
            referencesList={referencesList} setReferencesList={setReferencesList}
          />

          {/* Status */}
          <div className="bg-white rounded-2xl border border-green-dark/8 p-5">
            <h3 className="font-bold text-green-dark text-sm mb-3">Post Status</h3>
            <div className="flex justify-between items-center px-4 py-3 bg-sage/20 rounded-xl text-sm">
              <span className="text-muted font-medium">Current State</span>
              <span className="font-bold text-green-dark capitalize">{status.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
