import { NextResponse } from 'next/server';
import {
  allExcerpts,
  latestExcerpts,
  excerptById,
  publishExcerpt,
  updateExcerpt,
  deleteExcerpt
} from '@/lib/data';
import { withValidation, withQueryValidation } from '@/lib/utils/middleware';
import { excerptInputSchema, excerptUpdateSchema } from '@/lib/utils/validators';
import { createProtectedRoute } from '@/lib/utils/routeHandler';
import { apiResponse } from '@/lib/utils/apiResponses';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const validatedParams = withQueryValidation(searchParams);
    if (validatedParams instanceof NextResponse) return validatedParams;

    const { id, count } = validatedParams;

    if (id) {
      const data = await excerptById(id);
      return data 
        ? apiResponse.success(data)
        : apiResponse.notFound('Excerpt not found');
    }

    const data = count 
      ? await latestExcerpts(count)
      : await allExcerpts();

    return apiResponse.success(data);
  } catch (error) {
    return apiResponse.serverError(error);
  }
}

export const POST = createProtectedRoute(async (request) => {
  const validatedData = await withValidation(excerptInputSchema)(request);
  if (validatedData instanceof NextResponse) return validatedData;

  const data = await publishExcerpt(validatedData);
  return apiResponse.success(data);
});

export const PUT = createProtectedRoute(async (request) => {
  const validatedData = await withValidation(excerptUpdateSchema)(request);
  if (validatedData instanceof NextResponse) return validatedData;

  await updateExcerpt(validatedData);
  return apiResponse.success({ success: true });
});

export const DELETE = createProtectedRoute(async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return apiResponse.badRequest('Missing id parameter');
  }

  await deleteExcerpt({ id });
  return apiResponse.success({ success: true });
});
