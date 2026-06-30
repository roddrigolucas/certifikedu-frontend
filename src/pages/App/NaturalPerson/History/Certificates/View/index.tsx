import { BookOpen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/History/Students/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/legalPerson/certificates';

export default function HistoryCertificatesViewPage() {
  const { selectedPJ } = useProfile();
  const { id } = useParams();

  const { data, isLoading, isError } = useRequestProcessor().query(
    ['history_students', `PJ: ${selectedPJ?.pjId}`],
    async () =>
      await CertificateService.GetCertificateHistoryById(selectedPJ?.pjId ?? '', id ?? ''),
    {
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={BookOpen} title={`Histórico de emissões - Alunos`}>
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.history.certificates.list}>
          Voltar para Emissões
        </BackButton>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">{data?.templateName}</h1>
          <DataTable
            filterColumn="name"
            columns={columns}
            data={data?.receptors ?? []}
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
