import { z } from 'zod';
import { adoptionHistory, isWebVisible } from '../common/schema';
export const schema = z.object({
  adoptionHistory,
  isWebVisible,
});
export type FormValues = z.infer<typeof schema>;
