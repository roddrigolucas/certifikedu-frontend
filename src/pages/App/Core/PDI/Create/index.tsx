import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SchoolIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import useProfile from '@/hooks/core/useProfile';

import { PDIService } from '@/services/entities/app/core/pdi';
import { IPDI } from '@/services/entities/app/core/pdi/model';

import { slideUp } from '@/utils/animations';

import { PDIForm } from './forms/PDIForm';
import { SecondPartPDIForm } from './forms/SecondPartPDIForm';
import {
  PDISchema,
  PDISchemaAll,
  PDISchemaAllType,
  SecondPartPDISchema,
} from './validation/schema';

export default function CreatePDIPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <ApplicationLayout
      icon={SchoolIcon}
      title="Criar Plano de Desenvolvimento Individual (PDI)"
      description="Nosso modelo de Inteligência Artificial ajuda você a criar um Plano de Desenvolvimento Individual (PDI) de forma rápida e personalizada! Ele entende suas habilidades, metas e preferências, e a partir disso, gera um plano passo a passo para o seu crescimento pessoal e profissional.
                  Com o nosso PDI, você terá recomendações de cursos, leituras e atividades adequadas às suas necessidades, ajudando a alcançar seus objetivos de maneira clara e organizada. E o melhor de tudo? Ele é fácil de usar e adaptável a diferentes perfis!"
      hideCredits
    >
      <div>
        <BackButton href={pagePaths.authenticated.pdi.root}>Voltar para PDIs</BackButton>
      </div>
      <Stepper
        steps={[
          {
            title: 'Definição dos Objetivos',
            description: 'Descreva com detalhes',
            icon: SchoolIcon,
          },
          {
            title: 'Autoavaliação',
            description: 'Dados pessoais',
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
        <PdiCreateForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </ApplicationLayout>
  );
}

function PdiCreateForm({
  currentStep,
  setCurrentStep,
}: Readonly<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>) {
  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = PDISchema;
      break;
    case 2:
      currentSchema = SecondPartPDISchema;
      break;
    default:
      currentSchema = PDISchemaAll;
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { existingPDIs } = useProfile();
  const navigate = useNavigate();

  const form = useForm<PDISchemaAllType>({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
  });

  function onSubmit(values: PDISchemaAllType) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      const data: IPDI = {
        title: values.title,
        dailyTime: values.dailyDedication,
        previousEducation: values.previousExperience,
        skills: values.learningTopics,
        goals: values.learningGoal,
      };
      setIsLoading(true);
      const response = PDIService.CreatePDI(data);

      toast.promise(response, {
        loading: 'Gerando seu PDI com Inteligência Artificial, isso pode levar alguns segundos...',
        success: (res) => {
          existingPDIs.refetch();
          navigate(pagePaths.authenticated.pdi.graph.replace(':id', res.pdiId), {
            replace: true,
          });

          return 'Seu PDI foi gerado com sucesso!';
        },
        error: () => {
          return 'Falha ao criar seu PDI, revise as informações e tente novamente...';
        },
        finally: () => {
          setIsLoading(false);
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
        {currentStep === 0 && <PDIForm form={form} />}
        {currentStep === 1 && <SecondPartPDIForm form={form} />}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8">
            <div className="flex w-full flex-col gap-6">
              <PDIForm form={form} />
              <SecondPartPDIForm form={form} />
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
              isLoading={isLoading}
              disabled={isLoading}
            >
              <SchoolIcon className="mr-1 size-5" />
              Criar PDI
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
