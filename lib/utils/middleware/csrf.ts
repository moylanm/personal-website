import { validateCsrfToken } from '@/lib/csrf';
import { apiResponse } from '../apiResponses';

export async function withCsrf(request: Request) {
  const token = request.headers.get('X-CSRF-Token');
  if (!token) {
    return apiResponse.error({
      message: 'CSRF token missing',
      status: 403
    });
  }

  const isValid = await validateCsrfToken(token);
  if (!isValid) {
    return apiResponse.error({
      message: 'CSRF token invalid',
      status: 403
    });
  }
}
