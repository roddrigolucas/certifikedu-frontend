import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const WebSocketPDISchema = z.object({
  learning_goal: z.string(requiredError).trim().min(2, { message: 'Digite um objetivo válido' }),
  learning_topics: z.string(requiredError).trim().min(2, { message: 'Digite um tópico válido' }),
  previousEducation: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite uma educação anterior válida' }),
  daily_time: z.string(requiredError).trim().min(2, { message: 'Digite um tempo diário válido' }),
});

export type WebSocketPDISchemaType = z.infer<typeof WebSocketPDISchema>;
