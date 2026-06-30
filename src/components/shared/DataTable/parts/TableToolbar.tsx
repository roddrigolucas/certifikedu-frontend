'use client';

import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';

import { TableFacetedFilter } from './TableFacetedFilter';
import { TableViewOptions } from './TableViewOptions';

interface TableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
  filterColumn: string;
}

export function TableToolbar<TData>({
  table,
  filterColumn,
  children,
}: Readonly<TableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const tableData = table.getRowModel().rows;
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2024, 0, 20),
  //   to: addDays(new Date(2024, 0, 20), 20),
  // });

  const certificateIssuerValues = tableData.map((row) => {
    return (row.original as { certificateIssuer: string }).certificateIssuer;
  });

  const uniqueIssuers = Array.from(new Set(certificateIssuerValues.map((issuer) => issuer))).map(
    (issuer) => ({ label: issuer, value: issuer }),
  );

  // const certificateIssuerAtValues = tableData.map((row) => {
  //   return (row.original as { certificateIssuer: string }).certificateIssuer;
  // });

  // const uniqueIssuersAt = Array.from(new Set(certificateIssuerValues.map((issuer) => issuer))).map(
  //   (issuer) => ({ label: issuer, value: issuer }),
  // );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-end gap-2 space-x-2">
        <div className="relative">
          <SearchIcon className="absolute inset-y-2 left-2 size-4 text-zinc-400" />
          <Input
            data-testId="search-input"
            placeholder="Pesquisar..."
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) || ''}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] pl-7 lg:w-[250px]"
          />
        </div>
        {/* {table.getColumn('certificateCreatedAt') && (
          <TableFacetedFilter
            column={table.getColumn('certificateCreatedAt')}
            title="Periodo de Emissão"
            options={
              table.getColumn('certificateCreatedAt')?.columns.map((column) => ({
                label: column.id,
                value: column.id,
              })) as { label: string; value: string }[]
            }
          />
        )} */}
        {uniqueIssuers.length > 1 && table.getColumn('certificateIssuer') && (
          <TableFacetedFilter
            column={table.getColumn('certificateIssuer')}
            title="Emissor"
            options={uniqueIssuers}
          />
        )}
        {/* {uniqueIssuers.length > 1 && table.getColumn('certificateCreatedAt') && (
          <TableFacetedFilter
            column={table.getColumn('certificateCreatedAt')}
            title="Emissor"
            options={uniqueIssuers}
          />
        )} */}
        {/* <div className={cn('grid gap-2')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                size="sm"
                className={cn(
                  'w-full h-8 justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
              />
            </PopoverContent>
          </Popover>
        </div> */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Resetar
            <Cross2Icon className="ml-1 size-4" />
          </Button>
        )}
      </div>
      <div className="inline-flex gap-2">
        {children}
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
