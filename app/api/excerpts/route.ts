import { NextResponse } from 'next/server';
import {
  allExcerpts,
  latestExcerpts,
  excerptById,
  publishExcerpt,
  updateExcerpt,
  deleteExcerpt
} from '@/lib/data';
import { withValidation, withQueryValidation } from './middleware';
import { excerptInputSchema, excerptUpdateSchema } from './validators';
import { auth } from '@/auth';

async function checkAuth() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: 'Session expired or unauthorized' },
      { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer error="invalid_token"'
        }
      }
    );
  }

  return session;
}

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

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
}

export async function PUT(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

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
}

export async function DELETE(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

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
}
