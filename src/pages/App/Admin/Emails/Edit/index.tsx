import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, NotebookText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
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

import { useGalleryContext } from '@/hooks/core/useGallery';

import { AdminService } from '@/services/entities/app/admin';
import { IEmail, IUpdateEmailTemplate } from '@/services/entities/app/admin/model';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { EmailSchema, EmailSchemaType, ETypeEmail } from './validation/schema';

export default function AdminEditEmail() {
  const { id } = useParams();
  const { emailValue } = useGalleryContext();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<IEmail | null>(null);
  const setEdited = () => setIsEdited(!isEdited);

  useEffect(() => {
    if (id && emailValue) {
      const foundEmail = emailValue.find((email) => email.emailId === id);
      setSelectedEmail(foundEmail || null);
    }
  }, [id, emailValue]);

  if (!id || !selectedEmail) {
    return <div>Não encontrado</div>;
  }

  return (
    <ApplicationLayout icon={Mail} title="Editar email">
      <BackButton href={pagePaths.authenticated.admin.emails.root}>
        Voltar para Meus Emails
      </BackButton>

      <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
        {isEdited ? <EditedEmail /> : <EditForm emailValue={selectedEmail} setEdited={setEdited} />}
      </div>
    </ApplicationLayout>
  );
}

function EditForm({
  emailValue,
  setEdited,
}: Readonly<{ setEdited: () => void; emailValue: IEmail }>) {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    mode: 'onChange',
    defaultValues: {
      name: emailValue.templateName,
      subject: emailValue.subject,
      variablesNames: emailValue.variablesNames.map((name) => ({ label: name, value: name })),
      types: emailValue.types.map((type) => ({ label: type, value: type })),
    },
  });

  function onSubmit(values: EmailSchemaType) {
    const data: IUpdateEmailTemplate = {
      templateName: values.name,
      templateKey: values.name + '.tsx',
      subject: values.subject,
      variables: JSON.stringify(values.variables),
      types: values.types.map((item) => item.value),
      variablesNames: values.variablesNames.map((item) => item.value),
    };

    const response = AdminService.UpdateEmailTemplate(emailValue.emailId, data);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setEdited();

        return 'Email atualizado com sucesso';
      },
      error: () => {
        return 'Falha ao atualizar o email...';
      },
      finally: () => {
        queryClient.refetchQueries({ queryKey: ['admin', 'emails'] });
      },
    });
  }

  const renderVarsFields = () => {
    let varsNames = form.watch('variablesNames') || [];
    let numVars = varsNames.length;
    let fields = [];
    for (let i = 1; i <= numVars; i++) {
      const varName = `var${i}`;
      fields.push(
        <FormField
          key={varName}
          name={`variables.${varName}`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-5">
              <FormLabel>{`Variável ${i}`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={`Digite o valor da ${varName}`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />,
      );
    }

    return fields;
  };

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-5 gap-5 p-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
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
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Variáveis</FormLabel>
                <FormControl>
                  <MultipleSelector
                    key="variables-selector"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="types"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Tipo de Email</FormLabel>
                <FormControl>
                  <MultipleSelector
                    key="variables-selector"
                    value={field.value}
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
                <FormMessage />
              </FormItem>
            )}
          />
          {renderVarsFields()}
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
              Atualizar Email
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function EditedEmail() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={getImageUrl('images/success/certificate.svg')} alt="Plano" className="size-48" />
        <h2 className="text-2xl font-bold">Email atualizado com sucesso!</h2>
        <p className="text-slate-600">
          Seu email foi atualizado com sucesso e já está disponível para uso.
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.admin.emails.root}>
          <Button variant="outline">
            <NotebookText className="mr-1 size-5" />
            Meus Emails
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
