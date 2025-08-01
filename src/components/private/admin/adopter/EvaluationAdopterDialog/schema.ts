import { z } from 'zod';

const resInputString = z
  .string()
  .min(4, 'No puede estar vacio')
  .max(100, 'Longitud maxima del texto es de 1000');

export const schema = z.object({
  profession: resInputString,
  professionDescription: resInputString,
  hasKids: z.boolean(),
  responsabilityKids: z
    .string()
    .max(1000, 'Longitud maxima del texto es de 1000')
    .optional(),
  descriptionPets: resInputString,
  contextPets: resInputString,
  hasPatienceAndTime: z.boolean(),
  hasSterilizationCommitment: z.boolean(),
  descriptionSpaceForNewPet: resInputString,
});
export type FormValues = z.infer<typeof schema>;
