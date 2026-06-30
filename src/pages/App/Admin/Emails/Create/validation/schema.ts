import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export enum ETypeEmail {
  PF = 'Pessoa Física',
  PJ = 'Pessoa Jurídica',
  AD = 'Admin',
}

export enum EIsDeletable {
  Yes = 'Sim',
  No = 'Não',
}

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const EmailSchema = z.object({
  name: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  subject: z.string(requiredError).trim().min(2, { message: 'Digite um assunto válido' }),
  variablesNames: z.array(optionSchema).min(1, { message: 'Selecione uma variável válida' }),
  types: z.array(optionSchema).min(1, { message: 'Selecione um tipo válido' }),
  deletable: z.enum([EIsDeletable.Yes, EIsDeletable.No]),
});

export type EmailSchemaType = z.infer<typeof EmailSchema>;
