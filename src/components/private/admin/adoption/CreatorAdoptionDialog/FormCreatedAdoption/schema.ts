import { z } from 'zod';
import { idAdopter, animalsIds } from '../../common/schema';

export const schema = z.object({
  adopterId: idAdopter,
  animalsIds: animalsIds.min(
    1,
    'Es necesario que eligas por lo menos una mascota'
  ),
});

export type FormValues = z.infer<typeof schema>;
