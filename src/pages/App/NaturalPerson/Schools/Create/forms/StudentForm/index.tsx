import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { SchoolSchemaType } from '../../validation/schema';
import { StudentSearch } from './Search';
import { TableAssociateView, TableView } from './TableView';

export interface Props {
  form: UseFormReturn<SchoolSchemaType>;
  studentFields: UseFieldArrayReturn<SchoolSchemaType, 'students', 'id'>;
  associateFields: UseFieldArrayReturn<SchoolSchemaType, 'associate', 'id'>;
}

export function StudentForm({ form, studentFields, associateFields }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-8">
      <StudentSearch studentFields={studentFields} associateFields={associateFields} />
      <TableView form={form} studentFields={studentFields} associateFields={associateFields} />
      <TableAssociateView
        form={form}
        studentFields={studentFields}
        associateFields={associateFields}
      />
    </div>
  );
}
