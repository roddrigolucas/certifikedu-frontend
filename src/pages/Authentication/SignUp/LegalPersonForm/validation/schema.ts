import { cnpj as cnpjChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';

import { NaturalPersonSchema } from '../../NaturalPersonForm/validation/schema';

const DefaultFormSchema = z.object({
  companyName: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite o razão social completa da sua instituição' })
    .regex(/^[A-Za-z\d\s\u00C0-\u00FF]+$/, { message: 'Digite um nome válido' }),
  fantasyName: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite o nome fantasia completo da sua instituição' })
    .regex(/^[A-Za-z\d\s\u00C0-\u00FF]+$/, { message: 'Digite um nome válido' }),
  cnpj: z
    .string(requiredError)
    .trim()
    .length(18, { message: 'Digite todos os dígitos do CNPJ' })
    .refine((cnpj) => cnpjChecker.isValid(cnpj), { message: 'Digite um CNPJ válido' }),
  companyPhone: z.string(requiredError).min(14, { message: 'Digite um número válido' }),
  companyDateCreation: z
    .string(requiredError)
    .length(10, { message: 'Digite uma data de criação válida' })
    .refine((date) => isValidDate(date), {
      message: 'Data de criação inválida',
    }),
});

export const LegalPersonSchema = z.object({
  ...DefaultFormSchema.shape,
  ...NaturalPersonSchema.shape,
});

export type LegalPersonSchemaType = z.infer<typeof LegalPersonSchema>;

export const CompanySchema = LegalPersonSchema.pick({
  companyName: true,
  fantasyName: true,
  cnpj: true,
  companyPhone: true,
  companyDateCreation: true,
  email: true,
});

export const PersonalDataSchema = LegalPersonSchema.pick({
  name: true,
  cpf: true,
  phone: true,
  birthday: true,
});

export const AddressSchema = LegalPersonSchema.pick({
  cep: true,
  state: true,
  neighborhood: true,
  additionalDetails: true,
  street: true,
  number: true,
  city: true,
});

const passwordComparisonRefinement = (schema: z.ZodType<any, any>) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: ' ',
    path: ['confirmPassword'],
  });

export const PasswordSchema = passwordComparisonRefinement(
  LegalPersonSchema.pick({
    password: true,
    confirmPassword: true,
  }),
);

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export const DefaultLegalPersonValues: LegalPersonSchemaType = {
  companyName: '',
  fantasyName: '',
  cnpj: '',
  companyPhone: '',
  companyDateCreation: '',
  email: '',
  name: '',
  cpf: '',
  phone: '',
  birthday: '',
  cep: '',
  state: '',
  neighborhood: '',
  additionalDetails: '',
  street: '',
  number: '',
  city: '',
  password: '',
  confirmPassword: '',
};
