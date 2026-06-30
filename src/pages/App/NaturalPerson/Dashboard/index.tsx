import { AirplayIcon, ArrowUpDownIcon, FileBadgeIcon, GraduationCapIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Dashboard/columns';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { AlertAdmin } from '@/components/shared/Alerts/AlertAdmin';
import { AlertDocumentPicture } from '@/components/shared/Alerts/AlertDocumentPicture';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useCertificatePJ from '@/hooks/core/useCertificatePJ';
import useProfile from '@/hooks/core/useProfile';
import { useCertificatePJStore } from '@/stores/legalPerson/certificates';

export default function DashboardPJPage() {
  const { isLoadingPJ, isUserEnabled, profilePJ } = useProfile();
  const { lastCertificates } = useCertificatePJStore();
  const { lastCertificatesState } = useCertificatePJ();

  return (
    <ApplicationLayout icon={AirplayIcon} title="Meu Painel" isPageLoading={isLoadingPJ}>
      <div className="flex flex-col gap-4">
        {!isUserEnabled && <AlertDocumentPicture />}
        <AlertAdmin />
      </div>

      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        <CardInformation
          title="Certificados Emitidos"
          value={profilePJ?.emmitedCertificatesQty.toString()}
          icon={ArrowUpDownIcon}
          isLoading={isLoadingPJ}
        />
        <CardInformation
          title="Número de Alunos"
          value={profilePJ?.studentsQty.toString()}
          icon={GraduationCapIcon}
          isLoading={isLoadingPJ}
        />
        <CardInformation
          title="Certificados Cadastrados"
          value={profilePJ?.createdCertificatesQty.toString()}
          icon={FileBadgeIcon}
          isLoading={isLoadingPJ}
        />
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <DataTable
          filterColumn="certificateName"
          headerOptions={{
            filter: true,
            toolbar: false,
            children: (
              <div className="flex flex-col gap-2 lg:flex-row">
                <Link to="/certificates/create">
                  <Button
                    data-testId="certificate-button"
                    variant="success"
                    className="group"
                    size="sm"
                  >
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Cadastrar Certificado
                  </Button>
                </Link>
              </div>
            ),
          }}
          showFooter={false}
          columns={columns}
          data={lastCertificates ?? []}
          isLoading={lastCertificatesState.isLoading}
          isError={lastCertificatesState.isError}
        />
      </div>
    </ApplicationLayout>
  );
}
