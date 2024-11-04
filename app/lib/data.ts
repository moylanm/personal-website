'use server'

import { sql } from '@vercel/postgres';
import type { Excerpt } from './definitions';
import { unstable_cache } from 'next/cache';

const LATEST_COUNT = 7;

export const allExcerpts = unstable_cache(
  async () => {
    return await fetchAllExcerpts();
  },
  ['excerpts'],
  { revalidate: 3600, tags: ['excerpts'] }
);

export const latestExcerpts = unstable_cache(
  async () => {
    return await fetchLatestExcerpts(LATEST_COUNT);
  },
  ['latest'],
  { revalidate: 3600, tags: ['latest'] }
);

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
    return data.rows.map((row) => {
      return <Excerpt>{
        ...row,
        createdAt: row.created_at
      };
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest excerpt data.');
  }
}

export async function fetchExcerptById(id: string) {
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

export async function publishExcerpt({
  author,
  work,
  body
}: {
  author: string,
  work: string,
  body: string
}) {
  try {
    const id = await sql`
      INSERT INTO excerpts (author, work, body)
      VALUES (${author}, ${work}, ${body})
      RETURNING id
    `;
    return id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert excerpt data.');
  } 
}

export async function editExcerpt({
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
  try {
    await sql`
      UPDATE excerpts
      SET author = ${author}, work = ${work}, body = ${body}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update excerpt data.');
  }
}

export async function deleteExcerpt({
  id
}: {
  id: string
}) {
  try {
    await sql`
      DELETE FROM excerpts
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete excerpt.');
  }
}
