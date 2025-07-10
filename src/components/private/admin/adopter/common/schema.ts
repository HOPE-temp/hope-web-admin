import { z } from 'zod';

export const today = new Date().toISOString().split('T')[0];

export const evaluations = z
  .string()
  .min(3, 'Debe tener al menos 3 caracteres');
export const adoptions = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const firstName = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const lastName = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const documentNumber = z
  .string()
  .min(3, 'Debe tener al menos 3 caracteres');

export const email = z.string().email('Debes ser un email valido');
export const phone = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const district = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const address = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const nationality = z
  .string()
  .min(3, 'Debe tener al menos 3 caracteres');
export const isBanned = z.string().min(3, 'Debe tener al menos 3 caracteres');
