import { useEffect, useState } from 'react';

import Multiselect from '@cloudscape-design/components/multiselect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArchiveIcon,
  Check,
  FileBadge,
  Loader2,
  Plus,
  PlusIcon,
  Sparkles,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import TermsOfUse from '@/pages/Authentication/SignUp/TermsOfUse';
import { ApplicationLayout } from '@/components/layouts/app';
import { CreditsDialog } from '@/components/layouts/app/shared/CreditsBalance/Dialog';
import { BackButton } from '@/components/shared/BackButton';
import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/shared/ui/hover-card';
import { Input } from '@/components/shared/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { Switch } from '@/components/shared/ui/switch';
import { Textarea } from '@/components/shared/ui/textarea';

import useAbilitie from '@/hooks/core/useAbilitie';
import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';

import { AbilitiesService } from '@/services/entities/app/core/abilities';
import { IAbility } from '@/services/entities/app/core/abilities/model';
import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';

import { cn } from '@/utils';
import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';
import { buildCertificatesPageUrl } from '@/utils/url';
import { FormatBirthday, FormatCNPJ } from '@/utils/validation/format';

import FileUploadDropzone from './DropZone';
import { CertificateIssuerSchema, CertificateIssuerSchemaType } from './validation/schema';

function AlertFiles() {
  return (
    <Alert variant="info">
      <div className="flex items-center text-justify">
        <AlertTriangle className="size-6" />
        <AlertDescription className="w-full justify-between">
          <span className="inline-flex px-4">
            Ao carregar um arquivo, você declara ser o responsável pelo conteúdo enviado e garante
            que possui os direitos necessários para compartilhar o documento. É estritamente
            proibido o envio de arquivos que contenham informações ilegais, ofensivas ou que violem
            direitos de terceiros. A plataforma não se responsabiliza pelo conteúdo dos arquivos
            carregados.
          </span>
        </AlertDescription>
      </div>
    </Alert>
  );
}

/**
 * Página de Autoemissão
 */
export default function CertificateIssuerPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout
      icon={ArchiveIcon}
      title="Emitir Certificado Digital"
      description="Emita um certificado para destacar e compartilhar suas conquistas e conhecimentos."
    >
      <div className="space-y-3">
        <BackButton />
        <div className="mb-48 flex flex-col">
          {isCreated ? (
            <CreatedCertificate setCreated={setCreated} />
          ) : (
            <CreateFormAutoemit setCreated={setCreated} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

export function CreateFormAutoemit({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const queryClient = useQueryClient();

  const { lastCertificatesState } = useCertificate();
  const { profileCredits, UpdateCredits } = useProfile();

  const { abilities, categories } = useAbilitie();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [hasEvidences, setHasEvidences] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [recommendedSkills, setRecommendedSkills] = useState<
    { label: string; value: string; category: string }[]
  >([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState<boolean>(false);

  const balance: boolean =
    (profileCredits?.monthSpentCredits || 0) >=
    (profileCredits?.certificateCredits || 0) + (profileCredits?.additionalCertificateCredits || 0);

  const form = useForm<CertificateIssuerSchemaType>({
    resolver: zodResolver(CertificateIssuerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      cargaHoraria: undefined,
      issuedAt: '',
      expireAt: '',
      statedIssuer: '',
      statedIssuerDocument: '',
      statedIssuerUrl: 'https://',
      descriptionImage: '',
      description: '',
      categories: [],
      habilidades: [],
    },
  });

  const statedIssuer = form.watch('statedIssuer');
  const formDescriptionImage = form.watch('descriptionImage');

  const watchedName = form.watch('name');
  const watchedDescription = form.watch('description');

  useEffect(
    function fetchRecommendations() {
      const textToAnalyze = `${watchedName ?? ''} ${form.getValues('description') ?? ''}`.trim();

      if (textToAnalyze.length < 5) {
        setRecommendedSkills([]);

        return;
      }

      const timer = setTimeout(async () => {
        setIsLoadingRecs(true);
        try {
          const recommendations = await AbilitiesService.GetRecommendationsPf(textToAnalyze);
          setRecommendedSkills(recommendations);
        } catch (err) {
          console.error(err);
        }
        setIsLoadingRecs(false);
      }, 1500);

      return () => clearTimeout(timer);
    },
    [watchedName, watchedDescription, form], // Re-run when these change
  );

  const transformAbilitiesToOptions = (abilities: IAbility) => {
    const filteredAbilities = selectedCategories.length
      ? Object.keys(abilities).filter((tema) => selectedCategories.includes(tema))
      : Object.keys(abilities);

    return filteredAbilities.map((tema) => ({
      label: tema,
      options: abilities[tema].map(({ habilidade, habilidadeId }) => ({
        label: habilidade,
        value: habilidadeId,
      })),
    }));
  };

  const handleCategories = (selectedOptions: any) => {
    const selected = selectedOptions.map((option: { label: string }) => option.label);
    setSelectedCategories(selected);
  };

  const isSkillSelected = (skillValue: string) => {
    const currentSkills = form.getValues('habilidades') || [];

    return currentSkills.some((skill: any) => skill.value === skillValue);
  };

  const filteredRecommendations = recommendedSkills.filter(
    (skill) => selectedCategories.length === 0 || selectedCategories.includes(skill.category),
  );

  const handleAddRecommendation = (skill: { label: string; value: string }) => {
    const currentSkills = (form.getValues('habilidades') || []) as {
      label: string;
      value: string;
    }[];

    if (isSkillSelected(skill.value)) {
      const newSkills = currentSkills.filter((s) => s.value !== skill.value);
      form.setValue('habilidades', newSkills as any, { shouldDirty: true });
    } else {
      form.setValue('habilidades', [...currentSkills, skill] as any, { shouldDirty: true });
    }
  };

  function onSubmit(values: CertificateIssuerSchemaType) {
    const formData = new FormData();

    const selectedAbilities = values.habilidades?.map(
      (habilidade: { label: string }) => habilidade.label,
    );

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof CertificateIssuerSchemaType];

      if (key === 'habilidades') {
        formData.append(key, JSON.stringify(selectedAbilities));
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value?.toString() ?? '');
      }
    });

    if (file && hasEvidences) {
      formData.append('evidences', file);
    }

    const response = CertificateService.CreateCertificate(formData);
    setIsLoading(true);

    toast.promise(response, {
      success: () => {
        queryClient.invalidateQueries(['certificates']);

        lastCertificatesState.refetch();
        setCreated();
        UpdateCredits();

        return <span data-testid="toast-success">Certificado criado com sucesso</span>;
      },
      error: () => {
        queryClient.invalidateQueries(['certificates']);

        return 'Falha ao criar certificado...';
      },
      finally: () => {
        setIsLoading(false);
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
              <FormItem className="col-span-12">
                <FormLabel className="font-bold">Título *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testid="name-input"
                    placeholder="Digite o título do certificado"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="cargaHoraria"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel className="font-bold">Carga Horária *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    data-testid="cargaHoraria-input"
                    placeholder="Digite a carga horária em horas"
                    onChange={(e) => {
                      const formattedValue = e.target.value.replace(/\D/g, '');
                      field.onChange(Number(formattedValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="issuedAt"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Data de Emissão</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      if (e.target.value == '') {
                        form.resetField('issuedAt');
                      } else {
                        const formattedValue = FormatBirthday(e.target.value);
                        field.onChange(formattedValue);
                      }
                    }}
                    placeholder="DD/MM/AAAA"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="expireAt"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Valido até a data de</FormLabel>
                <FormControl>
                  <Input
                    data-testid="expireAt-input"
                    {...field}
                    onChange={(e) => {
                      if (e.target.value == '') {
                        form.resetField('expireAt');
                      } else {
                        const formattedValue = FormatBirthday(e.target.value);
                        field.onChange(formattedValue);
                      }
                    }}
                    placeholder="DD/MM/AAAA"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="statedIssuer"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Organização Certificadora</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome da organização certificadora" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="statedIssuerDocument"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!statedIssuer}
                    placeholder="00.000.000/0000-00"
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
            name="statedIssuerUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Site</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!statedIssuer} placeholder="https://" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Sheet>
            <HoverCard>
              <HoverCardTrigger>
                <FormItem className="mb-2 w-[295px] sm:w-96">
                  <FormLabel>Texto específico para a imagem do Certificado</FormLabel>
                </FormItem>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    className={cn(
                      'w-fit group',
                      {
                        'bg-green-100 hover:bg-green-300':
                          (formDescriptionImage?.length ?? 0) >= 120,
                      },
                      {
                        'bg-red-100 hover:bg-red-300':
                          (formDescriptionImage?.length ?? 0) < 120 &&
                          (formDescriptionImage?.length ?? 0) > 0,
                      },
                    )}
                    variant="outline"
                  >
                    <PlusIcon className="ease mr-2 size-5 transition-transform duration-500 group-hover:rotate-180" />
                    <p>{(formDescriptionImage?.length ?? 0) > 1 ? 'Adicionado' : 'Adicionar'}</p>
                  </Button>
                </SheetTrigger>
              </HoverCardTrigger>
              {(formDescriptionImage?.length ?? 0) > 0 && (
                <HoverCardContent className="w-[370px] whitespace-normal text-wrap sm:w-96">
                  <p className="py-2 text-xl font-bold ">Texto para a imagem do certificado</p>
                  {formDescriptionImage}
                </HoverCardContent>
              )}
            </HoverCard>
            <SheetContent className="w-[450px] overflow-auto">
              <SheetHeader>
                <SheetTitle>Texto Completo para Imagem (Opcional)</SheetTitle>
                <SheetDescription>
                  Caso você não queria utilizar o texto padrão da CertifikEdu, adicione aqui uma
                  mensagem completa para ir na imagem do certificado.
                  <span className="font-bold">
                    {' '}
                    Esse texto é opcional e diferente da descrição de atividades do certificado.
                  </span>
                </SheetDescription>
              </SheetHeader>
              <div className="gap-4 py-4">
                <FormField
                  name="descriptionImage"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Texto para ser escrito na imagem</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          maxLength={600}
                          className="h-60"
                          placeholder="Adicione uma descrição completa, que inclua o Título do curso, a carga horária, o local que ocorreu, o nome do professor, entre outras informações relevantes."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="secondary" type="button">
                    Fechar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel className="font-bold">Descrição Interna *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-testid="description-input"
                    placeholder="Adicione aqui uma descrição que resuma os objetivos e atividades realizadas ao longo do curso. Essa descrição ficará disponível nas páginas internas da CertifikEDU e não aparecerá na imagem do diploma"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 inline-flex gap-2 ">
            <Switch
              checked={hasEvidences}
              onCheckedChange={setHasEvidences}
              className="bg-green-500"
            />
            <p className={cn('text-sm font-medium text-slate-600', { 'font-bold': hasEvidences })}>
              Anexar comprovante do certificado
            </p>
          </div>
          {hasEvidences && (
            <div className="col-span-12">
              <FileUploadDropzone setFile={setFile} file={file} />
              <div className="mt-4">
                <AlertFiles />
              </div>
            </div>
          )}
          <FormField
            name="categories"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Categorias</FormLabel>
                <FormControl>
                  <Multiselect
                    {...field}
                    selectedOptions={field.value ?? []}
                    onChange={({ detail }) => {
                      field.onChange(detail.selectedOptions);
                      handleCategories(detail.selectedOptions);
                    }}
                    options={
                      categories?.map((theme) => ({ label: theme, value: theme })) ?? ([] as any)
                    }
                    filteringType="auto"
                    placeholder="Filtre por categorias"
                    virtualScroll={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- SMART RECOMMENDATIONS PANEL --- */}
          {filteredRecommendations.length > 0 && (
            <div className="col-span-12 mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-5 text-indigo-600" />
                <h4 className="font-semibold text-indigo-900">Sugestões Inteligentes</h4>
                {isLoadingRecs && <Loader2 className="ml-2 size-4 animate-spin text-indigo-400" />}
              </div>

              {!isLoadingRecs && (
                <>
                  <p className="mb-3 text-sm text-indigo-700/80">
                    Com base no título e descrição, sugerimos incluir:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filteredRecommendations.map((skill) => {
                      const isSelected = isSkillSelected(skill.value);

                      return (
                        <button
                          key={skill.value}
                          type="button" // Important to prevent form submission
                          onClick={() => handleAddRecommendation(skill)}
                          className={cn(
                            'inline-flex items-center text-start rounded-full border px-3 py-1 text-sm font-medium transition-all',
                            'hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                            isSelected
                              ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                              : 'border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50',
                          )}
                        >
                          {skill.label}
                          {isSelected ? (
                            <Check className="ml-2 size-3" />
                          ) : (
                            <PlusIcon className="ml-2 size-3 opacity-50" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          <FormField
            name="habilidades"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel className="font-bold">Habilidades *</FormLabel>
                <FormControl>
                  <Multiselect
                    {...field}
                    data-testid="habilidades-multiselect"
                    selectedOptions={field.value}
                    onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                    options={abilities ? transformAbilitiesToOptions(abilities) : []}
                    filteringType="auto"
                    placeholder="Selecione as habilidades"
                    virtualScroll={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <footer className="mt-6 w-full ">
          <div className="flex w-full justify-between">
            <p className="text-secondary italic opacity-80">* Campos obrigatórios</p>
            <TermsOfUse checkedTerms={checkedTerms} setCheckedTerms={setCheckedTerms} />
          </div>
          <Button
            className="ml-auto mt-6 flex w-fit"
            data-testid="submit-button"
            variant="secondary"
            type="submit"
            disabled={balance || !checkedTerms || false}
            isLoading={isLoading}
          >
            <FileBadge className="mr-1 size-5" />
            Emitir Certificado
          </Button>
        </footer>
      </motion.form>
    </Form>
  );
}

function CreatedCertificate({ setCreated }: Readonly<{ setCreated: () => void }>) {
  const { profileCredits } = useProfile();

  const balance = profileCredits?.monthSpentCredits ?? 0;
  const total =
    (profileCredits?.certificateCredits ?? 0) + (profileCredits?.additionalCertificateCredits ?? 0);

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
        <h2 className="text-2xl font-bold">Certificado emitido com sucesso!</h2>
        <p className="text-slate-600">
          Agora você pode visualizar seu certificado e compartilhar em suas redes sociais
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Link to={buildCertificatesPageUrl()}>
          <Button data-testid="back-button" variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Meus Certificados
          </Button>
        </Link>
        {balance >= total ? (
          <CreditsDialog />
        ) : (
          <Button variant="success" className="group" onClick={() => setCreated()}>
            <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
            Criar outro Certificado
          </Button>
        )}
      </div>
    </motion.div>
  );
}
