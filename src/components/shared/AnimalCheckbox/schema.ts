import { z } from 'zod';

export const schema = z.object({
  nickname: z.string().min(3, 'Por lomenos 3 letras').optional(),
});

export type FormValues = z.infer<typeof schema>;
