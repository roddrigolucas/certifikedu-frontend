import { ArchiveIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Core/Certificates/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { cn } from '@/utils';

export default function CertificatesPage() {
  const { profileCredits } = useProfile();
  const { isLoading, isError } = useCertificate();
  const { lastCertificates } = useCertificateStore();

  const balance = profileCredits?.monthSpentCredits ?? 0;
  const total =
    (profileCredits?.certificateCredits ?? 0) + (profileCredits?.additionalCertificateCredits ?? 0);

  const isBalanceEnough = balance < total;

  return (
    <ApplicationLayout icon={ArchiveIcon} title="Meus Certificados">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="certificateName"
          columns={columns}
          data={lastCertificates ?? []}
          isLoading={isLoading}
          isError={isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <Link
                to="/certificates/create"
                className={cn({
                  'pointer-events-none': !isBalanceEnough,
                })}
              >
                <Button variant="success" className="group" size="sm" disabled={!isBalanceEnough}>
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Criar Certificado
                </Button>
              </Link>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
