import type { Metadata } from 'next';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import Providers from '@/components/Providers';
import TelegramBanner from '@/components/TelegramBanner';
import FloatingActions from '@/components/FloatingActions';
import SmoothScroller from '@/components/SmoothScroller';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Cee Writing | Research, Data Analysis and Writing Support',
  description: 'Trusted writing service for clients in Nigeria, USA, UK, Canada, UAE, and Kuwait. We provide in depth academic research, data analysis using Python and R, plagiarism checks with Turnitin, CVs, SOP writing, and professional editing.',
  metadataBase: new URL('https://ceewriting.com'),
  openGraph: {
    title: 'Cee Writing Service | Professional Writing and Data Analysis',
    description: 'Expert writing, in depth research, data analysis using Python and R, and plagiarism checks for clients globally including Nigeria, USA, UK, Canada, UAE, and Kuwait.',
    type: 'website',
    siteName: 'Cee Writing',
    locale: 'en_NG',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Cee Writing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cee Writing Service | Professional Writing and Data Analysis',
    description: 'Expert writing, in depth research, data analysis using Python and R, and plagiarism checks.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    yandex: 'd9faaf07ba87833f',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <link rel="alternate" type="application/rss+xml" title="Cee Writing Knowledge Hub" href="/feed.xml" />
        <link rel="alternate" type="text/markdown" title="Site guide for AI assistants" href="/llms.txt" />
      </head>
      <body>
        <SmoothScroller>
          <Providers>
            {children}
            <TelegramBanner />
            <FloatingActions />
          </Providers>
        </SmoothScroller>
        
        {/* Analytics & Speed Insights */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}
