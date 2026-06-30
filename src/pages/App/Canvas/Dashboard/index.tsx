/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAfter, isBefore, isSameDay, parse } from 'date-fns';
import { AirplayIcon, ArrowUpDownIcon, UserCheck, UsersRound, UserX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { CanvasService } from '@/services/entities/app/canvas';
import { ITemplateResponse } from '@/services/entities/app/naturalPerson/templates/model';

import CardsSection from '../../NaturalPerson/Certificates/Template/List/Cards';
import {
  CourseSchemaNaturalPerson,
  CourseSchemaNaturalPersonType,
} from '../../NaturalPerson/Courses/View/validation/schema';

export default function DashboardCanvasPage() {
  const { isCanvas } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!isCanvas) {
      navigate(pagePaths.unauthenticated.signIn, { replace: true });
    }
  }, [isCanvas]);

  return <DashboardCanvas />;
}

function DashboardCanvas() {
  const { isCanvas } = useProfile();
  const [filteredTemplates, setFilteredTemplates] = useState<ITemplateResponse | null>(null);

  const form = useForm<CourseSchemaNaturalPersonType>({
    resolver: zodResolver(CourseSchemaNaturalPerson),
    mode: 'onChange',
  });

  const formDob = form.watch('dob');

  const { data, isLoading } = useRequestProcessor().query(
    ['canvas-info'],
    async () => await CanvasService.GetInfo(),
    {
      enabled: !!isCanvas,
      onError: () => {
        toast.error('Erro ao buscar informações do curso');
      },
    },
  );

  useEffect(() => {
    if (!data) return;
    const templates = data?.createdCertificates;
    const filterTemplates = () => {
      return templates.filter((template) => {
        if (!!formDob) {
          const createdAtDate = parse(template.createdAt, 'dd/MM/yyyy', new Date());
          if (!isAfter(createdAtDate, formDob?.from) || !isBefore(createdAtDate, formDob?.to)) {
            if (
              !isSameDay(createdAtDate, formDob?.from) &&
              !isSameDay(createdAtDate, formDob?.to)
            ) {
              return false;
            }
          }
        }

        return true;
      });
    };

    const filteredTemplatesTemp = filterTemplates();
    const finalFilteredTemplates: ITemplateResponse = { templates: filteredTemplatesTemp };
    setFilteredTemplates(finalFilteredTemplates);
  }, [data, formDob]);

  return (
    <ApplicationLayout
      icon={AirplayIcon}
      title={`Painel do Curso: ${data?.courseName || ''}`}
      isPageLoading={isLoading}
    >
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        <CardInformation
          title="Certificados Emitidos"
          value={data?.numberOfEmmitedCertificates?.toString()}
          icon={ArrowUpDownIcon}
          isLoading={isLoading}
        />
        <CardInformation
          title="Número de Alunos"
          value={data?.totalStudents?.toString()}
          icon={UsersRound}
          isLoading={isLoading}
        />
        <CardInformation
          title="Alunos Verificados"
          value={data?.verifiedStudents?.toString()}
          icon={UserCheck}
          isLoading={isLoading}
        />
        <CardInformation
          title="Alunos Não Verificados"
          value={data?.rawStudents?.toString()}
          icon={UserX}
          isLoading={isLoading}
        />
      </div>
      <CardsSection
        form={form}
        templates={filteredTemplates?.templates ?? data?.createdCertificates ?? []}
      />
    </ApplicationLayout>
  );
}
