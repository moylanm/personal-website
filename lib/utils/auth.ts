import { AppDispatch } from '@/lib/dashboard/store';
import {
  API_ENDPOINTS,
  AUTH_ROUTES,
  HEADERS,
  STATUS,
} from '@/lib/constants/api';
import { clearToken, setToken } from '@/lib/dashboard/features/csrf/csrfSlice';

export type AuthenticatedFetchOptions = {
  dispatch: AppDispatch;
  csrfToken: string | null;
  input: RequestInfo | URL;
  init?: RequestInit;
};

export class AuthenticationError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

async function fetchCsrfToken(dispatch: AppDispatch): Promise<string> {
  const response = await fetch(API_ENDPOINTS.CSRF);

  if (!response.ok) {
    throw new AuthenticationError('Failed to fetch CSRF token');
  }

  const { token } = await response.json();
  dispatch(setToken(token));
  return token;
}

export async function authenticatedFetch({
  dispatch,
  csrfToken,
  input,
  init,
}: AuthenticatedFetchOptions): Promise<Response> {
  const token = csrfToken ?? await fetchCsrfToken(dispatch);

  const headers = new Headers(init?.headers);
  headers.set(HEADERS.CSRF, token);

  const response = await fetch(input, {
    ...init,
    headers,
  });

  switch (response.status) {
    case STATUS.UNAUTHORIZED:
      window.location.href = AUTH_ROUTES.LOGIN;
      throw new AuthenticationError('Unauthorized', STATUS.UNAUTHORIZED);

    case STATUS.FORBIDDEN:
      dispatch(clearToken());
      throw new AuthenticationError('CSRF validation failed', STATUS.FORBIDDEN);
  }

  return response;
}
