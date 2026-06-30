import { z } from 'zod';

import { EmploymentType, WorkModel } from '@/services/entities/app/core/resume/model';

export const ResumeSchemaBasicInfo = z.object({
  resumeId: z.string().optional(),
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
});

const experience = z
  .object({
    resumeExperienceId: z.string().optional(),
    title: z.string().min(1, 'O título da experiência é obrigatório'),
    description: z.string().optional(),
    startYear: z
      .number()
      .int()
      .min(1900, 'Ano inválido')
      .max(new Date().getFullYear(), 'Ano inválido')
      .default(new Date().getFullYear()),
    startMonth: z.number().int().min(1).max(12).default(1),
    endYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    endMonth: z.number().int().min(1).max(12).optional(),
    employmentType: z.enum(Object.values(EmploymentType) as [string, ...string[]], {
      errorMap: () => ({ message: 'O tipo de emprego é obrigatório' }),
    }),
    workModel: z.enum(Object.values(WorkModel) as [string, ...string[]], {
      errorMap: () => ({ message: 'O modelo de trabalho é obrigatório' }),
    }),
    companyName: z.string().min(1, 'O nome da empresa é obrigatório'),
    companyEmail: z.string().email().optional(),
    companyPhone: z.string().optional(),
    companyCnpj: z.string().optional(),
    companyLocation: z.string().optional(),
    certificates: z.array(z.string()).default([]),
    currentlyWorking: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.endYear && data.startYear) {
      if (data.endYear < data.startYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A data de término deve ser maior ou igual a data de início',
          path: ['endYear'],
        });
      } else if (data.endYear === data.startYear) {
        if (data.endMonth && data.startMonth && data.endMonth < data.startMonth) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'A data de término deve ser maior ou igual a data de início',
            path: ['endMonth'],
          });
        }
      }
    }
  });

export const ResumeSchemaExperience = z.object({
  experiences: z.array(experience),
});

const education = z
  .object({
    resumeEducationId: z.string().optional(),
    title: z.string().min(1, 'O título da educação é obrigatório'),
    description: z.string().optional(),
    startYear: z.number().int().min(1900, 'Ano inválido').max(new Date().getFullYear()),
    startMonth: z.number().int().min(1).max(12).default(1),
    endYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    endMonth: z.number().int().min(1).max(12).optional(),
    institutionName: z.string().min(1, 'O nome da instituição é obrigatório'),
    institutionEmail: z.string().email().optional(),
    institutionPhone: z.string().optional(),
    institutionCnpj: z.string().optional(),
    institutionLocation: z.string().optional(),
    certificates: z.array(z.string()).default([]),
    currentlyStudying: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.endYear && data.startYear) {
      if (data.endYear < data.startYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A data de término deve ser maior ou igual a data de início',
          path: ['endYear'],
        });
      } else if (data.endYear === data.startYear) {
        if (data.endMonth && data.startMonth && data.endMonth < data.startMonth) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'A data de término deve ser maior ou igual a data de início',
            path: ['endMonth'],
          });
        }
      }
    }
  });

export const ResumeSchemaEducation = z.object({
  educations: z.array(education),
});

const language = z.object({
  resumeLanguageId: z.string().optional(),
  language: z.string().min(1, 'O nome do idioma é obrigatório'),
  level: z.string(),
  certificates: z.array(z.string()).default([]).optional().or(z.undefined()),
});

export const ResumeSchemaLanguage = z.object({
  languages: z.array(language),
});

export const ResumeSchemaAll = ResumeSchemaBasicInfo.merge(ResumeSchemaExperience)
  .merge(ResumeSchemaEducation)
  .merge(ResumeSchemaLanguage);

export type ResumeSchemaType = z.infer<typeof ResumeSchemaAll>;

export type ExperienceType = z.infer<typeof experience>;
export type EducationType = z.infer<typeof education>;
export type LanguageType = z.infer<typeof language>;
