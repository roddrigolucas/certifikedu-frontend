'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

interface TableViewOptionsProps<TData> {
  table: Table<TData>;
}

function renameColumns(colunas: string) {
  switch (colunas) {
    case 'certificateAbilities':
      return 'Competências';
    case 'certificateIssuer':
      return 'Emissor';
    case 'certificateCreatedAt':
      return 'Data de Emissão';
    default:
      return colunas;
  }
}

export function TableViewOptions<TData>({ table }: Readonly<TableViewOptionsProps<TData>>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden lg:flex">
          <MixerHorizontalIcon className="mr-2 size-4" />
          Visualizar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Esconder colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {renameColumns(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
