import { z } from 'zod';
import { reviewRequestNotes, animalsIds } from '../common/schema';
export const schema = z.object({
  animalsIds,
  reviewRequestNotes: reviewRequestNotes.nonempty('La historia es requerida'),
});
export type FormValues = z.infer<typeof schema>;
