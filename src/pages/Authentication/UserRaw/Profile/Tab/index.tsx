/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { DownloadCloud } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { toast } from 'sonner';

import {
  DefaultNaturalPersonValues,
  NaturalPersonSchema,
  NaturalPersonSchemaType,
} from '@/pages/Authentication/SignUp/NaturalPersonForm/validation/schema';
import TermsOfUse from '@/pages/Authentication/SignUp/TermsOfUse';
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

import useRequestProcessor from '@/hooks/core/useRequest';

import { GetUserRawInfo, UpdateUserRaw } from '@/services/entities/app/naturalPerson/profile';
import { UpdateRawUserDto } from '@/services/entities/app/naturalPerson/profile/types';

import { FetchAndFillAddress } from '@/utils/getAddress';
import {
  FormatBirthday,
  FormatCPF,
  FormatPhone,
  FormatZipCode,
  removeNonNumeric,
} from '@/utils/validation/format';

function convertDateToISO(date: string): string {
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

export default function ProfileTabRaw() {
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  const EditDefaultFormValues: NaturalPersonSchemaType = {
    name: DefaultNaturalPersonValues.name,
    email: DefaultNaturalPersonValues.email,
    phone: DefaultNaturalPersonValues.phone,
    cpf: DefaultNaturalPersonValues.cpf,
    birthday: DefaultNaturalPersonValues.birthday,
    street: DefaultNaturalPersonValues.street,
    neighborhood: DefaultNaturalPersonValues.neighborhood,
    additionalDetails: DefaultNaturalPersonValues.additionalDetails,
    city: DefaultNaturalPersonValues.city,
    state: DefaultNaturalPersonValues.state,
    number: DefaultNaturalPersonValues.number,
    cep: DefaultNaturalPersonValues.cep,
    password: 'Teste123!',
    confirmPassword: 'Teste123!',
  };

  const form = useForm<NaturalPersonSchemaType>({
    resolver: zodResolver(NaturalPersonSchema),
    mode: 'onChange',
    defaultValues: EditDefaultFormValues,
  });

  const { data } = useRequestProcessor().query([`user_raw`], async () => await GetUserRawInfo(), {
    onSuccess: () => {
      toast.success(`Usuário encontrado`);
    },
    onError: (error: any) => {
      toast.error(`${error}`);
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue('name', data?.name);
      form.setValue('cpf', data.fromCanvas ? '' : FormatCPF(data?.documentNumber));
      form.setValue('phone', FormatPhone(data?.phone));
      form.setValue('email', data?.email);
    }
  }, [data]);

  const { mutate: UpdateUserRawInfoMutate } = useMutation<any, Error, UpdateRawUserDto>(
    async (packageUpdate: UpdateRawUserDto) => await UpdateUserRaw(packageUpdate),
  );

  function onSubmit(values: NaturalPersonSchemaType) {
    const {
      name,
      phone,
      birthday,
      cep,
      state,
      city,
      neighborhood,
      street,
      number,
      additionalDetails,
    } = values;

    const packageToSend = {
      name: name,
      phone: removeNonNumeric(phone),
      birthdate: convertDateToISO(birthday),
      zipCode: removeNonNumeric(cep),
      state: state.toUpperCase(),
      city: city,
      region: neighborhood,
      street: street,
      streetNumber: number,
      complementary: additionalDetails ?? '',
    };

    UpdateUserRawInfoMutate(packageToSend, {
      onSuccess: () => {
        toast.success('Dados atualizados com sucesso', {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      onError: () => {
        toast.error('Error, por favor, tente novamente...', {
          duration: 2000,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <p className="text-slate-600">
            Termine de preencher seus dados pessoais para acessar a CertifikEdu
          </p>
          <div className="grid grid-cols-12 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cpf"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedValue = FormatCPF(e.target.value);
                        field.onChange(formattedValue);
                      }}
                      disabled={!data?.fromCanvas}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthday"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedValue = FormatBirthday(e.target.value);
                        field.onChange(formattedValue);
                      }}
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
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedValue = FormatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'CEP'}
              name={'cep'}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-10"
                        onChange={(e) => {
                          const formattedValue = FormatZipCode(e.target.value);

                          field.onChange(formattedValue);
                          setIsAddressLoading(true);
                          if (formattedValue.length === 9) {
                            FetchAndFillAddress(removeNonNumeric(formattedValue), form, {
                              state: 'state',
                              city: 'city',
                              street: 'street',
                              neighborhood: 'neighborhood',
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
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'City'}
              name={'city'}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="neighborhood"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'number'}
              name={'number'}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-4">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <TermsOfUse checkedTerms={checkedTerms} setCheckedTerms={setCheckedTerms} />
        </div>
        <div className="mt-12 flex w-full flex-col-reverse justify-end gap-2 md:flex-row">
          <Button
            disabled={!checkedTerms}
            type="submit"
            variant="success"
            className="w-full md:w-fit"
          >
            <DownloadCloud className="mr-2 size-5" />
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
