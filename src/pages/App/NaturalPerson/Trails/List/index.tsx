import { Medal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Trails/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { TrailService } from '@/services/entities/app/legalPerson/trails';

import { cn } from '@/utils';

export default function TrailsListPage() {
  const { selectedPJ } = useProfile();

  const { data, isLoading, isError } = useRequestProcessor().query(
    ['trails', `PJ: ${selectedPJ?.pjId}`],
    async () => await TrailService.GetTrails(selectedPJ?.pjId ?? ''),
    {
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={Medal} title="Trilhas de Aprendizagem">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="name"
          columns={columns}
          data={data?.paths ?? []}
          isLoading={isLoading}
          isError={isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <Link
                className={cn({
                  'pointer-events-none': !!!true,
                })}
                to={`/trails/create`}
              >
                <Button data-testId="create-button" variant="success" className="group" size="sm">
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Criar Trilha de Aprendizagem
                </Button>
              </Link>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
