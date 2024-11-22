export const API_ENDPOINTS = {
  CSRF: '/api/csrf',
  EXCERPTS: '/api/excerpts',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/login',
} as const;

export const HEADERS = {
  CSRF: 'X-CSRF-Token',
} as const;

export const STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;
