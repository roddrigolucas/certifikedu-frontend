/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, TrophyIcon } from 'lucide-react';
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

import { authApi } from '@/services/api/api';

import { slideUp } from '@/utils/animations';

import { MissionFormSchema, MissionFormSchemaType, MissionTriggerType } from './mission-schema';

export default function CreateMissionForm() {
  const navigate = useNavigate();
  const [isLoading] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);

  const form = useForm<MissionFormSchemaType>({
    resolver: zodResolver(MissionFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      xpReward: 0,
      isActive: 'active',
      triggerType: undefined, // Forces user to select
      requiredCount: 1,
    },
  });

  const onSubmit = async (data: MissionFormSchemaType) => {
    if (!file) {
      toast.error('Por favor, faça o upload de um Badge (imagem).');

      return;
    }

    try {
      const formData = new FormData();

      // 1. Append Text Fields
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

      // 2. Append Hidden/Hardcoded Fields
      // This identifies it as a Mission (Task) vs Achievement (Badge)
      formData.append('category', 'MISSION');

      // 3. Append File
      formData.append('file', file);

      // 4. Send to Backend
      await authApi.post('/leveling/pj/mission', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Missão criada com sucesso!');
      navigate('/levelingPJ'); // Redirect back to table
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar missão. Tente novamente.');
    }
  };

  const triggerOptions = [
    { label: 'Emitir Certificado', value: MissionTriggerType.CERTIFICATE_EMISSION },
    { label: 'Concluir Curso', value: MissionTriggerType.COURSE_COMPLETION },
    { label: 'Concluir Trilha', value: MissionTriggerType.PATH_COMPLETION },
    // { label: 'Compartilhar Social', value: MissionTriggerType.SOCIAL_SHARE },
    // { label: 'Download de Arquivo', value: MissionTriggerType.FILE_DOWNLOAD },
  ];

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Cadastrar Missão"
      isPageLoading={isLoading}
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
            <div className="mb-4 flex items-center gap-4 text-sm font-bold">
              <ChevronLeft />
              Voltar para Missões & Conquistas
            </div>
          </Link>

          <div className="grid grid-cols-12 gap-4 px-6 py-3">
            {/* NAME FIELD */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="font-bold">Nome *</FormLabel>
                  <FormControl>
                    <Input {...field} data-testId="name-input" placeholder="Ex: Mestre do Python" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TRIGGER TYPE (CRITERIA) - CHANGED TO SELECT */}
            <FormField
              name="triggerType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel className="font-bold">Critério da Missão *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gatilho" />
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

            {/* XP REWARD */}
            <FormField
              name="xpReward"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-6 lg:col-span-3">
                  <FormLabel className="font-bold">Recompensa (XP) *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Ex: 500" />
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
                      placeholder="Descreva o que o aluno deve fazer para ganhar esta missão."
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FILE UPLOAD */}
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
              <TrophyIcon className="mr-1 size-5" />
              Salvar Missão
            </Button>
          </div>
        </motion.form>
      </Form>
    </ApplicationLayout>
  );
}
