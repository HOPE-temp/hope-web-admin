import { z } from 'zod';
import { idAdopter, animalsIds } from '../common/schema';

export const schema = z.object({
  adopterId: idAdopter,
  animalsIds,
});

export type FormValues = z.infer<typeof schema>;
