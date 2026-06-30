import { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import { BadgeHelp, EyeIcon, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { getTextFilterCounterText } from '@/utils/cloudScapeCounter';
import { getImageUrl } from '@/utils/image';

import TemplatesFilter from '../../Filters';
import { DatePickerWithRange } from '../../Filters/DateFilter';
import { CardHeaderProps, ICardsFilterProps } from '../types';

export const DEFAULT_PREFERENCES = {
  pageSize: 12,
  visibleContent: ['imagem', 'title', 'abilities', 'hoursWorkload', 'schoolName', 'createdAt'],
};

export const PAGE_SIZE_OPTIONS = [
  { value: 12, label: '12 Certificados' },
  { value: 36, label: '36 Certificados' },
  { value: 72, label: '72 Certificados' },
  { value: 120, label: '120 Certificados' },
];

export const TableNoMatchState = ({ onClearFilter }: { onClearFilter: () => void }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>0 matches</b>
        <Box variant="p" color="inherit">
          Nenhum encontrado.
        </Box>
      </div>
      <Button onClick={onClearFilter}>Limpar filtro</Button>
    </SpaceBetween>
  </Box>
);

export const TableEmptyState = ({ resourceName }: { resourceName: string }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>Nenhum {resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          Nenhum {resourceName.toLowerCase()}s associado com esse recurso.
        </Box>
      </div>
      <Button>Criar {resourceName.toLowerCase()}</Button>
    </SpaceBetween>
  </Box>
);

export const CardHeaderCloudScape: React.FC<CardHeaderProps> = ({ item }) => {
  return (
    <div className="mx-auto flex flex-row justify-center gap-1 ">
      <Link to={`/certificates/templates/view/${item.templateId}`}>
        <div className="group relative inline-flex cursor-pointer">
          <img
            className="rounded-lg border border-slate-300 shadow-sm transition-opacity duration-300 group-hover:opacity-40"
            src={getImageUrl(item.imageTemplateUrl)}
            alt="Clique aqui para visualizar o certificado"
          />
          <EyeIcon
            className="absolute inset-0 m-auto  text-black  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            size={32}
          />
        </div>
      </Link>
    </div>
  );
};

export const CardFilterCloudScape: React.FC<ICardsFilterProps> = ({
  form,
  filterProps,
  filteredItemsCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-full max-w-xl">
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Filter distributions"
            filteringPlaceholder="Pesquise seus certificados"
            filteringClearAriaLabel="Limpar"
            countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
          />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="-mt-2 flex cursor-help items-start text-slate-700">
                <BadgeHelp size={21} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Digite aqui para filtrar qualquer campo presente no certificado: Nome, Instiuição,
                Habilidades, Data de Emissão ...
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="w-sm group mt-5 flex cursor-pointer flex-row items-center font-sans"
      >
        {!showFilters && (
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
        )}
        {showFilters && (
          <Minus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
        )}
        <p className="hover:text-slate-700">Filtros</p>
      </Button>
      {showFilters && (
        <div className="mt-5 flex flex-col">
          <TemplatesFilter form={form} />
          <div className="hidden md:flex">
            <DatePickerWithRange form={form} />
          </div>
        </div>
      )}
    </>
  );
};
