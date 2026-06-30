import { UseFormReturn } from 'react-hook-form';

import AddressForm from '../../../NaturalPersonForm/forms/AddressForm';
import PersonalForm from '../../../NaturalPersonForm/forms/PersonalForm';
import { LegalPersonSchemaType } from '../../validation/schema';
import CompanyForm from '../CompanyForm';

interface Props {
  form: UseFormReturn<LegalPersonSchemaType>;
}

export default function ReviewForm({ form }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Dados Corporativos</h3>
        <CompanyForm form={form} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Dados do Representante</h3>
        <PersonalForm form={form} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Endereço</h3>
        <AddressForm form={form} />
      </div>
    </div>
  );
}
