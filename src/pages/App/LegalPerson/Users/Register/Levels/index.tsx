import React from 'react';

import { Check, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import {
  CheckboxReactHookFormMultiple,
  checkboxReactHookFormMultipleItems,
} from '../../View/Dialogs/PermissioningDialog/Checkbox';
import { FormTypePermission } from '../../View/Dialogs/PermissioningDialog/models';

type TableRow = {
  id: string;
  name: string;
  isValid: boolean;
};

type PermissionTableProps = {
  rows: TableRow[];
  form: UseFormReturn<FormTypePermission>;
};

const PermissionTable: React.FC<PermissionTableProps> = ({ rows, form }) => {
  return (
    <>
      <h2 className="text-lg font-bold">Selecione o permissionamento</h2>
      <div className="py-6 ">
        <CheckboxReactHookFormMultiple items={checkboxReactHookFormMultipleItems} form={form} />
      </div>
      <div className="flex overflow-x-auto py-6">
        <table className="w-full  divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6"
              >
                Nome
              </th>
              <th
                scope="col"
                className="py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="w-full whitespace-nowrap py-4 text-sm font-medium text-gray-900 md:px-6">
                  {row.name}
                </td>
                <td className="whitespace-nowrap px-8 py-4 text-right text-sm font-medium">
                  {row.isValid ? (
                    <Check className="size-5 text-emerald-500" />
                  ) : (
                    <X className="size-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PermissionTable;
