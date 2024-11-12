import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { type ZodSchema } from 'zod';

export async function withAuth(handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(request);
  };
}

export function withValidation(schema: ZodSchema) {
  return async (request: Request) => {
    try {
      const body = await request.json();
      const result = schema.safeParse(body);

      if (!result.success) {
        return NextResponse.json(
          { 
            error: 'Validation error',
            details: result.error.errors 
          },
          { status: 400 }
        );
      }

      return result.data;
    } catch (error) {
      console.error('Validation Error:', error);
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
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
