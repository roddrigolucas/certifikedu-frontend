import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

const AchievementTypeEnum = z.enum(['events', 'subjects', 'activities', 'internships']);

export const TrailSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  templateId: z.string(requiredError).min(1, { message: 'Selecione um certificado válido' }),
  modules: z
    .array(
      z.object({
        achievements: z.array(
          z.object({
            type: AchievementTypeEnum,
            id: z.string(requiredError).min(1, { message: 'Selecione a conquista' }),
          }),
        ),
      }),
    )
    .nonempty({ message: 'Adicione ao menos um módulo' }),
});

export type TrailSchemaType = z.infer<typeof TrailSchema>;
export type AchievementType = z.infer<typeof AchievementTypeEnum>;
