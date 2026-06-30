import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import { EyeIcon, FileSearch, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
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

import { cn } from '@/utils';
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

export const CardHeaderCloudScape: React.FC<{ pdiId: string; enabled: boolean }> = ({
  pdiId,
  enabled,
}) => {
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
            <Link
              className={cn({ 'pointer-events-none': !enabled })}
              to={pagePaths.authenticated.pdi.graph.replace(':id', pdiId)}
            >
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
              >
                <EyeIcon className="size-4" />
                Visualizar
              </DropdownMenuItem>
            </Link>

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
  return (
    <>
      <div className="flex flex-row">
        <div className="w-full max-w-xl">
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Filter distributions"
            filteringPlaceholder="Pesquise seus PDIs"
            filteringClearAriaLabel="Limpar"
            countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
          />
        </div>
      </div>
    </>
  );
};
