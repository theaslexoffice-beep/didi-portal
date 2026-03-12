/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  
  // Image optimization
  images: {
    domains: ['localhost', 'didi-portal.vercel.app'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Standalone output for Vercel
  output: 'standalone',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Compression and performance
  compress: true,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'DIDI Portal',
    NEXT_PUBLIC_APP_VERSION: '3.0',
  },
};

module.exports = nextConfig;
