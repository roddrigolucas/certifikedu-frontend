import { cnpj as cnpjChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';

export const CertificateIssuerSchema = z.object({
  name: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  cargaHoraria: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária válida' }),
  expireAt: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    })
    .optional(),
  issuedAt: z
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
  description: z.string(requiredError).trim().min(2, { message: 'Digite uma descrição válida' }),
  descriptionImage: z
    .string()
    .trim()
    .min(120, { message: 'Digite no mínimo 120 letras' })
    .max(600, { message: 'Digite no máximo 450 letras' })
    .optional()
    .or(z.string().length(0)),
  statedIssuer: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite um nome do emissor válido' })
    .optional(),
  statedIssuerDocument: z
    .string(requiredError)
    .trim()
    .length(18, { message: 'Digite todos os dígitos do CPNJ' })
    .refine((cnpj) => cnpjChecker.isValid(cnpj), { message: 'Digite um CNPJ válido' })
    .optional(),
  statedIssuerUrl: z.string(requiredError).url({ message: 'Digite um website válido' }).optional(),
});

export type CertificateIssuerSchemaType = z.infer<typeof CertificateIssuerSchema>;
