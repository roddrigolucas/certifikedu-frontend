'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, MoreVerticalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteAbilityDialog } from '@/pages/App/Admin/Abilities/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { IAbilityResponse } from '@/services/entities/app/core/abilities/model';

export const columns: ColumnDef<IAbilityResponse>[] = [
  {
    accessorKey: 'tema',
    header: ({ column }) => <TableColumnHeader column={column} title="Categoria" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'habilidade',
    header: ({ column }) => <TableColumnHeader column={column} title="Competência/Habilidade" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Origem" />,
    enableSorting: true,
    enableHiding: false,
    cell: () => {
      return (
        <div className="inline-flex w-full items-center gap-2">
          <Badge variant="secondary">Admin</Badge>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="inline-flex gap-2">
          <Tooltip disableHoverableContent>
            <TooltipTrigger>
              <Link to={`/admin/abilities/edit/${row.original.habilidadeId}`}>
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <EditIcon className="size-4" />
                  <span className="sr-only">Editar Habilidade</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Habilidade</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-slate-100">
                <MoreVerticalIcon className="size-4" />
                <span className="sr-only">Abrir Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem className="gap-2">
                <CopyIcon className="size-4" />
                Aprovar
              </DropdownMenuItem> */}
              <DeleteAbilityDialog id={row.original.habilidadeId} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    ),
  },
];
