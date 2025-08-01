import { z } from 'zod';

export const today = new Date().toISOString().split('T')[0];

const phoneRegex = /^\d{9}$/;
const dniRegex = /^\d{8}$/;
const ceRegex = /^[A-Za-z]{1,2}\d{6,10}$/;

export const evaluations = z
  .string()
  .min(3, 'Debe tener al menos 3 caracteres');
export const adoptions = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const firstName = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const lastName = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const documentNumber = z
  .string()
  .min(1, 'El documento no puede estar vacío')
  .refine(val => dniRegex.test(val) || ceRegex.test(val), {
    message: 'El documento debe ser un documento valido',
  });

export const email = z.string().email('Debes ser un email valido');
export const phone = z
  .string()
  .min(1, 'El documento no puede estar vacío')
  .refine(val => phoneRegex.test(val), {
    message: 'El numero debe ser valido',
  });
export const district = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const address = z.string().min(3, 'Debe tener al menos 3 caracteres');
export const nationality = z
  .string()
  .min(3, 'Debe tener al menos 3 caracteres');
export const isBanned = z.boolean();
