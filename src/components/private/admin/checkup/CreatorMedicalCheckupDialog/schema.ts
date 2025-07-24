import { z } from 'zod';
import {
  title,
  animalId,
  scheduleStartAt,
  durationSchedule,
} from '../common/schema';

export const schema = z.object({
  title,
  animalId,
  scheduleStartAt,
  durationSchedule,
});

export type FormValues = z.infer<typeof schema>;
