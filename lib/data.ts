'use server'

import { sql } from '@vercel/postgres';
import type { Excerpt } from './definitions';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';
import { cache } from 'react';
import { notFound } from 'next/navigation';

const CACHE_CONFIG = {
  revalidate: 3600,  // 1 hour
  tags: ['excerpts']
};

export const allExcerpts = unstable_cache(
  async () => await fetchAllExcerpts(),
  ['all-excerpts'],
  CACHE_CONFIG
);

export const latestExcerpts = unstable_cache(
  async (count: number) => await fetchLatestExcerpts(count),
  ['latest-excerpts'],
  CACHE_CONFIG
);

export const excerptById = cache(async (id: string) => {
  const excerpt = await fetchExcerptById(id);

  if (!excerpt) notFound();

  return excerpt;
});

async function fetchAllExcerpts() {
  try {
    const data = await sql<Excerpt>`
      SELECT id, author, work, body
      FROM excerpts
      ORDER BY id DESC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt data.');
  }
}

async function fetchLatestExcerpts(count: number) {
  try {
    const data = await sql`
      SELECT id, author, work, created_at
      FROM excerpts
      ORDER BY id DESC
      LIMIT ${count}
    `;
    return data.rows.map((row) => ({
      ...row,
      createdAt: row.created_at
    } as Excerpt));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest excerpt data.');
  }
}

async function fetchExcerptById(id: string) {
  try {
    const data = await sql<Excerpt>`
      SELECT author, work, body
      FROM excerpts
      WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt by id data.');
  }
}

export async function publishExcerptToDb({
  author,
  work,
  body
}: {
  author: string
  work: string
  body: string
}) {
  try {
    const data = await sql`
      INSERT INTO excerpts (author, work, body)
      VALUES (${author}, ${work}, ${body})
      RETURNING id
    `;
    
    await revalidateExcerptCaches();

    return data.rows[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert excerpt data.');
  }
}

export async function updateExcerptInDb(data: {
  id: string,
  author: string,
  work: string,
  body: string
}) {
  try {
    await sql`
      UPDATE excerpts
      SET author = ${data.author}, work = ${data.work}, body = ${data.body}
      WHERE id = ${data.id}
    `;
    await revalidateExcerptCaches();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update excerpt data.');
  }
}

export async function deleteExcerptFromDb({ id }: { id: string }) {
  try {
    await sql`
      DELETE FROM excerpts
      WHERE id = ${id}
    `;
    await revalidateExcerptCaches();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete excerpt.');
  }
}

async function revalidateExcerptCaches() {
  revalidateTag('excerpts');
}
