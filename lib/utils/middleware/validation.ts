import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiResponse } from '../apiResponses';

export function withValidation<T extends z.ZodType>(schema: T) {
  return async (request: Request) => {
    try {
      const body = await request.json();
      const parsed = schema.parse(body);
      return parsed;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return apiResponse.badRequest(
          error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
        );
      }
      return apiResponse.badRequest('Invalid request data');
    }
  };
}

export function withQueryValidation(params: URLSearchParams) {
  const id = params.get('id');
  const count = params.get('count');

  if (count) {
    const parsedCount = parseInt(count, 10);
    if (isNaN(parsedCount) || parsedCount < 1) {
      return NextResponse.json(
        { error: 'Invalid count parameter' },
        { status: 400 }
      );
    }
    return { count: parsedCount };
  }

  if (id && typeof id !== 'string') {
    return NextResponse.json(
      { error: 'Invalid id parameter' },
      { status: 400 }
    );
  }

  return { id };
}
