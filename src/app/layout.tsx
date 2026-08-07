import type { Metadata } from 'next';
import './globals.css';
import PageLoader from '@/components/PageLoader';
import JsonLd from '@/components/JsonLd';
import Providers from '@/components/Providers';
import TelegramBanner from '@/components/TelegramBanner';
import FloatingActions from '@/components/FloatingActions';
import SmoothScroller from '@/components/SmoothScroller';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Cee Writing Service | Professional Writing, Data Analysis and Plagiarism Checks',
  description: 'Trusted writing service for clients in the USA, UK, Canada, UAE, and Kuwait. We provide in depth research, data analysis using Python and R, plagiarism checks with Turnitin, CVs, SOP writing, and professional editing.',
  keywords: 'professional writing service, plagiarism check Turnitin, CV writing, SOP writing, in depth research, data analysis Python R, business proposal, USA, UK, Canada, UAE, Kuwait',
  metadataBase: new URL('https://ceewriting.com'),
  openGraph: {
    title: 'Cee Writing Service | Professional Writing and Data Analysis',
    description: 'Expert writing, in depth research, data analysis using Python and R, and plagiarism checks for clients globally including USA, UK, Canada, UAE, and Kuwait.',
    type: 'website',
    siteName: 'Cee Writing Service',
    locale: 'en_NG',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Cee Writing Service Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Cee Writing Service | Professional Writing and Data Analysis',
    description: 'Expert writing, in depth research, data analysis using Python and R, and plagiarism checks.',
    images: ['/logo.png'],
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
      </head>
      <body>
        <SmoothScroller>
          <Providers>
            <PageLoader />
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
