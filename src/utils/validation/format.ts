import { EBrand } from '@/services/entities/app/core/credits/enums';

import { creditCardBrandRegex, nameRegex, uppercaseRegex } from './regex';

export const removeNonNumeric = (value: string) => {
  return value.replace(/\D/g, '');
};

export const FormatName = (value: string) => {
  return value.replace(nameRegex, '');
};

export const FormatUppercase = (value: string) => {
  if (uppercaseRegex.test(value)) {
    return value;
  }

  return '';
};

export const FormatBirthday = (value: string) => {
  return removeNonNumeric(value)
    .substring(0, 8)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
};

export const FormatPhone = (value: string) => {
  return removeNonNumeric(value)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+$/, '$1');
};

export const FormatCPF = (value: string) => {
  const numeric = removeNonNumeric(value);

  if (numeric.length === 11) {
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  if (numeric.length === 8) {
    return numeric.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  return numeric;
};

export const FormatCNPJ = (value: string) => {
  return removeNonNumeric(value)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+$/, '$1');
};

export const FormatCreditCard = (value: string) => {
  return removeNonNumeric(value)
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+$/, '$1');
};

export const FormatMonthOrYear = (value: string) =>
  removeNonNumeric(value).replace(/(\d{2})(\d)/, '$1');

export const FormatCVV = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1');

export const FormatZipCode = (value: string) =>
  removeNonNumeric(value)
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+$/, '$1');

export const GetBrand = (number: string) => {
  const formattedNumber = number.replace(/\D/g, '');
  if (creditCardBrandRegex.Mastercard.test(formattedNumber)) {
    return EBrand.MASTERCARD;
  }
  if (creditCardBrandRegex.Visa.test(formattedNumber)) {
    return EBrand.VISA;
  }
  if (creditCardBrandRegex.Amex.test(formattedNumber)) {
    return EBrand.AMEX;
  }
  if (creditCardBrandRegex.Diners.test(formattedNumber)) {
    return EBrand.DINERS;
  }
  if (creditCardBrandRegex.Discover.test(formattedNumber)) {
    return EBrand.DISCOVER;
  }
  if (creditCardBrandRegex.Jcb.test(formattedNumber)) {
    return EBrand.JCB;
  }
  if (creditCardBrandRegex.Elo.test(formattedNumber)) {
    return EBrand.ELO;
  }
  if (creditCardBrandRegex.Maestro.test(formattedNumber)) {
    return EBrand.MAESTRO;
  }
  if (creditCardBrandRegex.Aura.test(formattedNumber)) {
    return EBrand.AURA;
  }
  if (creditCardBrandRegex.Hipercard.test(formattedNumber)) {
    return EBrand.HIPERCARD;
  }

  return undefined;
};
