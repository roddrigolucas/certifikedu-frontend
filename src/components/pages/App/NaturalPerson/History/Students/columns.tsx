'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { UserIcon } from 'lucide-react';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Checkbox } from '@/components/shared/ui/checkbox';

import { IHistoryEmissionStudent } from '@/services/entities/app/legalPerson/certificates/types';

export const columns: ColumnDef<IHistoryEmissionStudent>[] = [
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
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <TableColumnHeader column={column} title="Telefone" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'certificateSuccessStatus',
    header: ({ column }) => <TableColumnHeader column={column} title="Cadastro Confirmado" />,
    cell: ({ row }) => {
      switch (row.getValue('certificateSuccessStatus')) {
        case 'PENDING':
          return <Badge variant="default">Pendente</Badge>;
        case 'SUCCESS':
          return <Badge variant="success">Sucesso</Badge>;
        default:
          return <Badge variant="destructive">Erro</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: true,
  },
];
