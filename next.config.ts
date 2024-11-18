import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"}`,
              "img-src 'self' blob: data:",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join('; ')
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://mylesmoylan.net'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ]
      }
    ];
  },
};

export default nextConfig;
