import LoadingBar from '@cloudscape-design/chat-components/loading-bar';
import { CardsProps } from '@cloudscape-design/components/cards';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import { IInternalPDIs } from '@/services/entities/app/core/pdi/model';

import { cn } from '@/utils';

import { CardHeaderCloudScape } from './cardsConfig';

export const CARD_DEFINITIONS: CardsProps.CardDefinition<IInternalPDIs> = {
  header: (item) => <CardHeaderCloudScape pdiId={item.pdiId} enabled={item.status === 'SUCCESS'} />,
  sections: [
    {
      id: 'title',
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
          </div>
        );
      },
    },
    {
      id: 'status',
      content: (item) => {
        let badge;
        switch (item.status) {
          case 'PENDING':
            return (
              <>
                <h1 className="font-bold">PDI em criação ...</h1>
                <LoadingBar variant="gen-ai" />
              </>
            );
          case 'SUCCESS':
            badge = <Badge variant="success">Sucesso</Badge>;
            break;
          default:
            badge = <Badge variant="destructive">Erro</Badge>;
            break;
        }

        return <div>{badge}</div>;
      },
    },
    {
      id: 'progressPercentage',
      content: (item) => {
        const steps = item.progressPercentage / 25;

        return (
          <ProgressBar
            value={item.progressPercentage}
            additionalInfo={`Você completou ${steps} etapas`}
            label="Progresso Total"
          />
        );
      },
    },
    {
      id: 'createdAt',
      content: (item) => {
        const pdiId = item.pdiId;
        const isDisabled = item.status !== 'SUCCESS';

        return (
          <div className="flex flex-col justify-between">
            <div className="inline-flex w-full items-end gap-2 font-sans text-slate-900">
              <CalendarDays />
              <p className="text-md">Data de Início: {item.createdAt.split('T')[0]}</p>
            </div>
            <Link
              className={cn({ 'pointer-events-none': isDisabled })}
              to={pagePaths.authenticated.pdi.graph.replace(':id', pdiId)}
            >
              <Button disabled={isDisabled} variant="secondary" className="mt-5 w-full">
                Visualizar
              </Button>
            </Link>
          </div>
        );
      },
    },
  ],
};
