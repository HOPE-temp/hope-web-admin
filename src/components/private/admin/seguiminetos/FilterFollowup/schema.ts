import { z } from 'zod';
import { statusFolloup } from '../common/schema';

export const schema = z.object({
  statusFolloup: statusFolloup.optional(),
});

export type FormValues = z.infer<typeof schema>;
