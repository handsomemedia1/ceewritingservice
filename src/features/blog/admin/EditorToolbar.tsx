'use client';
import React from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, Quote, Undo, Redo, ImagePlus, Loader2,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: any;
  onImageUpload: () => void;
  uploadingImage: boolean;
}

export default function EditorToolbar({ editor, onImageUpload, uploadingImage }: EditorToolbarProps) {
  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded-lg transition-all ${active ? 'bg-green-dark text-white' : 'bg-sage/20 text-green-dark hover:bg-green-dark/10'}`;

  const setLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', prev);
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-3 border-b border-green-dark/8 bg-sage/20/50 rounded-t-xl">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
        className={btn(editor.isActive('bold'))} title="Bold"><Bold size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btn(editor.isActive('italic'))} title="Italic"><Italic size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btn(editor.isActive('underline'))} title="Underline"><UnderlineIcon size={15} /></button>

      <div className="w-px bg-green-dark/10 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btn(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btn(editor.isActive('heading', { level: 3 }))} title="Heading 3"><Heading3 size={15} /></button>

      <div className="w-px bg-green-dark/10 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editor.isActive('bulletList'))} title="Bullet List"><List size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editor.isActive('blockquote'))} title="Quote"><Quote size={15} /></button>

      <div className="w-px bg-green-dark/10 mx-1" />

      <button type="button" onClick={setLink}
        className={btn(editor.isActive('link'))} title="Add Link"><LinkIcon size={15} /></button>
      <button type="button" onClick={onImageUpload} disabled={uploadingImage}
        className={`${btn(false)} ${uploadingImage ? 'opacity-50' : ''}`} title="Insert Image">
        {uploadingImage ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
      </button>

      <div className="w-px bg-green-dark/10 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().undo().run()}
        className={btn(false)} title="Undo"><Undo size={15} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}
        className={btn(false)} title="Redo"><Redo size={15} /></button>
    </div>
  );
}
