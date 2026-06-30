import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const CertificateReceiveSchema = z.object({
  name: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).trim().email({ message: 'Digite um e-mail válido' }),
  document: z
    .string(requiredError)
    .trim()
    .length(14, { message: 'Digite todos os dígitos do seu CPF' })
    .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
});

export type CertificateReceiveSchemaType = z.infer<typeof CertificateReceiveSchema>;
