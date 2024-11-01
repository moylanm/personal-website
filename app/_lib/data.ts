'use server'

import { sql } from '@vercel/postgres';
import type { Excerpt } from './definitions';

export async function fetchAllExcerpts() {
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

export async function fetchLatestExcerpts(count: number) {
  try {
    const data = await sql<Excerpt>`
      SELECT id, author, work, created_at
      FROM excerpts
      ORDER BY id DESC
      LIMIT ${count}
    `;
    return data.rows;
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
