import { useState } from 'react';

import Select from '@cloudscape-design/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookA, BookCheck, NotebookText, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

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

import useAbilitie from '@/hooks/core/useAbilitie';

import { AdminService } from '@/services/entities/app/admin';
import { IAdminAbility } from '@/services/entities/app/admin/model';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { AbilitiesSchema, AbilitiesSchemaType } from './validation/schema';

export default function AdminCreateAbility() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout icon={BookA} title="Criar Categoria ou Habilidade">
      <BackButton href={pagePaths.authenticated.admin.abilities.root}>
        Voltar para Habilidades Cadastradas
      </BackButton>
      <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
        {isCreated ? (
          <CreatedAbility setCreated={setCreated} />
        ) : (
          <CreateAbilityForm setCreated={setCreated} />
        )}
      </div>
    </ApplicationLayout>
  );
}

function CreateAbilityForm({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const { categories } = useAbilitie();
  const [categoryType, setCategoryType] = useState<string>('existing');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const createAbilityOptions = [
    { label: 'Criar nova categoria', value: 'new' },
    { label: 'Vincular a uma categoria existente', value: 'existing' },
  ];

  const form = useForm<AbilitiesSchemaType>({
    resolver: zodResolver(AbilitiesSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  function onSubmit(values: AbilitiesSchemaType) {
    const data: IAdminAbility = {
      category: values.category,
      ability: values.ability,
      source: values.source,
    };

    const response = AdminService.CreateAbility(data);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();

        return 'Habilidade cadastrada com sucesso';
      },
      error: () => {
        return 'Falha ao cadastrar habilidade...';
      },
      finally: () => {
        queryClient.refetchQueries({ queryKey: ['abilities'] });
        queryClient.refetchQueries({ queryKey: ['themes'] });
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
        <div className="grid grid-cols-3 gap-5 p-6">
          <FormField
            name="categoryType"
            control={form.control}
            render={() => (
              <FormItem className="col-span-12 lg:col-span-1">
                <FormLabel>Escolha uma opção</FormLabel>
                <FormControl>
                  <Select
                    options={createAbilityOptions}
                    onChange={(value) =>
                      setCategoryType(value.detail.selectedOption.value ?? 'new')
                    }
                    selectedOption={
                      createAbilityOptions.find((option) => option.value === categoryType) ||
                      createAbilityOptions[0]
                    }
                  ></Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {categoryType === 'new' && (
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel>Nova Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da nova categoria" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {categoryType === 'existing' && (
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel>Categorias Existentes</FormLabel>
                  <FormControl>
                    <Select
                      selectedOption={selectedCategory}
                      options={categories?.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      onChange={({ detail }) => {
                        field.onChange(detail.selectedOption.value);
                        setSelectedCategory(detail.selectedOption);
                      }}
                      virtualScroll={true}
                      filteringType="auto"
                      placeholder="Selecione..."
                    ></Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="ability"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Nova Competência/Habilidade</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite a nova competência/habilidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="source"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-1">
                <FormLabel>Origem</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite a origem/fonte da habilidade" />
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
              variant="secondary"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              <BookCheck className="mr-1 size-5" />
              Cadastrar Habilidade
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedAbility({ setCreated }: Readonly<{ setCreated: () => void }>) {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={getImageUrl('images/success/certificate.svg')} alt="Email" className="size-48" />
        <h2 className="text-2xl font-bold">Habilidade cadastrada com sucesso!</h2>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.admin.abilities.root}>
          <Button variant="outline">
            <NotebookText className="mr-1 size-5" />
            Habilidades Cadastradas
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar outra Habilidade
        </Button>
      </div>
    </motion.div>
  );
}
