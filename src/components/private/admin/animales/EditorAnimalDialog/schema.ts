import { z } from 'zod';
export const today = new Date().toISOString().split('T')[0];

export const schema = z.object({
  nickname: z.string().min(2, 'El nombre es requerido'),
  breed: z.string().min(2, 'La raza es requerida'),
  size: z.enum(['small', 'medium', 'large'], { message: 'Tamaño inválido' }),
  sex: z.enum(['male', 'female'], { message: 'Sexo inválido' }),
  birthdate: z
    .string()
    .refine(val => !!val, { message: 'La fecha de nacimiento es requerida' })
    .refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida' })
    .refine(val => val <= today, {
      message: 'La fecha no puede ser mayor a hoy',
    }),
  descriptionHistory: z.string().min(2, 'La historia es requerida'),
  isSterilized: z.boolean(),
});

export type FormValues = z.infer<typeof schema>;
