import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookA, BookCheck, NotebookText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
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

import { IAbilityTransformed } from '..';
import { AbilitiesSchema, AbilitiesSchemaType } from './validation/schema';

export default function AdminEditAbility() {
  const { id } = useParams();
  const { abilities } = useAbilitie();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const setEdited = () => setIsEdited(!isEdited);
  const [selectedAbility, setSelectedAbilty] = useState<IAbilityTransformed | null>(null);

  useEffect(() => {
    if (id && abilities) {
      let defaultAbility = null;
      for (const category in abilities) {
        if (abilities.hasOwnProperty(category)) {
          const ability = abilities[category].find((ability) => ability.habilidadeId === id);
          if (ability) {
            defaultAbility = { ...ability, tema: category };
            break;
          }
        }
      }
      setSelectedAbilty(defaultAbility);
    }
  }, [id, abilities]);

  if (!id) {
    return <div>Habilidade não encontrada!</div>;
  }

  return (
    <ApplicationLayout icon={BookA} title="Editar Habilidade">
      <BackButton href={pagePaths.authenticated.admin.abilities.root}>
        Voltar para Habilidades Cadastradas
      </BackButton>
      <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
        {isEdited ? (
          <EditedAbility />
        ) : selectedAbility ? (
          <EditAbilityForm abilityValue={selectedAbility} setEdited={setEdited} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <PuffLoader size="3rem" color="#64748B" />
            Buscando...
          </div>
        )}
      </div>
    </ApplicationLayout>
  );
}

function EditAbilityForm({
  abilityValue,
  setEdited,
}: Readonly<{ setEdited: () => void; abilityValue: IAbilityTransformed }>) {
  const form = useForm<AbilitiesSchemaType>({
    resolver: zodResolver(AbilitiesSchema),
    mode: 'onChange',
    defaultValues: {
      category: abilityValue.tema,
      ability: abilityValue.habilidade,
    },
  });

  function onSubmit(values: AbilitiesSchemaType) {
    const data: IAdminAbility = {
      category: values.category,
      ability: values.ability,
      source: values.ability,
    };

    const response = AdminService.UpdateAbility(abilityValue.habilidadeId, data);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setEdited();

        return 'Habilidade atualizada com sucesso';
      },
      error: () => {
        return 'Falha ao atualizar habilidade...';
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
        <div className="grid grid-cols-2 gap-5 p-6">
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Categoria Vinculada</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite a categoria" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ability"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Alterar Competência/Habilidade</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite a habilidade" />
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
              Atualizar Habilidade
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function EditedAbility() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={getImageUrl('images/success/certificate.svg')} alt="Plano" className="size-48" />
        <h2 className="text-2xl font-bold">Habilidade editada com sucesso!</h2>
        <p className="text-slate-600">
          Seu habilidade foi atualizada com sucesso e já está disponível para uso.
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Link to={pagePaths.authenticated.admin.abilities.root}>
          <Button variant="outline">
            <NotebookText className="mr-1 size-5" />
            Habilidades Cadastradas
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
