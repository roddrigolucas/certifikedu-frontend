import { GraduationCap, Plus } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Students/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { SchoolService } from '@/services/entities/app/legalPerson/school';
import { StudentService } from '@/services/entities/app/legalPerson/students';

export default function StudentsBySchoolListPage() {
  const { selectedPJ } = useProfile();
  const { id } = useParams();
  const [searchParameters] = useSearchParams();

  const page = searchParameters.get('page') ?? '1';
  const limit = searchParameters.get('limit') ?? '30';

  const { data, isLoading } = useRequestProcessor().query(
    ['students', `PJ: ${selectedPJ?.pjId}`, `School: ${id}`, `page: ${page}`, `limit: ${limit}`],
    async () => await StudentService.GetStudents(selectedPJ?.pjId ?? '', { page, limit }, id),
    {
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const school = useRequestProcessor().query(
    ['school', id],
    async () => await SchoolService.GetSchool(selectedPJ?.pjId ?? '', id ?? ''),
  );

  if (isLoading || !data || school.isLoading || !school.data) {
    return <FullscreenLoadingOverlay />;
  }

  return (
    <ApplicationLayout icon={GraduationCap} title={`Alunos de ${school.data?.name}`}>
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.school.root}>
          Voltar para Unidades de Ensino
        </BackButton>
        <div className="flex flex-col gap-4">
          <DataTable
            filterColumn="name"
            columns={columns}
            data={data || []}
            isLoading={isLoading}
            headerOptions={{
              filter: true,
              toolbar: true,
              children: (
                <Link to={`/schools/${id}/students/create`}>
                  <Button variant="success" className="group" size="sm">
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Cadastrar Aluno
                  </Button>
                </Link>
              ),
            }}
          />
        </div>
      </div>
    </ApplicationLayout>
  );
}
