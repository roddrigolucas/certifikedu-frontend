import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/History/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/legalPerson/certificates';

export default function HistoryCertificatesListPage() {
  const { selectedPJ } = useProfile();

  const { data, isLoading, isError } = useRequestProcessor().query(
    ['history_certificates', `PJ: ${selectedPJ?.pjId}`],
    async () => await CertificateService.GetCertificateHistory(selectedPJ?.pjId ?? ''),
    {
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={BookOpen} title={`Histórico de emissões`}>
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.dashboard}>
          Voltar para Meu Painel
        </BackButton>
        <div className="flex flex-col gap-4">
          <DataTable
            filterColumn="templateName"
            columns={columns}
            data={data ?? []}
            isLoading={isLoading}
            isError={isError}
            headerOptions={{
              filter: true,
              toolbar: true,
            }}
          />
        </div>
      </div>
    </ApplicationLayout>
  );
}
