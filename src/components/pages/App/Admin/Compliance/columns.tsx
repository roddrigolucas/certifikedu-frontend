'use client';

import { ColumnDef } from '@tanstack/react-table'; // Importe o tipo

import { Badge } from '@/components/shared/ui/badge';

// Defina a interface para o TypeScript saber o que tem dentro de "original"
export interface IAuditLog {
  actorEmail: string;
  action: string;
  description: string;
  targetEntity: string;
  createdAt: string;
  // adicione outros campos se necessário
}

export const columns: ColumnDef<IAuditLog>[] = [
  {
    accessorKey: 'actorEmail',
    header: 'Autor',
  },
  {
    accessorKey: 'action',
    header: 'Ação',
    // Agora o TS sabe que row.original é um IAuditLog
    cell: ({ row }) => <Badge>{row.original.action}</Badge>,
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'targetEntity',
    header: 'Entidade',
  },
];
