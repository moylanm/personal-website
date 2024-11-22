import { z } from 'zod';

export const excerptInputSchema = z.object({
  author: z.string().min(1),
  work: z.string().min(1),
  body: z.string().min(1),
});

export const excerptUpdateSchema = excerptInputSchema.extend({
  id: z.string().min(1),
});