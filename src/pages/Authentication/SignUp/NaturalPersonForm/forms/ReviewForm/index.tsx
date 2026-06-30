import { UseFormReturn } from 'react-hook-form';

import { NaturalPersonSchemaType } from '../../validation/schema';
import AddressForm from '../AddressForm';
import PersonalForm from '../PersonalForm';

interface Props {
  form: UseFormReturn<NaturalPersonSchemaType>;
}

export default function ReviewForm({ form }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Dados Pessoais</h3>
        <PersonalForm form={form} isNaturalPersonType />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Endereço</h3>
        <AddressForm form={form} />
      </div>
    </div>
  );
}
