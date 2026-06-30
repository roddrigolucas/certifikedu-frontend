import { NotebookIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Admin/Plans/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useRequestProcessor from '@/hooks/core/useRequest';

import { PlansService } from '@/services/entities/app/core/plans';
import { IAdminPlans } from '@/services/entities/app/core/plans/model';

export default function AdminPlansPage() {
  const { data, isLoading } = useRequestProcessor().query<IAdminPlans>(
    ['admin', 'plans'],
    async () => await PlansService.GetPlans(),
  );

  return (
    <ApplicationLayout icon={NotebookIcon} title="Planos">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="planName"
          columns={columns}
          data={data?.plans ?? []}
          isLoading={isLoading}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <div className="inline-flex items-center gap-2">
                <Link to={pagePaths.authenticated.admin.plans.create}>
                  <Button variant="success" className="group" size="sm">
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Criar Plano
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
