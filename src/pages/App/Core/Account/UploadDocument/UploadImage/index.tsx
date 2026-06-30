import React, { useCallback, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadCloudIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import { UploadDocument } from '@/services/entities/app/naturalPerson/profile';
import { IProfileInfo } from '@/services/entities/app/naturalPerson/profile/model';

import { getImageUrl } from '@/utils/image';

const allowedExtensions = ['.jpg', '.jpeg', '.png'];
const allowedSize = 1024 * 1024 * 5; // 5 MB

interface IDocumentDropzoneProps {}

const DocumentDropzone: React.FC<IDocumentDropzoneProps> = () => {
  const { updateSpecificProfileInfo } = useProfileStore();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const fileSize = file.size;
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!allowedExtensions.includes(fileExtension) || fileSize > allowedSize) {
      toast.error(
        `Aquivos devem possuir umas das seguintes extensoes: ${allowedExtensions.join(', ')} e nao mais que ${(allowedSize / 1024 / 1024).toFixed(0)} MB.`,
      );

      return false;
    }

    return true;
  };

  const { mutate: UploadDocumentMutate } = useMutation<IProfileInfo, Error, FormData>(
    async (profileData) => await UploadDocument(profileData),
  );

  function onUpload() {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const loadingToastId = toast.loading('Enviando documento...');

      UploadDocumentMutate(formData, {
        onSuccess: (data: IProfileInfo) => {
          updateSpecificProfileInfo(data);
          queryClient.invalidateQueries(['profile']);
          toast.dismiss(loadingToastId);
          toast.success('Documento enviado com sucesso...');
        },
        onError: () => {
          toast.dismiss(loadingToastId);
          toast.error('Falha ao enviar documento...');
        },
      });
    }
  }

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-5">
        <div
          className={`flex w-full items-center justify-center ${selectedImage ? 'h-96' : 'h-96'} cursor-pointer rounded-md transition hover:bg-slate-50`}
          onClick={handleDivClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded document"
              className="max-h-full max-w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex cursor-pointer flex-col items-center text-center">
              <img
                src={getImageUrl('images/empty/gallery.svg')}
                alt="gallery"
                className="size-48"
              />
              <h5 className="text-lg font-bold">
                Arraste suas imagens aqui ou clique para fazer o upload.
              </h5>
              <p className="text-base text-slate-600 "> Arquivos em PNG, JPG ou JPEG</p>
            </div>
          )}
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
            accept={allowedExtensions.join(',')}
          />
        </div>
      </div>
      <footer className="inline-flex justify-end gap-2">
        <Button
          type="reset"
          variant="outline"
          onClick={() => setSelectedImage(null)}
          disabled={selectedImage === null}
          className="w-full md:w-fit"
        >
          Limpar Documento
        </Button>
        <Button
          type="submit"
          variant="success"
          onClick={() => onUpload()}
          disabled={selectedImage === null}
          className="w-full md:w-fit"
        >
          <UploadCloudIcon className="mr-1 size-5" />
          Enviar Documento
        </Button>
      </footer>
    </>
  );
};

export default DocumentDropzone;
