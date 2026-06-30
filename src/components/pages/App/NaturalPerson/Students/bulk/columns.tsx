'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { UserIcon } from 'lucide-react';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';

import { IStudentBulk } from '@/services/entities/app/legalPerson/students/model';

export const columns: ColumnDef<IStudentBulk>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <Avatar className="size-9">
          <AvatarFallback className="bg-slate-100 text-slate-600">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{row.getValue('nome')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="E-mail" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'documento',
    header: ({ column }) => <TableColumnHeader column={column} title="CPF" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      if (cpfChecker.isValid(row.getValue('documento'))) {
        return cpfChecker.format(row.getValue('documento'));
      }

      return <div className="text-red-500">{cpfChecker.format(row.getValue('documento'))}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <TableColumnHeader column={column} title="Telefone" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'isValid',
    header: ({ column }) => <TableColumnHeader column={column} title="Valido" />,
    cell: ({ row }) => {
      switch (row.getValue('isValid')) {
        case true:
          return <Badge variant="success">Válido</Badge>;
        case false:
          return <Badge variant="destructive">Inválido</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'error',
    header: ({ column }) => <TableColumnHeader column={column} title="Erro" />,
    enableSorting: true,
    enableHiding: false,
  },
];
