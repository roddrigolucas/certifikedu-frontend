import { CardsProps } from '@cloudscape-design/components/cards';
import { Accessibility, CalendarDays, Computer, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import { JobOpportunityEntity } from '@/services/entities/app/corporatePerson/jobOpportunity/types';

import { CardHeaderCloudScape } from './cardsConfig';

export const CARD_DEFINITIONS: CardsProps.CardDefinition<JobOpportunityEntity> = {
  header: (item) => <CardHeaderCloudScape jobId={item.jobId} />,
  sections: [
    {
      id: 'generalInfo',
      content: (item) => {
        return (
          <div className="flex flex-col">
            <h3
              className="text-lg font-semibold"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                maxWidth: '100%',
              }}
              title={item.title} // Show full title on hover
            >
              {item.title}
            </h3>
            <h3 className="text-sm text-slate-600 ">Código da vaga: {item?.jobCode}</h3>
            <div className="mt-4 flex flex-wrap">
              <Badge variant="info" className="m-1 gap-2 rounded-md p-2 hover:opacity-90">
                <Computer size={18} />
                <p>{item.workModel}</p>
              </Badge>
              <Badge variant="info" className="m-1 gap-2 rounded-md p-2 hover:opacity-90">
                <Accessibility size={18} />
                <p>Aceita PCD</p>
              </Badge>
            </div>
            <div className="mt-5 flex flex-row items-center gap-1">
              <Users />
              <h3 className="font-bold text-slate-700">
                Candidatos recomendados: <strong className="text-black">{item.candidates}</strong>
              </h3>
            </div>
          </div>
        );
      },
    },

    {
      id: 'createdAt',
      content: (item) => {
        const jobId = item.jobId;

        return (
          <div className="flex flex-col justify-between">
            <div className="inline-flex w-full items-end  gap-2 font-sans  text-slate-900">
              <CalendarDays />
              <p className="text-md">Data de Início: {item.createdAt.split('T')[0]} </p>
            </div>
            <Link to={pagePaths.authenticated.corporatePerson.view.replace(':jobId', jobId)}>
              <Button variant="secondary" className="mt-5 w-full">
                Visualizar
              </Button>
            </Link>
          </div>
        );
      },
    },
  ],
};
