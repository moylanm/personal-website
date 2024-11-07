'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { deleteExcerptFromDb, publishExcerptToDb, updateExcerptInDb } from './data';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function publishExcerpt({
  author,
  work,
  body
}: {
  author: string,
  work: string,
  body: string
}) {
  await publishExcerptToDb({
    author,
    work,
    body
  });
  revalidateExcerptTags();
}

export async function updateExcerpt({
  id,
  author,
  work,
  body
}: {
  id: string,
  author: string,
  work: string,
  body: string
}) {
  await updateExcerptInDb({
    id,
    author,
    work,
    body
  });
  revalidateExcerptTags();
}

export async function deleteExcerpt({
  id
}: {
  id: string
}) {
  await deleteExcerptFromDb({ id: id });
  revalidateExcerptTags();
}

function revalidateExcerptTags() {
  revalidateTag('latest');
  revalidateTag('excerpts');
}
