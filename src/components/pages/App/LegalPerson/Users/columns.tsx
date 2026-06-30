import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2Icon } from 'lucide-react';

import { DeleteUserDialog } from '@/pages/App/LegalPerson/Users/View/Dialogs/DeleteUserDialog';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { EAdminStatus } from '@/services/entities/app/admin/enum';

import { determineBadgeVariant } from '@/utils/setBadgeVariant';

type UsersPJInfo = {
  adminId: any;
  createdAt: string;
  updatedAt: string;
  role: string;
  environment: string;
};

export type UsersPJ = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  document: string;
  status: string;
  pjRoles: UsersPJInfo[];
};

type RoleType = 'basico' | 'medio' | 'admin' | 'institutional' | 'corporate';

const mapValues: Record<RoleType, string> = {
  basico: 'Básico',
  medio: 'Intermediário',
  admin: 'Máximo',
  institutional: 'Educacional',
  corporate: 'Corporativo',
};

export const columns: ColumnDef<UsersPJ>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => <TableColumnHeader column={column} title="Documento" />,
    cell: ({ row }) => <div>{row.getValue('document')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status da Conta" />,
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
          return <Badge variant="success">Verificado</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'pjRoles',
    header: ({ column }) => <TableColumnHeader column={column} title="Nível de acesso" />,
    cell: ({ row }) => {
      const pjRoles = row.getValue('pjRoles') as UsersPJInfo[];

      return (
        <>
          {pjRoles.map((role) => (
            <div className="mb-2" key={role.createdAt}>
              <Badge variant="outline">
                {mapValues[role.environment as RoleType]} - {mapValues[role.role as RoleType]}
              </Badge>
            </div>
          ))}
        </>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // const UsersPJ = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col" align="end">
            {/* <div className="inline-flex">
              <FilePenLine className="mt-2" size={16} />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(UsersPJ.email)}>
                Editar
              </DropdownMenuItem>
            </div>
            <div className="inline-flex">
              <PermissionUserDialog listOfUsers={[row.original]}>
                <DropdownMenuItem
                  onSelect={(event) => event.preventDefault()}
                  className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                >
                  <UserSearch className="size-4" />
                  Alterar Nível de acesso
                </DropdownMenuItem>
              </PermissionUserDialog>
            </div> */}
            <div className="">
              <DeleteUserDialog listOfUsers={[row.original]}>
                <DropdownMenuItem
                  onSelect={(event) => event.preventDefault()}
                  className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <Trash2Icon className="size-4" />
                  Remover
                </DropdownMenuItem>
              </DeleteUserDialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
