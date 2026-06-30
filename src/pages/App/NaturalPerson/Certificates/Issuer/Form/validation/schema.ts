import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';

export const CertificateIssuerSchemaNaturalPerson = z.object({
  name: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  cargaHoraria: z.coerce
    .number(requiredError)
    .min(0, { message: 'Digite uma carga horária válida' }),
  minutes: z.coerce
    .number(requiredError)
    .min(0, { message: 'Digite uma carga horária válida' })
    .optional(),
  font: z.object({
    label: z.string(),
    value: z.string(),
  }),
  expireAt: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    })
    .optional(),
  emittedAt: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    })
    .optional(),
  categories: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  habilidades: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione ao menos uma habilidade'),
  descriptionImage: z
    .string()
    .trim()
    .min(120, { message: 'Digite no mínimo 120 letras' })
    .max(600, { message: 'Digite no máximo 450 letras' })
    .optional()
    .or(z.string().length(0)),
  description: z.string(requiredError).trim().min(2, { message: 'Digite uma descrição válida' }),
  schoolId: z.string(requiredError).optional(),
  courseId: z.string().optional(),
});

export type CertificateIssuerSchemaNaturalPersonType = z.infer<
  typeof CertificateIssuerSchemaNaturalPerson
>;
