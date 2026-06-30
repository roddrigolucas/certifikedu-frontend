/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookOpenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { ApplicationLayout } from '@/components/layouts/app';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Switch } from '@/components/shared/ui/switch';
import { Textarea } from '@/components/shared/ui/textarea';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { EducationLevelEnum } from '@/services/entities/app/legalPerson/school/enums';

import { cn } from '@/utils';
import { slideUp } from '@/utils/animations';

import { CourseSchema, CourseSchemaType } from './validation/schema';

export default function CourseEditPage() {
  const { id } = useParams();
  const { selectedPJ } = useProfile();
  const navigate = useNavigate();
  const [isAcademic, setIsAcademic] = useState<boolean>(false);

  const { data, isLoading, refetch } = useRequestProcessor().query(
    ['course', id],
    async () => await CourseService.GetCourse(selectedPJ?.pjId ?? '', id ?? ''),
  );

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (data) {
      form.setValue('name', data?.name);
      form.setValue(
        'level',
        EducationLevelEnum[data?.educationLevel as keyof typeof EducationLevelEnum],
      );
      form.setValue('description', data?.description);
      setIsAcademic(data?.isAcademic ?? false);
    }
  }, [data]);

  if (isLoading || !data) {
    return <FullscreenLoadingOverlay />;
  }

  function onSubmit(values: CourseSchemaType) {
    values.isAcademic = isAcademic;
    const response = CourseService.EditCourse(selectedPJ?.pjId ?? '', id ?? '', values);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return <span data-testId="toast-success">Curso editado com sucesso</span>;
      },
      error: () => {
        return 'Falha ao editar curso...';
      },
      finally: () => {
        refetch();
        navigate(pagePaths.authenticated.naturalPerson.course.root);
      },
    });
  }

  return (
    <ApplicationLayout icon={BookOpenIcon} title={data.name ?? 'Curso'}>
      <div className="space-y-3">
        <BackButton
          data-testId="back-button"
          href={pagePaths.authenticated.naturalPerson.course.root}
        >
          Voltar para Meus Cursos
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
                    <FormLabel className="font-bold">Nome *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="level"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="font-bold">Nível *</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EducationLevelEnum.EducacaoInfantil}>
                          Educação Infantil
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.EnsinoFundamental}>
                          Ensino Fundamental
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.EnsinoMedio}>Ensino Médio</SelectItem>
                        <SelectItem value={EducationLevelEnum.Graduacao}>Graduação</SelectItem>
                        <SelectItem value={EducationLevelEnum.GraduacaoTecnologica}>
                          Graduação Tecnológica
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.PosGraduacao}>
                          Pós Graduação
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.Mestrado}>Mestrado</SelectItem>
                        <SelectItem value={EducationLevelEnum.Doutorado}>Doutorado</SelectItem>
                        <SelectItem value={EducationLevelEnum.PosDoutorado}>
                          Pós Doutorado
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.Extensao}>Extensão</SelectItem>
                        <SelectItem value={EducationLevelEnum.Profissionalizante}>
                          Profissionalizante
                        </SelectItem>
                        <SelectItem value={EducationLevelEnum.EducacaoEmpresarial}>
                          Educação Empresarial
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                        data-testId="description-textarea"
                        placeholder="Digite a descrição"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-12 mt-5 inline-flex gap-2">
                <Switch
                  checked={isAcademic}
                  onCheckedChange={setIsAcademic}
                  className="bg-green-500"
                />
                <p className={cn('text-slate-700 font-bold', { 'text-slate-400': !isAcademic })}>
                  Adicionar estrutura acadêmica ao curso
                </p>
              </div>
            </div>
            <footer className="w-full py-8">
              <p className="italic text-secondary opacity-80">* Campos obrigatórios</p>
              <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
                <Button
                  data-testId="submit-button"
                  variant="secondary"
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                >
                  <BookOpenIcon className="mr-2 size-5" />
                  Editar Curso
                </Button>
              </div>
            </footer>
          </motion.form>
        </Form>
      </div>
    </ApplicationLayout>
  );
}
