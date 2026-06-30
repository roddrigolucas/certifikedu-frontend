import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Medal, PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { queryClient } from '@/components/Providers';
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
import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { TrailService } from '@/services/entities/app/legalPerson/trails';
import { ITrails } from '@/services/entities/app/legalPerson/trails/types';

import { slideUp } from '@/utils/animations';

import { AchievementType, TrailSchema, TrailSchemaType } from './validation/schema';

export const achievementTypeOptions = [
  { label: 'Evento', value: 'events' },
  { label: 'Disciplina', value: 'subjects' },
  { label: 'Atividade', value: 'activities' },
  { label: 'Estágio', value: 'internships' },
];

interface ModuleFieldProps {
  moduleIndex: number;
  selectedPJ: string;
  form: UseFormReturn<TrailSchemaType>;
  removeModule: () => void;
  isLastModule: boolean;
}

interface TrailFormProps {
  setCreated: (value: boolean) => void;
  isEdit: boolean;
}

export function TrailForm({ setCreated, isEdit }: TrailFormProps) {
  const { selectedPJ } = useProfile();
  const { id: trailId } = useParams();

  const form = useForm<TrailSchemaType>({
    resolver: zodResolver(TrailSchema),
    mode: 'onChange',
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control: form.control,
    name: 'modules',
  });

  const {
    data: trailData,
    isLoading,
    refetch,
  } = useQuery(
    ['trail', trailId],
    () => TrailService.GetTrailById(selectedPJ?.pjId ?? '', trailId!),
    {
      enabled: isEdit && !!trailId,
      onError: () => {
        toast.error('Erro ao carregar trilha para edição.');
      },
    },
  );

  useEffect(() => {
    if (isEdit && trailData) {
      const mappedValues = mapTrailToFormValues(trailData);
      form.reset(mappedValues);
    }
  }, [isEdit, trailData, form]);

  const templates = useRequestProcessor().query(
    ['basicTemplates', selectedPJ?.pjId],
    () => CertificateService.GetAllTemplatesBasic(selectedPJ?.pjId ?? ''),
    {
      enabled: !!selectedPJ?.pjId,
      refetchOnMount: true,
    },
  );

  if (isEdit && isLoading) {
    return <PageSkeletonFull />;
  }

  function onSubmit(values: TrailSchemaType) {
    const transformedModules = values.modules.map((module, index) => {
      const moduleData: { [key in AchievementType]?: { id: string }[] } = {};

      module.achievements.forEach((achievement) => {
        const { type, id } = achievement;
        if (!moduleData[type]) {
          moduleData[type] = [];
        }
        moduleData[type]?.push({ id });
      });

      return {
        index: index,
        ...moduleData,
      };
    });

    const data = {
      name: values.name,
      description: values.description,
      templateId: values.templateId,
      modules: transformedModules,
    };

    const response = isEdit
      ? TrailService.EditTrail(selectedPJ?.pjId ?? '', trailId ?? '', data)
      : TrailService.RegisterTrail(selectedPJ?.pjId ?? '', data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated(true);
        if (isEdit) {
          refetch();
        }

        return (
          <span data-testId="toast-success">
            Trilha {isEdit ? 'editada' : 'cadastrada'} com sucesso
          </span>
        );
      },
      error: () => {
        return 'Falha ao atualizar trilha...';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: ['trails', `PJ: ${selectedPJ?.pjId}`],
        });
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
        <div className="grid grid-cols-12 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel className="font-bold">Nome *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testId="name-input"
                    placeholder="Digite o nome da trilha"
                  />
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
                <FormLabel className="font-bold">Descrição *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-testId="description-input"
                    placeholder="Digite a descrição"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="templateId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel className="font-bold">Atrelar ao certificado *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o certificado que irá emitir a trilha" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates &&
                        templates.data?.templates?.map((template) => (
                          <SelectItem key={template.templateId} value={template.templateId}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {moduleFields.map((module, moduleIndex) => (
            <ModuleField
              key={module.id}
              selectedPJ={selectedPJ?.pjId ?? ''}
              moduleIndex={moduleIndex}
              form={form}
              removeModule={() => removeModule(moduleIndex)}
              isLastModule={moduleFields.length > 1}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => appendModule({ achievements: [] })}
          className="mt-4"
        >
          <PlusIcon className="mr-1" /> Adicionar Módulo
        </Button>
        <footer className="w-full py-8">
          <p className="italic text-secondary opacity-80">* Campos obrigatórios</p>
          <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
            <Button
              data-testId="submit-button"
              variant="secondary"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              <Medal className="mr-2 size-5" />
              {isEdit ? 'Editar' : 'Cadastrar'} Trilha
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function ModuleField({
  moduleIndex,
  selectedPJ,
  form,
  removeModule,
  isLastModule,
}: ModuleFieldProps) {
  const { control, watch } = form;

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.achievements`,
  });

  const events = useRequestProcessor().query(
    ['events', selectedPJ],
    () => CourseService.GetInstitutionalEvents(selectedPJ),
    {
      enabled: !!selectedPJ,
      refetchOnMount: true,
    },
  );

  const subjects = useRequestProcessor().query(
    ['subjects', selectedPJ],
    () => CourseService.GetSubjects(selectedPJ),
    {
      enabled: !!selectedPJ,
      refetchOnMount: true,
    },
  );

  const activities = useRequestProcessor().query(
    ['activities', selectedPJ],
    () => CourseService.GetActivities(selectedPJ),
    {
      enabled: !!selectedPJ,
      refetchOnMount: true,
    },
  );

  const internships = useRequestProcessor().query(
    ['internships', selectedPJ],
    () => CourseService.GetInternships(selectedPJ),
    {
      enabled: !!selectedPJ,
      refetchOnMount: true,
    },
  );

  return (
    <div className="mt-8 space-y-4 rounded-lg border p-4">
      <h1 className="text-center font-bold text-slate-700">Módulo {moduleIndex + 1} *</h1>
      {achievementFields.map((field, index) => {
        const achievementType = watch(`modules.${moduleIndex}.achievements.${index}.type`);

        return (
          <div key={field.id} className="flex">
            <div className="grid w-full grid-cols-12 gap-4 rounded-lg border-2 border-dashed bg-gray-50 p-4">
              <FormField
                name={`modules.${moduleIndex}.achievements.${index}.type`}
                control={control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="font-bold">Tipo de Conquista *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo da conquista" />
                        </SelectTrigger>
                        <SelectContent>
                          {achievementTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {achievementType && (
                <FormField
                  name={`modules.${moduleIndex}.achievements.${index}.id`}
                  control={control}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormLabel className="font-bold">
                        {achievementType === 'events' && 'Evento *'}
                        {achievementType === 'subjects' && 'Disciplina *'}
                        {achievementType === 'activities' && 'Atividade *'}
                        {achievementType === 'internships' && 'Estágio *'}
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a conquista" />
                          </SelectTrigger>
                          <SelectContent>
                            {achievementType === 'events' &&
                              events.data?.institutionalEvents.map((event) => (
                                <SelectItem
                                  key={event.institutionalEventId}
                                  value={event.institutionalEventId}
                                >
                                  {event.name}
                                </SelectItem>
                              ))}
                            {achievementType === 'subjects' &&
                              subjects.data?.map((subject) => (
                                <SelectItem key={subject.subjectId} value={subject.subjectId ?? ''}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            {achievementType === 'activities' &&
                              activities.data?.map((activity) => (
                                <SelectItem
                                  key={activity.activityId}
                                  value={activity.activityId ?? ''}
                                >
                                  {activity.name}
                                </SelectItem>
                              ))}
                            {achievementType === 'internships' &&
                              internships.data?.map((internship) => (
                                <SelectItem
                                  key={internship.internshipId}
                                  value={internship.internshipId ?? ''}
                                >
                                  {internship.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div>
              <Button
                variant="ghost"
                onClick={() => removeAchievement(index)}
                className="h-full hover:border-red-100 hover:bg-red-50 hover:text-red-600"
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          </div>
        );
      })}
      <div className="flex h-full items-center justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => appendAchievement({ type: 'events', id: '' })}
          className="mt-2"
        >
          <PlusIcon className="mr-1" /> Adicionar Conquista
        </Button>
        {isLastModule && (
          <Button
            type="button"
            variant="ghost"
            onClick={removeModule}
            className="mt-2 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function mapTrailToFormValues(data: ITrails): TrailSchemaType {
  const modules = data.modules.map((module) => {
    const achievements = [];
    if ('subjects' in module) {
      achievements.push(
        ...(module.subjects?.map((subject) => ({
          type: 'subjects' as const,
          id: subject.id || '',
        })) || []),
      );
    }
    if ('events' in module) {
      achievements.push(
        ...(module.events?.map((event) => ({
          type: 'events' as const,
          id: event.id || '',
        })) || []),
      );
    }
    if ('activities' in module) {
      achievements.push(
        ...(module.activities?.map((activity) => ({
          type: 'activities' as const,
          id: activity.id || '',
        })) || []),
      );
    }
    if ('internships' in module) {
      achievements.push(
        ...(module.internships?.map((internship) => ({
          type: 'internships' as const,
          id: internship.id || '',
        })) || []),
      );
    }

    return { achievements };
  });

  return {
    name: data.name || '',
    description: data.description || '',
    templateId: data.templateId || '',
    modules: [modules[0], ...modules.slice(1)],
  };
}
