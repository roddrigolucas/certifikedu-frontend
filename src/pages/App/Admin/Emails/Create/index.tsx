import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, NotebookText, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import MultipleSelector from '@/components/shared/ui/extend/multiple-selector';
import {
  Form,
  FormControl,
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

import { AdminService } from '@/services/entities/app/admin';
import { IRegisterEmailTemplate } from '@/services/entities/app/admin/model';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { EIsDeletable, EmailSchema, EmailSchemaType, ETypeEmail } from './validation/schema';

export default function AdminCreateEmail() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout icon={Mail} title="Criar novo email">
      <BackButton href={pagePaths.authenticated.admin.emails.root}>
        Voltar para Meus Emails
      </BackButton>
      <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
        {isCreated ? (
          <CreatedEmail setCreated={setCreated} />
        ) : (
          <CreateForm setCreated={setCreated} />
        )}
      </div>
    </ApplicationLayout>
  );
}

function CreateForm({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  function onSubmit(values: EmailSchemaType) {
    const data: IRegisterEmailTemplate = {
      templateName: values.name,
      templateKey: values.name + '.tsx',
      subject: values.subject,
      variables: JSON.stringify(null),
      variablesNames: values.variablesNames.map((item) => item.value),
      types: values.types.map((item) => item.value),
      deletable: values.deletable === EIsDeletable.Yes ? true : false,
    };

    const response = AdminService.RegisterEmailTemplate(data);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();

        return 'Email criado com sucesso';
      },
      error: () => {
        return 'Falha ao criar email...';
      },
      finally: () => {
        queryClient.refetchQueries({ queryKey: ['admin', 'emails'] });
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
        <div className="grid grid-cols-4 gap-5 p-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome do email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o assunto do email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="variablesNames"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Variáveis</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={[
                      { label: 'var1', value: 'var1' },
                      { label: 'var2', value: 'var2' },
                      { label: 'var3', value: 'var3' },
                      { label: 'var4', value: 'var4' },
                      { label: 'var5', value: 'var5' },
                      { label: 'var6', value: 'var6' },
                      { label: 'var7', value: 'var7' },
                      { label: 'var8', value: 'var8' },
                      { label: 'var9', value: 'var9' },
                      { label: 'var10', value: 'var10' },
                      { label: 'var11', value: 'var11' },
                      { label: 'var12', value: 'var12' },
                      { label: 'var13', value: 'var13' },
                      { label: 'var14', value: 'var14' },
                      { label: 'var15', value: 'var15' },
                    ]}
                    placeholder="Selecione as variáveis disponíveis"
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className="text-center text-sm text-slate-600">
                        Nenhum resultado encontrado
                      </p>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="types"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-1">
                <FormLabel>Tipo de Usuário</FormLabel>
                <FormControl>
                  <MultipleSelector
                    onChange={field.onChange}
                    defaultOptions={[
                      { label: 'Pessoa Física', value: ETypeEmail.PF },
                      { label: 'Pessoa Jurídica', value: ETypeEmail.PJ },
                      { label: 'Admin', value: ETypeEmail.AD },
                    ]}
                    placeholder="Selecione os tipos disponíveis"
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className="text-center text-sm text-slate-600">
                        Nenhum resultado encontrado
                      </p>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="deletable"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-1">
                <FormLabel>Deletável</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EIsDeletable.Yes}>Sim</SelectItem>
                    <SelectItem value={EIsDeletable.No}>Não</SelectItem>
                  </SelectContent>
                </Select>
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
              <NotebookText className="mr-1 size-5" />
              Criar Email
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedEmail({ setCreated }: Readonly<{ setCreated: () => void }>) {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={getImageUrl('images/success/certificate.svg')} alt="Email" className="size-48" />
        <h2 className="text-2xl font-bold">Email criado com sucesso!</h2>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.admin.emails.root}>
          <Button variant="outline">
            <NotebookText className="mr-1 size-5" />
            Meus Emails
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar outro Email
        </Button>
      </div>
    </motion.div>
  );
}
