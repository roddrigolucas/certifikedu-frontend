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
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import { ProfessionalProfileService } from '@/services/entities/app/core/professionalProfile';
import { IProfessionalProfile } from '@/services/entities/app/core/professionalProfile/model';

import { slideUp } from '@/utils/animations';

import { ProfessionalProfileForm } from './forms/ProfessionalProfileForm';
import { SecondPartProfessionalProfileForm } from './forms/SecondPartProfessionalProfileForm';
import {
  ProfessionalProfileSchema,
  ProfessionalProfileSchemaAll,
  ProfessionalProfileSchemaAllType,
  SecondPartProfessionalProfileSchema,
} from './validation/schema';

export default function CreateProfessionalProfilePage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <ApplicationLayout
      icon={SchoolIcon}
      title="Criar Perfil Profissional de Emprego"
      description="Crie seu perfil professional com requisitos detalhados, incluindo competências, qualificações específicas, para garantir que seja encontrado como um candidato alinhado com a vaga."
      hideCredits
    >
      <BackButton href={pagePaths.authenticated.corporatePerson.dashboard}>
        Voltar para Meu Painel
      </BackButton>
      <Stepper
        steps={[
          {
            title: 'Experiência profissional',
            description: 'Descreva com detalhes sua experiência',
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
        <SchoolCreateForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </ApplicationLayout>
  );
}

function SchoolCreateForm({
  currentStep,
  setCurrentStep,
}: Readonly<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>) {
  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = ProfessionalProfileSchema;
      break;
    case 2:
      currentSchema = SecondPartProfessionalProfileSchema;
      break;
    default:
      currentSchema = ProfessionalProfileSchemaAll;
  }
  const { updateSpecificProfileInfo } = useProfileStore();

  const form = useForm<ProfessionalProfileSchemaAllType>({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
    defaultValues: {
      items: ['false'],
    },
  });

  function onSubmit(values: ProfessionalProfileSchemaAllType) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      const data: IProfessionalProfile = {
        description: values.description,
        state: values.state,
        city: values.city,
        workModel: values.jobPeriod.map((workModel) => workModel.value),
        opportunityType: values.jobType.map((type) => type.value),
        yearsOfExperience: Number(values.yearsOfExperience),
        openToWork: true,
        workFields: values.categories.map((category) => category.value),
        seniorityLevel: values.seniorityLevel.map((seniority) => seniority.value),
        educationLevel: values.professionalEducationLevel.map(
          (professionalEducation) => professionalEducation.value,
        ),
        isPcd: values.items[0] === 'true' ? true : false,
      };

      const response = ProfessionalProfileService.SaveProfessionalProfile(data);
      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          updateSpecificProfileInfo({ hasProfessionalProfile: true });
          setCurrentStep(0);

          return (
            <span data-testId="toast-success">Perfil Profissional cadastrado com sucesso</span>
          );
        },
        error: () => {
          return 'Falha ao cadastrar Perfil Profissional, revise sua informações e tente novamente...';
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
        {currentStep === 0 && <ProfessionalProfileForm form={form} />}
        {currentStep === 1 && <SecondPartProfessionalProfileForm form={form} />}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8">
            <div className="flex w-full flex-col gap-6">
              <ProfessionalProfileForm form={form} />
              <SecondPartProfessionalProfileForm form={form} />
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
              data-testId="submit-button"
              className="w-full"
              variant="success"
              isLoading={form.formState.isSubmitting}
            >
              <SchoolIcon className="mr-1 size-5" />
              Criar Perfil Profissional
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
        </footer>
      </motion.form>
    </Form>
  );
}
