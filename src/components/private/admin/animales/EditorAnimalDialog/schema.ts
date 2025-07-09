import { z } from 'zod';
import {
  birthdate,
  breed,
  descriptionHistory,
  isSterilized,
  nickname,
  sex,
  size,
} from '../common/schema';
export const today = new Date().toISOString().split('T')[0];

export const schema = z.object({
  nickname,
  breed,
  size,
  sex,
  birthdate,
  descriptionHistory,
  isSterilized,
});

export type FormValues = z.infer<typeof schema>;
