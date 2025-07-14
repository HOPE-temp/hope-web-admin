import { z } from 'zod';
import { animalId, scheduleStartAt, durationSchedule } from '../common/schema';

export const schema = z.object({
  animalId,
  scheduleStartAt,
  durationSchedule,
});

export type FormValues = z.infer<typeof schema>;
