import { z } from 'zod';

export const filterProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  phone: z.string(),
  address: z.string(),
  district: z.string(),
  rol: z.string(),
});

export type FilterProfileValues = z.input<typeof filterProfileSchema>;
