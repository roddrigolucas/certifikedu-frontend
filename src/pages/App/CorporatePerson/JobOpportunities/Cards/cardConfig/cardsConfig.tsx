import { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import {
  BadgeHelp,
  EyeIcon,
  FileSearch,
  Minus,
  MoreVerticalIcon,
  Plus,
  Trash2Icon,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { getTextFilterCounterText } from '@/utils/cloudScapeCounter';

import { ICardsFilterProps } from '../types';

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

export const CardHeaderCloudScape: React.FC<{ jobId: string }> = ({ jobId }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="">
        <Avatar className="relative overflow-visible">
          <AvatarFallback className="bg-blue-100 text-slate-600">
            <FileSearch />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="size-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col" align="end">
            <Link to={pagePaths.authenticated.corporatePerson.view.replace(':jobId', jobId)}>
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
              >
                <EyeIcon className="size-4" />
                Visualizar
              </DropdownMenuItem>
            </Link>
            {/* <CloneTemplateDialog templateName={item.name} templateId={item.templateId}> */}
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
            >
              <User className="size-4" />
              Candidatos
            </DropdownMenuItem>
            {/* </CloneTemplateDialog> */}
            {/* <DeleteTemplateDialog templateId={item.templateId} templateName={item.name}> */}
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2Icon className="size-4" />
              Deletar
            </DropdownMenuItem>
            {/* </DeleteTemplateDialog> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const CardFilterCloudScape: React.FC<ICardsFilterProps> = ({
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
            filteringPlaceholder="Pesquise suas vagas"
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
                Digite aqui para filtrar qualquer campo presente na sua vaga: Nome, Instiuição,
                Habilidades, Data de Criação ...
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
      {/* {showFilters && (
        <div className="mt-5 flex flex-col">
          <TemplatesFilter form={form} />
          <div className="hidden md:flex">
            <DatePickerWithRange form={form} />
          </div>
        </div>
      )} */}
    </>
  );
};
