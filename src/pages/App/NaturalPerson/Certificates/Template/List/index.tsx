import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { isAfter, isBefore, isSameDay, parse } from 'date-fns';
import { Plus, UsersIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  CourseSchemaNaturalPerson,
  CourseSchemaNaturalPersonType,
} from '@/pages/App/NaturalPerson/Courses/View/validation/schema';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { ITemplateResponse } from '@/services/entities/app/naturalPerson/templates/model';

import { getImageUrl } from '@/utils/image';

import CardsSection from './Cards';

const useFetchTemplates = (selectedPJ: string) => {
  const queryResult = useQuery<ITemplateResponse, Error>(
    ['templates', `PJ: ${selectedPJ}`],
    () => CertificateService.GetAllTemplates(selectedPJ),
    {
      enabled: !!selectedPJ, // Only run query if selectedPJ is true
    },
  );

  return queryResult;
};

export default function TemplatesCard() {
  const { selectedPJ } = useProfile();

  const { data: templates, isFetching } = useFetchTemplates(selectedPJ?.pjId ?? '');

  const [filteredTemplates, setFilteredTemplates] = useState<ITemplateResponse | null>(null);

  const form = useForm<CourseSchemaNaturalPersonType>({
    resolver: zodResolver(CourseSchemaNaturalPerson),
    mode: 'onChange',
  });

  const formSchoolId = form.watch('schoolId');
  const formCourseId = form.watch('courseId');
  const formDob = form.watch('dob');

  useEffect(() => {
    if (!templates) return;

    const filterTemplates = () => {
      return templates.templates.filter((template) => {
        if (formCourseId && !template.courses.some((c) => c.courseId === formCourseId)) {
          return false;
        }
        if (!!formSchoolId && template.schoolId !== formSchoolId) return false;
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
  }, [formSchoolId, formCourseId, templates, formDob]);

  return (
    <ApplicationLayout icon={UsersIcon} title="Modelos de Certificados Cadastrados">
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.certificates.list}>
          Voltar para Certificados Emitidos
        </BackButton>
        <div className="z-90 flex  flex-col rounded-lg  bg-white ">
          <div className="w-full text-center">
            <PuffLoader loading={isFetching} />
          </div>
          {!isFetching && (templates?.templates?.length ?? 0) === 0 && (
            <div className="w-full py-16 text-center">
              <img
                src={getImageUrl('images/empty/search.svg')}
                alt="search"
                className="h-36 w-full"
              />
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">Nenhum resultado encontrado</h5>
                <p className="text-slate-600">Sem resultados para mostrar...</p>
                <Link to={pagePaths.authenticated.naturalPerson.certificates.create}>
                  <Button variant="success" className="group mx-auto w-full  md:w-fit">
                    <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                    Criar Modelo de Certificado
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {(templates?.templates?.length ?? 0) > 0 && (
            <CardsSection
              form={form}
              templates={filteredTemplates?.templates ?? templates?.templates ?? []}
            />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}
