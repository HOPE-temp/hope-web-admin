import { z } from 'zod';
import { status, animalId } from '../common/schema';

export const schema = z.object({
  animalId: animalId.optional(),
  status: status.optional(),
});

export type FormValues = z.infer<typeof schema>;
