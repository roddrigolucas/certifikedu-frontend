import { z } from 'zod';

export const PlansSchemaNaturalPerson = z.object({
  installments: z.string().min(1, 'Selecione uma opcao de parcelamento'),
});

export type PlansSchemaNaturalPersonType = z.infer<typeof PlansSchemaNaturalPerson>;
