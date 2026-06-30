import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';
import { cepRegex, stateRegex } from '@/utils/validation/regex';

export const StudentSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
  dob: z
    .string(requiredError)
    .length(10, { message: 'Digite uma data de nascimento válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data de nascimento inválida',
    }),
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
      { message: 'Digite um CPF ou DNI válido' },
    ),
  address: z.object({
    street: z.string(requiredError).trim().min(5, { message: 'Digite uma rua válida' }),
    streetNumber: z.string(requiredError).trim().min(1, { message: 'Digite um número válido' }),
    neighborhood: z.string(requiredError).trim().min(5, { message: 'Digite um bairro válido' }),
    zipCode: z
      .string(requiredError)
      .trim()
      .length(9, { message: 'Digite todos os dígitos do seu CEP' })
      .regex(cepRegex, { message: 'Digite um CEP válido. Ex: 12345-678' }),
    city: z.string(requiredError).trim().min(5, { message: 'Digite uma cidade válida' }),
    state: z
      .string(requiredError)
      .trim()
      .toLowerCase()
      .length(2, { message: 'Digite um estado válido' })
      .regex(stateRegex, {
        message: 'Digite um estado válido',
      }),
    complementary: z.string(),
  }),
});

export const StudentAssociateSchema = z.object({});

export type StudentSchemaType = z.infer<typeof StudentSchema>;

export type StudentAssociateSchemaType = z.infer<typeof StudentAssociateSchema>;
