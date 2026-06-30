'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import {
  IAbilityCertificate,
  ICertificate,
} from '@/services/entities/app/naturalPerson/certificates/model';

import { getImageUrl } from '@/utils/image';

export const columns: ColumnDef<ICertificate>[] = [
  {
    accessorKey: 'certificateName',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificado" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <img src={getImageUrl('images/badge.svg')} alt="Billing" className="size-8" />
        <span className="font-semibold">{row.getValue('certificateName')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'certificateAbilities',
    header: ({ column }) => <TableColumnHeader column={column} title="Competências/Habilidades" />,
    cell: ({ row }) => {
      const values = row.getValue<IAbilityCertificate[]>('certificateAbilities');
      const valuesFiltered = [...new Set(values.map((ability) => ability.category))];

      return (
        <div className="flex w-full flex-col gap-1">
          {valuesFiltered.length === 0 && (
            <span className="text-muted-foreground/75">Sem Competências/Habilidades</span>
          )}
          {valuesFiltered.slice(0, 3).map((ability, index) => (
            <Badge key={index} variant="outline" className="w-fit">
              {ability}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'certificateIssuer',
    header: ({ column }) => <TableColumnHeader column={column} title="Emissor" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <Avatar className="size-9">
          <AvatarFallback className="bg-slate-100 text-slate-600">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{row.getValue('certificateIssuer')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'certificateCreatedAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Data de Emissão" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Link to={`/certificates/view/${row.original.certificateId}`}>
        <Button size="icon" variant="outline">
          <EyeIcon className="size-5" />
        </Button>
      </Link>
    ),
  },
];
