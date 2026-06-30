import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const FormSchemaPermission = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  itemsInverse: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    })
    .optional(),
  document: z
    .string(requiredError)
    .trim()
    .refine(
      (cpf) => {
        if (cpf.length === 9) {
          return true; // DNI → aceita sem validar CPF
        }
        if (cpf.length === 14) {
          return cpfChecker.isValid(cpf); // CPF formatado
        }

        return false;
      },
      { message: 'Digite 8 caracteres (DNI) ou um CPF válido' },
    )
    .optional(),
  type: z.string().optional(),
});

export type FormTypePermission = z.infer<typeof FormSchemaPermission>;
