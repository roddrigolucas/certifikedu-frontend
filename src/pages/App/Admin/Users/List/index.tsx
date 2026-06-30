import { useState } from 'react';

import { DocumentCheckIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircleIcon,
  EyeIcon,
  MailIcon,
  Plug,
  Plus,
  SearchCheckIcon,
  Trash2Icon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import AdminCertificatesPage from '@/pages/App/Admin/Certificates';
import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Admin/Users/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
import { GridIconItem } from '@/components/shared/GridIconItem';
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

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { AdminService } from '@/services/entities/app/admin';
import { EAdminStatus } from '@/services/entities/app/admin/enum';
import {
  IAdmin,
  IShowDocumentImageResponse,
  IUpdateUserInfo,
} from '@/services/entities/app/admin/model';
import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';

import { determineBadgeVariant } from '@/utils/setBadgeVariant';
import { buildAdminPageUrl } from '@/utils/url';

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const { setIsAdminSelected } = useProfile();
  const queryClient = useQueryClient();

  const { authenticated } = pagePaths;

  const [searchParameters] = useSearchParams();
  const [imageBuffer, setImageBuffer] = useState<string | undefined>(undefined);

  const userId = searchParameters.get('userId')!;

  const userStatus = searchParameters.get('status') ?? EAdminStatus.ENABLED;

  const {
    data: getAllUsersByStatus,
    isLoading,
    isError,
  } = useRequestProcessor().query<IAdmin[]>(
    ['admin', 'users', userStatus],
    async () => await AdminService.GetAllUserAdmin({ status: userStatus }),
    {
      enabled: !!userStatus,
      onSuccess: (data: IAdmin[]) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const { mutate: showDocumentPicture, isLoading: isLoadingPicture } = useMutation<
    IShowDocumentImageResponse,
    Error,
    string
  >((id: string) => AdminService.GetDocPicById(id));

  const handleShowDocumentPicture = ({ id }: { id: string }) => {
    showDocumentPicture(id, {
      onSuccess: (data: IShowDocumentImageResponse) => {
        setImageBuffer(data.buffer);
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    });
  };

  const { mutate: updateUserInfo } = useMutation<unknown, Error, IUpdateUserInfo>(
    ({ userToUpdateId, status }) => AdminService.UpdateUserStatus({ userToUpdateId, status }),
  );

  const handleApproveUser = (status: string) => {
    updateUserInfo(
      { userToUpdateId: userId, status: status },
      {
        onSuccess: () => {
          navigate(buildAdminPageUrl({ status: status, userId: userId }));
        },
        onError: (error: any) => {
          toast.error(`${error}`);
        },
      },
    );
  };

  const specificUser: IAdmin | undefined = getAllUsersByStatus?.find(
    (user) => user.userId === userId,
  );

  const isStatusApiEnable = specificUser?.apiEnabled ?? false;

  // ANCHOR - Integration API toggle
  const { mutate: toggleUserApi, isLoading: isLoadingToggleApi } = useMutation<
    unknown,
    Error,
    { id: string; enable: boolean }
  >(({ id, enable }) =>
    enable ? LegalPersonService.EnableUserApi(id) : LegalPersonService.DisableUserApi(id),
  );

  const toggleUserApiHandler = (id: string) => {
    toggleUserApi(
      { id, enable: !isStatusApiEnable },
      {
        onSuccess: () => {
          toast.success(
            `API ${!isStatusApiEnable ? 'habilitada' : 'desabilitada'} para usuário com sucesso.`,
            { duration: 2000 },
          );

          queryClient.invalidateQueries(['admin', 'users', userStatus]);
        },
        onError: () => {
          toast.error(
            `Erro ao ${!isStatusApiEnable ? 'habilitar' : 'desabilitar'} a API para o usuário. Por favor, tente novamente.`,
            { duration: 3000 },
          );
        },
      },
    );
  };

  return (
    <ApplicationLayout icon={UsersIcon} title="Usuários">
      <BackButton
        onClick={() => setIsAdminSelected(false)}
        href={authenticated.naturalPerson.dashboard}
      >
        Voltar para Ambiente Normal
      </BackButton>
      {!userId && (
        <div className="flex flex-col gap-4">
          {userStatus && (
            <DataTable
              filterColumn="email"
              columns={columns}
              data={getAllUsersByStatus ?? []}
              isLoading={isLoading}
              isError={isError}
              headerOptions={{
                filter: true,
                toolbar: true,
                children: (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline" size="sm">
                        <SearchCheckIcon className="mr-1 size-4" />
                        Selecionar Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(buildAdminPageUrl({ status: EAdminStatus.ENABLED }))
                        }
                      >
                        <Badge variant="success">Ativo</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(buildAdminPageUrl({ status: EAdminStatus.DISABLED }))
                        }
                      >
                        <Badge variant="destructive">Inativo</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(buildAdminPageUrl({ status: EAdminStatus.REVIEW }))}
                      >
                        <Badge variant="secondary">Em Revisão</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(buildAdminPageUrl({ status: EAdminStatus.ADMIN }))}
                      >
                        <Badge variant="default">Admin</Badge>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ),
              }}
            />
          )}
        </div>
      )}
      {userId && (
        <div className="flex flex-col gap-2">
          <BackButton
            href={buildAdminPageUrl({ status: userStatus })}
            onClick={() => setImageBuffer(undefined)}
          >
            Voltar para Usuários
          </BackButton>
          <div className="grid grid-cols-12 gap-8 py-8">
            <GridIconItem icon={UserIcon} title="Nome">
              {specificUser?.name}
            </GridIconItem>
            <GridIconItem icon={MailIcon} title="E-mail">
              {specificUser?.email || 'E-mail desconhecido'}
            </GridIconItem>
            <GridIconItem icon={DocumentIcon} title="Documento">
              {specificUser?.document}
            </GridIconItem>
            <GridIconItem icon={DocumentCheckIcon} title="Status Documento">
              <Badge
                variant={determineBadgeVariant(specificUser?.status)}
                className="text-base font-bold"
              >
                {specificUser?.status}
              </Badge>
            </GridIconItem>
            <GridIconItem icon={CheckCircleIcon} title="Status Geral">
              <p
                className={`${specificUser?.pictureId ? 'text-emerald-500' : 'text-red-500'} font-bold`}
              >
                {specificUser?.pictureId ? 'Documento Enviado' : 'Não enviou documento'}
              </p>
            </GridIconItem>
          </div>

          <div className="inline-flex gap-2">
            <Button
              disabled={!!imageBuffer || !specificUser?.pictureId}
              isLoading={isLoadingPicture}
              onClick={() =>
                handleShowDocumentPicture({ id: specificUser?.pictureId ?? 'defaultId' })
              }
              type="submit"
              variant="outline"
              className="w-full md:w-fit"
            >
              <EyeIcon className="mr-2 size-5" />
              Ver Documento
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger disabled={specificUser?.status === EAdminStatus.ADMIN}>
                <Button variant="secondary" className="group">
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Trocar Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleApproveUser(EAdminStatus.ENABLED)}>
                  <Badge variant="success">Ativo</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleApproveUser(EAdminStatus.DISABLED)}>
                  <Badge variant="destructive">Inativo</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleApproveUser(EAdminStatus.REVIEW)}>
                  <Badge variant="secondary">Em Revisão</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleApproveUser(EAdminStatus.ADMIN)}>
                  <Badge variant="default">Admin</Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {specificUser?.type == 'PJ' && (
              <Button
                isLoading={isLoadingToggleApi}
                onClick={() => toggleUserApiHandler(userId)}
                type="submit"
                variant="success"
                className="w-full md:w-fit"
              >
                <Plug className="mr-2 size-5" />
                {isStatusApiEnable ? 'Desativar API de integração' : 'Ativar API de integração'}
              </Button>
            )}
          </div>
          <div className="py-16">
            <AdminCertificatesPage />
          </div>
          {!!imageBuffer && (
            <div className="mx-auto flex max-w-screen-lg flex-col">
              <div className="flex justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setImageBuffer(undefined)}
                  className="hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
              <img src={`data:image/jpeg;base64,${imageBuffer}`} alt="gallery" className="" />
            </div>
          )}
        </div>
      )}
    </ApplicationLayout>
  );
}
