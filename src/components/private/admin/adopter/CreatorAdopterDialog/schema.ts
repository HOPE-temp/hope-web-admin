import { z } from 'zod';
import {
  firstName,
  lastName,
  documentNumber,
  phone,
  email,
  district,
  address,
  nationality,
} from '../common/schema';

export const schema = z.object({
  firstName: firstName.nonempty('Campo requerido'),
  lastName: lastName.nonempty('Campo requerido'),
  documentNumber: documentNumber.nonempty('Campo requerido'),
  phone: phone.nonempty('Campo requerido'),
  email: email.nonempty('Campo requerido'),
  district: district.nonempty('Campo requerido'),
  address: address.nonempty('Campo requerido'),
  nationality: nationality.nonempty('Campo requerido'),
});

export type FormValues = z.infer<typeof schema>;
