/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ChevronLeft, Medal, Trophy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import FileUploadDropzone from '@/pages/App/Core/Certificates/Issuer/DropZone';
import { ApplicationLayout } from '@/components/layouts/app';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Textarea } from '@/components/shared/ui/textarea';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

import { slideUp } from '@/utils/animations';

import { MissionTriggerType } from '../Missions/mission-schema';
import { AchievementFormSchema, AchievementFormSchemaType } from './achievement-schema';

export default function AchievementForm() {
  const navigate = useNavigate();
  const { isLoadingPJ } = useProfile();

  const [file, setFile] = useState<File | null>(null);

  const form = useForm<AchievementFormSchemaType>({
    resolver: zodResolver(AchievementFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      xpReward: 0,
      isActive: 'active',
      triggerType: undefined,
      requiredCount: 1,
    },
  });

  const onSubmit = async (data: AchievementFormSchemaType) => {
    if (!file) {
      toast.error('O Badge (imagem da conquista) é obrigatório.');

      return;
    }

    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('xpReward', data.xpReward.toString());
      formData.append('type', data.triggerType);
      formData.append('isActive', data.isActive);

      if (data.requiredCount) {
        formData.append('requiredCount', data.requiredCount.toString());
      }
      if (data.referenceId) {
        formData.append('referenceId', data.referenceId);
      }

      formData.append('category', 'ACHIEVEMENT');

      formData.append('file', file);

      await authApi.post('/leveling/pj/mission', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Conquista criada com sucesso!');
      navigate('/levelingPJ');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar conquista.');
    }
  };

  const triggerOptions = [
    { label: 'Conquista Manual (Atribuída pelo Admin)', value: MissionTriggerType.MANUAL_CLAIM },
    { label: 'Ao Concluir Curso', value: MissionTriggerType.COURSE_COMPLETION },
    { label: 'Ao Concluir Trilha', value: MissionTriggerType.PATH_COMPLETION },
    { label: 'Ao Emitir Certificado', value: MissionTriggerType.CERTIFICATE_EMISSION },
  ];

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Cadastrar Conquista"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <Form {...form}>
        <motion.form
          variants={slideUp}
          initial="hidden"
          animate="show"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Link to={'/levelingPJ'}>
            <div className="mb-4 flex items-center gap-4 text-sm font-bold text-gray-600 hover:text-gray-900">
              <ChevronLeft className="size-4" />
              Voltar para Missões & Conquistas
            </div>
          </Link>

          <div className="grid grid-cols-12 gap-4 px-6 py-3">
            {/* NAME */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="font-bold">Nome da Conquista *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Aluno Destaque 2024" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CRITERIA */}
            <FormField
              name="triggerType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel className="font-bold">Como ganhar? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o critério" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {triggerOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* XP */}
            <FormField
              name="xpReward"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-6 lg:col-span-3">
                  <FormLabel className="font-bold">XP *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Ex: 1000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STATUS */}
            <FormField
              name="isActive"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-6 lg:col-span-3">
                  <FormLabel className="font-bold">Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={'active'}>Ativa</SelectItem>
                      <SelectItem value={'inactive'}>Inativa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="font-bold">Descrição *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Descreva o que essa conquista representa."
                      className="h-24 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BADGE UPLOAD */}
            <div className="col-span-12 flex flex-col gap-4">
              <FormLabel className="font-bold">Badge (Imagem) *</FormLabel>
              <FileUploadDropzone setFile={setFile} file={file} />
            </div>
          </div>

          <div className="flex w-full flex-col p-6">
            <p className="mb-2 italic text-secondary opacity-80">* Campos obrigatórios</p>
            <Button
              className="ml-auto flex w-fit"
              variant="secondary"
              type="submit"
              disabled={form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
            >
              <Medal className="mr-2 size-5" />
              Salvar Conquista
            </Button>
          </div>
        </motion.form>
      </Form>
    </ApplicationLayout>
  );
}
