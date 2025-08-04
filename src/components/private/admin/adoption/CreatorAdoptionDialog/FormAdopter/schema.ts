import { z } from 'zod';

export const schema = z.object({
  adopter: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    documentNumber: z.string(),
    evaluations: z
      .array(z.any())
      .min(1, 'Debe tener por lo menos una evaluacion'),
    isBanned: z.boolean().refine(
      value => {
        if (value) return false;
        return true;
      },
      { message: 'No puede estar baneado' }
    ),
  }),
});

export type FormValues = z.infer<typeof schema>;
