"use client";
import React from 'react';
import BlogEditor from '@/features/blog/admin/BlogEditor';

export default function NewAdminBlogPost() {
  return (
    <div>
      <BlogEditor isAdmin={true} />
    </div>
  );
}
