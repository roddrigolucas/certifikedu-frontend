import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { z } from 'zod';

import { EducationLevelEnum } from '@/services/entities/app/legalPerson/school/enums';

import { requiredError } from '@/utils/validation/errors';
import { isValidDate } from '@/utils/validation/isValidDate';
import { cepRegex, stateRegex } from '@/utils/validation/regex';

export const SchoolSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }),
  phone: z.string(requiredError).min(14, { message: 'Digite um número válido' }),
  document: z
    .string(requiredError)
    .trim()
    .length(18, { message: 'Digite todos os dígitos do seu CNPJ' })
    .refine((cnpj) => cnpjChecker.isValid(cnpj), { message: 'Digite um CNPJ válido' }),
  website: z.string(requiredError).url({ message: 'Digite um website válido' }),
  description: z.string(requiredError).min(5, { message: 'Digite uma descrição válida' }),
  courses: z.array(
    z.object({
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
      isAcademic: z.boolean().default(false), // REVIEW - Workaround to include isAcademic field
    }),
  ),
  associate: z.array(
    z.object({
      document: z
        .string()
        .trim()
        .length(14, { message: 'Digite todos os dígitos do seu CPF' })
        .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
      email: z.string(),
      name: z.string(),
    }),
  ),
  students: z.array(
    z.object({
      name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
      email: z.string(requiredError).email({ message: 'Digite um email válido' }),
      phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
      dob: z
        .string(requiredError)
        .length(10, { message: 'Digite uma data de nascimento válida' })
        .refine((val) => isValidDate(val), {
          message: 'Data de nascimento inválida',
        }),
      document: z
        .string(requiredError)
        .trim()
        .length(14, { message: 'Digite todos os dígitos do seu CPF' })
        .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
      address: z.object({
        street: z.string(requiredError).trim().min(5, { message: 'Digite uma rua válida' }),
        streetNumber: z.string(requiredError).trim().min(1, { message: 'Digite um número válido' }),
        neighborhood: z.string(requiredError).trim().min(5, { message: 'Digite um bairro válido' }),
        zipCode: z
          .string(requiredError)
          .trim()
          .length(9, { message: 'Digite todos os dígitos do seu CEP' })
          .regex(cepRegex, { message: 'Digite um CEP válido. Ex: 12345-678' }),
        city: z.string(requiredError).trim().min(5, { message: 'Digite uma cidade válida' }),
        state: z
          .string(requiredError)
          .trim()
          .toLowerCase()
          .length(2, { message: 'Digite um estado válido' })
          .regex(stateRegex, {
            message: 'Digite um estado válido',
          }),
        complementary: z.string(),
      }),
    }),
  ),
});

export const InstituteSchema = SchoolSchema.pick({
  name: true,
  email: true,
  phone: true,
  document: true,
  website: true,
  description: true,
});

export const CourseSchema = SchoolSchema.pick({
  courses: true,
});

export const SchoolSchemaNoStudent = SchoolSchema.omit({
  students: true,
  associate: true,
});
export type SchoolSchemaNoStudentType = z.infer<typeof SchoolSchemaNoStudent>;

export const StudentSchema = SchoolSchema.pick({
  students: true,
});

export const SearchSchema = z.object({
  document: z
    .string()
    .trim()
    .length(14, { message: 'Digite todos os dígitos do seu CPF' })
    .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
});

export const StudentFormSchema = z.object({
  name: z.string(requiredError).min(3, { message: 'Digite um nome válido' }),
  email: z.string(requiredError).email({ message: 'Digite um email válido' }),
  phone: z.string(requiredError).length(15, { message: 'Digite um número válido' }),
  dob: z
    .string(requiredError)
    .length(10, { message: 'Digite uma data de nascimento válida' })
    .refine((val) => isValidDate(val), {
      message: 'Data de nascimento inválida',
    }),
  document: z
    .string(requiredError)
    .trim()
    .length(14, { message: 'Digite todos os dígitos do seu CPF' })
    .refine((cpf) => cpfChecker.isValid(cpf), { message: 'Digite um CPF válido' }),
  address: z.object({
    street: z.string(requiredError).trim().min(5, { message: 'Digite uma rua válida' }),
    streetNumber: z.string(requiredError).trim().min(1, { message: 'Digite um número válido' }),
    neighborhood: z.string(requiredError).trim().min(5, { message: 'Digite um bairro válido' }),
    zipCode: z
      .string(requiredError)
      .trim()
      .length(9, { message: 'Digite todos os dígitos do seu CEP' })
      .regex(cepRegex, { message: 'Digite um CEP válido. Ex: 12345-678' }),
    city: z.string(requiredError).trim().min(5, { message: 'Digite uma cidade válida' }),
    state: z
      .string(requiredError)
      .trim()
      .toLowerCase()
      .length(2, { message: 'Digite um estado válido' })
      .regex(stateRegex, {
        message: 'Digite um estado válido',
      }),
    complementary: z.string(),
  }),
});

export type SchoolSchemaType = z.infer<typeof SchoolSchema>;
export type SearchSchemaType = z.infer<typeof SearchSchema>;
export type StudentFormSchemaType = z.infer<typeof StudentFormSchema>;
