/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookOpenIcon, EditIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
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
import { Textarea } from '@/components/shared/ui/textarea';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { SchoolService } from '@/services/entities/app/legalPerson/school';

import { slideUp } from '@/utils/animations';
import { FormatCNPJ, FormatPhone, removeNonNumeric } from '@/utils/validation/format';

import { SchoolSchema, SchoolSchemaType } from './validation/schema';

export default function SchoolEditPage() {
  const { id } = useParams();
  const { selectedPJ } = useProfile();

  const { data, isLoading } = useRequestProcessor().query(
    ['school', id],
    async () => await SchoolService.GetSchool(selectedPJ?.pjId ?? '', id ?? ''),
  );

  const defaultValues = {
    name: data?.name,
    email: data?.email,
    phone: FormatPhone(data?.phone ?? ''),
    document: FormatCNPJ(data?.document ?? ''),
    website: data?.website,
    description: data?.description,
  };

  const form = useForm<SchoolSchemaType>({
    resolver: zodResolver(SchoolSchema),
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  if (isLoading || !data) {
    return <FullscreenLoadingOverlay />;
  }

  function onSubmit(values: SchoolSchemaType) {
    const data = {
      ...values,
      phone: removeNonNumeric(values.phone),
      document: removeNonNumeric(values.document),
    };
    const response = SchoolService.EditSchool(selectedPJ?.pjId ?? '', id ?? '', data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return <span data-testId="toast-success">Unidade editada com sucesso</span>;
      },
      error: () => {
        return 'Falha ao editar unidade...';
      },
      finally: () => {
        queryClient.refetchQueries({ queryKey: ['schools', `PJ: ${selectedPJ?.pjId}`] });
        queryClient.refetchQueries({ queryKey: ['school', id] });
      },
    });
  }

  return (
    <ApplicationLayout
      icon={BookOpenIcon}
      title={data.name ?? 'Unidade de Ensino'}
      isPageLoading={isLoading}
    >
      <div className="space-y-3">
        <BackButton
          data-testId="back-button"
          href={pagePaths.authenticated.naturalPerson.school.root}
        >
          Voltar para Unidades de Ensino
        </BackButton>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            variants={slideUp}
            initial="hidden"
            animate="show"
          >
            <div className="grid grid-cols-12 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Instituição/Organização</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sua instituição/organização"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>E-mail Corporativo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o e-mail" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="(31) 9 9999-9999"
                        onChange={(e) => {
                          const formattedValue = FormatPhone(e.target.value);

                          return field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="document"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="00.000.000/0000-00"
                        onChange={(e) => {
                          const formattedValue = FormatCNPJ(e.target.value);

                          return field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="website"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o Website" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        data-testId="description-textarea"
                        placeholder="Digite a descrição"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <footer className="w-full py-8">
              <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
                <Link to={`/schools/${id}/courses`} className="w-full  md:w-fit">
                  <Button variant="outline" className="w-full md:w-fit">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  data-testId="submit-button"
                  variant="success"
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                >
                  <EditIcon className="mr-1 size-5" />
                  Editar Unidade
                </Button>
              </div>
            </footer>
          </motion.form>
        </Form>
      </div>
    </ApplicationLayout>
  );
}
