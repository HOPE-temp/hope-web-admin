import { z } from 'zod';

export const schema = z.object({
  animals: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
      })
    )
    .min(1, 'Es necesario que eligas por lo menos una mascota'),
});

export type FormValues = z.infer<typeof schema>;
