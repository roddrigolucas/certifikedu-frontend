'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';

import { IHistoryEmission } from '@/services/entities/app/legalPerson/certificates/types';

export const columns: ColumnDef<IHistoryEmission>[] = [
  {
    accessorKey: 'templateName',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome do Certificado" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <GraduationCap className="size-5" />

        <span className="font-semibold">{row.getValue('templateName')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'courseName',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome do Curso" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Data de Emissão" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'certificateSuccessEvents',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificados Emitidos" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'certificateFailedEvents',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificados Falhados" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'certificatePendingEvents',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificados Pendentes" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link
          to={pagePaths.authenticated.naturalPerson.history.certificates.view.replace(
            ':id',
            row.original?.emissionId ?? '',
          )}
        >
          <Button size="icon" variant="outline">
            <Eye className="size-5" />
          </Button>
        </Link>
      );
    },
  },
];
