import { z } from 'zod';
import {
  idAdopter,
  documentNumber,
  statusResult,
  statusRequest,
} from '../common/schema';

export const schema = z.object({
  idAdopter: idAdopter.optional(),
  statusRequest: statusRequest.optional(),
  statusResult: statusResult.optional(),
  documentNumber: documentNumber.optional(),
});

export type FormValues = z.infer<typeof schema>;
