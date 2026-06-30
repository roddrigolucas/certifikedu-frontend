import { z } from 'zod';

// Enum matches Prisma/Backend Enum
export enum MissionTriggerType {
  CERTIFICATE_EMISSION = 'CERTIFICATE_EMISSION',
  COURSE_COMPLETION = 'COURSE_COMPLETION',
  PATH_COMPLETION = 'PATH_COMPLETION',
  SOCIAL_SHARE = 'SOCIAL_SHARE',
  FILE_DOWNLOAD = 'FILE_DOWNLOAD',
  MANUAL_CLAIM = 'MANUAL_CLAIM',
}

export const MissionFormSchema = z.object({
  title: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),

  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(10, { message: 'A descrição deve ser mais detalhada' }),

  xpReward: z.coerce
    .number({ required_error: 'Recompensa é obrigatória' })
    .min(1, { message: 'A recompensa deve ser maior que 0' }),

  triggerType: z.nativeEnum(MissionTriggerType, {
    errorMap: () => ({ message: 'Selecione um critério válido' }),
  }),

  // Optional fields that might be shown conditionally later
  requiredCount: z.coerce.number().optional().default(1),
  referenceId: z.string().optional(),

  isActive: z.string().default('active'),
});

export type MissionFormSchemaType = z.infer<typeof MissionFormSchema>;
