// app/api/excerpts/route.ts
import { NextResponse } from 'next/server';
import {
  allExcerpts,
  latestExcerpts,
  excerptById,
  publishExcerpt,
  updateExcerpt,
  deleteExcerpt
} from '@/lib/data';
import { withAuth, withValidation, withQueryValidation } from './middleware';
import { excerptInputSchema, excerptUpdateSchema } from './validators';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const validatedParams = withQueryValidation(searchParams);
  if (validatedParams instanceof NextResponse) return validatedParams;

  try {
    const { id, count } = validatedParams;

    if (id) {
      const data = await excerptById(id);
      if (!data) {
        return NextResponse.json(
          { error: 'Excerpt not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(data);
    }

    if (count) {
      const data = await latestExcerpts(count);
      return NextResponse.json(data);
    }

    const data = await allExcerpts();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = withAuth(async (request: Request) => {
  const validatedData = await withValidation(excerptInputSchema)(request);
  if (validatedData instanceof NextResponse) return validatedData;

  try {
    const data = await publishExcerpt(validatedData);
    return NextResponse.json(data);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (request: Request) => {
  const validatedData = await withValidation(excerptUpdateSchema)(request);
  if (validatedData instanceof NextResponse) return validatedData;

  try {
    await updateExcerpt(validatedData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    await deleteExcerpt({ id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
