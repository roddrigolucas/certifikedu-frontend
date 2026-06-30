import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { UseFieldArrayReturn, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { toast } from 'sonner';

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

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import { IExistsUserPJ } from '@/services/entities/app/legalPerson/legalPerson/types';

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
  SchoolSchemaType,
  StudentFormSchema,
  StudentFormSchemaType,
} from '../../validation/schema';

export function StudentSearch({
  studentFields,
  associateFields,
}: Readonly<{
  studentFields: UseFieldArrayReturn<SchoolSchemaType, 'students', 'id'>;
  associateFields: UseFieldArrayReturn<SchoolSchemaType, 'associate', 'id'>;
}>) {
  const [document, setDocument] = useState('');
  const [userData, setUserData] = useState<IExistsUserPJ | null>(null);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const { mutate: getRegisteredUser, isLoading } = useMutation<IExistsUserPJ, Error, string>(
    (id: string) => LegalPersonService.GetUserById(id),
  );

  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(StudentFormSchema),
    mode: 'onChange',
  });

  const handleRegisteredUser = ({ document }: { document: string }) => {
    getRegisteredUser(document, {
      onSuccess: (data: IExistsUserPJ) => {
        setUserData(data);
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    });
  };

  const onReset = () => {
    setUserData(null);
    form.reset();
    setDocument('');
  };

  const onSubmit = () => {
    if (
      studentFields.fields.length > 0 &&
      studentFields.fields.some(
        (field) =>
          field.document === form.getValues().document || field.email === form.getValues().email,
      )
    ) {
      toast.warning(`Aluno já adicionado`, {
        description: 'Tente adicionar outro aluno e conclua o processo.',
      });
    } else {
      studentFields.append({
        ...form.getValues(),
      });
      onReset();
      toast.success(`${form.getValues().name} adicionado com sucesso`, {
        description: form.getValues().email,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-bold">Cadastro de Aluno</h4>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-2 md:max-w-[500px]">
          <Label>Digite o CPF do aluno que deseja cadastrar</Label>
          <Input
            onChange={(e) => setDocument(e.target.value)}
            type="text"
            maxLength={11}
            value={document}
            placeholder="Ex: 434.023.105-27"
          />
        </div>
        <div className="mb-1 flex items-center gap-2">
          <Button
            type="button"
            isLoading={isLoading}
            disabled={document.length != 11}
            size="sm"
            variant="secondary"
            onClick={() => handleRegisteredUser({ document })}
            className="mt-auto w-full md:w-fit"
          >
            <SearchIcon className="mr-2 size-4" />
            Procurar
          </Button>
          {document.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onReset()}
              className="mt-auto w-full md:w-fit"
            >
              <XIcon className="mr-2 size-4" />
              Resetar
            </Button>
          )}
        </div>
      </div>
      {userData && userData.isFound && (
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (
                associateFields.fields.length > 0 &&
                associateFields.fields.some((field) => field.document === FormatCPF(document))
              ) {
                toast.warning(`Aluno já adicionado`, {
                  description: 'Tente adicionar outro aluno e conclua o processo.',
                });
              } else {
                associateFields.append({
                  document: FormatCPF(document),
                  name: userData.name ?? '',
                  email: userData.email ?? '',
                });
                toast.success(`${userData.name} adicionado com sucesso`, {
                  description: userData.email,
                });
              }
            }}
          >
            <PlusIcon className="mr-1 size-4" />
            Incluir Aluno
          </Button>
        </div>
      )}
      {userData && !userData.isFound && (
        <Form {...form}>
          <motion.form variants={slideUp} initial="hidden" animate="show">
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
                          placeholder="000.000.000-00"
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
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold">Endereço</h5>
              <div className="grid grid-cols-12 gap-4">
                <FormField
                  name="address.zipCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <div className="relative inline-flex w-full">
                          <Input
                            {...field}
                            placeholder="Digite o CEP"
                            onChange={(e) => {
                              const formattedValue = FormatZipCode(e.target.value);
                              field.onChange(formattedValue);

                              if (formattedValue.length === 9) {
                                setIsAddressLoading(true);
                                FetchAndFillAddress(removeNonNumeric(formattedValue), form, {
                                  state: 'address.state',
                                  city: 'address.city',
                                  street: 'address.street',
                                  neighborhood: 'address.neighborhood',
                                }).then(() => {
                                  setIsAddressLoading(false);
                                });
                              }
                            }}
                          />
                          <div className="absolute right-2 top-3">
                            <PuffLoader loading={isAddressLoading} size="1rem" color="#64748B" />
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
            <Button
              type="button"
              onClick={() => onSubmit()}
              variant="outline"
              className="mt-4 w-fit"
              size="sm"
            >
              <PlusIcon className="mr-1 size-4" />
              Incluir Aluno
            </Button>
          </motion.form>
        </Form>
      )}
    </div>
  );
}
