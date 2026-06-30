import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const PDISchemaAll = z.object({
  title: z.string(requiredError).min(10, { message: 'Campo Obrigatório' }),
  learningGoal: z.string(requiredError).min(30, {
    message: 'Digite uma descrição completa para o modelo conseguir os melhores resultados',
  }),
  learningTopics: z.string(requiredError).min(30, {
    message: 'Digite uma descrição completa para o modelo conseguir os melhores resultados',
  }),
  academicExperience: z.string(requiredError).min(10, {
    message: 'Digite uma descrição completa para o modelo conseguir os melhores resultados',
  }),
  previousExperience: z.string(requiredError).min(10, {
    message: 'Digite uma descrição completa para o modelo conseguir os melhores resultados',
  }),
  dailyDedication: z.string(requiredError).min(1, { message: 'Campo Obrigatório' }),
});
export type PDISchemaAllType = z.infer<typeof PDISchemaAll>;

export const PDISchema = PDISchemaAll.pick({
  title: true,
  learningGoal: true,
  learningTopics: true,
});
export type PDISchemaType = z.infer<typeof PDISchema>;

export const SecondPartPDISchema = PDISchemaAll.pick({
  previousExperience: true,
  dailyDedication: true,
  academicExperience: true,
});

export type SecondPartPDISchemaType = z.infer<typeof SecondPartPDISchema>;
