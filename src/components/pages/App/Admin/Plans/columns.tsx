'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CopyIcon, EditIcon, MoreVerticalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeletePlanDialog } from '@/pages/App/Admin/Plans/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Badge } from '@/components/shared/ui/badge';
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

import { IPlan } from '@/services/entities/app/core/plans/model';

export const columns: ColumnDef<IPlan>[] = [
  {
    accessorKey: 'planName',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'emittedCertificatesQuota',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificados Emitidos" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'receivedCertificateQuota',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificados Recebidos" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <TableColumnHeader column={column} title="Preço" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) =>
      ((row.getValue('price') as number) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  },
  {
    accessorKey: 'isDefault',
    header: ({ column }) => <TableColumnHeader column={column} title="Padrão" />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      if (row.getValue('isDefault')) {
        return (
          <div className="inline-flex w-full items-center gap-2">
            <Badge variant="success">Ativo</Badge>
          </div>
        );
      }

      return (
        <div className="inline-flex w-full items-center gap-2">
          <Badge variant="outline">Não definido</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Criado em" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString('pt-BR'),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="inline-flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Link to={`/admin/plans/edit/${row.original.planId}`}>
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <EditIcon className="size-4" />
                  <span className="sr-only">Editar Plano</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Plano</p>
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
              <DropdownMenuItem className="inline-flex w-full gap-2">
                <CopyIcon className="size-4" />
                Copiar
              </DropdownMenuItem>
              <DeletePlanDialog id={row.original.planId} plan={row.original} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    ),
  },
];
