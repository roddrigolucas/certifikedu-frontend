import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  Plus,
  SchoolIcon,
} from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Stepper } from '@/components/core/molecules/Stepper';
import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/LegalPerson/Users/columns';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import useProfile from '@/hooks/core/useProfile';

import { SchoolService } from '@/services/entities/app/legalPerson/school';
import { IRegisterSchool } from '@/services/entities/app/legalPerson/school/types';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';
import { FormatCNPJ, FormatPhone, removeNonNumeric } from '@/utils/validation/format';

import { CourseForm } from './forms/CourseForm';
import { SchoolForm } from './forms/SchoolForm';
import {
  CourseSchema,
  InstituteSchema,
  SchoolSchemaNoStudent,
  SchoolSchemaNoStudentType,
} from './validation/schema';

export default function SchoolRegisterPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout icon={SchoolIcon} title="Criar Instituição" hideCredits>
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.school.root}>
          Voltar para Unidades de Ensino
        </BackButton>
        <Stepper
          steps={[
            {
              title: 'Dados Pessoais',
              description: 'Informações pessoais',
              icon: SchoolIcon,
            },
            {
              title: 'Cursos (Opcional)',
              description: 'Nome e nível',
              icon: BookOpen,
            },
            {
              title: 'Revisão',
              description: 'Dados preenchidos',
              icon: CheckCircle2Icon,
            },
          ]}
          currentStep={currentStep}
        />
        <div>
          {isCreated ? (
            <CreatedSchool setCreated={setCreated} />
          ) : (
            <SchoolCreateForm
              setCreated={setCreated}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function SchoolCreateForm({
  setCreated,
  currentStep,
  setCurrentStep,
}: Readonly<{
  setCreated: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const { selectedPJ, UpdateSchools, students } = useProfile();

  let currentSchema;
  switch (currentStep + 1) {
    case 1:
      currentSchema = InstituteSchema;
      break;
    case 2:
      currentSchema = CourseSchema;
      break;
    default:
      currentSchema = SchoolSchemaNoStudent;
  }

  const form = useForm<SchoolSchemaNoStudentType>({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
    defaultValues: {
      website: 'https://',
    },
  });

  const courseFields = useFieldArray({ control: form.control, name: 'courses' });

  function onSubmit(values: SchoolSchemaNoStudentType) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      //
      const data: IRegisterSchool = {
        ...values,
        document: removeNonNumeric(values.document),
        phone: removeNonNumeric(values.phone),
        courses: values.courses ?? [],
        associate: [],
        students: [],
      };

      const response = SchoolService.RegisterSchool(selectedPJ?.pjId ?? '', data);

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          setCreated();
          UpdateSchools();
          setCurrentStep(0);
          students.refetch();

          return <span data-testId="toast-success">Unidade de ensino cadastrada com sucesso</span>;
        },
        error: () => {
          return 'Falha ao cadastrar unidade de ensino, revise sua informações e tente novamente...';
        },
        finally: () => {
          queryClient.refetchQueries({ queryKey: ['schools', `PJ: ${selectedPJ?.pjId}`] });
        },
      });
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        {currentStep === 0 && <SchoolForm form={form} />}
        {currentStep === 1 && <CourseForm form={form} courseFields={courseFields} />}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <header className="inline-flex items-center justify-between gap-4">
                <h4 className="font-bold">Dados Pessoais</h4>
                <Button variant="outline" size="sm" onClick={() => setCurrentStep(0)}>
                  <EditIcon className="mr-1 size-4" />
                  Editar Dados
                </Button>
              </header>
              <div className="grid grid-cols-12 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>Instituição/Organização</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
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
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>E-mail Corporativo</FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="Digite o e-mail" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
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
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
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
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>Site</FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="Digite o Website" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-6 lg:col-span-4">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="Digite a descrição" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <header className="inline-flex items-center justify-between gap-4">
                <h4 className="font-bold">Cursos</h4>
                <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                  <EditIcon className="mr-1 size-4" />
                  Editar Dados
                </Button>
              </header>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Curso</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseFields.fields.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="w-full py-16 text-center">
                        <img
                          src={getImageUrl('images/empty/search.svg')}
                          alt="search"
                          className="h-36 w-full"
                        />
                        <div className="flex flex-col gap-2">
                          <h5 className="text-lg font-bold">Nenhum resultado encontrado</h5>
                          <p className="text-slate-600">Sem resultados para mostrar...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {form.watch('courses').map((field) => (
                    <TableRow key={field?.name}>
                      <TableCell>{field?.name}</TableCell>
                      <TableCell>{field?.level}</TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        <footer className="inline-flex w-full gap-4 pb-8 pt-12">
          {currentStep === 0 && (
            <Link to={pagePaths.authenticated.naturalPerson.school.root} className="w-full">
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </Link>
          )}
          {currentStep > 0 && (
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ChevronLeftIcon className="mr-1 size-5" />
              Voltar
            </Button>
          )}
          {currentStep === 2 ? (
            <Button
              type="submit"
              data-testId="submit-button"
              className="w-full"
              variant="success"
              isLoading={form.formState.isSubmitting}
            >
              <SchoolIcon className="mr-1 size-5" />
              Criar Unidade
            </Button>
          ) : (
            <Button
              type="submit"
              data-testId="next-button"
              className="w-full"
              variant="secondary"
              isLoading={form.formState.isSubmitting}
            >
              Avançar
              <ChevronRightIcon className="ml-1 size-5" />
            </Button>
          )}
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedSchool({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Instituição criada com sucesso!</h2>
        <p className="text-slate-600">
          Volte para a tela inicial ou crie uma nova instituição no botão abaixo.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Link to={pagePaths.authenticated.naturalPerson.school.root}>
          <Button data-testId="back-button" variant="outline">
            <SchoolIcon className="mr-1 size-5 w-full" />
            Ir para Instituições
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar Instituição
        </Button>
      </div>
    </motion.div>
  );
}
