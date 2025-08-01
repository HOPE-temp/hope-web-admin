import { z } from 'zod';

export const schema = z.object({
  documentNumber: z
    .string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .max(12, 'Debe tener al maximo 12 caracteres')
    .optional(),
  firstName: z
    .string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'Debe tener al maximo 50 caracteres')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'Debe tener al maximo 50 caracteres')
    .optional(),
});

export type FormValues = z.infer<typeof schema>;
