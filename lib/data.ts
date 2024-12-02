'use server'

import { sql } from '@vercel/postgres';
import type { Excerpt } from './constants/definitions';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';
import { cache } from 'react';

class DatabaseError extends Error {
  constructor(operation: string, error: unknown) {
    super(`Database error during ${operation}: ${error instanceof Error ? error.message : String(error)}`);
    this.name = 'DatabaseError';
  }
}

const CACHE_CONFIG = {
  revalidate: 3600,  // 1 hour
  tags: ['excerpts']
};

export const allExcerpts = unstable_cache(
  async (): Promise<Excerpt[]> => await fetchAllExcerpts(),
  ['all-excerpts'],
  CACHE_CONFIG
);

export const latestExcerpts = unstable_cache(
  async (count: number): Promise<Excerpt[]> => await fetchLatestExcerpts(count),
  ['latest-excerpts'],
  CACHE_CONFIG
);

export const excerptById = cache(async (id: string): Promise<Excerpt | undefined> => {
  return await fetchExcerptById(id);
});

async function fetchAllExcerpts(): Promise<Excerpt[]> {
  try {
    const data = await sql<Excerpt>`
      SELECT id, author, work, body
      FROM excerpts
      ORDER BY id DESC
    `;
    return data.rows;
  } catch (error) {
    throw new DatabaseError('fetchAllExcerpts', error);
  }
}

async function fetchLatestExcerpts(count: number): Promise<Excerpt[]> {
  try {
    const data = await sql`
      SELECT id, author, work, created_at
      FROM excerpts
      ORDER BY id DESC
      LIMIT ${count}
    `;
    return data.rows.map((row) => ({
      ...row,
      createdAt: row.created_at as string
    } as Excerpt));
  } catch (error) {
    throw new DatabaseError('fetchLatestExcerpts', error);
  }
}

async function fetchExcerptById(id: string): Promise<Excerpt | undefined> {
  try {
    const data = await sql<Excerpt>`
      SELECT author, work, body
      FROM excerpts
      WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    throw new DatabaseError('fetchExcerptById', error);
  }
}

interface ExcerptInput {
  author: string;
  work: string;
  body: string;
}

export async function publishExcerpt(input: ExcerptInput): Promise<string> {
  try {
    const { author, work, body } = input;
    const data = await sql`
      INSERT INTO excerpts (author, work, body)
      VALUES (${author}, ${work}, ${body})
      RETURNING id
    `;

    revalidateExcerptCaches();
    return data.rows[0]?.id as string;
  } catch (error) {
    throw new DatabaseError('publishExcerpt', error);
  }
}

type ExcerptUpdate = ExcerptInput & { id: number };

export async function updateExcerpt(data: ExcerptUpdate): Promise<void> {
  try {
    await sql`
      UPDATE excerpts
      SET author = ${data.author}, work = ${data.work}, body = ${data.body}
      WHERE id = ${data.id}
    `;
    revalidateExcerptCaches();
  } catch (error) {
    throw new DatabaseError('updateExcerpt', error);
  }
}

export async function deleteExcerpt({ id }: { id: string }): Promise<void> {
  try {
    await sql`DELETE FROM excerpts WHERE id = ${id}`;
    revalidateExcerptCaches();
  } catch (error) {
    throw new DatabaseError('deleteExcerpt', error);
  }
}

function revalidateExcerptCaches() {
  revalidateTag('excerpts');
}
