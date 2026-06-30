import { ChevronLeft, Lightbulb, Milestone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';

import { getImageUrl } from '@/utils/image';

export default function LearningTrailDetailsViewPage() {
  const courses = [
    {
      id: 1,
      title: 'Programação de Robôs Industriais',
      duration: '20h',
      type: 'Profissionalizante',
      status: 'Pendente',
      image: '/api/placeholder/80/80',
    },
    {
      id: 2,
      title: 'Programação de Robôs Industriais',
      duration: '20h',
      type: 'Profissionalizante',
      status: 'Pendente',
      image: '/api/placeholder/80/80',
    },
    {
      id: 3,
      title: 'Programação de Robôs Industriais',
      duration: '20h',
      type: 'Profissionalizante',
      status: 'Pendente',
      image: '/api/placeholder/80/80',
    },
    {
      id: 4,
      title: 'Programação de Robôs Industriais',
      duration: '20h',
      type: 'Profissionalizante',
      status: 'Pendente',
      image: '/api/placeholder/80/80',
    },
    {
      id: 5,
      title: 'Programação de Robôs Industriais',
      duration: '20h',
      type: 'Profissionalizante',
      status: 'Concluído',
      image: '/api/placeholder/80/80',
    },
  ];

  return (
    <ApplicationLayout icon={Milestone} title={'Trilha'} hideCredits={true}>
      <Link
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        to={pagePaths.authenticated.learningTrails.root}
      >
        <ChevronLeft className="size-5" />
        <span>Voltar para Trilhas de Aprendizado</span>
      </Link>
      <div className="min-h-screen w-full p-6">
        <div className="mx-auto w-full">
          {/* Back button */}

          <div className="rounded-lg border border-gray-200">
            {/* Header */}
            <section className="flex flex-col gap-2 border bg-gray-50">
              <article className="flex items-center justify-center gap-2 p-6">
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
              </article>

              <article className="mb-8 flex flex-row items-center justify-between p-4 ">
                <div className="flex items-center gap-4">
                  <img src={getImageUrl('images/medal.svg')} className="size-16" alt="" />
                  <h1 className="text-2xl font-bold text-gray-900">Especialista em Robótica</h1>
                  <p className="mt-1 text-gray-600">Concluiu 1/6 cursos</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="success" className="flex items-center gap-2">
                    Ver mapa da trilha
                  </Button>
                  <Button variant="outline">Sair da trilha</Button>
                </div>
              </article>
            </section>

            {/* Competencies section */}
            <section className="mb-8 p-4">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                COMPETÊNCIAS DESENVOLVIDAS
              </h2>

              <div className="space-y-4">
                {/* Robótica Industrial */}
                <div className="rounded-lg p-4">
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
                </div>

                {/* Eletrônica e Manutenção */}
                <div className="rounded-lg p-4">
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
              </div>
            </section>
          </div>

          {/* Courses section */}
          <div className="my-8">
            <h1 className="mb-6 text-lg font-bold text-gray-900 ">Cursos</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  className="flex h-full w-[100%] flex-row items-center gap-4 rounded-lg border p-5"
                  to={`/learningTrails/course/${course.id}`}
                >
                  <div className="flex flex-row items-end gap-3">
                    <img src={getImageUrl('images/certificate.png')} className="h-32 w-40" alt="" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-base font-bold">
                      <span>Programação de Robôs Industriais</span>
                    </div>
                    <span>20h</span>
                    <span>Profissionalizante</span>
                    <div className="flex w-[28%] items-center justify-center rounded-full bg-red-500 p-2">
                      <small className="text-white">Pendente</small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* About section */}
          <div className="my-8">
            <h1 className="mb-6 text-lg font-bold text-gray-900 ">Sobre a trilha</h1>

            <div className="space-y-6 rounded-lg border p-5 text-sm text-gray-700">
              <div>
                <h3 className="mb-2 font-bold text-[#475569]">DESCRIÇÃO</h3>
                <p className="leading-relaxed">
                  A Indústria 4.0 está transformando o mercado — e os profissionais capazes de
                  programar, integrar e manter robôs industriais são os mais procurados. Nesta
                  trilha, você vai aprender do básico de lógica de mecatrônica até a programação e
                  manutenção avançada de robôs, conquistando as competências essenciais e
                  comprovando-as ao longo da certificação.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-[#475569]">CARGA HORÁRIA TOTAL</h3>
                <p>100h</p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-[#475569]">PÚBLICO PARA</h3>
                <p>Estudantes</p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-[#475569]">OBJETIVO</h3>
                <p className="leading-relaxed">
                  Preparar você para trabalhar como Especialista em Robótica Industrial, dominando a
                  operação, integração e manutenção de sistemas robotizados.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-[#475569]">ÁREAS DE ATUAÇÃO</h3>
                <p className="leading-relaxed">
                  Automotiva, metalurgia, alimentos, eletroeletrônica e manufatura em geral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
