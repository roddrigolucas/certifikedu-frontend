import {
  ArrowUpDownIcon,
  CalendarIcon,
  DownloadIcon,
  FileBadgeIcon,
  FilterIcon,
  GraduationCapIcon,
  LayoutListIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { Button } from '@/components/shared/ui/button';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';
import { ReportsService } from '@/services/entities/app/legalPerson/reports';

export default function ReportsViewPage() {
  const { selectedPJ } = useProfile();

  const { data, isLoading } = useRequestProcessor().query(
    ['reports_metrics_pj', `PJ: ${selectedPJ?.pjId}`],
    async () => await ReportsService.GetMetrics(selectedPJ?.pjId ?? ''),
    {
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

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
            title="Certificados Cadastrados"
            value={data?.certificadosCadastrados?.toString() ?? '0'}
            icon={FileBadgeIcon}
            isLoading={isLoading}
          />
          <CardInformation
            title="Certificados Emitidos"
            value={data?.certificadosEmitidos?.toString() ?? '0'}
            icon={ArrowUpDownIcon}
            isLoading={isLoading}
          />
          <CardInformation
            title="Número de Alunos"
            value={data?.numeroAlunos?.toString() ?? '0'}
            icon={GraduationCapIcon}
            isLoading={isLoading}
          />
          <CardInformation
            title="Erros de Emissão"
            value={data?.errosEmissao?.toString() ?? '0'}
            icon={AlertTriangleIcon}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ApplicationLayout>
  );
}
