import { z } from 'zod';

export const filterActivitySchema = z.object({
  title: z
    .string()
    .optional()
    .transform(val => (val === '' ? undefined : val)),

  finished: z.enum(['true', 'false']).optional(),
  admin: z.enum(['true', 'false']).optional(),
});

export type FilterActivityValues = z.input<typeof filterActivitySchema>;
