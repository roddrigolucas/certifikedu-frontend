import {
  ArrowUpDownIcon,
  CalendarIcon,
  DownloadIcon,
  FileBadgeIcon,
  FilterIcon,
  GraduationCapIcon,
  LayoutListIcon,
} from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { Button } from '@/components/shared/ui/button';

export default function ReportsPage() {
  return (
    <ApplicationLayout icon={LayoutListIcon} title="Relatórios" hideCredits>
      <div className="flex flex-col gap-4">
        <header className="inline-flex justify-between gap-4">
          <div className="inline-flex gap-2">
            <Button variant="outline" className="group" size="sm">
              <FilterIcon className="ease mr-1 size-4 duration-500" />
              Filtro Avançado
            </Button>
            <Button variant="outline" className="group" size="sm">
              <CalendarIcon className="ease mr-1 size-4 duration-500" />
              Últimos 7 dias
            </Button>
          </div>
          <Button variant="success" className="group" size="sm">
            <DownloadIcon className="ease mr-1 size-4 duration-500" />
            Baixar Relatórios
          </Button>
        </header>
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
          <CardInformation
            title="Certificados Emitidos"
            value="0"
            icon={ArrowUpDownIcon}
            isLoading={false}
          />
          <CardInformation
            title="Número de Alunos"
            value="0"
            icon={GraduationCapIcon}
            isLoading={false}
          />
          <CardInformation
            title="Certificados Cadastrados"
            value="0"
            icon={FileBadgeIcon}
            isLoading={false}
          />
          <CardInformation
            title="Certificados Cadastrados"
            value="0"
            icon={FileBadgeIcon}
            isLoading={false}
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <CardInformation
            title="Certificados Emitidos"
            value="0"
            icon={ArrowUpDownIcon}
            isLoading={false}
          />
          <CardInformation
            title="Número de Alunos"
            value="0"
            icon={GraduationCapIcon}
            isLoading={false}
          />
          <CardInformation
            title="Certificados Cadastrados"
            value="0"
            icon={FileBadgeIcon}
            isLoading={false}
          />
          <CardInformation
            title="Certificados Cadastrados"
            value="0"
            icon={FileBadgeIcon}
            isLoading={false}
          />
        </div>
      </div>
    </ApplicationLayout>
  );
}
