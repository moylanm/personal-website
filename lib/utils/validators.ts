import { z } from 'zod';

export const excerptInputSchema = z.object({
  author: z.string()
    .min(1, 'Author name is required')
    .max(100, 'Author name too long')
    .trim(),

  work: z.string()
    .min(1, 'Work title is required')
    .max(200, 'Work title too long')
    .trim(),

  body: z.string()
    .min(1, 'Excerpt body is required')
    .max(5000, 'Excerpt body too long')
    .trim(),
});

export const excerptUpdateSchema = excerptInputSchema.extend({
  id: z.coerce.number()
    .int('ID must be an integer')
    .positive('ID must be positive')
    .safe('ID must be within safe integer range')
});

interface CsrfResponse {
  token: string;
}

export const isValidCsrfResponse = (data: unknown): data is CsrfResponse => (
  typeof data === 'object' &&
  data !== null &&
  'token' in data &&
  typeof (data as CsrfResponse).token === 'string'
);