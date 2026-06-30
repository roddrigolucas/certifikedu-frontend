'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Plus, UserIcon } from 'lucide-react';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { AdminService } from '@/services/entities/app/admin';
import { EAdminStatus } from '@/services/entities/app/admin/enum';
import {
  IAbilityCertificate,
  ICertificate,
} from '@/services/entities/app/naturalPerson/certificates/model';

import { getImageUrl } from '@/utils/image';
import { determineBadgeVariant } from '@/utils/setBadgeVariant';

export const columns: ColumnDef<ICertificate>[] = [
  {
    accessorKey: 'certificateName',
    header: ({ column }) => <TableColumnHeader column={column} title="Certificado" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <img src={getImageUrl('images/badge.svg')} alt="badge" className="size-8" />
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
    enableHiding: true,
  },
  {
    accessorKey: 'certificateIssuer',
    header: ({ column }) => <TableColumnHeader column={column} title="Emissor" />,
    enableSorting: true,
    enableHiding: true,
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'certificateCreatedAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Data de Emissão" />,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      switch (row.getValue('status')) {
        case EAdminStatus.ENABLED:
          return <Badge variant={determineBadgeVariant(row.getValue('status'))}>Verificado</Badge>;
        case EAdminStatus.DISABLED:
          return (
            <Badge variant={determineBadgeVariant(row.getValue('status'))}>Não autorizado</Badge>
          );
        case EAdminStatus.REVIEW:
          return <Badge variant={determineBadgeVariant(row.getValue('status'))}>Em revisão</Badge>;
        default:
          return <Badge variant={determineBadgeVariant(row.getValue('status'))}>Deletado</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="outline">
              <Plus className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                AdminService.UpdateCertificatesById({
                  certificateId: row.original.certificateId,
                  status: EAdminStatus.ENABLED,
                });
              }}
            >
              <Badge variant="success">Ativo</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                AdminService.UpdateCertificatesById({
                  certificateId: row.original.certificateId,
                  status: EAdminStatus.DISABLED,
                });
              }}
            >
              <Badge variant="destructive">Inativo</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                AdminService.UpdateCertificatesById({
                  certificateId: row.original.certificateId,
                  status: EAdminStatus.REVIEW,
                });
              }}
            >
              <Badge variant="secondary">Em Revisão</Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ),
  },
];
