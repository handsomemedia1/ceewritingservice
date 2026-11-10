import path from 'path';
import { fileURLToPath } from 'url';
import { LEGACY_LINKS } from './src/config/legacyLinks.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Script sources are not restricted yet: inline scripts need a nonce-based policy first.
          { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/remediation_payload.json',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tsyiylazielwbelfzsqo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      // One canonical host. /api stays reachable so the Telegram webhook keeps working on vercel.app.
      ...['www.ceewriting.com', 'ceewritingservice.vercel.app'].map((host) => ({
        source: '/:path((?!api/).*)',
        has: [{ type: 'host', value: host }],
        destination: 'https://ceewriting.com/:path',
        permanent: true,
      })),
      ...Object.entries(LEGACY_LINKS).map(([source, destination]) => ({ source, destination, permanent: true })),
      // Convenience redirect for top-level glossary access
      {
        source: '/glossary',
        destination: '/research/glossary',
        permanent: false,
      },
    ];
  },
};
export default nextConfig;

