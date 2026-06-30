import { z } from 'zod';

export const FormSchemaCheckboxSchools = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

export type FormSchemaCheckboxSchoolsType = z.infer<typeof FormSchemaCheckboxSchools>;
