import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArchiveIcon, LibraryBig } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { IRegisterCurriculum } from '@/services/entities/app/legalPerson/courses/types';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { ActivitiesForm } from './../forms/ActivitiesForm';
import { BasicInfoForm } from './../forms/BasicInfoForm';
import { InternshipsForm } from './../forms/InternshipsForm';
import { SemestersForm } from './../forms/SemestersForm';
import { CurriculumSchemaAll, CurriculumSchemaType } from './../validation/schema';

export default function CurriculumEditPage() {
  const { id } = useParams();
  const { selectedPJ } = useProfile();
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const setCreated = () => setIsCreated(!isCreated);

  const { data, isLoading } = useRequestProcessor().query(
    ['curriculum', id],
    async () => await CourseService.GetCurriculumById(selectedPJ?.pjId ?? '', id ?? ''),
  );

  if (!data) {
    return <div>Não encontrado</div>;
  }

  return (
    <ApplicationLayout icon={LibraryBig} title={`Currículo ${data.name}`} isPageLoading={isLoading}>
      <div className="space-y-3">
        <BackButton
          data-testId="back-button"
          href={pagePaths.authenticated.naturalPerson.course.root}
        >
          Voltar para Cursos
        </BackButton>
        <div className="mb-48 flex-col">
          {isCreated ? (
            <EditedCurriculum />
          ) : (
            <CurriculumEditForm setCreated={setCreated} data={data} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function CurriculumEditForm({
  data,
}: Readonly<{
  setCreated: () => void;
  data: IRegisterCurriculum;
}>) {
  const { id } = useParams();
  const { refetch } = useCertificate();
  const { selectedPJ } = useProfile();

  const [editBasicInfo, setIsEditBasicInfo] = useState(true);

  const form = useForm<CurriculumSchemaType>({
    resolver: zodResolver(CurriculumSchemaAll),
    mode: 'onChange',
  });

  useEffect(() => {
    if (data) {
      const mappedValues = mapCurriculumToFormValues(data);
      form.reset(mappedValues);
    }
  }, [data, form]);

  function onSubmit(values: CurriculumSchemaType) {
    if (editBasicInfo) {
      const { semesters, activities, internships, ...basicInfo } = values;
      const response = CourseService.EditCurriculum(selectedPJ?.pjId ?? '', id ?? '', basicInfo as any);

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          refetch();

          return (
            <span data-testId="curriculum-success">Informações gerais editadas com sucesso</span>
          );
        },
        error: () => {
          return 'Falha ao editar currículo...';
        },
        finally: () => {
          queryClient.refetchQueries({
            queryKey: ['curriculum', `${id}`],
          });
        },
      });
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col gap-8">
          <div className="mb-4 flex flex-col rounded-lg border border-gray-300 p-4">
            <BasicInfoForm form={form} isEdit={editBasicInfo} />
            <div className="mt-4 flex w-full items-end justify-end">
              <Button
                variant={editBasicInfo ? 'outline' : 'secondary'}
                onClick={() => {
                  setIsEditBasicInfo(!editBasicInfo);
                }}
              >
                {editBasicInfo ? 'Editar' : 'Salvar'}
              </Button>
            </div>
          </div>
          <SemestersForm form={form} isEdit={true} />
          <ActivitiesForm form={form} isEdit={true} />
          <InternshipsForm form={form} isEdit={true} />
        </div>
        <footer className="flex w-full flex-col gap-4 pt-12">
          <div className="flex w-full gap-4">
            <Link to={pagePaths.authenticated.naturalPerson.course.root} className="w-full">
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </Link>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function mapCurriculumToFormValues(data: IRegisterCurriculum): CurriculumSchemaType {
  return {
    name: data.name || '',
    description: data.description || '',
    requiredHoursWorkload: data.requiredHoursWorkload,
    electiveHoursWorkload: data.electiveHoursWorkload ?? undefined,
    complementaryHoursWorkload: data.complementaryHoursWorkload ?? undefined,
    semesters: data.semesters.map((semester) => ({
      semesterNumber: semester.semesterNumber,
      requiredHoursWorkload: semester.requiredHoursWorkload,
      electiveHoursWorkload: semester.electiveHoursWorkload ?? undefined,
      complementaryHoursWorkload: semester.complementaryHoursWorkload ?? undefined,
      subjects: semester.subjects.map((subject) => ({
        name: subject.name || '',
        description: subject.description || '',
        totalHoursWorkload: subject.totalHoursWorkload,
        type: subject.type,
      })),
    })),
    activities: (data.activities ?? []).map((activity) => ({
      name: activity.name || '',
      description: activity.description || '',
      hoursWorkload: activity.hoursWorkload,
    })),
    internships: (data.internships ?? []).map((internship) => ({
      name: internship.name || '',
      description: internship.description || '',
      hoursWorkload: internship.hoursWorkload,
    })),
  };
}

function EditedCurriculum() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={getImageUrl('images/success/certificate.svg')}
          alt="Certificado"
          className="size-48"
        />
        <h2 className="text-2xl font-bold">Currículo editado com sucesso</h2>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.naturalPerson.course.root}>
          <Button variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Voltar para Cursos
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
