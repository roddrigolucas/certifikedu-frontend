import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';
import { stateRegex } from '@/utils/validation/regex';

const isValidCpfOrDni = (doc: string): boolean => {
  const digits = doc.replace(/\D/g, '');

  if (digits.length === 11) {
    return cpfChecker.isValid(doc); // Mantém a validação de CPF
  }

  if (digits.length === 8) {
    return true; // DNI: aceita se tem 8 dígitos
  }

  return false; // Qualquer outro formato é inválido
};

export const NaturalPersonSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }).trim().toLowerCase(),
  alternativeEmail: z
    .union([
      z.string().email({ message: 'Digite um email válido' }).trim().toLowerCase(),
      z.string().length(0),
    ])
    .optional(),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
  cpf: z
    .string(requiredError)
    .trim()
    .min(8, { message: 'Documento muito curto' })
    .max(14, { message: 'Documento muito longo' })
    .refine(isValidCpfOrDni, { message: 'Digite um CPF ou DNI válido' }),
  birthday: z
    .string(requiredError)
    .length(10, { message: 'Digite uma data de nascimento válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data de nascimento inválida',
    }),
  street: z.string(requiredError).trim().min(5, { message: 'Digite uma rua válida' }),
  city: z.string(requiredError).trim().min(5, { message: 'Digite uma cidade válida' }),
  neighborhood: z.string(requiredError).trim().min(3, { message: 'Digite um bairro válido' }),
  additionalDetails: z.string().trim().optional(),
  state: z
    .string(requiredError)
    .trim()
    .length(2, { message: 'Digite um Estado válido' })
    .toLowerCase()
    .regex(stateRegex, {
      message: 'Digite um estado válido',
    }),
  number: z.string(requiredError).trim().min(1, { message: 'Digite um número válido' }),
  cep: z
    .string(requiredError)
    .trim()
    .length(9, { message: 'Digite todos os dígitos do seu CEP' })
    .regex(/^\d{5}-\d{3}$/, { message: 'Digite um CEP válido. Ex: 12345-678' }),
  password: z
    .string(requiredError)
    .min(8, { message: ' ' })
    .regex(/[a-z]/, { message: ' ' })
    .regex(/[A-Z]/, { message: ' ' })
    .regex(/\d/, { message: ' ' })
    .regex(/[@$!%*?&.^#():;"'-_=+><~,]/, { message: ' ' }),
  confirmPassword: z.string(requiredError),
});

export type NaturalPersonSchemaType = z.infer<typeof NaturalPersonSchema>;

export const PersonalDataSchema = NaturalPersonSchema.pick({
  name: true,
  cpf: true,
  phone: true,
  birthday: true,
  email: true,
});

export const AddressSchema = NaturalPersonSchema.pick({
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
  NaturalPersonSchema.pick({
    password: true,
    confirmPassword: true,
  }),
);

export const DefaultNaturalPersonValues: NaturalPersonSchemaType = {
  name: '',
  email: '',
  alternativeEmail: '',
  phone: '',
  cpf: '',
  birthday: '',
  street: '',
  city: '',
  neighborhood: '',
  additionalDetails: '',
  state: '',
  number: '',
  cep: '',
  password: '',
  confirmPassword: '',
};
