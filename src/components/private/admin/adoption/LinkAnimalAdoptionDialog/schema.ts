import { z } from 'zod';
import { reviewRequestNotes, animalIds } from '../common/schema';
export const schema = z.object({
  animalIds,
  reviewRequestNotes: reviewRequestNotes.nonempty('La historia es requerida'),
});
export type FormValues = z.infer<typeof schema>;
