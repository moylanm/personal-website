import { sql } from '@vercel/postgres';
import type { Excerpt } from './definitions';

export async function fetchExcerpts() {
  try {
    const data = await sql<Excerpt>`SELECT * FROM excerpts`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt data.');
  }
}

export async function fetchExcerptById(id: string) {
  try {
    const data = await sql<Excerpt>`SELECT * FROM excerpts WHERE excerpts.id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch excerpt by id data.');
  }
}
