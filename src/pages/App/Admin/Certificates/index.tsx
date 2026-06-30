import { Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { columns } from '@/components/pages/App/Admin/Certificates/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useRequestProcessor from '@/hooks/core/useRequest';

import { AdminService } from '@/services/entities/app/admin';

export default function AdminCertificatesPage() {
  const [searchParameters] = useSearchParams();

  const userId = searchParameters.get('userId')!;

  const { data, isLoading } = useRequestProcessor().query(
    ['admin'],
    async () => await AdminService.GetAllCertificatesById(userId),
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
    <>
      {/* <ToggleGroup type="single" defaultValue="table">
        <ToggleGroupItem value="table">
          <TablePropertiesIcon className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <LayoutGridIcon className="size-5" />
        </ToggleGroupItem>
      </ToggleGroup> */}

      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="planName"
          columns={columns}
          data={data?.data?.certificateInfo ?? []}
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
    </>
  );
}
