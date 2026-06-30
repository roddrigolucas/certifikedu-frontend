import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArchiveIcon, BookOpenIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Switch } from '@/components/shared/ui/switch';
import { Textarea } from '@/components/shared/ui/textarea';

import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { SchoolService } from '@/services/entities/app/legalPerson/school';
import { EducationLevelEnum } from '@/services/entities/app/legalPerson/school/enums';

import { cn } from '@/utils';
import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { CourseSchema, CourseSchemaType } from './validation/schema';

export default function CourseRegisterPage() {
  const { id } = useParams();
  const { selectedPJ } = useProfile();
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  const { data, isLoading } = useRequestProcessor().query(
    ['school', id],
    async () => await SchoolService.GetSchool(selectedPJ?.pjId ?? '', id ?? ''),
  );

  return (
    <ApplicationLayout icon={BookOpenIcon} title="Criar Curso" isPageLoading={isLoading}>
      <div className="space-y-3">
        <BackButton data-testId="back-button" href={`/schools/${id}/courses`}>
          Voltar para Cursos de {data?.name}
        </BackButton>
        <div className="mb-48 flex-col">
          {isCreated ? (
            <CreatedCourse setCreated={setCreated} />
          ) : (
            <CreateForm setCreated={setCreated} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function CreateForm({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const { id } = useParams();
  const { refetch } = useCertificate();
  const { selectedPJ } = useProfile();
  const [isAcademic, setIsAcademic] = useState<boolean>(false);

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    mode: 'onChange',
  });

  function onSubmit(values: CourseSchemaType) {
    values.isAcademic = isAcademic;
    const response = CourseService.RegisterCourse(selectedPJ?.pjId ?? '', id ?? '', values);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        refetch();
        setCreated();

        return <span data-testId="course-success">Curso criado com sucesso</span>;
      },
      error: () => {
        return 'Falha ao criar curso...';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: ['courses', `PJ: ${selectedPJ?.pjId}`, `School: ${id}`],
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
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="font-bold">Nome *</FormLabel>
                <FormControl>
                  <Input {...field} data-testId="name-input" placeholder="Digite o nome" />
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
                      <SelectValue data-testId="level-select" placeholder="Selecione um nível" />
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
                    <SelectItem value={EducationLevelEnum.PosGraduacao}>Pós Graduação</SelectItem>
                    <SelectItem value={EducationLevelEnum.Mestrado}>Mestrado</SelectItem>
                    <SelectItem value={EducationLevelEnum.Doutorado}>Doutorado</SelectItem>
                    <SelectItem value={EducationLevelEnum.PosDoutorado}>Pós Doutorado</SelectItem>
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
                    data-testId="description-input"
                    placeholder="Digite a descrição"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 mt-5 inline-flex gap-2">
            <Switch checked={isAcademic} onCheckedChange={setIsAcademic} className="bg-green-500" />
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
              Criar Curso
            </Button>
          </div>
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedCourse({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const { id } = useParams();

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={getImageUrl('images/success/certificate.svg')}
          alt="Certificado"
          className="size-48"
        />
        <h2 className="text-2xl font-bold">Curso criado com sucesso!</h2>
        <p className="text-slate-600">
          Agora você pode visualizar seu certificado e compartilhar em suas redes sociais
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Link to={`/schools/${id}/courses`}>
          <Button variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Meus Cursos
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar outro Curso
        </Button>
      </div>
    </motion.div>
  );
}
