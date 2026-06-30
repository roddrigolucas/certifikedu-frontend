import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';
import { cepRegex, stateRegex } from '@/utils/validation/regex';

export const ProfileSchema = z.object({
  email: z.string(requiredError).email({ message: 'Digite um email válido' }).trim().toLowerCase(),
  companyName: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite o nome social completo da sua instituição' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Digite um nome válido' }),
  fantasyName: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite o nome fantasia completo da sua instituição' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Digite um nome válido' }),
  cnpj: z
    .string(requiredError)
    .trim()
    .length(18, { message: 'Digite todos os dígitos do CPNJ' })
    .refine((cnpj) => cnpjChecker.isValid(cnpj), { message: 'Digite um CNPJ válido' }),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
  dateCreation: z
    .string(requiredError)
    .length(10, { message: 'Digite uma data de criação válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data de criação inválida',
    }),
  category: z.string(requiredError).trim().min(2, { message: 'Digite um segmento válido' }),
  partner: z.object({
    name: z
      .string(requiredError)
      .trim()
      .min(2, { message: 'Digite um nome válido' })
      .regex(/^[A-Za-z\s]+$/, { message: 'Digite um nome válido' }),
    cpf: z
      .string(requiredError)
      .trim()
      .length(14, { message: 'Digite todos os dígitos do seu CPF' })
      .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
    phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
    birthdate: z
      .string(requiredError)
      .length(10, { message: 'Digite uma data de nascimento válida' })
      .refine((val) => isValidDate(val), {
        message: 'Data de nascimento inválida',
      }),
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
  }),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export const defaultFormValues: ProfileSchemaType = {
  email: '',
  companyName: '',
  fantasyName: '',
  cnpj: '',
  phone: '',
  dateCreation: '',
  category: '',
  partner: {
    name: '',
    cpf: '',
    phone: '',
    birthdate: '',
    address: {
      street: '',
      streetNumber: '',
      neighborhood: '',
      zipCode: '',
      city: '',
      state: '',
      complementary: '',
    },
  },
};
