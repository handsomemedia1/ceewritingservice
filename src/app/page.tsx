import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import BlogPreview from '@/components/BlogPreview';

export const metadata: Metadata = {
  title: 'Cee Writing Service | Professional Writing, Data Analysis and Plagiarism Checks',
  description: 'Nigeria\'s trusted writing service — real Turnitin plagiarism checks, CV writing, SOP writing, AI humanizing, and data analysis with Python & R. 500+ clients. 24-hour delivery. Serving UK, Canada, USA, UAE, Kuwait.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeClient blogPreview={<BlogPreview featuredOnly={true} />} />;
}
