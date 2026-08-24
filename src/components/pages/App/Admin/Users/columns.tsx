'use client';

import { ColumnDef } from '@tanstack/react-table';
import { cnpj as cnpjChecker, cpf as cpfChecker } from 'cpf-cnpj-validator';
import {
  CopyIcon,
  EditIcon,
  EyeIcon,
  GraduationCap,
  MoreVerticalIcon,
  UserIcon,
  Trash2Icon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { EAdminStatus } from '@/services/entities/app/admin/enum';
import { IAdmin } from '@/services/entities/app/admin/model';

import { buildAdminPageUrl } from '@/utils/url';
import useProfile from '@/hooks/core/useProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/services/entities/app/admin';
import { toast } from 'sonner';

const UserActionsCell = ({ row }: { row: any }) => {
  const { profileInfo } = useProfile();
  const queryClient = useQueryClient();

  const isAllowed = profileInfo?.email === 'r.lucas@fiemg.com.br';

  const { mutate: updateStatus } = useMutation({
    mutationFn: (status: EAdminStatus) => AdminService.UpdateUserStatus({ userToUpdateId: row.original.userId, status }),
    onSuccess: () => {
      toast.success('Status atualizado com sucesso!');
      queryClient.invalidateQueries(['admin', 'users']);
    },
    onError: () => toast.error('Erro ao atualizar status.'),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: () => AdminService.DeleteUser(row.original.userId),
    onSuccess: () => {
      toast.success('Usuário deletado com sucesso!');
      queryClient.invalidateQueries(['admin', 'users']);
    },
    onError: () => toast.error('Erro ao deletar usuário.'),
  });

  return (
    <TooltipProvider>
      <div className="inline-flex gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Link to={buildAdminPageUrl({ userId: row.original.userId, status: row.original.status })}>
              <Button variant="ghost" className="flex size-8 p-0 text-slate-600 hover:bg-ecstasy-50 hover:text-ecstasy-600">
                <EyeIcon className="size-4" />
                <span className="sr-only">Ver Usuário</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent><p>Ver Usuário</p></TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button disabled={!isAllowed} variant="ghost" className="flex size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                  <EditIcon className="size-4" />
                  <span className="sr-only">Editar Status</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent><p>Editar Status</p></TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => updateStatus(EAdminStatus.ENABLED)}><Badge variant="success">Ativo</Badge></DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus(EAdminStatus.DISABLED)}><Badge variant="destructive">Inativo</Badge></DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus(EAdminStatus.REVIEW)}><Badge variant="secondary">Em Revisão</Badge></DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus(EAdminStatus.ADMIN)}><Badge variant="default">Admin</Badge></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!isAllowed} variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-slate-100">
              <MoreVerticalIcon className="size-4" />
              <span className="sr-only">Abrir Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="inline-flex w-full gap-2 cursor-pointer" onClick={() => navigator.clipboard.writeText(row.original.email)}>
              <CopyIcon className="size-4" />
              Copiar Email
            </DropdownMenuItem>
            <DropdownMenuItem className="inline-flex w-full gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer" onClick={() => {
              if (window.confirm('Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.')) {
                deleteUser();
              }
            }}>
              <Trash2Icon className="size-4" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
};

export const columns: ColumnDef<IAdmin>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <TableColumnHeader column={column} title="Telefone" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => <TableColumnHeader column={column} title="Documento" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      if (cnpjChecker.isValid(row.getValue('document'))) {
        return cnpjChecker.format(row.getValue('document'));
      }

      return cpfChecker.format(row.getValue('document'));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      switch (row.getValue('status')) {
        case EAdminStatus.ENABLED:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="success">Ativo</Badge>
            </div>
          );
        case EAdminStatus.DISABLED:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="destructive">Inativo</Badge>
            </div>
          );
        case EAdminStatus.REVIEW:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="secondary">Review</Badge>
            </div>
          );
        default:
          return (
            <div className="inline-flex w-full items-center gap-2">
              <Badge variant="default">Admin</Badge>
            </div>
          );
      }
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <TableColumnHeader column={column} title="Tipo" />,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      switch (row.getValue('type')) {
        case 'PJ':
          return (
            <div className="inline-flex w-full items-center gap-2">
              <GraduationCap className="size-4" />
              Pessoa Juridica
            </div>
          );
        case 'PF':
          return (
            <div className="inline-flex w-full items-center gap-2">
              <UserIcon className="size-4" />
              Pessoa Fisica
            </div>
          );
        default:
          return 'Desconhecido';
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActionsCell row={row} />,
  },
];
