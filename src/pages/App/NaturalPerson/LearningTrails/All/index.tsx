import { useState } from 'react';

import { ChevronLeft, ListFilter, Milestone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';

import { getImageUrl } from '@/utils/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

export default function AllLearningTrailsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <ApplicationLayout icon={Milestone} title={'Todas as Trilhas'} hideCredits={true}>
      {/* Filter Sidebar/Modal */}
      {isFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-[#0F172A]/40 backdrop-blur transition-opacity"
            onClick={() => setIsFilterOpen(false)}
          />
        </>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed right-0 top-0 z-50 size-full max-w-md bg-white shadow-xl transition-transform
        duration-300 ease-in-out
        ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-gray-200 p-6">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="size-4" />
              <span>Voltar para Todas as Trilhas</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900">Filtrar por competências</h2>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </Select>
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma competência" />
                </SelectTrigger>
              </Select>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6">
            <Button
              className="w-full"
              variant={'success'}
              onClick={() => {
                setIsFilterOpen(false);
              }}
            >
              Aplicar filtro
            </Button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <Link
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        to={pagePaths.authenticated.learningTrails.root}
      >
        <ChevronLeft className="size-5" />
        <span>Voltar para Trilhas de Aprendizado</span>
      </Link>

      <div className="flex flex-row justify-between gap-6">
        <div className=" flex h-10 w-full max-w-[40%]  items-center rounded-lg border border-[#94A3B8] bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50">
          <Search className="ml-3" />
          <input
            placeholder="Pesquisar"
            className=" relative size-full rounded-lg border-r py-2 pl-2 focus:outline-none"
          />
        </div>

        <div className="w-[18%] rounded-lg border border-[#94A3B8]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Carga horária" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'active'}>Ativa</SelectItem>
              <SelectItem value={'unlocked'}>Desbloqueada</SelectItem>
              <SelectItem value={'avaible'}>Disponível</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[18%] rounded-lg border border-[#94A3B8]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Indicada para" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'active'}>Ativa</SelectItem>
              <SelectItem value={'unlocked'}>Desbloqueada</SelectItem>
              <SelectItem value={'avaible'}>Disponível</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[18%] rounded-lg border border-[#94A3B8]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Áreas de Atuação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'active'}>Ativa</SelectItem>
              <SelectItem value={'unlocked'}>Desbloqueada</SelectItem>
              <SelectItem value={'avaible'}>Disponível</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-6">
        <Button variant={'outline'} className="flex gap-2" onClick={() => setIsFilterOpen(true)}>
          Filtrar por competências
          <ListFilter />
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="flex size-full flex-col gap-4 rounded-lg border p-5">
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
        ))}
      </div>
    </ApplicationLayout>
  );
}
