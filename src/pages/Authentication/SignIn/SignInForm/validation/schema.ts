import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const SignupSchema = z.object({
  email: z.string(requiredError).trim().email({ message: 'Digite um e-mail válido' }),
  password: z.string(requiredError).trim().min(2, { message: 'Digite uma senha válida' }),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
