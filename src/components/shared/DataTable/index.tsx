'use client';

import React, { Fragment } from 'react';

import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { HeadphonesIcon, RefreshCcwIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import useProfile from '@/hooks/core/useProfile';

import { getImageUrl } from '@/utils/image';

import { Button } from '../ui/button';
import { TablePagination } from './parts/TablePagination';
import { TableToolbar } from './parts/TableToolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<TData[], unknown>>;
  isLoading?: boolean;
  isError?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  filterColumn: string;
  headerOptions?: {
    filter?: boolean;
    toolbar?: boolean;
    children?: React.ReactNode;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  refetch,
  isLoading = false,
  isError = false,
  showHeader = true,
  showFooter = true,
  filterColumn,
  headerOptions = {
    filter: true,
    toolbar: true,
  },
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { profileData } = useProfile();

  const table = useReactTable({
    data,
    columns,
    pageCount: 50,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isWithResults = table.getRowModel().rows?.length && table.getRowModel().rows.length > 0;

  function Body() {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="w-full py-16 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <PuffLoader size="3rem" color="#64748B" />
              Buscando...
            </div>
          </TableCell>
        </TableRow>
      );
    }
    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="w-full py-16 text-center">
            <img
              src={getImageUrl('images/error/global.svg')}
              alt="global"
              className="h-36 w-full"
            />
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">Erro ao carregar</h5>
                <p className="text-slate-600">
                  Entre em contato com o suporte ou tente novamente mais tarde.
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
                {refetch && (
                  <Button
                    className="w-full md:w-fit"
                    variant="outline"
                    onClick={() => {
                      refetch();
                    }}
                  >
                    <RefreshCcwIcon className="mr-2 size-5" />
                    Tentar Novamente
                  </Button>
                )}
                <div className=" flex flex-col md:flex-row">
                  <Button
                    className="w-full md:w-fit"
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCcwIcon className="mr-2 size-5" />
                    Tentar Novamente
                  </Button>
                  <Link
                    to={pagePaths.unauthenticated.support(
                      profileData?.naturalPerson.name ?? '"SEU NOME"',
                      profileData?.naturalPerson.email ?? '"SEU E-MAIL"',
                    )}
                    target="_blank"
                    rel="noopener"
                    className="w-full md:w-fit"
                  >
                    <Button className="w-full md:w-fit" variant="secondary">
                      <HeadphonesIcon className="mr-2 size-5" /> Entrar em Contato
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (isWithResults) {
      return (
        <Fragment>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Fragment>
      );
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="w-full py-16 text-center">
          <img src={getImageUrl('images/empty/search.svg')} alt="search" className="h-36 w-full" />
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <h5 className="text-lg font-bold">Nenhum resultado encontrado</h5>
              <p className="text-slate-600">Sem resultados para mostrar...</p>
              {headerOptions.children}
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div className="space-y-4">
      {showHeader && headerOptions.filter && (
        <TableToolbar filterColumn={filterColumn} table={table}>
          {headerOptions.children}
        </TableToolbar>
      )}
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
            <Body />
          </TableBody>
        </Table>
        {showFooter && <TablePagination table={table} />}
      </div>
    </div>
  );
}
