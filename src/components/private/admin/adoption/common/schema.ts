import { z } from 'zod';

export const today = new Date().toISOString().split('T')[0];
export const idAdopter = z
  .number({ message: 'El ID debe ser un numero' })
  .positive('El Id debe ser positivo');

export const animalIds = z.array(z.number().min(1, 'Id minimo 1'));

export const statusResult = z.enum(
  ['not_evaluated', 'approved', 'rejected', 'banned'],
  {
    message: 'Estado inválido',
  }
);

export const statusRequest = z
  .enum(
    [
      'created',
      'suitable',
      'selected_animal',
      'cancelled',
      'adoption_completed',
    ],
    {
      message: 'Estado inválido',
    }
  )
  .optional();
export const reviewRequestNotes = z
  .string()
  .min(5, 'La nombre debe tener al menos 5 caracteres');

export const documentNumber = z
  .string()
  .min(3, 'La nombre debe tener al menos 3 caracteres');

export const adoptionHistory = z
  .string()
  .min(3, 'La nombre debe tener al menos 3 caracteres');

export const isWebVisible = z.boolean();
