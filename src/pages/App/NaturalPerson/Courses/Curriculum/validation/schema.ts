import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const CurriculumSchemaBasicInfo = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  requiredHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária obrigatória válida' }),
  electiveHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária eletiva válida' })
    .optional(),
  complementaryHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária complementar válida' })
    .optional(),
});

export enum ETypeSubject {
  REQUIRED = 'required',
  ELECTIVE = 'elective',
}

const subject = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(3, { message: 'Digite uma descrição válida' }),
  totalHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária válida' }),
  type: z.enum([ETypeSubject.REQUIRED, ETypeSubject.ELECTIVE]),
});

const semester = z.object({
  semesterNumber: z.number().int().min(1).max(12).default(1),
  requiredHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária obrigatória válida' }),
  electiveHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária eletiva válida' })
    .optional(),
  complementaryHoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária complementar válida' })
    .optional(),
  subjects: z.array(subject),
});

export const CurriculumSchemaSemesters = z.object({
  semesters: z.array(semester),
});

const activity = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  hoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária obrigatória válida' }),
});

export const CurriculumSchemaActivity = z.object({
  activities: z.array(activity),
});

const internship = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  hoursWorkload: z.coerce
    .number(requiredError)
    .min(1, { message: 'Digite uma carga horária obrigatória válida' }),
});

export const CurriculumSchemaInternship = z.object({
  internships: z.array(internship),
});

export const CurriculumSchemaAll = CurriculumSchemaBasicInfo.merge(CurriculumSchemaSemesters)
  .merge(CurriculumSchemaActivity)
  .merge(CurriculumSchemaInternship);

export type CurriculumType = z.infer<typeof semester>;

export type CurriculumSchemaType = z.infer<typeof CurriculumSchemaAll>;
