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
import { Plus, SendIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { columns } from '@/components/pages/App/NaturalPerson/Courses/Students/columns';
import { TablePagination } from '@/components/shared/DataTable/parts';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Input } from '@/components/shared/ui/input';
import { Label } from '@/components/shared/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import useProfile from '@/hooks/core/useProfile';

import { IStudentIssuerCourse } from '@/services/entities/app/legalPerson/students/model';
import { EPictureStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

import { IssuerUserDialog } from '../Dialogs/IssuerDialog';

interface DataTableProps {
  data: IStudentIssuerCourse[];
}

export function DataTableCourseStudents({ data }: Readonly<DataTableProps>) {
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
  const isENABLED =
    profileInfo?.status !== EPictureStatus.DISABLED &&
    profileInfo?.status !== EPictureStatus.REVIEW;

  const selectedRowIds = table.getSelectedRowModel().flatRows.map((row) => row.original);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col py-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2 lg:flex-row">
            <div>
              <Label>CPF</Label>
              <Input
                placeholder="Filtrar CPF..."
                value={(table.getColumn('document')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('document')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
            <div>
              <Label>Nome</Label>
              <Input
                placeholder="Filtrar Nome..."
                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="mt-5 inline-flex gap-4 lg:ml-auto lg:mt-auto">
            <IssuerUserDialog users={selectedRowIds}>
              <Button
                data-testId="emission-button"
                variant="success"
                className="group"
                size="sm"
                disabled={selectedRowIds.length < 1}
              >
                <SendIcon className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                Emitir para alunos selecionados
              </Button>
            </IssuerUserDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto hidden xl:flex">
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
                      <TableHead key={header.id} data-testId={header.id}>
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
                          Você ainda não possuí nenhum aluno nesse curso
                        </h5>
                        <p className="text-slate-600">Cadastre seu primeiro aluno desse curso...</p>
                        <Link
                          className={cn({ 'pointer-events-none': !isENABLED })}
                          to="/students/create"
                        >
                          <Button
                            disabled={!isENABLED}
                            variant="success"
                            className="group"
                            size="sm"
                          >
                            <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                            Cadastrar Aluno
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
          <TablePagination table={table} />
        </div>
      </div>
    </>
  );
}
