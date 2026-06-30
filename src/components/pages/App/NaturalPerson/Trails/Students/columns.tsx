'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { UserIcon } from 'lucide-react';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Checkbox } from '@/components/shared/ui/checkbox';

import { IStudentIssuerCourse } from '@/services/entities/app/legalPerson/students/model';

export const columns: ColumnDef<IStudentIssuerCourse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <Avatar className="size-9">
          <AvatarFallback className="bg-slate-100 text-slate-600">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="E-mail" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => <TableColumnHeader column={column} title="CPF" />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      if (cnpjChecker.isValid(row.getValue('document'))) {
        return cnpjChecker.format(row.getValue('document'));
      }

      return cpfChecker.format(row.getValue('document'));
    },
  },
];
