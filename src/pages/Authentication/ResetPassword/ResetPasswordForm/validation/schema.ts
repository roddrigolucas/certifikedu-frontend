import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const ResetPasswordSchema = z.object({
  email: z.string(requiredError).trim().email({ message: 'Digite um e-mail válido' }),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
