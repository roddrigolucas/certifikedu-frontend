import {
  FormatCPF,
  FormatCreditCard,
  FormatCVV,
  FormatMonthOrYear,
  FormatZipCode,
} from '@/utils/validation/format';

interface CreditCardFieldsetType {
  name:
    | 'number'
    | 'holderName'
    | 'holderDocument'
    | 'cvv'
    | 'expMonth'
    | 'expYear'
    | 'billingAddress'
    | 'billingAddress.zipCode'
    | 'billingAddress.street'
    | 'billingAddress.streetNumber'
    | 'billingAddress.city'
    | 'billingAddress.state'
    | 'billingAddress.neighborhood'
    | 'billingAddress.additionalDetails';
  className?: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (value: string) => string | undefined;
}

interface AddFieldsType {
  card: CreditCardFieldsetType[];
  billingAddress: CreditCardFieldsetType[];
}

export const addFields: AddFieldsType = {
  card: [
    {
      name: 'holderName',
      label: 'Nome no Cartão',
      placeholder: 'Ex: John Doe',
    },
    {
      name: 'holderDocument',
      className: 'col-span-12 md:col-span-6',
      label: 'CPF do Titular',
      placeholder: 'Ex: 000.000.000-00',
      onChange: (value: string) => {
        return FormatCPF(value);
      },
    },
    {
      name: 'number',
      className: 'col-span-12 md:col-span-6',
      label: 'Número do Cartão',
      placeholder: '•••• •••• •••• ••••',
      onChange: (value: string) => {
        return FormatCreditCard(value);
      },
    },
    {
      name: 'expMonth',
      className: 'col-span-12 md:col-span-4',
      label: 'Mês',
      placeholder: 'MM',
      onChange: (value: string) => {
        return FormatMonthOrYear(value);
      },
    },
    {
      name: 'expYear',
      className: 'col-span-12 md:col-span-4',
      label: 'Ano',
      placeholder: 'YY',
      onChange: (value: string) => {
        return FormatMonthOrYear(value);
      },
    },
    {
      name: 'cvv',
      className: 'col-span-12 md:col-span-4',
      label: 'CVV',
      placeholder: 'CVV',
      onChange: (value: string) => {
        return FormatCVV(value);
      },
    },
  ],
  billingAddress: [
    {
      name: 'billingAddress.zipCode',
      label: 'CEP',
      placeholder: 'Ex: 12345-678',
      onChange: (value: string) => {
        return FormatZipCode(value);
      },
    },
    {
      name: 'billingAddress.street',
      label: 'Logradouro',
      className: 'col-span-12 md:col-span-9',
      placeholder: 'Ex: Rua Caronel Caetano',
    },
    {
      name: 'billingAddress.streetNumber',
      label: 'Número',
      className: 'col-span-12 md:col-span-3',
      placeholder: 'Ex: 403',
    },
    {
      name: 'billingAddress.city',
      label: 'Cidade',
      className: 'col-span-12 md:col-span-6',
      placeholder: 'Ex: Belo Horizonte',
    },
    {
      name: 'billingAddress.state',
      label: 'Estado',
      className: 'col-span-12 md:col-span-6',
      placeholder: 'Ex: MG',
    },
    {
      name: 'billingAddress.neighborhood',
      label: 'Bairro',
      className: 'col-span-12 md:col-span-6',
      placeholder: 'Ex: Bairro da Penha',
    },
    {
      name: 'billingAddress.additionalDetails',
      label: 'Complemento',
      className: 'col-span-12 md:col-span-6',
      placeholder: 'Ex: Apto 107',
    },
  ],
};
