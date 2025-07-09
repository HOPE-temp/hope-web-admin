import { z } from 'zod';

export const today = new Date().toISOString().split('T')[0];

export const imageSchema = z
  .custom<FileList>(v => v instanceof FileList && v.length > 0, {
    message: 'Se requiere una imagen',
  })
  .refine(fileList => fileList[0].type.startsWith('image/'), {
    message: 'El archivo debe ser una imagen',
  })
  .refine(fileList => fileList[0].size <= 5 * 1024 * 1024, {
    message: 'La imagen no debe superar los 5MB',
  })
  .optional();

export const nickname = z
  .string()
  .min(3, 'El nombre debe tener al menos 3 caracteres');

export const status = z.enum(['in_adoption', 'in_observation'], {
  message: 'Estado inválido',
});

export const type = z.enum(['dog', 'cat'], { message: 'Tipo inválido' });

export const breed = z
  .string()
  .min(3, 'La raza debe tener al menos 3 caracteres');

export const size = z.enum(['small', 'medium', 'large', 'giant'], {
  message: 'Tamaño inválido',
});

export const sex = z.enum(['male', 'female'], { message: 'Sexo inválido' });

export const birthdate = z
  .string()
  .refine(val => !!val, { message: 'La fecha de nacimiento es requerida' })
  .refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida' })
  .refine(val => val <= today, {
    message: 'La fecha no puede ser mayor a hoy',
  });

export const descriptionHistory = z
  .string()
  .min(6, 'La historia debe tener al menos 6 caracteres');

export const isSterilized = z.boolean();
