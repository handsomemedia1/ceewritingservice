"use client";
import React from 'react';
import BlogEditor from '@/components/BlogEditor';

export default function NewWriterBlogPost() {
  return (
    <div>
      <BlogEditor isAdmin={false} />
    </div>
  );
}
