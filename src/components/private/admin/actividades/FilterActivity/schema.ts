import { z } from 'zod';

export const filterActivitySchema = z.object({
  search: z
    .string()
    .optional()
    .transform(val => (val === '' ? undefined : val)),
  finished: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export type FilterActivityValues = z.input<typeof filterActivitySchema>;
