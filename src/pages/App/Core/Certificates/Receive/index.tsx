import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FileBadge, Info } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { Logo } from '@/components/core/atoms/Logo';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import useCertificate from '@/hooks/core/useCertificate';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';
import { TemplateService } from '@/services/entities/app/naturalPerson/templates';
import { ICreateCertificate } from '@/services/entities/app/naturalPerson/templates/types';

import { buildSignInPageUrl, buildSignUpPageUrl } from '@/utils/url';
import { FormatCPF, removeNonNumeric } from '@/utils/validation/format';

import { CertificateReceiveSchema, CertificateReceiveSchemaType } from './validation/schema';

interface IHasAccount {
  hasAccount: boolean;
}

function QrCodeInvalid() {
  return (
    <div className="relative h-full min-h-screen bg-white">
      <Helmet>
        <title>CertifikEDU</title>
      </Helmet>
      <header className="flex w-full flex-col border border-ecstasy-100 bg-white">
        <div className=" inline-flex h-20 w-full items-center bg-ecstasy-50 md:h-24">
          <div className="container inline-flex items-center">
            <Logo path="images/logo_text_color.svg" className="h-8 md:h-10" />
          </div>
        </div>
      </header>
      <div className="absolute w-full select-none bg-ecstasy-50 " />
      <div className="container relative z-10 flex flex-col items-center gap-8 py-12 md:gap-12">
        <Info className=" size-20" />
        <h2 className="text-center text-xl font-bold md:text-4xl">
          QRCode expirado ou excedeu o limite de emissões :(
        </h2>
      </div>
    </div>
  );
}

export default function CertificateReceivePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch, lastCertificatesState } = useCertificate();

  const { mutate: hasAccount } = useMutation<IHasAccount, Error, any>(
    ({ userToCheckEmail, CheckUserDocument }) =>
      CertificateService.HasAccount(userToCheckEmail, CheckUserDocument),
  );

  const { mutate: CheckCPFIssuer } = useMutation<any, Error, any>(
    ({ templateId, CheckUserDocument }) =>
      CertificateService.CheckCPFIssuer(templateId, CheckUserDocument),
  );

  const form = useForm<CertificateReceiveSchemaType>({
    resolver: zodResolver(CertificateReceiveSchema),
    mode: 'onChange',
  });

  const { isLoading: isLoadingData, data } = useRequestProcessor().query(
    ['template', `id: ${id}`],
    async () => await TemplateService.GetById(id ?? ''),
    {
      enabled: !!id,
    },
  );

  if (isLoadingData || !data || !id) {
    return <FullscreenLoadingOverlay />;
  }

  function handleSubmit(values: CertificateReceiveSchemaType) {
    setIsLoading(true);

    const data: ICreateCertificate = {
      templateId: id ?? '',
      name: values.name,
      email: values.email,
      docNumber: removeNonNumeric(values.document),
    };

    CheckCPFIssuer(
      { templateId: data.templateId, CheckUserDocument: data.docNumber },
      {
        onSuccess: (response: { allowed: boolean }) => {
          if (!response.allowed) {
            setIsLoading(false);
            toast.error('CPF sem permissão para emissão do certificado!', {
              duration: 4000,
            });

            return;
          }

          const responseCreateCertificate = TemplateService.CreateCertificate(data);

          toast.promise(responseCreateCertificate, {
            success: () => {
              hasAccount(
                { userToCheckEmail: values.email, CheckUserDocument: values.document },
                {
                  onSuccess: (data: IHasAccount) => {
                    if (data?.hasAccount) {
                      refetch();
                      lastCertificatesState.refetch();
                      navigate(buildSignInPageUrl());
                    } else {
                      navigate(
                        buildSignUpPageUrl({
                          type: 'PF',
                          name: values.name,
                          email: values.email,
                          document: values.document,
                        }),
                      );
                    }
                  },
                },
              );

              return `Certificado emitido com sucesso para ${values.name} e enviado para ${values.email}`;
            },
            error: () => {
              return 'Falha ao emitir certificado...';
            },
            finally: () => {
              setIsLoading(false);
            },
          });
        },
        onError: () => {
          setIsLoading(false);
          toast.error('Falha ao buscar informações do usuário..', {
            duration: 2000,
          });

          return;
        },
      },
    );
  }

  if (!data.hasStarted || data.isExpired || data.isLimitOfIssuesReached) {
    return QrCodeInvalid();
  } else {
    return (
      <div className="relative h-full min-h-screen bg-white">
        <Helmet>
          <title>Receba seu certificado - CertifikEDU</title>
        </Helmet>
        <header className="flex w-full flex-col border border-ecstasy-100 bg-white">
          <div className=" inline-flex h-20 w-full items-center bg-ecstasy-50 md:h-24">
            <div className="container inline-flex items-center">
              <Logo path="images/logo_text_color.svg" className="h-8 md:h-10" />
            </div>
          </div>
        </header>
        <div className="absolute w-full select-none bg-ecstasy-50 " />
        <div className="container relative z-10 flex flex-col items-center gap-8 py-12 md:gap-12">
          <h2 className="text-center text-xl font-bold md:text-4xl">
            Receba agora seu certificado! 🎉
          </h2>
          <div className="max-w-lg text-center">
            <h3 className="text-lg font-bold">{data.name}</h3>
          </div>
          <Form {...form}>
            <form
              className="flex w-full max-w-md flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Digite seu e-mail" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="document"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="000.000.000-00"
                        onChange={(e) => {
                          const formattedValue = FormatCPF(e.target.value);

                          return field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button isLoading={isLoading} type="submit" variant="success" className="mt-4">
                <FileBadge className="mr-1 size-5" />
                Emitir certificado
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
}
