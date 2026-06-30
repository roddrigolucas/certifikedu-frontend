import { CardsProps } from '@cloudscape-design/components/cards';
import {
  CalendarDays,
  Clock3,
  Copy,
  EyeIcon,
  MoreVerticalIcon,
  School,
  Trash2Icon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { cn } from '@/utils';

import { formatDate } from '../../../Share';
import { CloneTemplateDialog } from '../../../Share/Dialogs/CloneTemplateDialog';
import { DeleteTemplateDialog } from '../../../Share/Dialogs/DeleteTemplateDialog';
import { TransformedTemplate } from '../types';
import { CardHeaderCloudScape } from './cardsConfig';

export const CARD_DEFINITIONS: CardsProps.CardDefinition<TransformedTemplate> = {
  header: (item) => <CardHeaderCloudScape item={item} />,
  sections: [
    {
      id: 'title',
      content: (item) => {
        return (
          <Link to={`/certificates/templates/view/${item.templateId}`}>
            <div className="mx-auto cursor-pointer py-2 hover:opacity-50">
              <h3
                className="w-full text-center text-lg font-semibold"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  maxWidth: '100%',
                }}
                title={item.name} // Show full name on hover
              >
                {item.name}
              </h3>
            </div>
          </Link>
        );
      },
    },
    {
      id: 'abilities',
      content: (item) => {
        const abilities = [...new Set(item.abilitiesText.split(':'))];

        return (
          <div className="flex w-full justify-center text-center">
            <div
              className={cn('grid grid-cols-2 gap-4', {
                flex: abilities?.length === 1,
              })}
            >
              {abilities?.length === 0 && (
                <span className="text-muted-foreground/75">Sem Competências/Habilidades</span>
              )}
              {abilities.slice(0, 4).map((ability, index) => (
                <Badge key={index} variant="outline" className="justify-center text-center">
                  {ability}
                </Badge>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      id: 'hoursWorkload',
      content: (item) => (
        <div className="inline-flex w-full justify-center gap-2 py-2 font-sans text-[16px] text-slate-900">
          <div className="inline-flex w-1/2 items-end gap-2">
            <Clock3 />
            <p className="text-slate-600">
              {Number(item.hoursWorkload) % 1 === 0
                ? Number(item.hoursWorkload)
                : Number(item.hoursWorkload).toFixed(2)}{' '}
              horas
            </p>
          </div>
          <div className="inline-flex items-end gap-2 ">
            <School />
            <p>{item.schoolName} </p>
          </div>
        </div>
      ),
    },
    {
      id: 'createdAt',
      content: (item) => (
        <div className="flex flex-col justify-between">
          <div className="mt-2 inline-flex w-full items-end justify-center gap-2 font-sans text-[16px] text-slate-900">
            <CalendarDays />
            <p>{formatDate(item.createdAt)} </p>
          </div>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button data-testId="menu-button" variant="outline" className="size-8 p-0">
                  <span className="sr-only">Menu</span>
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col" align="end">
                <Link to={`/certificates/templates/view/${item.templateId}`}>
                  <DropdownMenuItem
                    data-testId="view-button"
                    onSelect={(event) => event.preventDefault()}
                    className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                  >
                    <EyeIcon className="size-4" />
                    Visualizar
                  </DropdownMenuItem>
                </Link>
                <CloneTemplateDialog templateName={item.name} templateId={item.templateId}>
                  <DropdownMenuItem
                    data-testId="clone-button"
                    onSelect={(event) => event.preventDefault()}
                    className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                  >
                    <Copy className="size-4" />
                    Clonar
                  </DropdownMenuItem>
                </CloneTemplateDialog>
                <DeleteTemplateDialog templateId={item.templateId} templateName={item.name}>
                  <DropdownMenuItem
                    data-testId="delete-button"
                    onSelect={(event) => event.preventDefault()}
                    className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                  >
                    <Trash2Icon className="size-4" />
                    Deletar
                  </DropdownMenuItem>
                </DeleteTemplateDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ),
    },
  ],
};
