import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const StudentSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }).optional(),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }).optional(),
  school: z.string(requiredError).optional(),
  courseId: z.string().optional(),
  document: z
    .string(requiredError)
    .trim()
    .refine(
      (cpf) => {
        return cpf.length === 14 || cpf.length === 9;
      },
      { message: 'Digite todos os dígitos do seu CPF/DNI' },
    )

    .refine(
      (cpf) => {
        if (cpf.length === 14) {
          return cpfChecker.isValid(cpf);
        }
        if (cpf.length === 9) {
          return true;
        }

        return false;
      },
      { message: 'Digite um CPF/DNI válido' },
    ),
});

export const StudentAssociateSchema = z.object({
  school: z.string(requiredError),
  courseId: z.string().optional(),
  curriculumId: z.string().optional(),
});

export type StudentSchemaType = z.infer<typeof StudentSchema>;

export type StudentAssociateSchemaType = z.infer<typeof StudentAssociateSchema>;
