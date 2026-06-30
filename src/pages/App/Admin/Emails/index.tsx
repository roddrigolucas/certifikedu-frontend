import { Mail, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Admin/Emails/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import { useGalleryContext } from '@/hooks/core/useGallery';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { AdminService } from '@/services/entities/app/admin';
import { IEmail } from '@/services/entities/app/admin/model';

export default function AdmimEmailsPage() {
  const { setEmailValue } = useGalleryContext();

  const { authenticated } = pagePaths;
  const { setIsAdminSelected, isAdmin } = useProfile();

  const { data, isLoading, isError } = useRequestProcessor().query<IEmail[]>(
    ['admin', 'emails'],
    async () => await AdminService.GetAllEmailTemplate(),
    {
      enable: isAdmin ?? false,
      onSuccess: (data: IEmail[]) => {
        setEmailValue(data);

        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={Mail} title="Modelos de Emails">
      <BackButton
        onClick={() => setIsAdminSelected(false)}
        href={authenticated.naturalPerson.dashboard}
      >
        Voltar para Ambiente Normal
      </BackButton>

      <div className="flex flex-col gap-2">
        <DataTable
          filterColumn="templateName"
          columns={columns}
          data={data ?? []}
          isLoading={isLoading}
          isError={isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <div className="inline-flex items-center gap-2">
                <Link to={pagePaths.authenticated.admin.emails.create}>
                  <Button variant="success" className="group" size="sm">
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Criar Email
                  </Button>
                </Link>
              </div>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
