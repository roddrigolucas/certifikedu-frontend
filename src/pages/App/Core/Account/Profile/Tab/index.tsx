import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { DownloadCloud } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { toast } from 'sonner';

import {
  DefaultNaturalPersonValues,
  NaturalPersonSchema,
  NaturalPersonSchemaType,
} from '@/pages/Authentication/SignUp/NaturalPersonForm/validation/schema';
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

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import { INaturalPersonUpdate } from '@/services/entities/app/naturalPerson/profile/types';

import { FetchAndFillAddress } from '@/utils/getAddress';
import {
  FormatBirthday,
  FormatCPF,
  FormatPhone,
  FormatZipCode,
  removeNonNumeric,
} from '@/utils/validation/format';

import { UpdateUserInfoDialog } from '../UpdateUserInfoDialog';

type UpdatedInfo = {
  fieldName: string;
  oldValue: string | undefined;
  newValue: string | undefined;
};

interface InterfaceProfile {
  isCPF?: string;
  level?: string;
  setCreated?: () => void;
}

export default function ProfileTab({ isCPF, level, setCreated }: Readonly<InterfaceProfile>) {
  const { profileData, isLegalPerson, UpdateCredits } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [changedValues, setChangedValues] = useState<INaturalPersonUpdate>({});
  const [oldAndNewValue, setOldAndNewValue] = useState<Array<UpdatedInfo>>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const displayCPF =
    isCPF !== undefined
      ? FormatCPF(isCPF)
      : FormatCPF(profileData?.naturalPerson.cpf ?? DefaultNaturalPersonValues.cpf);

  const EditDefaultFormValues: NaturalPersonSchemaType = {
    name: profileData?.naturalPerson.name ?? DefaultNaturalPersonValues.name,
    email: profileData?.naturalPerson.email ?? DefaultNaturalPersonValues.email,
    alternativeEmail:
      profileData?.naturalPerson.alternativeEmail ?? DefaultNaturalPersonValues.alternativeEmail,
    phone: FormatPhone(profileData?.naturalPerson.phone ?? DefaultNaturalPersonValues.phone),
    cpf: displayCPF,
    birthday: profileData?.naturalPerson.birthDate ?? DefaultNaturalPersonValues.birthday,
    street: profileData?.naturalPerson.street ?? DefaultNaturalPersonValues.street,
    neighborhood:
      profileData?.naturalPerson.neighborhood ?? DefaultNaturalPersonValues.neighborhood,
    additionalDetails:
      profileData?.naturalPerson.additionalDetails ?? DefaultNaturalPersonValues.additionalDetails,
    city: profileData?.naturalPerson.city ?? DefaultNaturalPersonValues.city,
    state: profileData?.naturalPerson.state ?? DefaultNaturalPersonValues.state,
    number: profileData?.naturalPerson.number ?? DefaultNaturalPersonValues.number,
    cep: FormatZipCode(profileData?.naturalPerson.zipCode ?? DefaultNaturalPersonValues.cep),
    password: 'Teste123!',
    confirmPassword: 'Teste123!',
  };

  const form = useForm<NaturalPersonSchemaType>({
    resolver: zodResolver(NaturalPersonSchema),
    defaultValues: EditDefaultFormValues,
    mode: 'onChange',
  });

  const { mutate: createUserLegalPersonPF } = useMutation<any, Error, INaturalPersonUpdate>(
    async (profileData) => await LegalPersonService.CreateUserPJPF(profileData),
  );

  function onSubmit(values: NaturalPersonSchemaType) {
    if (isLegalPerson) {
      const packageData = {
        email: values.email,
        documentNumber: removeNonNumeric(values.cpf),
        role: level,
        // environment: 'institutional', fix it
        pfInfo: {
          name: values.name,
          phoneNumber: removeNonNumeric(values.phone),
          DOB: values.birthday,
          cepNumber: removeNonNumeric(values.cep),
          state: values.state,
          city: values.city,
          region: values.neighborhood,
          street: values.street,
          houseNumber: values.number,
          complement: '',
          alternativeEmail: values.alternativeEmail,
        },
      };
      createUserLegalPersonPF(packageData, {
        onSuccess: () => {
          toast.success(<span data-testId="toast-success">Usuário criado com sucesso</span>);
          UpdateCredits();
          setCreated?.();
        },
        onError: () => {
          toast.error(
            'Usuário ja existe em nossos banco de dados, pesquise pelo CPF correto no campo acima...',
            {
              duration: 2000,
            },
          );
        },
      });
    } else {
      let changedValues: Partial<NaturalPersonSchemaType> = {};

      Object.keys(values).forEach((key) => {
        const formKey = key as keyof NaturalPersonSchemaType;
        if (values[formKey] !== EditDefaultFormValues[formKey]) {
          changedValues[formKey] = values[formKey];
        }
      });

      if (Object.keys(changedValues).length > 0) {
        let updates: Array<UpdatedInfo> = Object.keys(changedValues).map((key) => {
          const formKey = key as keyof NaturalPersonSchemaType;

          return {
            fieldName: key,
            oldValue: EditDefaultFormValues[formKey],
            newValue: changedValues[formKey],
          };
        });
        setIsOpen(true);
        setChangedValues(changedValues);
        setOldAndNewValue(updates);
      }

      return changedValues;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h4 className="font-bold text-slate-950"> Dados Pessoais</h4>
          <div className="grid grid-cols-12 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} data-testId="name-input" />
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
                      disabled={!isLegalPerson}
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
                      data-testId="birthday-input"
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} data-testId="email-input" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="alternativeEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>E-mail Alternativo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      data-testId="alternative-email-input"
                      type="email"
                      placeholder="e-mail secundário (opcional)"
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
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      data-testId="phone-input"
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
                        data-testId="cep-input"
                        className="pr-10"
                        onChange={(e) => {
                          const formattedValue = FormatZipCode(e.target.value);

                          field.onChange(formattedValue);

                          if (formattedValue.length === 9) {
                            setIsAddressLoading(true);
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
                    <Input {...field} data-testId="state-input" />
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
                    <Input {...field} data-testId="city-input" />
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
                    <Input {...field} data-testId="street-input" />
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
                    <Input {...field} data-testId="streetNumber-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col-reverse justify-end gap-2 md:flex-row">
          <Button
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
            type="submit"
            variant="success"
            data-testId="submit-button"
            className="w-full md:w-fit"
          >
            <DownloadCloud className="mr-2 size-5" />
            Salvar
          </Button>
          <UpdateUserInfoDialog
            oldAndNewValue={oldAndNewValue}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            changedValues={changedValues}
          />
        </div>
      </form>
    </Form>
  );
}
