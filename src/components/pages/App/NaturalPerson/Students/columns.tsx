'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { EyeIcon, MoreVerticalIcon, Trash2Icon, UserIcon } from 'lucide-react';

import { DeleteStudentDialog } from '@/pages/App/NaturalPerson/Students/Dialogs/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { IStudent } from '@/services/entities/app/legalPerson/students/model';

export const columns: ColumnDef<IStudent>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => <TableColumnHeader column={column} title="CPF" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      if (cnpjChecker.isValid(row.getValue('document'))) {
        return cnpjChecker.format(row.getValue('document'));
      }

      return cpfChecker.format(row.getValue('document'));
    },
  },
  {
    accessorKey: 'certificateQty',
    header: ({ column }) => <TableColumnHeader column={column} title="Nº de Certificados" />,
    enableSorting: true,
    enableHiding: false,
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
    enableHiding: true,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const Student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testId="menu-button" variant="outline" className="size-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col" align="end">
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
            >
              <EyeIcon className="size-4" />
              Visualizar
            </DropdownMenuItem>
            <DeleteStudentDialog student={Student}>
              <DropdownMenuItem
                data-testId="delete-button"
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <Trash2Icon className="size-4" />
                Deletar
              </DropdownMenuItem>
            </DeleteStudentDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
