'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';

import { IStudentIssuerCourse } from '@/services/entities/app/legalPerson/students/model';

export const columns: ColumnDef<IStudentIssuerCourse>[] = [
  {
    accessorKey: 'name',
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
    accessorKey: 'isTemp',
    header: ({ column }) => <TableColumnHeader column={column} title="Cadastro Confirmado" />,
    cell: ({ row }) => {
      switch (row.getValue('isTemp')) {
        case true:
          return <Badge variant="destructive">Não Verificado</Badge>;
        case false:
          return <Badge variant="success">Verificado</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: false,
  },
];
