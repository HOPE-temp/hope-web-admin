import { z } from 'zod';
import {
  nickname,
  status,
  type,
  breed,
  birthdate,
  sex,
  size,
  descriptionHistory,
  isSterilized,
  imageSchema,
} from '../common/schema';

export const schema = z.object({
  nickname: nickname.nonempty('El nombre es requerido'),
  status,
  type,
  breed: breed.nonempty('La raza es requerida'),
  size,
  sex,
  birthdate,
  descriptionHistory: descriptionHistory.nonempty('La historia es requerida'),
  isSterilized,
  image: imageSchema,
});

export type FormValues = z.infer<typeof schema>;
