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
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  documentNumber: documentNumber.optional(),
  phone: phone.optional(),
  email: email.optional(),
  district: district.optional(),
  address: address.optional(),
  nationality: nationality.optional(),
});

export type FormValues = z.infer<typeof schema>;
