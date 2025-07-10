import { z } from 'zod';
import { documentNumber } from '../common/schema';

export const schema = z.object({
  documentNumber: z
    .string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .max(12, 'Debe tener al maximo 12s caracteres')
    .optional(),
});

export type FormValues = z.infer<typeof schema>;
