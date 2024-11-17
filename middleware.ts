import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const commonCsp = {
    'default-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'img-src': "'self' blob: data:",
    'font-src': "'self'",
    'object-src': "'none'",
    'base-uri': "'self'",
    'form-action': "'self' javascript:",
    'frame-ancestors': "'none'",
    'connect-src': "'self'",
    'worker-src': "'self'",
  };

  const isProd = process.env.NODE_ENV === 'production';
  const staticPages = new Set(['/excerpts', '/about', '/login', '']);
  const isStaticPage = staticPages.has(request.nextUrl.pathname);

  // Static pages use simpler CSP without nonce
  const scriptSrc = isStaticPage
    ? "'self' 'unsafe-inline'"
    : isProd
    ? `'nonce-${nonce}' 'strict-dynamic'`
    : "'self' 'unsafe-eval' 'unsafe-inline'";

  const cspHeader = Object.entries({
    ...commonCsp,
    'script-src': scriptSrc,
    'script-src-elem': scriptSrc,
    'block-all-mixed-content': '',
    'upgrade-insecure-requests': '',
  })
    .map(([key, value]) => `${key} ${value}`.trim())
    .join('; ');

  const requestHeaders = new Headers(request.headers);
  if (!isStaticPage) {
    requestHeaders.set('x-nonce', nonce);
  }
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.php).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
