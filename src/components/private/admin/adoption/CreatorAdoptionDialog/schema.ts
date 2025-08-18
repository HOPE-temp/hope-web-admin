import { z } from 'zod';
import { idAdopter, animalIds } from '../common/schema';

export const schema = z.object({
  adopterId: idAdopter,
  animalIds,
});

export type FormValues = z.infer<typeof schema>;
