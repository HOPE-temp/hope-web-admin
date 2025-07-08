import { z } from 'zod';

export const schema = z.object({
  status: z
    .enum(['in_adoption', 'in_observation', 'adopted', 'dead'], {
      message: 'Estado inválido',
    })
    .optional(),
  nickname: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .optional(),
  animalId: z.number().min(0).optional(),
  adopterName: z
    .string()
    .min(3, 'La nombre debe tener al menos 3 caracteres')
    .optional(),
  adopterDNI: z
    .string()
    .min(3, 'La dni debe tener al menos 3 caracteres')
    .optional(),
});

export type FormValues = z.infer<typeof schema>;
