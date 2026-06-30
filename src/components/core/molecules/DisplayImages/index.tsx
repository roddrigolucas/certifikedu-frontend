/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
  FormSchemaPermission,
  FormTypePermission,
} from '@/pages/App/LegalPerson/Users/View/Dialogs/PermissioningDialog/models';
import { IPropsImage } from '@/pages/App/NaturalPerson/Certificates/Template/Interal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import { Form } from '@/components/shared/ui/form';
import { Label } from '@/components/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shared/ui/radio-group';
import { Switch } from '@/components/shared/ui/switch';

import { useGalleryContext } from '@/hooks/core/useGallery';
import useProfile from '@/hooks/core/useProfile';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

import ImageUploadDropzone from '../DropImage';
import ImageComponentReusable from './reusable';

interface ImageGalleryProps {
  images: IPropsImage;
  form: UseFormReturn<FormTypePermission>;
  isVerso: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, form, isVerso }) => {
  return (
    <Form {...form}>
      <form className="mt-20 space-y-8 lg:mt-0">
        <div className="hidden lg:flex ">
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
              {images?.backgrounds?.map((image) => (
                <CarouselItem key={image?.backgroundId} className={`flex basis-1/3 justify-center`}>
                  <div>
                    <ImageComponentReusable
                      key={image?.backgroundId}
                      image={image}
                      form={form}
                      isVerso={isVerso}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious type="button" />
            <CarouselNext type="button" />
          </Carousel>
        </div>
        <div className="space-y-5 lg:hidden">
          <Carousel orientation="vertical" opts={{ align: 'start' }} className="w-full">
            <CarouselContent className="h-[490px]">
              {images?.backgrounds?.map((image) => (
                <CarouselItem
                  key={image?.backgroundId}
                  className={`flex basis-1/3 justify-center `}
                >
                  <div>
                    <ImageComponentReusable
                      key={image?.backgroundId}
                      image={image}
                      form={form}
                      isVerso={isVerso}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious type="button" />
            <CarouselNext type="button" />
          </Carousel>
        </div>
      </form>
    </Form>
  );
};

function ImageGalleryPage() {
  const { setImagePath, setPreviewImageUrl, setReverseImagePath, setPreviewInverseImageUrl } =
    useGalleryContext();
  const { backgroundImages, backgroundImagesVerso } = useProfile();
  const [isPrivate, setIsPrivate] = useState<string>('public');
  const [isVerso, setIsVerso] = useState<boolean>(false);

  const form = useForm<FormTypePermission>({
    resolver: zodResolver(FormSchemaPermission),
    mode: 'onChange',
    defaultValues: {
      items: [],
    },
  });

  const privateData = {
    backgrounds: backgroundImages?.data?.backgrounds.filter((item) => !item.isPublic) ?? [],
  };

  const inverseData = {
    backgrounds: backgroundImagesVerso?.data?.backgrounds ?? [],
  };

  const publicData = {
    backgrounds: backgroundImages?.data?.backgrounds.filter((item) => item.isPublic) ?? [],
  };

  const selectedImagePath = form.watch('items')[0];
  const selectedImagePathInverse = form.watch('itemsInverse')?.[0] ?? '';

  useEffect(() => {
    const dataToUse = isPrivate === 'private' ? privateData : publicData;

    const selectedImage = dataToUse.backgrounds.find((bg) =>
      bg?.backgroundId.includes(selectedImagePath),
    );

    let backgroundIdToSet = selectedImage?.backgroundId;
    let backgroundUrlToSet = selectedImage?.backgroundUrl;

    if (!selectedImage && dataToUse.backgrounds.length > 0) {
      backgroundIdToSet = dataToUse.backgrounds[0].backgroundId;
      backgroundUrlToSet = dataToUse.backgrounds[0].backgroundUrl;

      form.setValue('items', [backgroundIdToSet]);
    }

    if (backgroundIdToSet && backgroundUrlToSet) {
      const fullUrl = getImageUrl(backgroundUrlToSet);

      setImagePath(backgroundIdToSet);

      setPreviewImageUrl(fullUrl);
    } else {
      setImagePath('undefined');
      setPreviewImageUrl('');
    }

    const bgInverse = inverseData.backgrounds.find((bg) =>
      bg?.backgroundId.includes(selectedImagePathInverse),
    );

    if (bgInverse) {
      const fullUrlInverse = getImageUrl(bgInverse.backgroundUrl);

      setReverseImagePath(bgInverse.backgroundId);

      setPreviewInverseImageUrl(fullUrlInverse);
    } else {
      setReverseImagePath('undefined');
      setPreviewInverseImageUrl('');
    }
  }, [
    isPrivate,
    selectedImagePath,
    isVerso,
    selectedImagePathInverse,
    setImagePath,
    setPreviewImageUrl,
    setReverseImagePath,
    setPreviewInverseImageUrl,
    form,
  ]);

  return (
    <div className="App mt-5 gap-2 px-5">
      <h1 className="text-md pl-1 font-bold text-slate-700">
        {isVerso ? 'Escolha a imagem de fundo (verso)' : 'Escolha a imagem de fundo (frontal) *'}
      </h1>
      <div className="col-span-12 mt-5 inline-flex gap-2 ">
        <Switch checked={isVerso} onCheckedChange={setIsVerso} className="bg-green-500" />
        <p className={cn('text-sm font-medium text-slate-600', { 'font-bold': isVerso })}>
          Selecionar Verso
        </p>
        {isVerso && (
          <button
            type="reset"
            onClick={() => {
              form.setValue('itemsInverse', []);
              setReverseImagePath('undefined');
            }}
            className=" items-start hover:opacity-60"
          >
            <Trash2Icon className="text-red-500 " size={18} />
          </button>
        )}
      </div>
      {!isVerso && (
        <>
          <RadioGroup
            onValueChange={(e) => setIsPrivate(e)}
            className="my-4 flex flex-row pl-2"
            value={isPrivate}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="size-5" value="public" id="r2" />
              <Label
                className={cn('text-slate-600 font-semibold', {
                  'text-primary ': isPrivate === 'public',
                })}
                htmlFor="r2"
              >
                Imagens CertifikEdu
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="size-5"
                disabled={privateData?.backgrounds?.length < 1}
                value="private"
                id="r1"
              />
              <Label
                className={cn('text-slate-600 font-semibold', {
                  'text-slate-500 font-normal': privateData?.backgrounds?.length < 1,
                  'text-primary': isPrivate === 'private',
                })}
                htmlFor="r1"
              >
                Minhas Imagens
              </Label>
            </div>
          </RadioGroup>
          <ImageGallery
            images={isPrivate === 'public' ? publicData : privateData}
            form={form}
            isVerso={isVerso}
          />
        </>
      )}
      {isVerso && <ImageGallery images={inverseData} form={form} isVerso={isVerso} />}

      <ImageUploadDropzone />
    </div>
  );
}

export default ImageGalleryPage;
