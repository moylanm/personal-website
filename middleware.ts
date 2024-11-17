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

  const baseScriptSrc = `'self' 'unsafe-inline' ${
    process.env.NODE_ENV === 'production' ? "'strict-dynamic'" : "'unsafe-eval'"
  } 'nonce-${nonce}'`;

  const cspHeader = Object.entries({
    ...commonCsp,
    'script-src': baseScriptSrc,
    'script-src-elem': baseScriptSrc,
    'block-all-mixed-content': '',
    'upgrade-insecure-requests': '',
  })
    .map(([key, value]) => `${key} ${value}`.trim())
    .join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
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
