'use server'

import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

const CSRF_TOKEN_COOKIE = 'csrf-token';
const CSRF_SECRET_LENGTH = 32;

export async function generateCsrfToken() {
  const token = randomBytes(CSRF_SECRET_LENGTH).toString('hex');
  const cookiesStore = await cookies();

  // Store in HTTP-only cookie
  cookiesStore.set(CSRF_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return token;
}

export async function validateCsrfToken(token: string) {
  const cookiesStore = await cookies();

  const storedToken = cookiesStore.get(CSRF_TOKEN_COOKIE)?.value;
  return token === storedToken;
}
