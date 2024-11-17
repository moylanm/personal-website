import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Common CSP directives shared between both policies
  const commonCsp = {
    'default-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'img-src': "'self' blob: data:",
    'font-src': "'self'",
    'object-src': "'none'",
    'base-uri': "'self'",
    'form-action': "'self'",
    'frame-ancestors': "'none'",
    'connect-src': "'self'",
    'worker-src': "'self'",
  };

  // Build CSP string based on page type and environment
  const buildCsp = (isStatic: boolean) => {
    const scriptDirectives = process.env.NODE_ENV === 'production'
      ? `'self' 'nonce-${nonce}'`
      : `'self' 'nonce-${nonce}' 'unsafe-eval'`;

    const finalScriptSrc = isStatic 
      ? `${scriptDirectives} 'unsafe-inline'`
      : scriptDirectives;

    return Object.entries({
      ...commonCsp,
      'script-src': finalScriptSrc,
      'script-src-elem': finalScriptSrc,
      'block-all-mixed-content': '',
      'upgrade-insecure-requests': '',
    })
      .map(([key, value]) => `${key} ${value}`.trim())
      .join('; ');
  };

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const staticPages = new Set(['/excerpts', '/about', '/login', '']);
  const isStaticPage = staticPages.has(request.nextUrl.pathname);

  const cspHeader = buildCsp(isStaticPage);
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
