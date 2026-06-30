'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, EyeIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteTrailDialog } from '@/pages/App/NaturalPerson/Trails/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { ITrails } from '@/services/entities/app/legalPerson/trails/types';

export const columns: ColumnDef<ITrails>[] = [
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
    accessorKey: 'totalHoursWorkload',
    header: ({ column }) => <TableColumnHeader column={column} title="Carga Horária" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'totalModules',
    header: ({ column }) => <TableColumnHeader column={column} title="Número de Módulos" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'totalStudents',
    header: ({ column }) => <TableColumnHeader column={column} title="Alunos Emitidos" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const trail = row.original;

      return (
        <>
          <TooltipProvider>
            <div className="inline-flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <Link to={`/trails/${trail.pathId}`}>
                    <Button
                      variant="ghost"
                      className="flex size-8 p-0 text-slate-600 hover:bg-ecstasy-50 hover:text-ecstasy-600"
                    >
                      <EyeIcon className="size-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visualizar Trilha</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testId="menu-button" variant="outline" className="size-8 p-0">
                    <span className="sr-only">Menu</span>
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col" align="end">
                  <Link to={`/trails/edit/${trail.pathId}`}>
                    <DropdownMenuItem
                      data-testId="edit-button"
                      onSelect={(event) => event.preventDefault()}
                      className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                    >
                      <EditIcon className="size-4" />
                      Editar
                    </DropdownMenuItem>
                  </Link>
                  <DeleteTrailDialog id={trail.pathId}>
                    <DropdownMenuItem
                      data-testId="delete-button"
                      onSelect={(event) => event.preventDefault()}
                      className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <Trash2Icon className="size-4" />
                      Deletar
                    </DropdownMenuItem>
                  </DeleteTrailDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </>
      );
    },
  },
];
