import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const SchemaRegisterBulkStudents = z.object({
  schoolId: z.string(requiredError).min(1, { message: 'Selecione uma unidade de ensino' }),
  courseId: z.string(requiredError).optional(),
});

export type SchemaRegisterBulkStudentsType = z.infer<typeof SchemaRegisterBulkStudents>;
