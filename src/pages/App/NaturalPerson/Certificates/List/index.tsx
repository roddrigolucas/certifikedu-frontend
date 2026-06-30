import { ArchiveIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Dashboard/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import { useCertificatePJStore } from '@/stores/legalPerson/certificates';

import { cn } from '@/utils';

export default function CertificatesPageNaturalPerson() {
  const { isLoadingPJ, isUserEnabled } = useProfile();
  const { lastCertificates } = useCertificatePJStore();

  return (
    <ApplicationLayout icon={ArchiveIcon} title="Certificados Emitidos">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="certificateName"
          columns={columns}
          isLoading={isLoadingPJ}
          data={lastCertificates ?? []}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <Link
                to="/certificates/create"
                className={cn({
                  'pointer-events-none': !isUserEnabled,
                })}
              >
                <Button variant="success" disabled={!isUserEnabled} className="group" size="sm">
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Cadastrar Certificado
                </Button>
              </Link>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
