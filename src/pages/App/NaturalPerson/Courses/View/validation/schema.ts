import { z } from 'zod';

export const CourseSchemaNaturalPerson = z.object({
  schoolId: z.string().optional(),
  courseId: z.string().optional(),
  dob: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

export type CourseSchemaNaturalPersonType = z.infer<typeof CourseSchemaNaturalPerson>;
