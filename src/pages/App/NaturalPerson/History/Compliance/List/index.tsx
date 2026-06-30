import { ShieldPlus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Admin/Compliance/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { authApi } from '@/services/api/api';
import { AdminEnpoints } from '@/services/entities/app/admin/endpoints';
import { EAdminStatus } from '@/services/entities/app/admin/enum';
import { IAdmin } from '@/services/entities/app/admin/model';

interface IAuditLog {
  id: string;
  action: string;
  description: string;
  targetEntity: string;
  targetId: string;
  createdAt: string;
  actorEmail: string;
  actorType: string;
  metadata: any;
}

export default function HistoryComplianceListPage() {
  const { setIsAdminSelected } = useProfile();

  const { authenticated } = pagePaths;

  const [searchParameters] = useSearchParams();

  const userStatus = searchParameters.get('status') ?? EAdminStatus.ENABLED;

  const {
    data: auditLogs,
    isLoading,
    isError,
  } = useRequestProcessor().query<IAuditLog[]>(
    ['admin', 'audit-logs'],
    async () => {
      try {
        let profile: any = localStorage.getItem('profileStore');
        profile = JSON.parse(profile);
        const pjId = profile.state.selectedPJ.pjId;
        const response = await authApi.get(AdminEnpoints.GetLogsByPjId(pjId));

        return response.data.logs;
      } catch (error) {
        throw new Error('Error getting users');
      }
    },
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

  return (
    <ApplicationLayout icon={ShieldPlus} title="Compliance - Auditoria">
      <BackButton
        onClick={() => setIsAdminSelected(false)}
        href={authenticated.naturalPerson.dashboard}
      >
        Voltar para Dashboard
      </BackButton>

      <div className="flex flex-col gap-4">
        <DataTable
          // Ajuste o filterColumn para uma coluna que exista no log, como 'action' ou 'actorEmail'
          filterColumn="description"
          columns={columns} // Você precisará criar colunas específicas para Logs
          data={auditLogs ?? []}
          isLoading={isLoading}
          isError={isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            // Removi o seletor de Status de Usuário pois não se aplica a logs de auditoria
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
