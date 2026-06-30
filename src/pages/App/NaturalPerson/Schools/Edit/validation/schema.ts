import { cnpj as cnpjChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const SchoolSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
  document: z
    .string(requiredError)
    .trim()
    .length(18, { message: 'Digite todos os dígitos do seu CNPJ' })
    .refine((cnpj) => cnpjChecker.isValid(cnpj), { message: 'Digite um CNPJ válido' }),
  website: z.string(requiredError).url({ message: 'Digite um website válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
});

export type SchoolSchemaType = z.infer<typeof SchoolSchema>;
