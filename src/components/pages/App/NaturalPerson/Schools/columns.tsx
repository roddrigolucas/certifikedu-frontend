'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import { BookOpen, EditIcon, GraduationCapIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteSchoolDialog } from '@/pages/App/NaturalPerson/Schools/Dialogs/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { ISchool } from '@/services/entities/app/legalPerson/school/model';

export const columns: ColumnDef<ISchool>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <span className="font-semibold">{row.getValue('name')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => <TableColumnHeader column={column} title="Documento" />,
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
    accessorKey: 'description',
    header: ({ column }) => <TableColumnHeader column={column} title="Descrição" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const School = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testId="menu-button" variant="outline" className="size-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col" align="end">
            {/* <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
            >
              <EyeIcon className="size-4" />
              Visualizar
            </DropdownMenuItem> */}
            <Link to={`/schools/edit/${School.id}`}>
              <DropdownMenuItem
                data-testId="edit-button"
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
              >
                <EditIcon className="size-4" />
                Editar
              </DropdownMenuItem>
            </Link>
            <Link to={`/schools/${School.id}/students`}>
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
              >
                <GraduationCapIcon className="size-4" />
                Gerenciar Alunos
              </DropdownMenuItem>
            </Link>
            <Link to={`/schools/${School.id}/courses`}>
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
              >
                <BookOpen className="size-4" />
                Gerenciar Cursos
              </DropdownMenuItem>
            </Link>
            <DeleteSchoolDialog id={School.id}>
              <DropdownMenuItem
                data-testId="delete-button"
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <Trash2Icon className="size-4" />
                Deletar
              </DropdownMenuItem>
            </DeleteSchoolDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
