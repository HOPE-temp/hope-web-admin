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

//JSON
import optionCountries from '../common/DataCountry.json';
import optionDistricts from '../common/DataDistrict.json';

export const schema = z.object({
  firstName: firstName.nonempty('Campo requerido'),
  lastName: lastName.nonempty('Campo requerido'),
  nationality: nationality.refine(val => optionCountries.includes(val), {
    message: 'El país debe estar en la lista',
  }),
  documentNumber: documentNumber,
  phone: phone,
  email: email.nonempty('Campo requerido'),
  district: district
    .nonempty('Campo requerido')
    .refine(val => optionDistricts.includes(val), {
      message: 'El distrito debe estar en lista',
    }),
  address: address.nonempty('Campo requerido'),
});

export type FormValues = z.infer<typeof schema>;
