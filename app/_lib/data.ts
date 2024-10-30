import { sql } from '@vercel/postgres';
import type { Excerpt } from './definitions';
import { cache } from 'react';

export const fetchAllExcerpts = cache(async () => {
  try {
    const data = await sql<Excerpt>`SELECT * FROM excerpts ORDER BY id DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt data.');
  }
});

export const fetchLatestExcerpts = cache(async (count: number) => {
  try {
    const data = await sql<Excerpt>`SELECT * FROM excerpts ORDER BY id DESC LIMIT ${count}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest excerpt data.');
  }
});

export const fetchExcerptById = cache(async (id: string) => {
  try {
    const data = await sql<Excerpt>`SELECT * FROM excerpts WHERE excerpts.id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt by id data.');
  }
});
