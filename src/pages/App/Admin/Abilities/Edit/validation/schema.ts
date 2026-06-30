import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const AbilitiesSchema = z.object({
  category: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  ability: z.string(requiredError).trim().min(2, { message: 'Digite um assunto válido' }),
});

export type AbilitiesSchemaType = z.infer<typeof AbilitiesSchema>;
