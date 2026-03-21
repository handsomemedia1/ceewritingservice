"use client";
import React from 'react';
import BlogEditor from '@/components/BlogEditor';
import { useParams } from 'next/navigation';

export default function EditWriterBlogPost() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <BlogEditor isAdmin={false} postId={id} />
    </div>
  );
}
