/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { Download, FileText, ShieldAlert, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';
import { Switch } from '@/components/shared/ui/switch';

import { useGalleryContext } from '@/hooks/core/useGallery';

import { cn } from '@/utils';

interface ImageFile {
  file: File;
  preview: string;
}

function AlertLogo() {
  return (
    <Alert variant="info">
      <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
        <span className="inline-flex items-center gap-2">
          💡 Carregue uma imagem que represente o logo da sua Instituição. A imagem deve possuir um
          fundo transparente para ser aceita, do tipo .PNG
        </span>
        <div className="w-full sm:w-fit">
          <a href={'/images/orange-badge.png'} download={'Orange_Badge_Exemplo.png'}>
            <Button variant="secondary" size="sm">
              <Download className="mr-2 size-4" />
              Baixar exemplo
            </Button>
          </a>
        </div>
      </AlertDescription>
    </Alert>
  );
}

function ImageUploadDropzone() {
  const { setImageFile, imageFile, hasLogo, setHasLogo } = useGalleryContext();
  const [image, setImage] = useState<ImageFile | null>(null);
  const [hasTransparency, setHasTransparency] = useState<boolean | null>(true);
  const [dropedFile, setDropedFile] = useState<File | null>(null);

  useEffect(() => {
    if (imageFile?.name == 'editlogotype.png') {
      setHasLogo(true);
      setImage({
        file: imageFile,
        preview: URL.createObjectURL(imageFile),
      });
      setHasTransparency(true);
    } else if (!imageFile) {
      setImage(null);
    }
  }, [imageFile]);

  const checkTransparency = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data || [];

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) {
        setHasTransparency(true);

        return;
      }
    }
    setHasTransparency(false);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setDropedFile(file);
      setImageFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => checkTransparency(img);
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
        setImage({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setImageFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
    },
    multiple: false,
  });

  return (
    <div className="mb-10">
      <div className="mt-4 flex flex-col justify-center space-y-4">
        <AlertLogo />
        <div className="mt-3 inline-flex gap-2">
          <Switch
            data-testId="logo-switch"
            checked={hasLogo}
            onCheckedChange={setHasLogo}
            className="bg-green-500"
          />
          <p className={cn('text-slate-700 font-bold', { 'text-slate-400': !hasLogo })}>
            Envie o logo que irá no seu certificado
          </p>
        </div>
        {!hasTransparency && hasLogo && (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <ShieldAlert className="size-16 text-red-600" />
            <p className="text-sm font-semibold">Imagem não possuí fundo transparente.</p>
            <p className="text-sm font-semibold">Carregue uma imagem válida.</p>
          </div>
        )}
        {(!image || !hasTransparency) && hasLogo && (
          <div className="space-y-5">
            <div
              {...getRootProps()}
              className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}
            >
              <input {...getInputProps()} />
              <UploadCloudIcon />
              <div className="flex items-center space-x-1 py-3">
                {' '}
                <p className="font-bold text-orange-500">Clique aqui para enviar</p>
                <p className="font-bold text-slate-500">ou arraste e solte o arquivo aqui</p>
              </div>
              <p className="mt-2 text-gray-500">Apenas arquivos do tipo .PNG são aceitos</p>
            </div>
          </div>
        )}
      </div>
      {image && hasTransparency && hasLogo && (
        <div className=" flex flex-col items-center justify-center ">
          <img
            src={image?.preview}
            alt="Uploaded Image Preview"
            className="mt-5 w-40 max-w-xs rounded"
            onLoad={(e) => checkTransparency(e.currentTarget as HTMLImageElement)}
          />
          <div className="flex flex-col">
            <p className="mt-4 p-1 text-center text-lg font-bold text-primary">
              Imagem importada com sucesso!
            </p>
            <div className="inline-flex space-x-2 py-3">
              <FileText />
              <p>{dropedFile?.name}</p>
              <p>{dropedFile?.size} bytes</p>
            </div>
            <Button
              onClick={() => {
                setImage(null);
                setHasTransparency(true);
                setImageFile(null);
              }}
              size="icon"
              type="button"
              variant="outline"
              className="mx-auto h-10 hover:border-red-100 hover:bg-red-50 hover:text-red-600 "
            >
              <Trash2Icon className="size-4" />
            </Button>
            <h1 className="text-center text-sm">Limpar</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploadDropzone;
