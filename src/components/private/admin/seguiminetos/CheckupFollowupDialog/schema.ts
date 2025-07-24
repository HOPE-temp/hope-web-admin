import { z } from 'zod';
import { scheduleStartAt, durationSchedule } from '../common/schema';

export const schema = z.object({
  scheduleStartAt,
  durationSchedule,
});

export type FormValues = z.infer<typeof schema>;
