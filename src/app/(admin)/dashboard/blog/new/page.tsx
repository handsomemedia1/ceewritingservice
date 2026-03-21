"use client";
import React from 'react';
import BlogEditor from '@/components/BlogEditor';

export default function NewAdminBlogPost() {
  return (
    <div>
      <BlogEditor isAdmin={true} />
    </div>
  );
}
