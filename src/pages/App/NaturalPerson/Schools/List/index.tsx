import { Plus, SchoolIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Schools/columns';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

export default function SchoolsPage() {
  const { schools } = useProfile();

  return (
    <ApplicationLayout icon={SchoolIcon} title="Unidades de Ensino">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="name"
          columns={columns}
          data={schools?.data || []}
          isLoading={schools?.isLoading}
          isError={schools?.isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <Link to={pagePaths.authenticated.naturalPerson.school.create}>
                <Button data-testId="create-button" variant="success" className="group" size="sm">
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Criar Instituição
                </Button>
              </Link>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
