import { z } from 'zod';
export const schema = z.object({
  profession: z.string().nonempty(),
  professionDescription: z.string().nonempty(),
  hasKids: z.boolean(),
  responsabilityKids: z.string().nonempty(),
  descriptionPets: z.string().nonempty(),
  contextPets: z.string().nonempty(),
  hasPatienceAndTime: z.boolean(),
  hasSterilizationCommitment: z.boolean(),
  descriptionSpaceForNewPet: z.string().nonempty(),
});
export type FormValues = z.infer<typeof schema>;
