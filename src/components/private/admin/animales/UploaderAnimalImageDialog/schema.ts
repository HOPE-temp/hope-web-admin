import { z } from 'zod';
import { imageSchema } from '../common/schema';

export const schema = z.object({
  image: imageSchema,
});

export type FormValues = z.infer<typeof schema>;
