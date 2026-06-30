import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  ArchiveIcon,
  BookOpen,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LibraryBig,
  ListTodo,
  Network,
  Shapes,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';

import { CourseService } from '@/services/entities/app/legalPerson/courses';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { ActivitiesForm } from './../forms/ActivitiesForm';
import { BasicInfoForm } from './../forms/BasicInfoForm';
import { InternshipsForm } from './../forms/InternshipsForm';
import { SemestersForm } from './../forms/SemestersForm';
import {
  CurriculumSchemaActivity,
  CurriculumSchemaAll,
  CurriculumSchemaBasicInfo,
  CurriculumSchemaInternship,
  CurriculumSchemaSemesters,
  CurriculumSchemaType,
} from './../validation/schema';

export default function CurriculumRegisterPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout icon={LibraryBig} title="Cadastrar Currículo">
      <div className="space-y-3">
        <BackButton
          data-testId="back-button"
          href={pagePaths.authenticated.naturalPerson.course.root}
        >
          Voltar para Cursos
        </BackButton>
        <Stepper
          steps={[
            {
              title: 'Currículo',
              description: 'Informações gerais',
              icon: BookOpen,
            },
            {
              title: 'Semestres',
              description: 'Semestres e disciplinas',
              icon: Shapes,
            },
            {
              title: 'Atividades',
              description: 'Atividades complementares',
              icon: ListTodo,
            },
            {
              title: 'Estágios',
              description: 'Estágios obrigatórios',
              icon: Network,
            },
            {
              title: 'Revisão',
              description: 'Dados preenchidos',
              icon: CheckCircle2Icon,
            },
          ]}
          currentStep={currentStep}
        />

        <div className="mb-48 flex-col">
          {isCreated ? (
            <CreatedCurriculum />
          ) : (
            <CurriculumCreateForm
              setCreated={setCreated}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function CurriculumCreateForm({
  setCreated,
  currentStep,
  setCurrentStep,
}: Readonly<{
  setCreated: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const { id } = useParams();
  const { refetch } = useCertificate();
  const { selectedPJ } = useProfile();

  const form = useForm<CurriculumSchemaType>({
    resolver: zodResolver(getCurrentSchema(currentStep)),
    mode: 'onChange',
  });

  function onSubmit(values: CurriculumSchemaType) {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      const response = CourseService.RegisterCurriculum(selectedPJ?.pjId ?? '', id ?? '', values);

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          refetch();
          setCreated();

          return <span data-testId="course-success">Currículo cadastrado com sucesso</span>;
        },
        error: () => {
          return 'Falha ao cadastrar currículo...';
        },
        finally: () => {
          queryClient.refetchQueries({
            queryKey: ['courses', `PJ: ${selectedPJ?.pjId}`, `School: ${id}`],
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
        {currentStep === 0 && <BasicInfoForm form={form} />}
        {currentStep === 1 && <SemestersForm form={form} />}
        {currentStep === 2 && <ActivitiesForm form={form} />}
        {currentStep === 3 && <InternshipsForm form={form} />}
        {currentStep === 4 && (
          <div className="flex flex-col gap-8">
            <BasicInfoForm form={form} />
            <SemestersForm form={form} />
            <ActivitiesForm form={form} />
            <InternshipsForm form={form} />
          </div>
        )}
        <footer className="flex w-full flex-col gap-4 pt-12">
          <p className="italic text-secondary opacity-80">* Campos obrigatórios</p>

          <div className="flex w-full gap-4">
            {currentStep === 0 && (
              <Link to={pagePaths.authenticated.naturalPerson.course.root} className="w-full">
                <Button className="w-full" variant="outline">
                  Cancelar
                </Button>
              </Link>
            )}
            {currentStep > 0 && (
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ChevronLeftIcon className="mr-1 size-5" />
                Voltar
              </Button>
            )}
            {currentStep === 4 ? (
              <Button
                type="submit"
                data-testId="submit-button"
                className="w-full"
                variant="secondary"
                isLoading={form.formState.isSubmitting}
              >
                <BookOpen className="mr-2 size-5" />
                Cadastrar Currículo
              </Button>
            ) : (
              <Button
                type="submit"
                data-testId="next-button"
                className="w-full"
                variant="secondary"
                isLoading={form.formState.isSubmitting}
              >
                Avançar
                <ChevronRightIcon className="ml-1 size-5" />
              </Button>
            )}
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function getCurrentSchema(step: number) {
  switch (step) {
    case 0:
      return CurriculumSchemaBasicInfo;
    case 1:
      return CurriculumSchemaSemesters;
    case 2:
      return CurriculumSchemaActivity;
    case 3:
      return CurriculumSchemaInternship;
    default:
      return CurriculumSchemaAll;
  }
}

function CreatedCurriculum() {
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
        <h2 className="text-2xl font-bold">Currículo criado com sucesso</h2>
      </div>
      <div className="inline-flex gap-2">
        <Link to={`/courses`}>
          <Button variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Voltar para Cursos
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
