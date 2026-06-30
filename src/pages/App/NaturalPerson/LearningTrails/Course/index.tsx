import { ChevronLeft, Lightbulb, Milestone } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';

import { getImageUrl } from '@/utils/image';

export default function LearningTrailsCoursePage() {
  return (
    <ApplicationLayout icon={Milestone} title={'Curso'} hideCredits={true}>
      <div className="min-h-screen w-full p-6">
        <div className="mx-auto w-full">
          {/* Back button */}
          <button
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="size-5" />
            <span>Voltar para Trilhas</span>
          </button>

          <div className="rounded-lg border border-gray-200">
            {/* Header */}
            <section className="flex h-full flex-col justify-center gap-2 rounded-t-lg border bg-gray-50">
              <article className="flex h-full w-[100%] flex-row items-center justify-between gap-4 rounded-lg p-5">
                <div className="flex flex-row items-center gap-6">
                  <div className="flex flex-row items-end gap-3">
                    <img src={getImageUrl('images/certificate.png')} className="h-32 w-40" alt="" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Programação de Robôs Industriais
                    </h1>
                    <div className="flex w-[28%] items-center justify-center rounded-full bg-red-500 p-2">
                      <small className="text-white">Pendente</small>
                    </div>
                  </div>
                </div>

                <Button variant={'secondary'}>Garantir minha vaga</Button>
              </article>
            </section>

            {/* Competencies section */}
            <section className="mb-8 flex flex-col gap-6 p-4">
              <div>
                <h3 className="mb-1 font-semibold text-[#475569]">DESCRIÇÃO</h3>
                <p className="leading-relaxed">
                  A Indústria 4.0 está transformando o mercado — e os profissionais capazes de
                  programar, integrar e manter robôs industriais são os mais procurados. Nesta
                  trilha, você vai aprender do básico de lógica de mecatrônica até a programação e
                  manutenção avançada de robôs, conquistando as competências essenciais e
                  comprovando-as ao longo da certificação.
                </p>
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-[#475569]">CARGA HORÁRIA TOTAL</h3>
                <p>100h</p>
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-[#475569]">PÚBLICO PARA</h3>
                <p>Estudantes</p>
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-[#475569]">OBJETIVO</h3>
                <p className="leading-relaxed">
                  Preparar você para trabalhar como Especialista em Robótica Industrial, dominando a
                  operação, integração e manutenção de sistemas robotizados.
                </p>
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-[#475569]">ÁREAS DE ATUAÇÃO</h3>
                <p className="leading-relaxed">
                  Automotiva, metalurgia, alimentos, eletroeletrônica e manufatura em geral.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="mb-1 font-semibold text-[#475569]">COMPETÊNCIAS DESENVOLVIDAS</h3>
                {/* Robótica Industrial */}
                <button className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lightbulb color="#94A3B8" />
                    <span className="font-medium text-gray-900">Robótica Industrial</span>
                  </div>
                </button>
                <div className="ml-9 mt-2 space-y-1 text-sm text-gray-600">
                  <p>• Programar diferentes marcas de robôs industriais</p>
                  <p>• Realizar integração de robôs com sistemas automatizados</p>
                </div>

                {/* Eletrônica e Manutenção */}
                <button className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lightbulb color="#94A3B8" />
                    <span className="font-medium text-gray-900">Eletrônica e Manutenção</span>
                  </div>
                </button>
                <div className="ml-9 mt-2 space-y-1 text-sm text-gray-600">
                  <p>• Operar e ajustar células robotizadas</p>
                  <p>• Garantir eficiência e segurança em processos industriais</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
