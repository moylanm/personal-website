import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Stricter CSP for dynamic pages
  const dynamicCsp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${process.env.NODE_ENV === "production" ? "'strict-dynamic'" : "'unsafe-eval'"};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src 'self';
    worker-src 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  // More permissive CSP for static pages
  const staticCsp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'nonce-${nonce}' ${process.env.NODE_ENV === "production" ? "'strict-dynamic'" : "'unsafe-eval'"};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src 'self';
    worker-src 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const isStaticPage = ['/excerpts', '/about', '/login', ''].includes(request.nextUrl.pathname);
  const cspHeader = isStaticPage ? staticCsp : dynamicCsp;

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
