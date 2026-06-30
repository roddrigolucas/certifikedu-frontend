import * as yup from 'yup';

export const certificateIssuerSchemaNaturalPerson = yup.object({});
export type CertificateIssuerSchemaNaturalPersonType = yup.InferType<
  typeof certificateIssuerSchemaNaturalPerson
>;
