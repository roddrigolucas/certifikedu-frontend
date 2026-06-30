/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadCloud, UserSquareIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';

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

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { ProfilePJService } from '@/services/entities/app/legalPerson/profile';
import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { FetchAndFillAddress } from '@/utils/getAddress';
import {
  FormatCNPJ,
  FormatCPF,
  FormatPhone,
  FormatZipCode,
  removeNonNumeric,
} from '@/utils/validation/format';

import { defaultFormValues, ProfileSchema, ProfileSchemaType } from './validation/schema';

export default function ProfilePage() {
  const { profileInfo } = useProfile();
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const profile = useRequestProcessor().query(
    ['institute profile'],
    async () => await ProfilePJService.GetInfo(),
  );

  const defaultValues: ProfileSchemaType = {
    ...defaultFormValues,
    ...profile.data,
    cnpj: FormatCNPJ(profile.data?.cnpj ?? ''),
    phone: FormatPhone(profile.data?.phone ?? ''),
    partner: {
      ...(profile.data?.partner ?? defaultFormValues.partner),
      phone: FormatPhone(profile.data?.partner.phone ?? ''),
      cpf: FormatCPF(profile.data?.partner.cpf ?? ''),
      birthdate: new Date(profile.data?.partner.birthdate ?? '')
        .toLocaleString('pt-BR')
        .split(',')[0],
      address: {
        ...(profile.data?.partner.address ?? defaultFormValues.partner.address),
        zipCode: FormatZipCode(profile.data?.partner.address.zipCode ?? ''),
      },
    },
  };

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [profile.isLoading]);

  const ENABLED =
    profileInfo?.status === EUserStatus.ADMIN || profileInfo?.status === EUserStatus.ENABLED;

  function onSubmit(values: ProfileSchemaType) {
    const data = {
      ...values,
    };

    return data;
  }

  return (
    <ApplicationLayout icon={UserSquareIcon} title="Perfil da Instituição/Organização" hideCredits>
      <BackButton />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950">Dados da Empresa</h4>
            <div className="grid grid-cols-12 gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Não preenchido" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cnpj"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Não preenchido"
                        onChange={(e) => {
                          const formattedValue = FormatCNPJ(e.target.value);
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="fantasyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
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
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!ENABLED}
                        placeholder="Não preenchido"
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
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950">Dados do Representante</h4>
            <div className="grid grid-cols-12 gap-4">
              <FormField
                name="partner.name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Não preenchido" disabled={!ENABLED} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.cpf"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Não preenchido"
                        disabled
                        onChange={(e) => {
                          const formattedValue = FormatCPF(e.target.value);
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Não preenchido"
                        disabled={!ENABLED}
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
                name="partner.birthdate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Não preenchido" disabled={!ENABLED} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950">Endereço</h4>
            <div className="grid grid-cols-12 gap-4">
              <FormField
                name="partner.address.zipCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={!ENABLED}
                          placeholder="Não preenchido"
                          onChange={(e) => {
                            const formattedValue = FormatZipCode(e.target.value);
                            field.onChange(formattedValue);

                            if (formattedValue.length === 9) {
                              setIsAddressLoading(true);
                              FetchAndFillAddress(removeNonNumeric(formattedValue), form, {
                                state: 'partner.address.state',
                                city: 'partner.address.city',
                                street: 'partner.address.street',
                                neighborhood: 'partner.address.neighborhood',
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
                name="partner.address.street"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Lougradouro</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.address.streetNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.address.state"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.address.city"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.address.neighborhood"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="partner.address.complementary"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!ENABLED} placeholder="Não preenchido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col-reverse justify-end gap-2 md:flex-row">
            <Button
              // disabled={!form.formState.isDirty || form.formState.isSubmitting}
              type="submit"
              variant="success"
              className="w-full md:w-fit"
            >
              <DownloadCloud className="mr-2 size-5" />
              Salvar
            </Button>
            {/* <UpdateUserInfoDialog
              oldAndNewValue={oldAndNewValue}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              changedValues={changedValues}
            /> */}
          </div>
        </form>
      </Form>
    </ApplicationLayout>
  );
}
