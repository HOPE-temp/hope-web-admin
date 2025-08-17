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
import optionCountries from '@/components/private/admin/common/DataCountry.json';
import optionDistricts from '@/components/private/admin/common/DataDistrict.json';

const dniRegex = /^\d{8}$/;
const ceRegex = /^[A-Za-z]{1,2}\d{6,10}$/;

export const schema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    if (data.nationality.toLowerCase() === 'perú') {
      // Validar DNI o CE solamente si país es Perú
      const isDNI = dniRegex.test(data.documentNumber);
      if (!isDNI) {
        ctx.addIssue({
          path: ['documentNumber'],
          message: 'Documento debe ser DNI (8 dígitos)',
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      const isDNI = dniRegex.test(data.documentNumber);
      const isCE = ceRegex.test(data.documentNumber);
      if (!isDNI && !isCE) {
        ctx.addIssue({
          path: ['documentNumber'],
          message:
            'Documento debe ser DNI (8 dígitos) o Carnet de Extranjería válido',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type FormValues = z.infer<typeof schema>;
