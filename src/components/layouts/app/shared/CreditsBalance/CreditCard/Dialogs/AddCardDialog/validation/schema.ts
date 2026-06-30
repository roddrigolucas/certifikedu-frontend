import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { cepRegex, nameRegex, stateRegex } from '@/utils/validation/regex';

export const BillingAddressSchema = z.object({
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
  additionalDetails: z.string().trim().optional(),
});

export const CreditCardSchema = z.object({
  holderName: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite seu nome completo' })
    .regex(nameRegex, { message: 'Digite um nome válido' }),
  holderDocument: z
    .string(requiredError)
    .trim()
    .length(14, { message: 'Digite todos os dígitos do seu CPF' })
    .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
  number: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(
      z
        .string(requiredError)
        .trim()
        .min(13, { message: 'Digite um cartão válido' })
        .max(17, { message: 'Digite um cartão válido' }),
    ),
  cvv: z.string(requiredError).regex(/^\d{3}$/, 'Digite um código válido'),
  expMonth: z
    .string(requiredError)
    .trim()
    .length(2, { message: 'Digite um mês válido' })
    .regex(/^(0[1-9]|1[0-2])$/, { message: 'Digite um mês válido' }),
  expYear: z
    .string(requiredError)
    .trim()
    .length(2, { message: 'Digite um ano válido' })
    .regex(/^^(2[3-9]|3\d|4\d|5\d|60)$/, { message: 'Digite um ano válido' }),
  billingAddress: BillingAddressSchema,
});

export type CreditCardFormSchemaType = z.infer<typeof CreditCardSchema>;
