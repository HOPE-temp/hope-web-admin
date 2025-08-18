import { z } from 'zod';

export const username = z.string().min(2, 'El nombre es requerido');
export const firstName = z.string().min(2, 'El nombre es requerido');
export const lastName = z.string().min(2, 'El apellido es requerido');
export const email = z.string().email('Correo inválido');
export const phone = z.string().min(6, 'El teléfono es requerido');
export const address = z.string().min(3, 'La dirección es requerida');
export const district = z.string().min(3, 'El distrito es requerido');
export const rol = z.enum(['admin', 'volunteer', 'veterinarian'], {
  errorMap: () => ({ message: 'Rol requerido' }),
});

export const schema = z.object({
  username,
  firstName,
  lastName,
  email,
  phone,
  district,
  address,
  rol,
});

export type FormValues = z.infer<typeof schema>;
