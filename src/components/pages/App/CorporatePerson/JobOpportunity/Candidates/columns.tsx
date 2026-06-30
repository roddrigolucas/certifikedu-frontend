'use client';

import { CheckBadgeIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import { User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';

import { Candidate } from '@/services/entities/app/corporatePerson/jobOpportunity/types';

function Params() {
  const { jobId } = useParams();

  return jobId;
}

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificado" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <User />
        <span className="font-semibold">{row.getValue('name')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'matchScore',
    header: ({ column }) => <TableColumnHeader column={column} title="Recomendação" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <CheckBadgeIcon className="size-6" fill="green" color="white" />
        <span className="font-semibold">{Number(row.getValue('matchScore')) * 20} % </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const jobId = Params();

      return (
        <Link
          to={pagePaths.authenticated.corporatePerson.candidate
            .replace(':jobId', jobId ?? '')
            .replace(':userId', row.original.id ?? '')}
        >
          <Button size="icon" variant="outline">
            <ChevronDoubleRightIcon className="size-5" />
          </Button>
        </Link>
      );
    },
  },
];
