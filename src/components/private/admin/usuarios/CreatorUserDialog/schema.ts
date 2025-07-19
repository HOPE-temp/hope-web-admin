import { z } from 'zod';

// Validaciones individuales
export const username = z.string().min(3, 'El usuario es requerido');
export const firstName = z.string().min(2, 'El nombre es requerido');
export const lastName = z.string().min(2, 'El apellido es requerido');
export const password = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres');
export const email = z.string().email('Correo inválido');
export const phone = z.string().min(6, 'El teléfono es requerido');
export const address = z.string().min(3, 'La dirección es requerida');
export const documentNumber = z.string().min(5, 'El número de documento es requerido');
export const location = z.string().min(2, 'La ubicación es requerida');
export const rol = z.enum(['admin', 'volunteer', 'veterinarian'], {
  errorMap: () => ({ message: 'Rol requerido' }),
});

export const schema = z.object({
  username,
  firstName,
  lastName,
  password,
  email,
  phone,
  address,
  documentNumber,
  location,
  rol,
});

export type FormValues = z.infer<typeof schema>;