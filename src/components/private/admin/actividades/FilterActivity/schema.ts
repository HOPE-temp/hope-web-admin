import { z } from 'zod';

export const filterActivitySchema = z.object({
  title: z
    .string()
    .optional()
    .transform(val => (val === '' ? undefined : val)),

  finished: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export type FilterActivityValues = z.input<typeof filterActivitySchema>;
