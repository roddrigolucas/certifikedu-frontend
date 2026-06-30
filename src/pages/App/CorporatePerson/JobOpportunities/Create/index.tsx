import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Plus,
  SchoolIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import useProfile from '@/hooks/core/useProfile';

import { CorporativeService } from '@/services/entities/app/corporatePerson/jobOpportunity';
import { JobDetail } from '@/services/entities/app/corporatePerson/jobOpportunity/types';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { JobOpportunityForm } from './forms/JobOpportunityForm';
import { SecondPartJobOpportunityForm } from './forms/SecondPartJobOpportunityForm';
import {
  PublishJobSchema,
  PublishJobSchemaAll,
  PublishJobSchemaAllType,
  SecondPartPublishJobSchema,
} from './validation/schema';

export default function CreateJobOppurnityPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout
      icon={SchoolIcon}
      title="Criar Vaga de Emprego"
      description="Cadastre vagas com requisitos detalhados, incluindo competências, habilidades e qualificações específicas, para garantir candidatos mais qualificados e alinhados com a vaga."
      hideCredits
    >
      <BackButton href={pagePaths.authenticated.corporatePerson.dashboard}>
        Voltar para Meu Painel
      </BackButton>
      <Stepper
        steps={[
          {
            title: 'Descreva o cargo',
            description: 'Descreva com detalhes',
            icon: SchoolIcon,
          },
          {
            title: 'Informações da vaga',
            description: 'Dados gerais',
            icon: BookOpen,
          },
          {
            title: 'Revisão',
            description: 'Dados preenchidos',
            icon: CheckCircle2Icon,
          },
        ]}
        currentStep={currentStep}
      />
      <div>
        {isCreated ? (
          <CreatedJobOpportunity setCreated={setCreated} />
        ) : (
          <SchoolCreateForm
            setCreated={setCreated}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </ApplicationLayout>
  );
}

function SchoolCreateForm({
  setCreated,
  currentStep,
  setCurrentStep,
}: Readonly<{
  setCreated: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const { selectedCorporate, jobsOpportunity } = useProfile();

  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = PublishJobSchema;
      break;
    case 2:
      currentSchema = SecondPartPublishJobSchema;
      break;
    default:
      currentSchema = PublishJobSchemaAll;
  }

  const form = useForm<PublishJobSchemaAllType>({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
    defaultValues: {
      items: ['PCD_ACCEPT'],
    },
  });

  function onSubmit(values: PublishJobSchemaAllType) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      const data: JobDetail = {
        endAt: values.jobClosingDate,
        title: values.jobName,
        description: values.description,
        state: values.state,
        city: values.city,
        workModel: values.jobPeriod,
        type: values.jobType,
        status: 'IN_PROGRESS',
        abilities: values.abilities.map((ability) => ability.value),
        workFields: values.categories.map((category) => category.value),
        seniorityLevel: values.seniorityLevel.map((seniority) => seniority.value),
        educationLevel: values.professionalEducationLevel.map(
          (professionalEducation) => professionalEducation.value,
        ),
        pcdInfo: values.items[0],
        ...(values?.minSalary && { minimumSalaryRange: Number(values.minSalary) }),
        ...(values?.maxSalary && { maximumSalaryRange: Number(values.maxSalary) }),
      };

      const response = CorporativeService.RegisterJobOpportunity(
        selectedCorporate?.pjId ?? '',
        data,
      );

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          setCreated();
          setCurrentStep(0);
          jobsOpportunity.refetch();

          return <span data-testId="toast-success">Vaga cadastrada com sucesso</span>;
        },
        error: () => {
          return 'Falha ao cadastrar vaga, revise sua informações e tente novamente...';
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
        {currentStep === 0 && <JobOpportunityForm form={form} />}
        {currentStep === 1 && <SecondPartJobOpportunityForm form={form} />}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8">
            <div className="flex w-full flex-col gap-6">
              <JobOpportunityForm form={form} />
              <SecondPartJobOpportunityForm form={form} />
            </div>
          </div>
        )}
        <footer className="inline-flex w-full gap-4 pb-8 pt-12">
          {currentStep === 0 && (
            <Link to={pagePaths.authenticated.corporatePerson.dashboard} className="w-full">
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
          {currentStep === 2 ? (
            <Button
              type="submit"
              className="w-full"
              variant="success"
              isLoading={form.formState.isSubmitting}
            >
              <SchoolIcon className="mr-1 size-5" />
              Criar Vaga
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              variant="secondary"
              isLoading={form.formState.isSubmitting}
            >
              Avançar
              <ChevronRightIcon className="ml-1 size-5" />
            </Button>
          )}
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedJobOpportunity({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Vaga criada com sucesso!</h2>
        <p className="text-slate-600">
          Volte para a tela inicial ou crie uma nova vaga no botão abaixo.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Link to={pagePaths.authenticated.corporatePerson.dashboard}>
          <Button variant="outline">
            <SchoolIcon className="mr-1 size-5 w-full" />
            Ir para Vagas
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar Vaga
        </Button>
      </div>
    </motion.div>
  );
}
