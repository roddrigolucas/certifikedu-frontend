import { BookOpen, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Courses/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { SchoolService } from '@/services/entities/app/legalPerson/school';

export default function CourseListPage() {
  const { selectedPJ } = useProfile();
  const { id } = useParams();

  const { data, isLoading, isError } = useRequestProcessor().query(
    ['courses', `PJ: ${selectedPJ?.pjId}`, `School: ${id}`],
    async () => await CourseService.GetCoursesBySchool(selectedPJ?.pjId ?? '', id ?? ''),
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
    <ApplicationLayout icon={BookOpen} title={`Cursos de ${school.data?.name}`}>
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
            isError={isError}
            headerOptions={{
              filter: true,
              toolbar: true,
              children: (
                <Link to={`/schools/${id}/courses/create`}>
                  <Button variant="success" className="group" size="sm">
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Criar Curso
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
