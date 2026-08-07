"use client";
import React from 'react';
import BlogEditor from '@/features/blog/admin/BlogEditor';

export default function NewWriterBlogPost() {
  return (
    <div>
      <BlogEditor isAdmin={false} />
    </div>
  );
}
