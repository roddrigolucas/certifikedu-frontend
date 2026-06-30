/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { Image, SendIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from '@/components/shared/ui/extend/multiple-carousel';
import { Switch } from '@/components/shared/ui/switch';

import { useGalleryContext } from '@/hooks/core/useGallery';
import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { AdminService } from '@/services/entities/app/admin';
import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

import ImageBGUploadDropzone from './DropZone';

interface IProps {
  backgroundId: string;
  backgroundUrl: string;
  isPublic: string;
}

export interface IPropsImage {
  backgrounds: IProps[];
}

export interface ImageFile {
  file: File;
  preview: string;
}

const CarouselInternalImages = () => {
  const { imageFile, setImageFile, renderImages, setRenderImage } = useGalleryContext();
  const { selectedPJ, backgroundImages, backgroundImagesVerso } = useProfile();
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isVerso, setIsVerso] = useState<boolean>(false);

  const isAdmin = window.location.href.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      if (!isVerso) {
        const privateData = {
          backgrounds: backgroundImages?.data?.backgrounds.filter((item) => !item.isPublic) ?? [],
        };
        setRenderImage(privateData);
      } else {
        const privateData = {
          backgrounds: backgroundImagesVerso?.data?.backgrounds ?? [],
        };
        setRenderImage(privateData);
      }
    }
  }, [isAdmin, backgroundImages, isVerso, backgroundImagesVerso]);

  const admin = useRequestProcessor().query<IPropsImage>(
    [`Images`, `PJ: ${selectedPJ?.pjId}`, `Admin: ${isAdmin}`],
    async () => await AdminService.GetAdminPublicBGImage(),
    {
      enabled: isAdmin,
      onSuccess: (data: IPropsImage) => {
        setRenderImage(data);
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  function processQuerySuccess(response: Promise<any>) {
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        if (isAdmin) {
          admin.refetch();
        } else if (!isVerso) {
          backgroundImages.refetch();
        } else {
          backgroundImagesVerso.refetch();
        }
        setImage(null);
        setImageFile(null);

        return <span data-testId="toast-success">Imagem de fundo cadastrada com sucesso</span>;
      },
      error: () => {
        return 'Erro carregando imagem';
      },
      finally: () => {
        setIsLoading(null);
      },
    });
  }

  function processQueryError(response: Promise<any>) {
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        if (isAdmin) {
          admin.refetch();
        } else if (!isVerso) {
          backgroundImages.refetch();
        } else {
          backgroundImagesVerso.refetch();
        }

        return <span data-testId="delete-success">Imagem de fundo apagada com sucesso</span>;
      },
      error: () => {
        return 'Falha ao apagar Imagem';
      },
      finally: () => {
        setIsLoading(null);
      },
    });
  }

  function onUpload() {
    if (imageFile) {
      setIsLoading('upload');
      const formData = new FormData();
      formData.append('file', imageFile);
      if (isAdmin) {
        const response = AdminService.UploadAdminPublicBGImage(formData);
        processQuerySuccess(response);
      } else if (!isVerso) {
        const response = selectedPJ
          ? CertificateService.SaveBGImage(selectedPJ?.pjId ?? '', formData)
          : CanvasService.SaveBGImage(formData);

        processQuerySuccess(response);
      } else {
        const response = CertificateService.SaveBgVersoImage(selectedPJ?.pjId ?? '', formData);
        processQuerySuccess(response);
      }
    }
  }

  function onDelete(id: string) {
    setIsLoading('delete');
    if (isAdmin) {
      const response = AdminService.DeleteAdminPublicBGImage(id);
      processQueryError(response);
    } else if (!isVerso) {
      const response = selectedPJ
        ? CertificateService.DeleteBGImageById(selectedPJ?.pjId ?? '', id ?? '')
        : CanvasService.DeleteBGImageById(id);

      processQueryError(response);
    } else {
      const response = CertificateService.DeleteBgVersoImage(selectedPJ?.pjId ?? '', id);
      processQueryError(response);
    }
  }

  return (
    <ApplicationLayout icon={Image} title="Imagens Cadastradas">
      <div className="col-span-12 inline-flex gap-2 ">
        <Switch checked={isVerso} onCheckedChange={setIsVerso} className="bg-green-500" />
        <p className={cn('text-sm font-medium text-slate-600', { 'font-bold': isVerso })}>
          Imagens do verso do certificado
        </p>
      </div>
      <div className="flex flex-col xl:flex-row">
        <div className=" flex max-w-screen-md">
          <Carousel orientation="horizontal" className="flex flex-col items-center gap-2">
            <div className=" max-w-screen-xl sm:w-full">
              {(renderImages?.backgrounds?.length ?? 0) > 0 && (
                <>
                  <CarouselMainContainer>
                    {renderImages?.backgrounds?.map((image) => (
                      <SliderMainItem key={image.backgroundId}>
                        <div className="relative">
                          <Button
                            onClick={() => onDelete(String(image.backgroundId))}
                            isLoading={isLoading === 'delete'}
                            type="button"
                            data-testId="delete-button"
                            variant="outline"
                            className="absolute top-0 mx-auto gap-1 bg-red-600 text-white hover:border-red-100 hover:bg-red-300 hover:text-red-600 "
                          >
                            <Trash2Icon className="size-4" />
                            <h1 className="text-center text-sm">Apagar </h1>
                          </Button>

                          <img
                            src={getImageUrl(image.backgroundUrl)}
                            alt="Imagem de Fundo [Error]"
                            className="w-fit rounded-lg border shadow-sm"
                          />
                        </div>
                      </SliderMainItem>
                    ))}
                  </CarouselMainContainer>
                  <CarouselThumbsContainer className="h-32 sm:h-40  lg:h-60">
                    {renderImages?.backgrounds?.map((image, index) => (
                      <SliderThumbItem
                        key={image.backgroundId}
                        index={index}
                        className="cursor-move rounded-md bg-transparent"
                      >
                        <img
                          src={getImageUrl(image.backgroundUrl)}
                          alt="Imagem de Fundo [Error]"
                          className="w-fit rounded-lg border shadow-sm"
                        />
                      </SliderThumbItem>
                    ))}
                  </CarouselThumbsContainer>
                </>
              )}
            </div>
          </Carousel>
        </div>
        {(renderImages?.backgrounds?.length ?? 0) === 0 && (
          <div className="mx-auto w-1/2 py-16 text-center">
            <img
              src={getImageUrl('images/empty/search.svg')}
              alt="search"
              className="h-36 w-full"
            />
            <div className="flex flex-col gap-2">
              <h5 className="text-lg font-bold">Nenhum resultado encontrado</h5>
              <p className="text-slate-600">Cadastre sua primeira imagem...</p>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col md:px-5">
          <ImageBGUploadDropzone setImage={setImage} image={image} />
          {imageFile && !!image && (
            <div className="flex w-full justify-center">
              <Button
                data-testId="submit-button"
                isLoading={isLoading === 'upload'}
                variant="secondary"
                className="mt-5 w-full gap-2 xl:w-1/2"
                onClick={() => onUpload()}
              >
                <SendIcon />
                Enviar Imagem
              </Button>
            </div>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default CarouselInternalImages;
