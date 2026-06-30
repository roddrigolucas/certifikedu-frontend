import { useState } from 'react';

import {
  CheckCircle2,
  CheckSquare2,
  ChevronRight,
  Clock,
  MessageSquareHeart,
  Milestone,
  PlaySquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { Button } from '@/components/shared/ui/button';

import { getImageUrl } from '@/utils/image';

export default function LearningTrailsViewPage() {
  const isLoading = false;
  const isError = false;

  const [activeTab, setActiveTab] = useState('Trilhas em Andamento');

  return (
    <ApplicationLayout icon={Milestone} title={'Trilhas de Aprendizado'} hideCredits={true}>
      <div className="space-y-3">
        {/* Top stats */}
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
          <CardInformation
            title="Certificados Recebidos"
            value={'2'}
            icon={PlaySquare}
            isLoading={isLoading}
            isError={isError}
          />
          <CardInformation
            title="Trilhas Recomendadas"
            value={'2'}
            icon={MessageSquareHeart}
            isLoading={isLoading}
            isError={isError}
          />
          <CardInformation
            title="Trilhas Concluídas"
            value={'2'}
            icon={CheckSquare2}
            isLoading={isLoading}
            isError={isError}
          />
          <CardInformation
            title="Cursos Pendentes"
            value={'2'}
            icon={Clock}
            isLoading={isLoading}
            isError={isError}
          />
          <CardInformation
            title="Cursos Concluídos"
            value={'2'}
            icon={CheckCircle2}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        <br></br>

        {/* Tabs */}
        <div className="mb-4 flex gap-8">
          <button
            onClick={() => setActiveTab('Trilhas em Andamento')}
            className={`
              w-1/3 rounded-t-xl border border-b-0 px-4 py-2 text-center text-base transition-colors
              ${
                activeTab === 'Trilhas em Andamento'
                  ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white'
                  : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'
              }`}
          >
            Trilhas em Andamento
          </button>
          <button
            onClick={() => setActiveTab('Trilhas Recomendadas')}
            className={`
              w-1/3 rounded-t-xl border border-b-0 px-4 py-2 text-center text-base transition-colors
              ${
                activeTab === 'Trilhas Recomendadas'
                  ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white'
                  : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'
              }`}
          >
            Trilhas Recomendadas
          </button>
          <button
            onClick={() => setActiveTab('Trilhas Concluídas')}
            className={`
              w-1/3 rounded-t-xl border border-b-0 px-4 py-2 text-center text-base transition-colors
              ${
                activeTab === 'Trilhas Concluídas'
                  ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white'
                  : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'
              }`}
          >
            Trilhas Concluídas
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'Trilhas em Andamento' && (
          <div className="flex gap-6">
            {/* Card 1 */}
            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/orange-badge.png')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Explorador de Trilhas</span>
              </div>
              <div>
                <span>Carga horária total: 100h</span>
              </div>
              <div>
                <small>Concluiu 2/5 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                66%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '66%' }}
                    role="progressbar"
                    aria-valuenow={66}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>

            {/* Card 2 (new example) */}
            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/medal.svg')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Mestre do Conhecimento</span>
              </div>
              <div>
                <span>Carga horária total: 80h</span>
              </div>
              <div>
                <small>Concluiu 4/8 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                50%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '50%' }}
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>

            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/medal.svg')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Mestre do Conhecimento</span>
              </div>
              <div>
                <span>Carga horária total: 80h</span>
              </div>
              <div>
                <small>Concluiu 4/8 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                50%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '50%' }}
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'Trilhas Recomendadas' && (
          <div className="flex gap-6">
            {/* Card 1 */}
            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/orange-badge.png')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Explorador de Trilhas</span>
              </div>
              <div>
                <span>Carga horária total: 100h</span>
              </div>
              <div>
                <small>Concluiu 2/5 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                66%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '66%' }}
                    role="progressbar"
                    aria-valuenow={66}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>

            {/* Card 2 (new example) */}
            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/medal.svg')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Mestre do Conhecimento</span>
              </div>
              <div>
                <span>Carga horária total: 80h</span>
              </div>
              <div>
                <small>Concluiu 4/8 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                50%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '50%' }}
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'Trilhas Concluídas' && (
          <div className="flex gap-6">
            {/* Card 1 */}
            <div className="flex h-full w-[32%] flex-col gap-4 rounded-lg border p-5">
              <div className="flex flex-row items-end gap-3">
                <img src={getImageUrl('images/orange-badge.png')} className="size-14" alt="" />
              </div>
              <div className="text-base font-bold">
                <span>Missão Explorador de Trilhas</span>
              </div>
              <div>
                <span>Carga horária total: 100h</span>
              </div>
              <div>
                <small>Concluiu 2/5 cursos</small>
              </div>
              <div className="flex items-center justify-center gap-2">
                66%{' '}
                <div className="h-2 w-full overflow-hidden rounded-xl border bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-xl bg-[#10B981]"
                    style={{ width: '66%' }}
                    role="progressbar"
                    aria-valuenow={66}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <Link to={pagePaths.authenticated.learningTrails.details}>
                <Button className="w-full md:w-fit" variant="outline">
                  Detalhes da trilha
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Bottom button */}
        <Link to={pagePaths.authenticated.learningTrails.all}>
          <Button className="mt-4 w-full md:w-fit" variant="outline">
            Ver todas as trilhas
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </ApplicationLayout>
  );
}
