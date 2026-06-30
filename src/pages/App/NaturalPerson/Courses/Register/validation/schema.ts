import { z } from 'zod';

import { EducationLevelEnum } from '@/services/entities/app/legalPerson/school/enums';

import { requiredError } from '@/utils/validation/errors';

export const CourseSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  level: z.enum([
    EducationLevelEnum.EducacaoInfantil,
    EducationLevelEnum.EnsinoFundamental,
    EducationLevelEnum.EnsinoMedio,
    EducationLevelEnum.Graduacao,
    EducationLevelEnum.GraduacaoTecnologica,
    EducationLevelEnum.PosGraduacao,
    EducationLevelEnum.Mestrado,
    EducationLevelEnum.Doutorado,
    EducationLevelEnum.PosDoutorado,
    EducationLevelEnum.Extensao,
    EducationLevelEnum.Profissionalizante,
    EducationLevelEnum.EducacaoEmpresarial,
  ]),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  isAcademic: z.boolean().optional(),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
