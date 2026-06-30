/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { EditIcon, NotebookText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import MultipleSelector from '@/components/shared/ui/extend/multiple-selector';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Textarea } from '@/components/shared/ui/textarea';

import useRequestProcessor from '@/hooks/core/useRequest';

import { PlansService } from '@/services/entities/app/core/plans';
import {
  EBillingType,
  EInterval,
  EPaymentMethod,
  EQuotaPeriod,
} from '@/services/entities/app/core/plans/enums';
import { IPlan } from '@/services/entities/app/core/plans/model';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';
import { FormatUppercase } from '@/utils/validation/format';

import { PlanSchema, PlanSchemaType } from './validation/schema';

export default function AdminEditPlan() {
  const { id } = useParams();
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const setEdited = () => setIsEdited(!isEdited);

  if (!id) {
    return <div>Não encontrado</div>;
  }

  const { data, isLoading } = useRequestProcessor().query(
    ['admin', 'plan', `id: ${id}`],
    async () => await PlansService.GetPlanById(id),
  );

  if (isLoading || !data) {
    return <FullscreenLoadingOverlay />;
  }

  return (
    <ApplicationLayout icon={NotebookText} title={`Editar ${data.planName}`}>
      <BackButton href={pagePaths.authenticated.admin.plans.root}>
        Voltar para Meus Planos
      </BackButton>
      <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
        {isEdited ? <EditedPlan /> : <EditForm plan={data} setEdited={setEdited} />}
      </div>
    </ApplicationLayout>
  );
}

function EditForm({ plan, setEdited }: Readonly<{ setEdited: () => void; plan: IPlan }>) {
  const form = useForm<PlanSchemaType>({
    resolver: zodResolver(PlanSchema),
    mode: 'onChange',
    defaultValues: {
      name: plan.planName,
      description: plan.description,
      descriptionPagarme: plan.descriptionPagarme,
      payment_methods: [{ label: 'Cartão de Crédito', value: EPaymentMethod.CREDIT_CARD }],
      statement_descriptor: plan.statement_descriptor,
      pdiQty: plan.pdisQty,
      pdiPeriod: plan.pdiPeriod,
      emittedCertificatesQuota: plan.emittedCertificatesQuota,
      emittedCertificatesPeriod: plan.emittedCertificatesPeriod,
      receivedCertificateQuota: plan.receivedCertificateQuota,
      receivedCertificatePeriod: plan.receivedCertificatePeriod,
      singleCertificatePrice: plan.singleCertificatePrice / 100,
      price: plan.price / 100,
    },
  });

  function onSubmit(values: PlanSchemaType) {
    const data = {
      planName: values.name,
      description: values.description,
      descriptionPagarme: values.descriptionPagarme,
      statement_descriptor: values.statement_descriptor,
      shippable: false,
      payment_methods: values.payment_methods.map((method) => method.value),
      installments: values.installments.map((installment) => parseInt(installment.value)),
      pdisQty: values.pdiQty,
      pdiPeriod: values.pdiPeriod,
      emittedCertificatesQuota: values.emittedCertificatesQuota,
      emittedCertificatesPeriod: values.emittedCertificatesPeriod,
      receivedCertificateQuota: values.receivedCertificateQuota,
      receivedCertificatePeriod: values.receivedCertificatePeriod,
      singleCertificatePrice: values.singleCertificatePrice * 100,
      price: values.price * 100,
      minimum_price: values.minimumPrice * 100,
      interval: EInterval.MONTH,
      interval_count: 1,
      billing_type: EBillingType.PREPAID,
    };

    const response = PlansService.EditPlan(plan.planId, data);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setEdited();

        return 'Plano editado com sucesso';
      },
      error: () => {
        return 'Falha ao editar plano...';
      },
      finally: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'plans'] });
      },
    });
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-12 gap-4 p-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Nome do Plano</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome do plano" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="payment_methods"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Meios de Pagamento</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={[
                      {
                        label: 'Cartão de Crédito',
                        value: EPaymentMethod.CREDIT_CARD,
                      },
                    ]}
                    placeholder="Selecione os meios de pagamento"
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className="text-center text-sm text-slate-600">
                        Nenhum resultado encontrado
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="statement_descriptor"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Nome da Fatura</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o nome da fatura"
                    onChange={(e) => {
                      const formattedValue = FormatUppercase(e.target.value);

                      return field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormDescription>Como vai vir na fatura do cliente</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="installments"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Parcelamento</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={[
                      { label: '1x', value: '1' },
                      { label: '2x', value: '2' },
                      { label: '3x', value: '3' },
                      { label: '4x', value: '4' },
                      { label: '5x', value: '5' },
                      { label: '6x', value: '6' },
                      { label: '7x', value: '7' },
                      { label: '8x', value: '8' },
                      { label: '9x', value: '9' },
                      { label: '10x', value: '10' },
                      { label: '11x', value: '11' },
                      { label: '12x', value: '12' },
                    ]}
                    placeholder="Selecione os parcelamentos disponiveis"
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className="text-center text-sm text-slate-600">
                        Nenhum resultado encontrado
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="emittedCertificatesQuota"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Quota de Emissões</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite uma quantidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="emittedCertificatesPeriod"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Período de Renovação Emissões</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EQuotaPeriod.MONTHLY}>Mensal</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIMONTHLY}>Bimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.TRIMONTLHY}>Trimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.ANNUALLY}>Anual</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIANNUALLY}>Binual</SelectItem>
                    <SelectItem value={EQuotaPeriod.UNLIMITED}>Ilimitado</SelectItem>
                    <SelectItem value={EQuotaPeriod.FOREVER}>Para Sempre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="receivedCertificateQuota"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Quota de Recebíveis</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite uma quantidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="receivedCertificatePeriod"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Período de Renovação Recebíveis</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EQuotaPeriod.MONTHLY}>Mensal</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIMONTHLY}>Bimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.TRIMONTLHY}>Trimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.ANNUALLY}>Anual</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIANNUALLY}>Binual</SelectItem>
                    <SelectItem value={EQuotaPeriod.UNLIMITED}>Ilimitado</SelectItem>
                    <SelectItem value={EQuotaPeriod.FOREVER}>Para Sempre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pdiQty"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Quota de PDIs</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite uma quantidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pdiPeriod"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Período de Renovação PDI</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EQuotaPeriod.MONTHLY}>Mensal</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIMONTHLY}>Bimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.TRIMONTLHY}>Trimestral</SelectItem>
                    <SelectItem value={EQuotaPeriod.ANNUALLY}>Anual</SelectItem>
                    <SelectItem value={EQuotaPeriod.BIANNUALLY}>Binual</SelectItem>
                    <SelectItem value={EQuotaPeriod.UNLIMITED}>Ilimitado</SelectItem>
                    <SelectItem value={EQuotaPeriod.FOREVER}>Para Sempre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="singleCertificatePrice"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3 lg:col-start-1">
                <FormLabel>Preço por Certificado</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite o preço do certificado" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Preço do Plano</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite o preço do plano" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="minimumPrice"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Preço Mínimo do Plano</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Digite o preço mínimo do plano" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Adicione uma descrição do plano" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="descriptionPagarme"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Descrição PagarMe</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Adicione uma descrição para PagarMe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <footer className="w-full p-6 pb-8">
          <div className="flex flex-col gap-4">
            <Button
              className="ml-auto flex w-fit"
              variant="success"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              <EditIcon className="mr-1 size-5" />
              Editar Plano
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function EditedPlan() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={getImageUrl('images/success/certificate.svg')} alt="Plano" className="size-48" />
        <h2 className="text-2xl font-bold">Plano criado com sucesso!</h2>
        <p className="text-slate-600">
          Seu plano foi criado com sucesso e já está disponível para uso.
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.admin.plans.root}>
          <Button variant="outline">
            <NotebookText className="mr-1 size-5" />
            Meus Planos
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
