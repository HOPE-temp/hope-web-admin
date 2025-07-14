import { z } from 'zod';

export const today = new Date().toISOString().split('T')[0];

export const animalId = z.number().min(1, 'Id minimo 1');

export const status = z.enum(
  ['registered', 'in_attention', 'completed', 'cancelled'],
  {
    message: 'Estado inválido',
  }
);
export const scheduleStartAt = z
  .string()
  .refine(val => !!val, { message: 'La fecha de nacimiento es requerida' })
  .refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida' })
  .refine(val => val >= today, {
    message: 'La fecha debe ser mayor a hoy',
  });
export const scheduleEndAt = z
  .string()
  .refine(val => !!val, { message: 'La fecha de nacimiento es requerida' })
  .refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida' })
  .refine(val => val >= today, {
    message: 'La fecha debe ser mayor a hoy',
  });

export const durationSchedule = z.enum(
  ['15_min', '30_min', '45_min', '60_min', '90_min', '120_min'],
  {
    message: 'Estado inválido',
  }
);
