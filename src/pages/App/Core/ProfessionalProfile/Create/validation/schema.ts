import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const ProfessionalProfileSchemaAll = z.object({
  state: z.string(requiredError).min(1, { message: 'Digite um nome válido' }),
  yearsOfExperience: z.string(requiredError).min(1, { message: 'Digite um número válido' }),
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
  jobType: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione obrigatóriamente'),
  jobPeriod: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .nonempty('Selecione obrigatóriamente'),
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
});
export type ProfessionalProfileSchemaAllType = z.infer<typeof ProfessionalProfileSchemaAll>;

export const ProfessionalProfileSchema = ProfessionalProfileSchemaAll.omit({
  jobType: true,
  jobPeriod: true,
  seniorityLevel: true,
  professionalEducationLevel: true,
  state: true,
  city: true,
  items: true,
});
export type ProfessionalProfileSchemaType = z.infer<typeof ProfessionalProfileSchema>;

export const SecondPartProfessionalProfileSchema = ProfessionalProfileSchemaAll.pick({
  jobType: true,
  jobPeriod: true,
  seniorityLevel: true,
  professionalEducationLevel: true,
  state: true,
  city: true,
  items: true,
});

export type SecondPartProfessionalProfileSchemaType = z.infer<
  typeof SecondPartProfessionalProfileSchema
>;
