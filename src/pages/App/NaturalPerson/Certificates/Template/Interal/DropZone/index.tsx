/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useState } from 'react';

import { FileText, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';

import { useGalleryContext } from '@/hooks/core/useGallery';

import { ImageFile } from '..';

function AlertImage() {
  return (
    <Alert variant="info">
      <AlertDescription className="flex w-full flex-col gap-2">
        <span>
          💡 Carregue uma imagem para ser o modelo do seu certificado. Deve ser uma imagem .png, com
          no máximo 600kb.
        </span>
        <div className="mr-auto flex flex-col items-start py-1">
          <p className="font-semibold">Dimensôes recomendadas:</p>
          <p>
            Largura:<span className="px-1 font-bold">1300px</span>{' '}
          </p>
          <p>
            Altura:<span className="px-1 font-bold">880px</span>{' '}
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}

const resizeImage = (file: File, width: number, height: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Canvas is empty'));
            }
          }, file.type);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

interface IUploadDropzone {
  setImage: (value: ImageFile | null) => void;
  image: ImageFile | null;
}

function ImageBGUploadDropzone({ setImage, image }: IUploadDropzone) {
  const { setImageFile } = useGalleryContext();
  const [dropedFile, setDropedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles[0];
      setDropedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
        const resizedFile = await resizeImage(file, 1300, 882);
        setImageFile(resizedFile);
        setImage({
          file: resizedFile,
          preview: URL.createObjectURL(resizedFile),
        });
      }
      if (fileRejections?.length > 0) {
        const { errors } = fileRejections[0];
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast.error(`Imagem muito grande. Tamanho máximo permitido: 600KB.`);
          }
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
    maxSize: 600 * 1024, // 600KB
    multiple: false,
  });

  return (
    <div className="w-full">
      <div className=" flex flex-col justify-center space-y-4">
        <h3 className="text-lg font-bold">
          Cadastre uma nova imagem de fundo para ser utilizada em seu certificado
        </h3>
        <AlertImage />
        {!image && (
          <div className="space-y-5">
            <div
              {...getRootProps()}
              className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}
            >
              <input data-testId="file-input" {...getInputProps()} />
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
      {image && (
        <div className="flex flex-col items-center justify-center ">
          <img
            src={image.preview}
            alt="Uploaded Image Preview"
            className="mt-5 max-w-xs rounded-lg border"
          />
          <div className="flex flex-col items-center">
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

export default ImageBGUploadDropzone;
