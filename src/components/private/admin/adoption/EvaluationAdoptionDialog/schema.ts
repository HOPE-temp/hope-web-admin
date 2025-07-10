import { z } from 'zod';
import { reviewRequestNotes, statusResult } from '../common/schema';
export const schema = z.object({
  statusResult,
  reviewRequestNotes: reviewRequestNotes.nonempty('La historia es requerida'),
});
export type FormValues = z.infer<typeof schema>;
