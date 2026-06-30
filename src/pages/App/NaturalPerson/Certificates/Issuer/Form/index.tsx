/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import Multiselect from '@cloudscape-design/components/multiselect';
import SelectCloud from '@cloudscape-design/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, FileBadge, Loader2, PlusIcon, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import ColorPickerComponent from '@/components/core/molecules/ColorPicker';
import ImageGalleryPage from '@/components/core/molecules/DisplayImages';
import { TiptapTextEditor } from '@/components/layouts/app/Form/TextEditor';
import { queryClient } from '@/components/Providers';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { HoverCard, HoverCardTrigger } from '@/components/shared/ui/hover-card';
import { Input } from '@/components/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
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
import { useGalleryContext } from '@/hooks/core/useGallery';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CanvasService } from '@/services/entities/app/canvas';
import { AbilitiesService } from '@/services/entities/app/core/abilities';
import { IAbility } from '@/services/entities/app/core/abilities/model';
import { FontsService } from '@/services/entities/app/core/fonts';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { cn } from '@/utils';
import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';
import { FormatBirthday, removeNonNumeric } from '@/utils/validation/format';

import QRCodePositionSelector from '../QrCodeSection/qrocdeOption';
import CertificatePreview from './preview/preview';
import {
  CertificateIssuerSchemaNaturalPerson,
  CertificateIssuerSchemaNaturalPersonType,
} from './validation/schema';

interface ICreateFormProps {
  setCreated: () => void;
  data: ITemplate | null;
}

export interface IAbilityOptions {
  label?: string;
  value?: string;
}

/**
 * form for creating certificates in the colaborator panel
 */
export default function CreateCertificateFormColaborator({
  setCreated,
  data,
}: Readonly<ICreateFormProps>) {
  const {
    setImagePath,
    imagePath,
    reverseimagePath,
    setReverseImagePath,
    setImageFile,
    imageFile,
    setHasLogo,
    hasLogo,
    QrCodeImage,
    setQrCodeImage,
    fontColor,
    selectedFont,
    setSelectedFont: setSelectedFontContext,
  } = useGalleryContext();
  const { selectedPJ, schools, isCanvas } = useProfile();
  const { abilities, categories } = useAbilitie();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedQRCode, setSelectedQRCode] = useState<boolean>(false);
  //const [selectedFont, setSelectedFont] = useState<{ label: string; value: string } | null>(null);
  const [fonts, setFonts] = useState<{ label: string; value: string }[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fontsToExclude = [
      'fonts/BaskervilleSerial_Regular.ttf',
      'fonts/NightGeorgia_Regular.ttf',
      'fonts/Trebuchet_Regular.ttf',
      'fonts/WindSong_Regular.ttf',
    ];
    const fetchFonts = async () => {
      const data = await FontsService.GetAllFonts();

      const filteredData = data.filter(
        (font) => font.ttfUrl && !fontsToExclude.includes(font.ttfUrl),
      );

      setFonts(
        filteredData.map((font) => ({
          label: `${font.family} - ${font.category}`,
          value: font.fontId,
        })),
      );
    };

    fetchFonts();
  }, []);

  const form = useForm<CertificateIssuerSchemaNaturalPersonType>({
    resolver: zodResolver(CertificateIssuerSchemaNaturalPerson),
    mode: 'onChange',
    defaultValues: {
      schoolId: data?.schoolId,
      courseId: data?.courses[0]?.courseId,
      name: data?.name,
      description: data?.description,
      descriptionImage: data?.descriptionImage,
    },
  });

  const [recommendedSkills, setRecommendedSkills] = useState<
    { label: string; value: string; category: string }[]
  >([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState<boolean>(false);

  const watchedName = form.watch('name');
  const watchedDescription = form.watch('description');

  useEffect(
    function fetchRecommendations() {
      const textToAnalyze = `${watchedName ?? ''} ${watchedDescription ?? ''}`.trim();

      if (textToAnalyze.length < 5) {
        setRecommendedSkills([]);

        return;
      }

      const timer = setTimeout(async () => {
        setIsLoadingRecs(true);
        try {
          const recommendations = await AbilitiesService.GetRecommendationsPj(textToAnalyze);
          setRecommendedSkills(recommendations);
        } catch (err) {
          toast.error('Erro ao buscar habilidades recomendadas');
        }

        setIsLoadingRecs(false);
      }, 1500);

      return () => clearTimeout(timer);
    },
    [watchedName, watchedDescription],
  );

  const isSkillSelected = (skillValue: string) => {
    const currentSkills = form.getValues('habilidades') || [];

    return currentSkills.some((skill) => skill.value === skillValue);
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

  async function SetDefaultLogo(path: string) {
    const url = getImageUrl(path);
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], `editlogotype.png`, { type: blob.type });
    setImageFile(file);
  }

  useEffect(() => {
    if (data) {
      const defaultAbilities = () =>
        data.abilities.map((ability) => ({
          value: ability.abilityId,
          label: ability.ability,
        }));
      const abilitiesArray = defaultAbilities();
      form.setValue('habilidades', [abilitiesArray[0], ...abilitiesArray]);
      const hours = Math.floor(data.hoursWorkload);
      form.setValue('cargaHoraria', hours);
      form.setValue('minutes', Math.round((data.hoursWorkload - hours) * 60));

      if (data.issuedAt) {
        form.setValue('emittedAt', data.issuedAt);
      }
      if (data.expiresAt) {
        form.setValue('expireAt', data.expiresAt);
      }
      setImagePath(data.backgroundId);
      if (data.logoImage) {
        SetDefaultLogo(data.logoImage);
      } else {
        setHasLogo(false);
      }
    } else {
      setImageFile(null);
    }
  }, [data]);

  const formDescriptionImage = form.watch('descriptionImage');

  const formSchoolId = form.watch('schoolId');

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

  function onSubmit(values: CertificateIssuerSchemaNaturalPersonType) {
    if (hasLogo && !imageFile) {
      toast.error('Carregue o seu logo...');

      return;
    }
    if (!values.schoolId && selectedPJ) {
      toast.error('Selecione a instituição...');

      return;
    }
    const qrCode = selectedQRCode ? QrCodeImage ?? 'NULL' : 'NULL';
    const formData = new FormData();

    const selectedAbilities = values.habilidades?.map(
      (habilidade: { value: string }) => habilidade.value,
    );

    formData.append('descriptionImage', values.descriptionImage ?? '');
    formData.append('schoolId', values.schoolId ?? '');
    formData.append('description', values.description ?? '');
    formData.append('name', values.name ?? '');
    formData.append(
      'hoursWorkload',
      String(values.cargaHoraria + (values.minutes ?? 0) / 60) ?? '',
    );
    formData.append('hexFontColor', fontColor ?? '');
    formData.append('imageTemplate', imagePath);

    selectedAbilities.forEach((ability) => {
      formData.append('abilities', ability);
    });

    formData.append('abilities', JSON.stringify(selectedAbilities ?? []));

    if (selectedFont) {
      formData.append('fontIdName', selectedFont.value);
      formData.append('fontIdDesc', selectedFont.value);
    }

    if (values.emittedAt) {
      formData.append('issuedAt', values.emittedAt);
    }
    if (values.expireAt) {
      formData.append('expiresAt', values.expireAt);
    }
    if (values.courseId) {
      formData.append('courseId', values.courseId);
    }
    if (imageFile && hasLogo) {
      formData.append('imageLogo', imageFile);
    }
    if (!hasLogo) {
      formData.append('imageLogo', 'false');
    }
    if (reverseimagePath !== 'undefined') {
      formData.append('inverseId', reverseimagePath);
    }

    formData.append('qrCodePosition', qrCode);

    if (!data) {
      const response = selectedPJ
        ? CertificateService.CreateTemplate(selectedPJ?.pjId ?? '', formData)
        : CanvasService.CreateTemplate(formData);

      setIsLoading(true);
      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          if (selectedPJ) {
            queryClient.invalidateQueries(['templates', `PJ: ${selectedPJ?.pjId}`]).then(() => {
              queryClient.refetchQueries({ queryKey: ['templates', `PJ: ${selectedPJ?.pjId}`] });
            });
          } else if (!!isCanvas) {
            queryClient.refetchQueries({ queryKey: ['canvas-info'] });
          }
          setQrCodeImage('TOP_RIGHT');
          setReverseImagePath('undefined');
          setCreated();

          return <span data-testId="toast-success">Modelo de certificado criado com sucesso</span>;
        },
        error: () => {
          return 'Falha ao criar modelo de certificado...';
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } else {
      const response = selectedPJ
        ? CertificateService.EditTemplate(selectedPJ?.pjId ?? '', data.templateId, formData)
        : CanvasService.EditTemplate(data.templateId, formData);

      setIsLoading(true);
      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          if (selectedPJ) {
            queryClient.invalidateQueries(['templates', `PJ: ${selectedPJ?.pjId}`]).then(() => {
              queryClient.refetchQueries({ queryKey: ['templates', `PJ: ${selectedPJ?.pjId}`] });
            });
          } else if (!!isCanvas) {
            queryClient.refetchQueries({ queryKey: ['canvas-info'] });
          }

          setCreated();

          return <span data-testId="toast-success">Modelo de certificado editado com sucesso</span>;
        },
        error: () => {
          return 'Falha ao editar modelo...';
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    }
  }

  return (
    <Form {...form}>
      <div>
        <ImageGalleryPage />
        <div className="mt-10 inline-flex gap-2  px-5 lg:mt-8 ">
          <Switch
            checked={selectedQRCode}
            onCheckedChange={setSelectedQRCode}
            className="bg-green-500"
          />
          <p className={cn('text-slate-700 font-bold', { 'text-slate-400': !selectedQRCode })}>
            Adicionar QRCode na imagem
          </p>
        </div>
        {selectedQRCode && (
          <>
            <QRCodePositionSelector />
          </>
        )}
      </div>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        {selectedPJ && (
          <div className="mt-8 flex flex-col gap-2 px-6">
            <div className="grid grid-cols-12 gap-4">
              <FormField
                name="schoolId"
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
        )}
        <div className="grid grid-cols-12 gap-4 px-6 py-3">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="font-bold">Título *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testId="name-input"
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
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel className="font-bold">Carga Horária (horas) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testId="cargaHoraria-input"
                    type="number"
                    placeholder="Digite a carga horária em horas"
                    onChange={(e) => {
                      const formattedValue = removeNonNumeric(e.target.value);
                      field.onChange(Number(formattedValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="minutes"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-3">
                <FormLabel>Carga Horária (minutos)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testId="cargaHoraria-input"
                    type="number"
                    placeholder="Digite a carga horária em minutos"
                    onChange={(e) => {
                      const formattedValue = removeNonNumeric(e.target.value);
                      field.onChange(Number(formattedValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="emittedAt"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="font-bold">Data de Emissão *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testId="emittedAt-input"
                    onChange={(e) => {
                      if (e.target.value == '') {
                        form.resetField('emittedAt');
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
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Valido até a data de</FormLabel>
                <FormControl>
                  <Input
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
            </HoverCard>
            <SheetContent className="w-[450px] overflow-auto">
              <SheetHeader>
                <SheetTitle>Texto Completo para Imagem</SheetTitle>
                <SheetDescription>
                  Caso você não queria utilizar o texto padrão da CertifikEdu, adicione aqui uma
                  mensagem completa para ir na imagem do certificado. Clique no botão B para
                  escrever em negrito.
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
                        <TiptapTextEditor
                          value={field.value || ''}
                          onChange={field.onChange} // Tiptap passa o HTML formatado para o hook form
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
                    data-testId="description-input"
                    placeholder="Adicione aqui uma descrição que resuma os objetivos e atividades realizadas ao longo do curso. Essa descrição ficará disponível nas páginas internas da CertifikEDU e não aparecerá na imagem do diploma"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 flex flex-col gap-2">
            <FormLabel>Selecione a cor do texto que irá na imagem</FormLabel>
            <ColorPickerComponent />
          </div>

          <span className="col-span-12 mt-2 text-sm italic text-slate-700">
            Selecione de 3 a 5 categorias de competências e, em seguida, de 3 a 5 habilidades para
            incluir no certificado
          </span>
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

          <FormField
            name="font"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Fonte</FormLabel>
                <FormControl>
                  <SelectCloud
                    {...field}
                    data-testId="font-select"
                    selectedOption={selectedFont}
                    onChange={(event) => {
                      const option = event.detail.selectedOption;
                      if (option.label && option.value) {
                        setSelectedFontContext({ label: option.label, value: option.value });
                        field.onChange({ label: option.label, value: option.value });
                      } else {
                        setSelectedFontContext(null);
                      }
                    }}
                    placeholder="Selecione uma fonte para o certificado"
                    options={fonts}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    data-testId="habilidades-multiselect"
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
        <hr className="my-6 border-gray-300" />
        <CertificatePreview />
        <div className="flex w-full flex-col p-6">
          <p className="italic text-secondary opacity-80">* Campos obrigatórios</p>
          <Button
            className="ml-auto flex w-fit"
            data-testId="submit-button"
            variant="secondary"
            type="submit"
            disabled={isLoading}
            isLoading={form.formState.isSubmitting}
          >
            <FileBadge className="mr-1 size-5" />
            Salvar Certificado
          </Button>
        </div>
      </motion.form>
    </Form>
  );
}
