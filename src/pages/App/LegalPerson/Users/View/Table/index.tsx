'use client';

import * as React from 'react';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Plus, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { columns, UsersPJ } from '@/components/pages/App/LegalPerson/Users/columns';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Input } from '@/components/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import useProfile from '@/hooks/core/useProfile';

import { EPictureStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

import { DeleteUserDialog } from '../Dialogs/DeleteUserDialog';

interface DataTableProps {
  data: UsersPJ[];
}

export function DataTableLegalPerson({ data }: Readonly<DataTableProps>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const { profileInfo } = useProfile();
  const isENABLED = profileInfo?.status === EPictureStatus.ENABLED;

  const selectedRowIds = table.getSelectedRowModel().flatRows.map((row) => row.original);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          {selectedRowIds.length === 0 && (
            <Input
              placeholder="Filter emails..."
              value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          )}
          {selectedRowIds.length > 0 && (
            <>
              <DeleteUserDialog listOfUsers={selectedRowIds}>
                <Button
                  className="gap-2  hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                  variant="ghost"
                >
                  <Trash2Icon className="size-4" />
                  Remover
                </Button>
              </DeleteUserDialog>
              {/* <PermissionUserDialog listOfUsers={selectedRowIds}>
                <Button
                  className="gap-2  hover:bg-blue-zodiac-200 hover:text-blue-zodiac-600 focus:bg-blue-zodiac-200 focus:text-blue-zodiac-600"
                  variant="ghost"
                >
                  <PencilLine className="size-4" />
                  Mudar Nível(s)
                </Button>
              </PermissionUserDialog> */}
            </>
          )}
          <div className="ml-auto inline-flex gap-4">
            <Link className={cn({ 'pointer-events-none': !isENABLED })} to="/users/create">
              <Button
                data-testId="create-button"
                variant="success"
                className="group"
                size="sm"
                disabled={!isENABLED}
              >
                <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                Cadastrar Colaborador
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto hidden lg:flex">
                  <MixerHorizontalIcon className="mr-2 size-4" />
                  Visualizar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="w-full py-16 text-center">
                      <img
                        src={getImageUrl('images/empty/search.svg')}
                        alt="search"
                        className="h-24 w-full"
                      />
                      <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-bold">
                          Você ainda não possuí nenhum colaborador
                        </h5>
                        <p className="text-slate-600">Cadastre seu primeiro usuário...</p>
                        <Link
                          className={cn({ 'pointer-events-none': !isENABLED })}
                          to="/users/create"
                        >
                          <Button
                            disabled={!isENABLED}
                            variant="success"
                            className="group"
                            size="sm"
                          >
                            <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                            Cadastrar Colaborador
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} usuários(s) selecionadas.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Pŕoxima
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
