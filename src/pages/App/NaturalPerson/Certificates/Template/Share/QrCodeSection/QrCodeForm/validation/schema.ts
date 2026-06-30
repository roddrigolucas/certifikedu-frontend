import { z } from 'zod';

import { isValidDate } from '@/utils/validation/isValidDate';

export const GenerateQrCodeSchema = z.object({
  startDate: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    })
    .optional(),
  startTime: z.string().optional(),
  expirationDate: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    })
    .optional(),
  expirationTime: z.string().optional(),
  emissionQty: z.string().optional(),
});

export type GenerateQrCodeSchemaType = z.infer<typeof GenerateQrCodeSchema>;
