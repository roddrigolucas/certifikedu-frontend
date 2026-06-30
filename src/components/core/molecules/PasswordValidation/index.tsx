import React from 'react';

import { CheckIcon, XIcon } from 'lucide-react';
import PasswordChecklist from 'react-password-checklist';

import { PasswordValidationProps } from '@/components/core/molecules/PasswordValidation/types';

export const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
  confirmPassword,
}) => {
  return (
    <div className="py-5">
      <PasswordChecklist
        rules={['minLength', 'specialChar', 'number', 'capital', 'lowercase', 'match']}
        minLength={8}
        value={password}
        valueAgain={confirmPassword}
        iconSize={14}
        className="text-sm text-slate-600"
        iconComponents={{
          ValidIcon: <CheckIcon className="mr-2 size-5 text-emerald-500" />,
          InvalidIcon: <XIcon className="mr-2 size-5 text-red-500" />,
        }}
        messages={{
          minLength: 'A senha possui mais de 8 letras',
          specialChar: 'A senha tem caractere especial',
          number: 'A senha tem número',
          capital: 'A senha tem letra maiúscula',
          lowercase: 'A senha tem letra minúscula',
          match: 'As senhas são iguais',
        }}
      />
    </div>
  );
};
