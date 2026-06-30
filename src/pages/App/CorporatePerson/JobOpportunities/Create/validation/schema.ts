import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';

export const PublishJobSchemaAll = z.object({
  jobName: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  state: z.string(requiredError).min(1, { message: 'Digite um nome válido' }),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  city: z.string(requiredError).min(1, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(50, { message: 'Digite uma descrição válida' }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  categories: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione ao menos uma categoria'),
  abilities: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione ao menos uma habilidade'),
  jobType: z.string(requiredError).min(1, { message: 'Selecione obrigatóriamente' }),
  jobPeriod: z.string(requiredError).min(1, { message: 'Selecione obrigatóriamente' }),
  seniorityLevel: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione ao menos uma categoria'),
  professionalEducationLevel: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione ao menos uma categoria'),
  jobClosingDate: z
    .string()
    .length(10, { message: 'Digite uma data válida' })
    .min(1, { message: 'Selecione obrigatóriamente' })
    .refine((val) => isValidDate(val), {
      message: 'Data inválida',
    }),
});
export type PublishJobSchemaAllType = z.infer<typeof PublishJobSchemaAll>;

export const PublishJobSchema = PublishJobSchemaAll.omit({
  jobType: true,
  jobPeriod: true,
  jobClosingDate: true,
  seniorityLevel: true,
  professionalEducationLevel: true,
  state: true,
  city: true,
  items: true,
});
export type PublishJobSchemaType = z.infer<typeof PublishJobSchema>;

export const SecondPartPublishJobSchema = PublishJobSchemaAll.pick({
  jobType: true,
  jobPeriod: true,
  jobClosingDate: true,
  seniorityLevel: true,
  professionalEducationLevel: true,
  state: true,
  city: true,
  items: true,
});

export type SecondPartPublishJobSchemaType = z.infer<typeof SecondPartPublishJobSchema>;
