'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, MoreVerticalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteEmailDialog } from '@/pages/App/Admin/Emails/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { IEmail } from '@/services/entities/app/admin/model';

export const columns: ColumnDef<IEmail>[] = [
  {
    accessorKey: 'templateName',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => <TableColumnHeader column={column} title="Assunto" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'variablesNames',
    header: ({ column }) => <TableColumnHeader column={column} title="Variáveis" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'types',
    header: ({ column }) => <TableColumnHeader column={column} title="Tipo" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="inline-flex gap-2">
          <Tooltip disableHoverableContent>
            <TooltipTrigger>
              <Link to={`/admin/emails/edit/${row.original.emailId}`}>
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <EditIcon className="size-4" />
                  <span className="sr-only">Editar Email</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Email</p>
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
              <DeleteEmailDialog id={row.original.emailId} isDeletable={row.original.deletable} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    ),
  },
];
