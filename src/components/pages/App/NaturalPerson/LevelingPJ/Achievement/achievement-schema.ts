// src/pages/App/Pj/Leveling/Forms/schema.ts

import { z } from 'zod';

import { MissionTriggerType } from '../Missions/mission-schema';

export const AchievementFormSchema = z.object({
  title: z
    .string({ required_error: 'Nome da conquista é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),

  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(10, { message: 'Descreva como o aluno ganha esta conquista' }),

  xpReward: z.coerce
    .number({ required_error: 'Recompensa é obrigatória' })
    .min(1, { message: 'A recompensa deve ser maior que 0' }),

  // Achievements can also be automated!
  // If it's a manual badge (e.g. "Employee of the Month"), select MANUAL_CLAIM
  triggerType: z.nativeEnum(MissionTriggerType, {
    errorMap: () => ({ message: 'Selecione um critério para desbloqueio' }),
  }),

  requiredCount: z.coerce.number().optional().default(1),
  referenceId: z.string().optional(),

  isActive: z.string().default('active'),
});

export type AchievementFormSchemaType = z.infer<typeof AchievementFormSchema>;
