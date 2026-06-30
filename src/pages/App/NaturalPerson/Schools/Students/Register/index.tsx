/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { GraduationCapIcon, LockKeyhole, Plus, Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { queryClient } from '@/components/Providers';
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

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import { IExistsUserPJ } from '@/services/entities/app/legalPerson/legalPerson/types';
import { SchoolService } from '@/services/entities/app/legalPerson/school';
import { StudentService } from '@/services/entities/app/legalPerson/students';

import { slideUp } from '@/utils/animations';
import { FetchAndFillAddress } from '@/utils/getAddress';
import { getInitials } from '@/utils/getInitials';
import { getImageUrl } from '@/utils/image';
import {
  FormatBirthday,
  FormatCPF,
  FormatPhone,
  FormatZipCode,
  removeNonNumeric,
} from '@/utils/validation/format';

import {
  StudentAssociateSchema,
  StudentAssociateSchemaType,
  StudentSchema,
  StudentSchemaType,
} from './validation/schema';

export default function StudentsBySchoolRegisterPage() {
  const { id } = useParams();
  const { selectedPJ } = useProfile();
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  const { data, isLoading } = useRequestProcessor().query(
    ['school', id],
    async () => await SchoolService.GetSchool(selectedPJ?.pjId ?? '', id ?? ''),
  );

  return (
    <ApplicationLayout
      icon={GraduationCapIcon}
      title="Cadastrar Aluno"
      description="Bem-vindo ao ambiente para cadastrar alunos. Inicie digitando o CPF/DNI no campo abaixo."
      isPageLoading={isLoading}
      hideCredits
    >
      <div className="space-y-3">
        <BackButton href={`/schools/${id}/students`}>
          Voltar para Estudantes de {data?.name}
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
  const { id } = useParams();
  const [cpf, setCpf] = useState('');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [userData, setUserData] = useState<IExistsUserPJ | null>(null);
  const { selectedPJ } = useProfile();

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

  const { mutate: getRegisteredUser, isLoading } = useMutation<IExistsUserPJ, Error, string>(
    (id: string) => LegalPersonService.GetUserById(id),
  );

  const onSubmit = (values: StudentSchemaType) => {
    const data = {
      ...values,
      phone: removeNonNumeric(values.phone),
      document: removeNonNumeric(values.document),
      schoolId: id ?? '',
    };
    const response = StudentService.RegisterStudent(selectedPJ?.pjId ?? '', data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();

        return 'Aluno cadastrado com sucesso';
      },
      error: () => {
        return 'Falha ao cadastrar aluno...';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: [
            'students',
            `PJ: ${selectedPJ?.pjId}`,
            `School: ${id}`,
            `page: 1`,
            `limit: 30`,
          ],
        });
        queryClient.refetchQueries({
          queryKey: ['last-certificates', `PJ: ${selectedPJ?.pjId}`],
        });
        queryClient.refetchQueries({
          queryKey: ['profile'],
        });
        queryClient.refetchQueries({
          queryKey: ['profilePJ', selectedPJ],
        });
      },
    });
  };

  const onSubmitAssociate = () => {
    const response = StudentService.AssociateStudent(selectedPJ?.pjId ?? '', id ?? '', '', cpf);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setCreated();

        return 'Aluno cadastrado com sucesso';
      },
      error: () => {
        return 'Falha ao cadastrar aluno...';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: [
            'students',
            `PJ: ${selectedPJ?.pjId}`,
            `School: ${id}`,
            `page: 1`,
            `limit: 30`,
          ],
        });
        queryClient.refetchQueries({
          queryKey: ['last-certificates', `PJ: ${selectedPJ?.pjId}`],
        });
        queryClient.refetchQueries({
          queryKey: ['profile'],
        });
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
            maxLength={11}
            value={cpf}
            placeholder="Ex: 434.023.105-27"
          />
        </div>
        <div className="mb-1 flex items-center gap-2">
          <Button
            isLoading={isLoading}
            disabled={cpf.length != 11}
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
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    variant="success"
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
              <div className="w-full py-16 text-center">
                <img
                  src={getImageUrl('images/empty/search.svg')}
                  alt="search"
                  className="h-24 w-full"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="font-bold">Usuário ainda não possui conta</h5>
                  <p className="text-slate-600">Faça o cadastro completo abaixo...</p>
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
                    <h5 className="font-bold">Dados Pessoais</h5>
                    <div className="grid grid-cols-12 gap-4">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o nome" />
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
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o e-mail" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="dob"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="DD/MM/YYYYY"
                                onChange={(e) => {
                                  const formattedValue = FormatBirthday(e.target.value);

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
                          <FormItem className="col-span-12 lg:col-span-6">
                            <FormLabel>CPF</FormLabel>
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
                    </div>
                    <div className="mt-8 flex flex-col gap-2">
                      <h5 className="font-bold">Endereço</h5>
                      <div className="grid grid-cols-12 gap-4">
                        <FormField
                          name="address.zipCode"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>CEP</FormLabel>

                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder="Digite o CEP"
                                    className="pr-10"
                                    onChange={(e) => {
                                      const formattedValue = FormatZipCode(e.target.value);
                                      field.onChange(formattedValue);

                                      if (formattedValue.length === 9) {
                                        FetchAndFillAddress(
                                          removeNonNumeric(formattedValue),
                                          form,
                                          {
                                            state: 'address.state',
                                            city: 'address.city',
                                            street: 'address.street',
                                            neighborhood: 'address.neighborhood',
                                          },
                                        ).then(() => {
                                          setIsAddressLoading(false);
                                        });
                                      }
                                    }}
                                  />
                                  <div className="absolute right-2 top-3">
                                    <PuffLoader
                                      loading={isAddressLoading}
                                      size="1rem"
                                      color="#64748B"
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.street"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite a rua" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.streetNumber"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite o número" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.state"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="UF" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.city"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite a cidade" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.neighborhood"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite o bairro" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="address.complementary"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                              <FormLabel>Complemento</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite o complemento" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <footer className="w-full py-8">
                    <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
                      <Link to={`/schools/${id}/students`} className="w-full  md:w-fit">
                        <Button variant="outline" className="w-full md:w-fit">
                          Cancelar
                        </Button>
                      </Link>
                      <Button
                        variant="success"
                        type="submit"
                        isLoading={form.formState.isSubmitting}
                      >
                        <GraduationCapIcon className="mr-1 size-5" />
                        Salvar
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
        <h2 className="text-2xl font-bold">Estudante associado com sucesso!</h2>
        <p className="text-slate-600">Agora você pode visualizar seus novos alunos</p>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Link to={`/schools/${id}/students`} className="w-full">
          <Button variant="outline" className="w-full">
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
