import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  let page = table.getState().pagination.pageIndex + 1;
  let limit = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center py-8 sm:justify-start">
      <div className="flex flex-col sm:flex-row sm:items-center  sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 30, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {page} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden min-w-12 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para inicio</span>
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="min-w-12 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para anterior</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="min-w-12 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para próximo</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden min-w-12 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para final</span>
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
