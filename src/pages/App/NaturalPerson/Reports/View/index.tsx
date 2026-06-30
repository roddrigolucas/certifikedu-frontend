import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { ReportsService } from '@/services/entities/app/legalPerson/reports';

export default function ReportsViewPage() {
  const { selectedPJ } = useProfile();

  const { data, isLoading } = useRequestProcessor().query(
    ['report_pj', `PJ: ${selectedPJ?.pjId}`],
    async () => await ReportsService.GetReportUrl(selectedPJ?.pjId ?? ''),
    {
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const iframeUrl = data ?? '';

  if (isLoading || !data) {
    return (
      <ApplicationLayout icon={BookOpen} title="Carregando ...">
        <PageSkeletonFull />
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout icon={BookOpen} title={`Relatórios`}>
      <iframe src={iframeUrl} allowTransparency height={2500} />
    </ApplicationLayout>
  );
}
