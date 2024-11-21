import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const token = await generateCsrfToken();

  // Return both cookie and token
  return NextResponse.json(
    { token },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    }
  );
}
