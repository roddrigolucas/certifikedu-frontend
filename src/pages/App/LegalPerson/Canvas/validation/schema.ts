import { z } from 'zod';

import { requiredError } from '@/utils/validation/errors';

export const CanvasSchema = z.object({
  url: z
    .string(requiredError)
    .trim()
    .url({ message: 'Digite uma URL válida' })
    .refine((url) => url.startsWith('https://'), { message: 'A URL deve começar com "https://"' })
    .refine((url) => !url.endsWith('/'), { message: 'A URL não deve terminar com uma barra (/)' }),
  ltiClientId: z.string(requiredError).trim(),
  ltiClientSecret: z.string(requiredError).trim(),
  canvasClientId: z.string(requiredError).trim(),
  canvasClientSecret: z.string(requiredError).trim(),
  redirectUri: z.string().trim().optional(),
});

export type CanvasSchemaType = z.infer<typeof CanvasSchema>;

export const URLSchema = CanvasSchema.pick({
  url: true,
});

export const LTIConfigurationSchema = CanvasSchema.pick({
  ltiClientId: true,
  ltiClientSecret: true,
});

export const CanvasAPIKeyConfigurationSchema = CanvasSchema.pick({
  canvasClientId: true,
  canvasClientSecret: true,
});
