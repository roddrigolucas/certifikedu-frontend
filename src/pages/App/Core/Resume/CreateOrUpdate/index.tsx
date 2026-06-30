import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  BadgeInfoIcon,
  BookOpen,
  BriefcaseIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeIcon,
  SchoolIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { Button } from '@/components/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shared/ui/dialog';
import { Form } from '@/components/shared/ui/form';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import { ResumeService } from '@/services/entities/app/core/resume';
import { IResumeResponse } from '@/services/entities/app/core/resume/model';

import { slideUp } from '@/utils/animations';

import { CreateFormAutoemit } from '../../Certificates/Issuer';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { LanguageForm } from './forms/LanguageForm';
import { ResumeForm } from './forms/ResumeForm';
import {
  ResumeSchemaAll,
  ResumeSchemaBasicInfo,
  ResumeSchemaEducation,
  ResumeSchemaExperience,
  ResumeSchemaLanguage,
  ResumeSchemaType,
} from './validation/schema';

export default function CreateOrUpdateResumePage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { resumeId } = useParams();
  const isEdit = !!resumeId;

  const steps = [
    {
      title: 'Informações Básicas',
      description: 'Dados básicos do currículo',
      icon: BadgeInfoIcon,
    },
    {
      title: 'Experiências',
      description: 'Histórico profissional',
      icon: BriefcaseIcon,
    },
    {
      title: 'Educação',
      description: 'Formação acadêmica',
      icon: SchoolIcon,
    },
    {
      title: 'Idiomas',
      description: 'Idiomas que você fala',
      icon: GlobeIcon,
    },
    {
      title: 'Revisão',
      description: 'Verifique suas informações',
      icon: CheckCircle2Icon,
    },
  ];

  return (
    <ApplicationLayout
      icon={BookOpen}
      title={isEdit ? 'Editar Currículo' : 'Criar Currículo'}
      description={
        isEdit
          ? 'Edite seu currículo com detalhes sobre sua experiência e educação.'
          : 'Crie seu currículo com detalhes sobre sua experiência e educação.'
      }
      hideCredits
    >
      <Stepper steps={steps} currentStep={currentStep} />
      <ResumeCreateForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        resumeId={resumeId}
        isEdit={isEdit}
      />
    </ApplicationLayout>
  );
}

function ResumeCreateForm({
  currentStep,
  setCurrentStep,
  resumeId,
  isEdit,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  resumeId?: string;
  isEdit: boolean;
}) {
  const navigate = useNavigate();
  const { updateSpecificProfileInfo } = useProfileStore();
  const queryClient = useQueryClient();

  const [isCertificateCreationgOpen, setCertificateCreationOpen] = useState(false);
  const [isCertificateCreated, setCertificateIsCreated] = useState<boolean>(false);
  const setCreated = () => setCertificateIsCreated(!isCertificateCreated);

  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(getCurrentSchema(currentStep)),
    mode: 'onChange',
    defaultValues: {
      experiences: [],
      educations: [],
      languages: [],
    },
  });

  const { data: existingResume, isLoading } = useQuery(
    ['resume', resumeId],
    () => ResumeService.GetResume(resumeId!),
    {
      enabled: isEdit && !!resumeId,
      onError: () => {
        toast.error('Erro ao carregar o currículo para edição.');
      },
    },
  );

  useEffect(() => {
    if (isEdit && existingResume) {
      const mappedValues = mapResumeToFormValues(existingResume);
      form.reset(mappedValues);
    }
  }, [isEdit, existingResume, form]);

  const onSubmit = async (values: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        if (isEdit && resumeId) {
          await ResumeService.UpdateResume(resumeId, values);
          queryClient.invalidateQueries(['resume', resumeId]);
          toast.success('Currículo atualizado com sucesso!');
          navigate(`/resumes`);
        } else {
          await ResumeService.CreateResume(values);
          queryClient.invalidateQueries(['resumes']);
          updateSpecificProfileInfo({ hasResumes: true });
          toast.success('Currículo criado com sucesso!');
          navigate(`/resumes`);
        }
      } catch (error) {
        toast.error('Erro ao salvar o currículo. Tente novamente.');
      }
    }
  };

  if (isEdit && isLoading) {
    return <PageSkeletonFull />;
  }

  return (
    <>
      <Dialog open={isCertificateCreationgOpen} onOpenChange={setCertificateCreationOpen}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto p-8">
          <DialogHeader>
            <DialogTitle>Emitir certificado para essa experiência</DialogTitle>
          </DialogHeader>
          <CreateFormAutoemit setCreated={setCreated} />
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          variants={slideUp}
          initial="hidden"
          animate="show"
        >
          {currentStep === 0 && <ResumeForm form={form} />}
          {currentStep === 1 && (
            <ExperienceForm form={form} setCertificateCreationOpen={setCertificateCreationOpen} />
          )}
          {currentStep === 2 && (
            <EducationForm form={form} setCertificateCreationOpen={setCertificateCreationOpen} />
          )}
          {currentStep === 3 && <LanguageForm form={form} />}
          {currentStep === 4 && (
            <div className="flex flex-col gap-8">
              <ResumeForm form={form} />
              <ExperienceForm form={form} setCertificateCreationOpen={setCertificateCreationOpen} />
              <EducationForm form={form} setCertificateCreationOpen={setCertificateCreationOpen} />
              <LanguageForm form={form} />
            </div>
          )}
          <footer className="inline-flex w-full gap-4 pb-8 pt-12">
            {currentStep > 0 && (
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ChevronLeftIcon className="mr-1 size-4" />
                Voltar
              </Button>
            )}
            {currentStep < 4 ? (
              <Button type="submit" className="w-full" variant={'secondary'}>
                Avançar
                <ChevronRightIcon className="ml-1 size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full"
                isLoading={form.formState.isSubmitting}
                variant={'secondary'}
              >
                <CheckIcon className="mr-1 size-4" />
                {isEdit ? 'Atualizar' : 'Finalizar'}
              </Button>
            )}
          </footer>
        </motion.form>
      </Form>
    </>
  );
}

function getCurrentSchema(step: number) {
  switch (step) {
    case 0:
      return ResumeSchemaBasicInfo;
    case 1:
      return ResumeSchemaExperience;
    case 2:
      return ResumeSchemaEducation;
    case 3:
      return ResumeSchemaLanguage;
    default:
      return ResumeSchemaAll;
  }
}

function mapResumeToFormValues(data: IResumeResponse): ResumeSchemaType {
  return {
    resumeId: data.resumeId,
    title: data.title || '',
    description: data.description || '',
    experiences: data.experiences.map((exp) => ({
      resumeExperienceId: exp.resumeExperienceId,
      title: exp.title || '',
      description: exp.description || '',
      startYear: exp.startYear,
      startMonth: exp.startMonth,
      endYear: exp.endYear ?? undefined,
      endMonth: exp.endMonth ?? undefined,
      employmentType: exp.employmentType,
      workModel: exp.workModel,
      companyName: exp.companyName,
      companyEmail: exp.companyEmail ?? undefined,
      companyPhone: exp.companyPhone ?? undefined,
      companyCnpj: exp.companyCnpj ?? undefined,
      companyLocation: exp.companyLocation ?? undefined,
      certificates: exp.certificates?.map((cert) => cert.certificateId) || [],
      currentlyWorking: exp.endYear ? false : true,
    })),
    educations: data.educations.map((edu) => ({
      resumeEducationId: edu.resumeEducationId,
      title: edu.title || '',
      description: edu.description || '',
      startYear: edu.startYear,
      startMonth: edu.startMonth,
      endYear: edu.endYear ?? undefined,
      endMonth: edu.endMonth ?? undefined,
      institutionName: edu.institutionName,
      institutionEmail: edu.institutionEmail ?? undefined,
      institutionPhone: edu.institutionPhone ?? undefined,
      institutionCnpj: edu.institutionCnpj ?? undefined,
      institutionLocation: edu.institutionLocation ?? undefined,
      certificates: edu.certificates?.map((cert) => cert.certificateId) || [],
      currentlyStudying: edu.endYear ? false : true,
    })),
    languages: data.languages.map((lang) => ({
      resumeLanguageId: lang.resumeLanguageId,
      language: lang.language,
      level: lang.level,
      certificates: lang.certificates?.map((cert) => cert.certificateId) || [],
    })),
  };
}
