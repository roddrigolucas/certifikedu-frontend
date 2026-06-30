import { ArrowUpRightFromSquareIcon, CreditCardIcon, NotebookText } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { Alert } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { PlansService } from '@/services/entities/app/core/plans';
import { EPlanStatus } from '@/services/entities/app/core/plans/enums';

import { getImageUrl } from '@/utils/image';

import CancelPlan from './dialogs/CancelDialog';
import ConfirmPlan from './dialogs/ConfirmDialog';

export default function PlansTab() {
  const { profileInfo, profileCards } = useProfile();

  const defaultPlan = useRequestProcessor().query(
    ['default-plan'],
    async () => await PlansService.GetDefaultPlan(),
  );

  const { data, isLoading } = useRequestProcessor().query(
    ['plans'],
    async () => await PlansService.GetActivePlans(EPlanStatus.ACTIVE),
  );

  if (isLoading || !data || defaultPlan.isLoading || !defaultPlan.data) {
    return <FullscreenLoadingOverlay />;
  }

  const sortedData = data.sort((a, b) => a.price - b.price);

  return (
    <ApplicationLayout icon={NotebookText} title="Gerenciar Plano">
      {profileCards?.length === 0 && (
        <Alert variant="destructive" className="inline-flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <CreditCardIcon className="size-4" />
            <span>Nenhum cartão encontrado, cadastre um cartão para mudar o seu plano</span>
          </div>
          <Link to={pagePaths.authenticated.account.cards}>
            <Button variant="destructive" size="sm">
              <ArrowUpRightFromSquareIcon className="mr-2 size-4" />
              Acessar cartões
            </Button>
          </Link>
        </Alert>
      )}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 flex flex-col gap-8 rounded-xl bg-slate-50 p-8 sm:col-span-6 lg:col-span-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{defaultPlan?.data?.planName}</h2>
            <span className="text-4xl font-bold">Grátis</span>
            <p className="text-sm text-slate-600">para sempre</p>
          </div>
          <Button
            // onClick={() => ConfirmPlan(defaultPlan.data.planId)}
            disabled={true}
            variant="secondary"
          >
            {profileInfo?.planId === defaultPlan.data.planId ? 'Plano atual' : 'Assinar agora'}
          </Button>
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-[175%] text-slate-600">
              {defaultPlan?.data?.description}
            </p>
            <ul className={`list-image-[url(${getImageUrl('images/check.svg')})]`}>
              <li>
                <strong>PDI:</strong> {defaultPlan.data.pdisQty} emissão pela duração do plano
              </li>
              <li>
                <strong>Quantidade de Certificados Auto-Emitidos:</strong>{' '}
                {defaultPlan?.data?.emittedCertificatesQuota ?? 0}
              </li>
              <li>
                <strong>Quantidade de Certificados Recebidos:</strong> Ilimitado
              </li>
              <li>
                <strong>Quantidade de certificados compartilhados em suas redes sociais:</strong>{' '}
                Ilimitado
              </li>
              <li>
                <strong>Certificados Avulsos:</strong>{' '}
                {(defaultPlan?.data?.singleCertificatePrice / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}{' '}
                cada
              </li>
            </ul>
          </div>
        </div>

        {sortedData.map((plan) => (
          <div
            key={plan.planId}
            className="col-span-12 flex flex-col gap-8 rounded-xl bg-blue-zodiac-950 p-8 text-white sm:col-span-6 lg:col-span-4"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-ecstasy-400">{plan.planName}</h2>
              <span className="text-4xl font-bold">
                {(plan.price / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <p className="text-sm text-slate-300">
                Pago por {plan.interval === 'year' ? 'Ano' : 'Mês'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <ConfirmPlan id={plan.planId ?? ''} installments={plan.installments} />

              {profileInfo?.planId === plan.planId && <CancelPlan />}
            </div>
            <div className="flex flex-col gap-2">
              <ul className="text-sm leading-[175%] text-slate-300">
                {plan?.description?.split('\\n').map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <ul className={`list-image-[url(${getImageUrl('images/check.svg')})]`}>
                <li>
                  <strong>PDI:</strong> {plan.pdisQty} emissão por trimestre
                </li>
                <li>
                  <strong>Quantidade de Certificados Auto-Emitidos:</strong> Ilimitado
                </li>
                <li>
                  <strong>Quantidade de Certificados Recebidos:</strong> Ilimitado
                </li>
                <li>
                  <strong>Quantidade de certificados compartilhados em suas redes sociais:</strong>{' '}
                  Ilimitado
                </li>
                <li>
                  <strong>Quantidade de certificados com OpenBadge:</strong> Ilimitado
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ApplicationLayout>
  );
}
