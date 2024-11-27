import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import { auth } from '@/auth';
import { withCsrf } from './middleware';
import { apiResponse } from './apiResponses';

type RouteContext = {
  session: Session;
};

type RouteHandler = (
  request: Request,
  context: RouteContext
) => Promise<NextResponse>;

export function createProtectedRoute(handler: RouteHandler) {
  return async (request: Request) => {
    try {
      const session = await auth();
      if (!session) return apiResponse.unauthorized();

      const csrfCheck = await withCsrf(request);
      if (csrfCheck instanceof NextResponse) return csrfCheck;

      return await handler(request, { session });
    } catch (error) {
      return apiResponse.serverError(error);
    }
  };
}
