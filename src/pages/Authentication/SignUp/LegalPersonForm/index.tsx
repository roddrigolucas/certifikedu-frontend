import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Building2Icon,
  CheckCircle2Icon,
  ChevronLeft,
  ChevronRight,
  LockIcon,
  MapIcon,
  UserSquareIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { defaultFormValues } from '@/pages/App/LegalPerson/Profile/validation/schema';
import { Stepper } from '@/components/core/molecules/Stepper';
import { Button } from '@/components/shared/ui/button';
import { Form } from '@/components/shared/ui/form';

import { AuthenticationService } from '@/services/entities/authentication';
import { IRegisterLegalPerson } from '@/services/entities/authentication/types';

import { slideUp } from '@/utils/animations';
import { buildSignInPageUrl, buildSignUpPageUrl } from '@/utils/url';
import { removeNonNumeric } from '@/utils/validation/format';

import AddressForm from '../NaturalPersonForm/forms/AddressForm';
import PasswordForm from '../NaturalPersonForm/forms/PasswordForm';
import PersonalForm from '../NaturalPersonForm/forms/PersonalForm';
import TermsOfUse from '../TermsOfUse';
import CompanyForm from './forms/CompanyForm';
import ReviewForm from './forms/ReviewForm';
import {
  AddressSchema,
  CompanySchema,
  LegalPersonSchema,
  LegalPersonSchemaType,
  PasswordSchema,
  PersonalDataSchema,
} from './validation/schema';

export default function LegalPersonForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [checkedTerms, setCheckedTerms] = useState(false);

  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = CompanySchema;
      break;
    case 2:
      currentSchema = PersonalDataSchema;
      break;
    case 3:
      currentSchema = AddressSchema;
      break;
    case 4:
      currentSchema = PasswordSchema;
      break;
    default:
      currentSchema = LegalPersonSchema;
  }

  const form = useForm<LegalPersonSchemaType>({
    resolver: zodResolver(currentSchema),
    defaultValues: { ...defaultFormValues },
    mode: 'onChange',
  });

  function onSubmit(values: LegalPersonSchemaType) {
    if (currentStep < steps.length - 1) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setCurrentStep(currentStep + 1);
    } else {
      const data: IRegisterLegalPerson = {
        email: values.email,
        documentNumber: removeNonNumeric(values.cnpj),
        password: values.password,
        type: 'PJ',
        pjInfo: {
          razaoSocial: values.companyName,
          nomeFantasia: values.fantasyName,
          dataDeFundacao: values.companyDateCreation,
          telefone: removeNonNumeric(values.companyPhone),
          socios: {
            nome: values.name,
            CPF: removeNonNumeric(values.cpf),
            telefone: removeNonNumeric(values.phone),
            dataDeNascimento: values.birthday,
            cepNumber: removeNonNumeric(values.cep),
            estado: values.state,
            cidade: values.city,
            bairro: values.neighborhood,
            rua: values.street,
            numero: values.number,
            complemento: values.additionalDetails ?? '',
          },
        },
      };

      const response = AuthenticationService.SignUpLegalPerson(data);

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          const emailAddress: string = values.email;
          const verifyEmailAddressPageUrl = buildSignInPageUrl({ emailAddress });

          navigate(verifyEmailAddressPageUrl, { replace: true });

          return `Um código de verificação foi enviado para seu email ${values.email}`;
        },
        error: (error: any) => {
          return `${error?.response?.data?.response?.message ?? error}`;
        },
      });
    }
  }

  const steps = [
    {
      title: 'Dados Corporativos',
      description: 'Razão Social e CNPJ',
      icon: Building2Icon,
    },
    {
      title: 'Dados do Representante',
      description: 'Nome e CPF',
      icon: UserSquareIcon,
    },
    {
      title: 'Endereço',
      description: 'Lougradouro e Número',
      icon: MapIcon,
    },
    {
      title: 'Senha',
      description: 'Escolha sua senha',
      icon: LockIcon,
    },
    {
      title: 'Revisão e Validação',
      description: 'Dados preenchidos',
      icon: CheckCircle2Icon,
    },
  ];

  return (
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
            {currentStep === 0 && <CompanyForm form={form} />}
            {currentStep === 1 && <PersonalForm form={form} />}
            {currentStep === 2 && <AddressForm form={form} />}
            {currentStep === 3 && <PasswordForm form={form} />}
            {currentStep === 4 && <ReviewForm form={form} />}
            {currentStep === 0 && (
              <TermsOfUse checkedTerms={checkedTerms} setCheckedTerms={setCheckedTerms} />
            )}
          </div>
          <footer className="mt-24 grid w-full grid-cols-2 gap-4">
            <Button
              type="button"
              className="col-span-1 w-full"
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                } else {
                  navigate(buildSignUpPageUrl(), {
                    replace: true,
                  });
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
              <Button
                disabled={!checkedTerms}
                type="submit"
                variant="secondary"
                className="group col-span-1 w-full"
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
                {currentStep !== steps.length - 1 && (
                  <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
                )}
              </Button>
            )}
          </footer>
        </form>
      </Form>

      <span className="w-full py-8 text-center text-sm text-slate-600">
        Seus dados serão utilizados de acordo com os termos gerais da LGPD
      </span>
    </motion.div>
  );
}
