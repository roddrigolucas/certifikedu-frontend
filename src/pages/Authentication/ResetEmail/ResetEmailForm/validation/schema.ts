import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const ResetEmailSchema = z.object({
  email: z.string(requiredError).trim().email({ message: 'Digite um e-mail válido' }),
  password: z.string(requiredError),
  newEmail: z.string(requiredError).trim().email({ message: 'Digite um e-mail válido' }),
});

export type ResetEmailSchemaType = z.infer<typeof ResetEmailSchema>;
