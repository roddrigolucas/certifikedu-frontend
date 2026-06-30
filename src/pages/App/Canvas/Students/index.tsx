import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Canvas/Students/columns';
import { DataTable } from '@/components/shared/DataTable';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CanvasService } from '@/services/entities/app/canvas';

export default function StudentsCanvasPage() {
  const { isCanvas } = useProfile();

  const { data } = useRequestProcessor().query(
    ['canvas-students'],
    async () => await CanvasService.GetStudents(),
    {
      enabled: !!isCanvas,
      onError: () => {
        toast.error('Erro ao buscar estudantes do curso');
      },
    },
  );

  return (
    <ApplicationLayout icon={GraduationCap} title="Alunos">
      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="name"
          columns={columns}
          data={data ?? []}
          headerOptions={{
            filter: true,
            toolbar: true,
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
