import { z } from 'zod';

import { EInterval, EQuotaPeriod } from '@/services/entities/app/core/plans/enums';

import { requiredError } from '@/utils/validation/errors';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const PlanSchema = z.object({
  name: z.string(requiredError).trim().min(2, { message: 'Digite um nome válido' }),
  description: z.string(requiredError).trim().min(2, { message: 'Digite uma descrição válida' }),
  descriptionPagarme: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite uma descrição válida' }),
  payment_methods: z
    .array(optionSchema)
    .min(1, { message: 'Selecione um método de pagamento válido' }),
  statement_descriptor: z
    .string(requiredError)
    .trim()
    .min(2, { message: 'Digite um nome válido' })
    .max(13, { message: 'Digite um nome com até 22 caracteres' }),
  installments: z.array(optionSchema).min(1, { message: 'Selecione um parcelamento válido' }),
  pdiQty: z.coerce.number().min(1, { message: 'Digite um valor válido' }),
  pdiPeriod: z.enum([
    EQuotaPeriod.MONTHLY,
    EQuotaPeriod.BIMONTHLY,
    EQuotaPeriod.TRIMONTLHY,
    EQuotaPeriod.ANNUALLY,
    EQuotaPeriod.BIANNUALLY,
    EQuotaPeriod.UNLIMITED,
    EQuotaPeriod.FOREVER,
  ]),
  interval: z.enum([EInterval.DAY, EInterval.MONTH, EInterval.WEEK, EInterval.YEAR]),
  emittedCertificatesQuota: z.coerce.number().int().min(1, { message: 'Digite um valor válido' }),
  emittedCertificatesPeriod: z.enum([
    EQuotaPeriod.MONTHLY,
    EQuotaPeriod.BIMONTHLY,
    EQuotaPeriod.TRIMONTLHY,
    EQuotaPeriod.ANNUALLY,
    EQuotaPeriod.BIANNUALLY,
    EQuotaPeriod.UNLIMITED,
    EQuotaPeriod.FOREVER,
  ]),
  receivedCertificateQuota: z.coerce.number().int().min(1, { message: 'Digite um valor válido' }),
  receivedCertificatePeriod: z.enum([
    EQuotaPeriod.MONTHLY,
    EQuotaPeriod.BIMONTHLY,
    EQuotaPeriod.TRIMONTLHY,
    EQuotaPeriod.ANNUALLY,
    EQuotaPeriod.BIANNUALLY,
    EQuotaPeriod.UNLIMITED,
    EQuotaPeriod.FOREVER,
  ]),
  singleCertificatePrice: z.coerce.number().min(0, { message: 'Digite um valor válido' }),
  price: z.coerce.number().min(0, { message: 'Digite um valor válido' }),
  minimumPrice: z.coerce.number().min(0, { message: 'Digite um valor válido' }),
});

export type PlanSchemaType = z.infer<typeof PlanSchema>;
