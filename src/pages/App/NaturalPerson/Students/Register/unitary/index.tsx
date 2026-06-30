/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { GraduationCapIcon, LockKeyhole, Plus, Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
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
import { Label } from '@/components/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import { IExistsUserPJ } from '@/services/entities/app/legalPerson/legalPerson/types';
import { StudentService } from '@/services/entities/app/legalPerson/students';

import { slideUp } from '@/utils/animations';
import { getInitials } from '@/utils/getInitials';
import { getImageUrl } from '@/utils/image';
import { FormatCPF, FormatPhone, removeNonNumeric } from '@/utils/validation/format';

import {
  StudentAssociateSchema,
  StudentAssociateSchemaType,
  StudentSchema,
  StudentSchemaType,
} from './validation/schema';

export default function StudentRegisterPageUnitary() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout
      icon={GraduationCapIcon}
      title="Cadastrar Aluno"
      description="Bem-vindo ao ambiente para cadastrar alunos individualmente. 
      Inicie digitando o CPF no campo abaixo."
      hideCredits
    >
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.student.create}>
          Voltar para Alunos
        </BackButton>
        <div>
          {isCreated ? (
            <CreatedStudent setCreated={setCreated} />
          ) : (
            <RegisterForm setCreated={setCreated} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function RegisterForm({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const [cpf, setCpf] = useState('');
  const [userData, setUserData] = useState<IExistsUserPJ | null>(null);
  const { selectedPJ, schools, students, isCanvas, UpdateCredits, isRefetchingPJ } = useProfile();

  const defaultValues = {
    document: FormatCPF(cpf),
  };

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(StudentSchema),
    defaultValues,
  });

  const formAssociate = useForm<StudentAssociateSchemaType>({
    resolver: zodResolver(StudentAssociateSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [cpf]);

  const formSchoolId = userData?.isFound ? formAssociate.watch('school') : form.watch('school');

  const formCourseId = formAssociate.watch('courseId');

  const courses = useRequestProcessor().query(
    ['courses', `PJ: ${selectedPJ?.pjId}`, formSchoolId],
    async () => await CourseService.GetCoursesBySchool(selectedPJ?.pjId ?? '', formSchoolId ?? ''),
    {
      enabled: !!formSchoolId && !!!isCanvas,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const { mutate: getRegisteredUser, isLoading } = useMutation<IExistsUserPJ, Error, string>(
    (id: string) => LegalPersonService.GetUserById(id),
  );

  const onSubmit = (values: StudentSchemaType) => {
    if (!values.school) {
      toast.error('Selecione a instituição...');

      return;
    }

    const data = {
      ...values,
      school: values.school ?? '',
      ...(values.courseId && { courseId: values.courseId }),
      users: [
        {
          name: values.name ?? '',
          email: values.email ?? '',
          phone: removeNonNumeric(values.phone ?? ''),
          documentNumber: removeNonNumeric(values.document),
        },
      ],
    };

    const response = StudentService.RegisterStudentBulk(selectedPJ?.pjId ?? '', data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();
        UpdateCredits();
        students.refetch();

        return <span data-testId="toast-success">Aluno cadastrado com sucesso</span>;
      },
      error: () => {
        return 'Falha ao cadastrar aluno...';
      },
    });
  };

  const onSubmitAssociate = (values: StudentAssociateSchemaType) => {
    const response = StudentService.AssociateStudent(
      selectedPJ?.pjId ?? '',
      values.school,
      values.courseId ? `${'/' + values.courseId}` : '',
      // values.curriculumId ? `${'/' + values.curriculumId}` : '',
      cpf,
    );

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();
        students.refetch();
        isRefetchingPJ();

        return 'Aluno associado com sucesso';
      },
      error: () => {
        return 'Falha ao associar aluno...';
      },
    });
  };

  const handleRegisteredUser = ({ cpf }: { cpf: string }) => {
    getRegisteredUser(cpf, {
      onSuccess: (data: IExistsUserPJ) => {
        setUserData(data);
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-2 md:max-w-[500px]">
          <Label>Digite o CPF do aluno que deseja cadastrar</Label>
          <Input
            onChange={(e) => setCpf(e.target.value)}
            type="text"
            data-testId="document-input"
            maxLength={11}
            value={cpf}
            placeholder="Ex: 434.023.105-27"
          />
        </div>
        <div className="mb-1 flex items-center gap-2">
          <Button
            data-testId="search-button"
            isLoading={isLoading}
            disabled={cpf.length < 8}
            size="sm"
            variant="secondary"
            onClick={() => handleRegisteredUser({ cpf })}
            className="mt-auto w-full md:w-fit"
          >
            <Search className="mr-2 size-4" />
            Procurar
          </Button>
          {cpf.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUserData(null);
                setCpf('');
              }}
              className="mt-auto w-full md:w-fit"
            >
              <X className="mr-2 size-4" />
              Resetar
            </Button>
          )}
        </div>
      </div>
      {userData && (
        <>
          {userData?.isFound && (
            <>
              <div className="w-full py-4 text-left">
                <div className="flex flex-col gap-1">
                  <h5 className="font-bold text-emerald-600">Aluno Encontrado</h5>
                  <p className="text-slate-600">Adicionando aluno abaixo, continue o processo</p>
                </div>
                <div key={'_user'} className="inline-flex items-center  justify-between gap-6 py-8">
                  <Avatar className="rounded-lg">
                    <AvatarFallback className="rounded-lg bg-slate-50">
                      {getInitials(userData?.name ?? '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-40 flex-col">
                    <strong>{userData?.name}</strong>
                    <p className="text-sm font-normal text-slate-600">{userData?.email}</p>
                  </div>
                </div>
              </div>
              <Form {...formAssociate}>
                <motion.form
                  onSubmit={formAssociate.handleSubmit(onSubmitAssociate)}
                  variants={slideUp}
                  initial="hidden"
                  animate="show"
                >
                  <div className="mt-8 flex flex-col gap-2">
                    <h5 className="font-bold">Escola</h5>
                    <div className="mb-8 grid grid-cols-12 gap-4">
                      <FormField
                        name="school"
                        control={formAssociate.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel className="font-bold">Unidade de Ensino *</FormLabel>
                            <Select onValueChange={field.onChange} {...field}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma unidade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {schools?.data &&
                                  schools?.data?.map((school) => (
                                    <SelectItem key={school.id} value={school.id}>
                                      {school.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {!!formSchoolId && (
                        <FormField
                          name="courseId"
                          control={formAssociate.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Selecione um Curso</FormLabel>
                              <Select onValueChange={field.onChange} {...field}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um curso" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {courses.data &&
                                    courses.data.map((course) => (
                                      <SelectItem key={course.courseId} value={course.courseId}>
                                        {course.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {!!formCourseId &&
                        courses.data &&
                        courses.data
                          .filter((course) => course.courseId === formCourseId && course.isAcademic)
                          .map((selectedCourse) => (
                            <FormField
                              key={selectedCourse.courseId}
                              name="curriculumId"
                              control={formAssociate.control}
                              render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                  <FormLabel>Selecione um currículo</FormLabel>
                                  <Select onValueChange={field.onChange} {...field}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione um currículo" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {selectedCourse.curriculums?.map((curriculum) => (
                                        <SelectItem
                                          key={curriculum.curriculumId}
                                          value={curriculum.curriculumId}
                                        >
                                          {curriculum.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    variant="secondary"
                    className="ml-auto mt-8 flex  w-full md:w-fit"
                  >
                    <LockKeyhole className="mr-2 size-4" />
                    Associar Aluno
                  </Button>
                </motion.form>
              </Form>
            </>
          )}
          {!userData?.isFound && (
            <div className="flex flex-col gap-8">
              <div className="w-full py-10 text-center">
                <img
                  src={getImageUrl('images/empty/search.svg')}
                  alt="search"
                  className="h-24 w-full"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="font-bold">Usuário ainda não possui conta</h5>
                  <p className="text-slate-600">Faça o cadastro prévio abaixo...</p>
                </div>
              </div>
              <Form {...form}>
                <motion.form
                  onSubmit={form.handleSubmit(onSubmit)}
                  variants={slideUp}
                  initial="hidden"
                  animate="show"
                >
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-12 gap-4">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testId="name-input"
                                placeholder="Digite o nome"
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
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel className="font-bold">E-mail *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testId="email-input"
                                placeholder="Digite o e-mail"
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
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel className="font-bold">CPF/DNI *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="000.000.000-00 ou 0000-0000"
                                onChange={(e) => {
                                  const formattedValue = FormatCPF(e.target.value);

                                  return field.onChange(formattedValue);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testId="phone-input"
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
                        name="school"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel className="font-bold">Unidade de Ensino *</FormLabel>
                            <Select onValueChange={field.onChange} {...field}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    data-testId="schoolId-select"
                                    placeholder="Selecione uma unidade"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {schools?.data &&
                                  schools?.data?.map((school) => (
                                    <SelectItem key={school.id} value={school.id}>
                                      {school.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="courseId"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>Curso</FormLabel>
                            <Select onValueChange={field.onChange} {...field}>
                              <FormControl>
                                <SelectTrigger disabled={!formSchoolId || !courses.data?.length}>
                                  <SelectValue placeholder="Selecione um curso" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {courses.data &&
                                  courses.data.map((course) => (
                                    <SelectItem key={course.courseId} value={course.courseId}>
                                      {course.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <footer className="w-full py-8">
                    <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
                      <Link to={`/students`} className="w-full  md:w-fit">
                        <Button variant="outline" className="w-full md:w-fit">
                          Cancelar
                        </Button>
                      </Link>
                      <Button
                        data-testId="submit-button"
                        variant="secondary"
                        type="submit"
                        isLoading={form.formState.isSubmitting}
                      >
                        <GraduationCapIcon className="mr-1 size-5" />
                        Cadastrar
                      </Button>
                    </div>
                  </footer>
                </motion.form>
              </Form>
            </div>
          )}
        </>
      )}
    </>
  );
}

function CreatedStudent({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Estudante associado com sucesso!</h2>
        <p className="text-slate-600">Agora você pode visualizar seus novos alunos</p>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Link to={pagePaths.authenticated.naturalPerson.student.root} className="w-full">
          <Button data-testId="back-button" variant="outline" className="w-full">
            <GraduationCapIcon className="mr-1 size-5 " />
            Alunos
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Cadastrar outro aluno
        </Button>
      </div>
    </motion.div>
  );
}
