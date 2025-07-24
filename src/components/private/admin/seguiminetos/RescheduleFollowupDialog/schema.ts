import { z } from 'zod';
import { scheduleStartAt } from '../common/schema';
export const schema = z.object({
  scheduleStartAt: scheduleStartAt,
});
export type FormValues = z.infer<typeof schema>;
