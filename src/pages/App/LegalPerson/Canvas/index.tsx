import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  ChevronLeft,
  ChevronRight,
  GlobeIcon,
  KeyRoundIcon,
  MonitorDotIcon,
  SettingsIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CanvasService } from '@/services/entities/app/legalPerson/canvas';
import {
  ICreateUserLTIConfiguration,
  IUserLTIConfigurationResponse,
} from '@/services/entities/app/legalPerson/canvas/types';

import { slideUp } from '@/utils/animations';

import CanvasAPIKeyConfigurationForm from './forms/CanvasAPIKeyConfigurationForm';
import URLForm from './forms/CanvasInstanceForm';
import LTIConfigurationForm from './forms/LTIKeyConfigurationForm';
import ReviewForm from './forms/ReviewForm';
import {
  CanvasAPIKeyConfigurationSchema,
  CanvasSchema,
  CanvasSchemaType,
  LTIConfigurationSchema,
  URLSchema,
} from './validation/schema';

interface UserLTIConfigurationDetailsProps {
  ltiConfigurationData: IUserLTIConfigurationResponse;
  onEdit: () => void;
}

const UserLTIConfigurationDetails: React.FC<UserLTIConfigurationDetailsProps> = ({
  ltiConfigurationData,
  onEdit,
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-sm border p-4 shadow-md">
      <h1 className="text-xl font-bold">Configurações Canvas</h1>
      <div className="w-full">
        <label className="block font-semibold">URL Canvas</label>
        <input
          type="text"
          value={ltiConfigurationData.canvasDomain}
          readOnly
          className="w-full rounded border-gray-300 bg-gray-100 p-2"
        />
      </div>
      <div className="w-full">
        <label className="block font-semibold">Chave LTI</label>
        <input
          type="text"
          value={ltiConfigurationData.canvasClientIdLTI}
          readOnly
          className="w-full rounded border-gray-300 bg-gray-100 p-2"
        />
      </div>
      <div className="w-full">
        <label className="block font-semibold">Chave API Canvas</label>
        <input
          type="text"
          value={ltiConfigurationData.canvasClientIdDevKey}
          readOnly
          className="w-full rounded border-gray-300 bg-gray-100 p-2"
        />
      </div>
      <Button onClick={onEdit} variant="secondary">
        <SettingsIcon className="mr-2" />
        Alterar Configurações
      </Button>
    </div>
  );
};

export default function CanvasPage() {
  const { UpdateCredits } = useProfile();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [enableLTIConfigurationStep, setEnableLTIConfigurationStep] = useState<boolean>(false);

  const { data: userLTIConfiguration, refetch: refetchUserLTIConfiguration } =
    useRequestProcessor().query<any>(
      ['userLTI'],
      async () => await CanvasService.GetUserLTIConfiguration(),
    );

  const { data: ltiConfigurationData } = useRequestProcessor().query<any>(
    ['lti'],
    async () => await CanvasService.GetGlobalLTIConfiguration(),
  );

  const { data: canvasConfiguration } = useRequestProcessor().query(
    ['canvas'],
    async () => await CanvasService.GetCanvasConfiguration(),
  );

  function onSubmit(values: CanvasSchemaType) {
    if (currentStep < steps.length - 1) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setCurrentStep(currentStep + 1);
    } else {
      const data: ICreateUserLTIConfiguration = {
        canvasDomain: values.url,
        canvasClientIdLTI: values.ltiClientId,
        canvasClientSecretLTI: values.ltiClientSecret,
        canvasClientIdDevKey: values.canvasClientId,
        canvasClientSecretDevKey: values.canvasClientSecret,
      };
      let response;
      if (!!userLTIConfiguration) {
        response = CanvasService.UpdateUserLTIConfiguration(data);
      } else {
        response = CanvasService.CreateUserLTIConfiguration(data);
      }
      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          refetchUserLTIConfiguration();
          setEnableLTIConfigurationStep(false);
          setCurrentStep(0);
          form.reset();
          UpdateCredits();

          return `Configuração Canvas ${!!userLTIConfiguration ? 'atualizada' : 'criada'} com sucesso!`;
        },
        error: () => {
          return `Erro ao ${!!userLTIConfiguration ? 'atualizar' : 'criar'} configuração Canvas. Tente novamente ou entre em contato com o suporte.`;
        },
      });
    }
  }

  const steps = [
    {
      title: 'Instância Canvas',
      description: 'Informe a URL da sua instância Canvas',
      icon: GlobeIcon,
    },
    {
      title: 'Chave LTI',
      description: 'Crie uma chave LTI para integração e informe os dados gerados',
      icon: KeyRoundIcon,
    },
    {
      title: 'Chave API Canvas',
      description: 'Criar uma chave Canvas API para integração',
      icon: KeyRoundIcon,
    },
    {
      title: 'Revisão e Validação',
      description: 'Confirme os dados preenchidos',
      icon: CheckCircle2Icon,
    },
  ];

  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = URLSchema;
      break;
    case 2:
      currentSchema = LTIConfigurationSchema;
      break;
    case 3:
      currentSchema = CanvasAPIKeyConfigurationSchema;
      break;
    default:
      currentSchema = CanvasSchema;
  }

  const form = useForm<CanvasSchemaType>({
    resolver: zodResolver(currentSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  return (
    <ApplicationLayout icon={MonitorDotIcon} title="Integração Canvas" hideCredits>
      {!!userLTIConfiguration && ltiConfigurationData && (
        <UserLTIConfigurationDetails
          ltiConfigurationData={userLTIConfiguration}
          onEdit={() => setEnableLTIConfigurationStep(!enableLTIConfigurationStep)}
        />
      )}
      {!enableLTIConfigurationStep && !!!userLTIConfiguration && (
        <div className="grid-cols-12">
          <p>Você ainda não possui uma configuração Canvas.</p>
          <br />
          <Button
            onClick={() => {
              setEnableLTIConfigurationStep(true);
            }}
            variant="secondary"
          >
            <SettingsIcon className="mr-2" />
            Configurar Canvas
          </Button>
        </div>
      )}
      {enableLTIConfigurationStep && (
        <motion.div
          className="flex w-full flex-col items-center justify-center gap-8"
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <header>
            <h1 className="text-xl font-bold">{steps[currentStep].title}</h1>
          </header>
          <Stepper steps={steps} currentStep={currentStep} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="md:min-h-[248px]">
                {currentStep === 0 && <URLForm form={form} />}
                {currentStep === 1 && (
                  <LTIConfigurationForm form={form} ltiConfigurationData={ltiConfigurationData} />
                )}
                {currentStep === 2 && (
                  <CanvasAPIKeyConfigurationForm
                    form={form}
                    canvasConfigResponse={canvasConfiguration}
                  />
                )}
                {currentStep === 3 && (
                  <ReviewForm
                    form={form}
                    ltiConfigurationData={ltiConfigurationData}
                    canvasConfiguration={canvasConfiguration}
                  />
                )}
              </div>

              <footer className="mt-16 grid w-full grid-cols-2 gap-4">
                <Button
                  type="button"
                  className="col-span-1 w-full"
                  onClick={() => {
                    if (currentStep > 0) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      navigate('/canvas');
                    }
                  }}
                  variant="outline"
                >
                  {currentStep > 0 && (
                    <ChevronLeft className="ease mr-1 size-5 transition-transform duration-500 group-hover:-translate-x-1" />
                  )}
                  {currentStep > 0 ? 'Anterior' : 'Cancelar'}
                </Button>

                {currentStep != steps.length && (
                  <Button type="submit" variant="secondary" className="group col-span-1 w-full">
                    {currentStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
                    {currentStep !== steps.length - 1 && (
                      <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
                    )}
                  </Button>
                )}
              </footer>
            </form>
          </Form>
        </motion.div>
      )}
    </ApplicationLayout>
  );
}
