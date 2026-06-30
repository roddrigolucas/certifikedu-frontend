import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { LockKeyhole, Plus, Search, Users, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Avatar } from '@/components/shared/ui/avatar';
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

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import {
  IExistsUserPJ,
  IPermissionUserPJ,
} from '@/services/entities/app/legalPerson/legalPerson/types';

import { slideUp } from '@/utils/animations';
import { getInitials } from '@/utils/getInitials';
import { getImageUrl } from '@/utils/image';
import { FormatCPF, removeNonNumeric } from '@/utils/validation/format';

import ProfileTab from '../../../Core/Account/Profile/Tab';
import {
  FormSchemaPermission,
  FormTypePermission,
} from '../View/Dialogs/PermissioningDialog/models';

export default function LegalPersonRegisterPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout
      icon={Users}
      title="Criar Colaborador"
      description="Bem-vindo ao ambiente para cadastrar usuários. Inicie digitando o CPF no campo abaixo."
      hideCredits
    >
      <BackButton />
      <div>
        {isCreated ? (
          <CreatedUser setCreated={setCreated} />
        ) : (
          <LegalPersonRegisterComponent setCreated={setCreated} />
        )}
      </div>
    </ApplicationLayout>
  );
}

function LegalPersonRegisterComponent({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const { UpdateCredits } = useProfile();

  const [userData, setUserData] = useState<IExistsUserPJ | null>(null);

  const form = useForm<FormTypePermission>({
    resolver: zodResolver(FormSchemaPermission),
    defaultValues: {
      items: ['basico'],
    },
  });

  let level = form.watch('items');
  const cpf = form.watch('document') ?? '';
  let typeUser = form.watch('type');

  const { mutate: getRegisteredUser, isLoading } = useMutation<IExistsUserPJ, Error, string>(
    (id: string) => LegalPersonService.GetUserById(id),
  );

  const { mutate: associatePermission } = useMutation<unknown, Error, IPermissionUserPJ>(
    (updatePackage) => LegalPersonService.PermissioningUserPJPF(updatePackage),
  );

  const handleRegisteredUser = (values: FormTypePermission) => {
    getRegisteredUser(removeNonNumeric(values?.document ?? ''), {
      onSuccess: (data: IExistsUserPJ) => {
        setUserData(data);
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    });
  };

  const handlePermissionUser = () => {
    if (typeUser == 'institutionaladmin') {
      level[0] = 'medio';
      typeUser = 'institutional';
    }
    const updatePackage = {
      role: level[0],
      cpf: removeNonNumeric(cpf),
      environment: typeUser,
    };
    associatePermission(updatePackage, {
      onSuccess: () => {
        toast.success(
          `Sucesso associando o usuário ${cpf} à sua Instituição,
          com permissionamento ${level[0]}`,
          {
            duration: 2000,
          },
        );
        UpdateCredits();
        setCreated();
      },
      onError: (error: any) => {
        toast.error(`${error}`, {
          duration: 2000,
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        <Form {...form}>
          <motion.form
            className="w-full max-w-screen-md"
            onSubmit={form.handleSubmit(handleRegisteredUser)}
            variants={slideUp}
            initial="hidden"
            animate="show"
          >
            <div className="w-xl flex w-full flex-row gap-6">
              <FormField
                name="document"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Digite o CPF/DNI do usuário que deseja cadastrar</Label>
                    <FormControl>
                      <Input
                        {...field}
                        data-testId="document-input"
                        placeholder="000.000.000-00 ou 0000-0000"
                        value={cpf}
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
              <Button
                isLoading={isLoading}
                disabled={cpf.length < 8}
                variant="secondary"
                data-testId="search-button"
                className="mt-auto md:w-fit"
              >
                <Search className="mr-2 size-4" />
                Procurar
              </Button>
              {cpf.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setUserData(null);
                    form.resetField('document');
                  }}
                  className="mt-auto w-full md:w-fit"
                >
                  <X className="mr-2 size-4" />
                  Resetar
                </Button>
              )}
            </div>
          </motion.form>
        </Form>
      </div>
      {userData && (
        <>
          {userData?.isFound && (
            <div className="w-full py-4 text-left">
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold text-emerald-600">Usuário Encontrado</h5>
                <p className="text-slate-600">Selecione os campos abaixo para continuar</p>
                <div key={'_user'} className="inline-flex items-center   gap-6 py-8">
                  <Avatar className="rounded-lg">
                    <AvatarFallback className="rounded-lg bg-slate-50">
                      {getInitials(userData?.name ?? '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-40 flex-col md:-mt-4">
                    <strong>{userData?.name}</strong>
                    <p className="text-sm font-normal text-slate-600">{userData?.email}</p>
                  </div>
                </div>
                <Form {...form}>
                  <motion.form
                    className="w-full max-w-screen-md"
                    onSubmit={form.handleSubmit(handleRegisteredUser)}
                    variants={slideUp}
                    initial="hidden"
                    animate="show"
                  >
                    <FormField
                      name="type"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-6">
                          <FormLabel>Escolha o tipo de usuário</FormLabel>
                          <Select onValueChange={field.onChange} {...field}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma unidade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['Educacional', 'Corporativo', 'Educacional - Admin'].map((type) => (
                                <SelectItem
                                  key={type}
                                  value={
                                    type === 'Educacional'
                                      ? 'institutional'
                                      : type === 'Corporativo'
                                        ? 'corporate'
                                        : 'institutionaladmin'
                                  }
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.form>
                </Form>
              </div>
            </div>
          )}

          {!userData?.isFound && (
            <div className="w-full py-16 text-center">
              <img
                src={getImageUrl('images/empty/search.svg')}
                alt="search"
                className="h-24 w-full"
              />
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">Usuário ainda não possui conta</h5>
                <p className="text-slate-600">Faça o cadastro completo abaixo...</p>
              </div>
            </div>
          )}

          {userData?.isFound && (
            <Button
              isLoading={isLoading}
              variant="success"
              onClick={() => handlePermissionUser()}
              className="ml-auto mt-auto flex  w-full md:w-fit"
              disabled={!!!typeUser}
            >
              <LockKeyhole className="mr-2 size-4" />
              Associar Usuário
            </Button>
          )}

          {!userData?.isFound && (
            <ProfileTab isCPF={cpf} setCreated={setCreated} level={level[0]} />
          )}
        </>
      )}
    </>
  );
}

function CreatedUser({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Usuário associado com sucesso!</h2>
        <p className="text-slate-600">Agora você pode visualizar seus novos colaboradores</p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Link to={'/users'}>
          <Button variant="outline">
            <Users className="mr-1 size-5 w-full" />
            Meus Colaboradores
          </Button>
        </Link>

        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar outro Usuário
        </Button>
      </div>
    </motion.div>
  );
}
