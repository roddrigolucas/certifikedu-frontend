import { Clock9Icon, Medal, Puzzle, UsersRound } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { BackButton } from '@/components/shared/BackButton';
import { Badge } from '@/components/shared/ui/badge';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { TrailService } from '@/services/entities/app/legalPerson/trails';

interface AchievementProps {
  title: string;
  hoursWorkload: string;
}

const Achievement: React.FC<AchievementProps> = ({ title, hoursWorkload }) => (
  <div className="flex items-center gap-2 rounded-md border border-gray-300 p-3">
    <Badge variant="default">Obrigatório</Badge>
    <span className="font-medium">{title}</span>
    <div className="ml-auto flex items-center gap-1">
      <Clock9Icon className="size-4" />
      <span className="font-medium text-gray-700">{hoursWorkload} h</span>
    </div>
  </div>
);

export default function TrailViewPage() {
  const { selectedPJ } = useProfile();
  const { id } = useParams();

  const { data, isLoading } = useRequestProcessor().query(
    [`trailId: ${id}`, `PJ: ${selectedPJ?.pjId}`],
    async () => await TrailService.GetTrailById(selectedPJ?.pjId ?? '', id ?? ''),
    {
      enabled: !!id,
      refetchOnMount: true,
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  if (isLoading || !data) {
    return <FullscreenLoadingOverlay />;
  }

  return (
    <ApplicationLayout icon={Medal} title={data.name}>
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.trail.root}>
          Voltar para Trilhas
        </BackButton>
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          <CardInformation
            title="Carga Horária"
            value={data.totalHoursWorkload}
            icon={Clock9Icon}
            isLoading={isLoading}
          />
          <CardInformation
            title="Módulos"
            value={data.totalModules}
            icon={Puzzle}
            isLoading={isLoading}
          />
          <CardInformation
            title="Alunos Emitidos"
            value={data.studentsCompleted}
            icon={UsersRound}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-10 flex flex-col">
          <h3 className="text-xs font-bold uppercase text-slate-600">Descrição</h3>
          <ul className="mt-2 font-normal">{data.description}</ul>
        </div>
        <div>
          <h3 className="mt-10 text-xs font-bold uppercase text-slate-600">Trilha</h3>
        </div>
        <div className="space-y-4 p-4">
          {data.modules.map((module, index) => (
            <div key={index} className="space-y-4 rounded-lg border border-gray-300 p-4 shadow-md">
              <h2 className="text-lg font-bold">Módulo {module.moduleIndex + 1}</h2>

              {module.events.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Eventos</h3>
                  {module.events.map((event) => (
                    <Achievement
                      key={event.id}
                      title={event.name}
                      hoursWorkload={event.totalHoursWorkload}
                    />
                  ))}
                </div>
              )}
              {module.subjects.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Disciplinas</h3>
                  {module.subjects.map((subject) => (
                    <Achievement
                      key={subject.id}
                      title={subject.name}
                      hoursWorkload={subject.totalHoursWorkload}
                    />
                  ))}
                </div>
              )}
              {module.activities.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Atividades</h3>
                  {module.activities.map((activity) => (
                    <Achievement
                      key={activity.id}
                      title={activity.name}
                      hoursWorkload={activity.totalHoursWorkload}
                    />
                  ))}
                </div>
              )}
              {module.internships.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Estágios</h3>
                  {module.internships.map((internship) => (
                    <Achievement
                      key={internship.id}
                      title={internship.name}
                      hoursWorkload={internship.totalHoursWorkload}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ApplicationLayout>
  );
}
