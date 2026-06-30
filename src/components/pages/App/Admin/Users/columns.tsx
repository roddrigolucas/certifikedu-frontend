'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import {
  CopyIcon,
  EditIcon,
  EyeIcon,
  GraduationCap,
  MoreVerticalIcon,
  UserIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

import { EAdminStatus } from '@/services/entities/app/admin/enum';
import { IAdmin } from '@/services/entities/app/admin/model';

import { buildAdminPageUrl } from '@/utils/url';

export const columns: ColumnDef<IAdmin>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <TableColumnHeader column={column} title="Telefone" />,
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
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      switch (row.getValue('status')) {
        case EAdminStatus.ENABLED:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="success">Ativo</Badge>
            </div>
          );
        case EAdminStatus.DISABLED:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="destructive">Inativo</Badge>
            </div>
          );
        case EAdminStatus.REVIEW:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="secondary">Review</Badge>
            </div>
          );
        default:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="default">Admin</Badge>
            </div>
          );
      }
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <TableColumnHeader column={column} title="Tipo" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      switch (row.getValue('type')) {
        case 'PJ':
          return (
            <div className="inline-flex w-full items-center gap-2">
              <GraduationCap className="size-4" />
              Pessoa Juridica
            </div>
          );
        case 'PF':
          return (
            <div className="inline-flex w-full items-center gap-2">
              <UserIcon className="size-4" />
              Pessoa Fisica
            </div>
          );
        default:
          return 'Desconhecido';
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="inline-flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Link
                to={buildAdminPageUrl({ userId: row.original.userId, status: row.original.status })}
              >
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 text-slate-600 hover:bg-ecstasy-50 hover:text-ecstasy-600"
                >
                  <EyeIcon className="size-4" />
                  <span className="sr-only">Ver Usuário</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver Usuário</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                disabled
                variant="ghost"
                className="flex size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                <EditIcon className="size-4" />
                <span className="sr-only">Editar Usuário</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Usuário</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-slate-100"
              >
                <MoreVerticalIcon className="size-4" />
                <span className="sr-only">Abrir Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="inline-flex w-full gap-2">
                <CopyIcon className="size-4" />
                Copiar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    ),
  },
];
