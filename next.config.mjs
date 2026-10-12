/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

// Observe resource restrictions before enforcing them. Browser checks collect
// violations locally; no remote reporting endpoint has been configured.
const reportOnlyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://app.cal.com",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ');

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384, 480],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: reportOnlyCsp,
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
