import { Clock9Icon } from 'lucide-react';

import { Badge } from '@/components/shared/ui/badge';

import { IModulesResponse } from '@/services/entities/app/legalPerson/trails/types';

interface PathInfoProps {
  name: string;
  createdAt: string;
  description: string;
  totalHoursWorkload: number;
  totalModules: number;
  modules: Array<IModulesResponse>;
}

interface Props {
  data: PathInfoProps;
}

interface AchievementProps {
  title: string;
  type: string;
  hoursWorkload: string;
}

const Achievement: React.FC<AchievementProps> = ({ title, type, hoursWorkload }) => (
  <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-400 p-3">
    <Badge variant="default">{type}</Badge>
    <span className="font-medium">{title}</span>
    <div className="ml-auto flex items-center gap-1">
      <Clock9Icon className="size-4" />
      <span className="font-medium text-gray-700">{hoursWorkload} h</span>
    </div>
  </div>
);

export default function TrailView({ data }: Props) {
  return (
    <div className="w-full gap-4 overflow-x-auto lg:flex">
      {data.modules.map((module, index) => (
        <div key={index} className="mb-4 w-full rounded-lg border p-5">
          <h2 className="text-lg font-bold">Módulo {module.moduleIndex + 1}</h2>
          {module.events.length > 0 && (
            <div className="mt-2">
              {module.events.map((event) => (
                <Achievement
                  key={event.id}
                  title={event.name}
                  type="Evento"
                  hoursWorkload={event.totalHoursWorkload}
                />
              ))}
            </div>
          )}
          {module.subjects?.length > 0 && (
            <div className="mt-2">
              {module.subjects.map((subject) => (
                <Achievement
                  key={subject.id}
                  title={subject.name}
                  type="Disciplina"
                  hoursWorkload={subject.totalHoursWorkload}
                />
              ))}
            </div>
          )}
          {module.activities?.length > 0 && (
            <div className="mt-2">
              {module.activities.map((activity) => (
                <Achievement
                  key={activity.id}
                  title={activity.name}
                  type="Atividade"
                  hoursWorkload={activity.totalHoursWorkload}
                />
              ))}
            </div>
          )}
          {module.internships?.length > 0 && (
            <div className="mt-2">
              {module.internships.map((internship) => (
                <Achievement
                  key={internship.id}
                  title={internship.name}
                  type="Estágio"
                  hoursWorkload={internship.totalHoursWorkload}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
