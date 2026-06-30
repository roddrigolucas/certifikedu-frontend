import { useCallback, useState } from 'react';

import { FileText, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';

interface IUploadDropzone {
  setFile: (file: File | null) => void;
  file: File | null;
}

function FileUploadDropzone({ setFile, file }: IUploadDropzone) {
  const [dropedFile, setDropedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const uploadedFile = acceptedFiles[0];
      setDropedFile(uploadedFile);
      if (uploadedFile) {
        setFile(uploadedFile);
      }
      if (fileRejections?.length > 0) {
        const { errors } = fileRejections[0];
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast.error(`Arquivo muito grande. Tamanho máximo permitido: 600KB.`);
          } else if (error.code === 'file-invalid-type') {
            toast.error(`Tipo de arquivo inválido!`);
          }
        });
      }
    },
    [setFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
    },
    maxSize: 600 * 1024, // 600KB
    multiple: false,
  });

  return (
    <div className="w-full">
      <div className=" flex flex-col items-center justify-center rounded-lg border-2 border-dashed">
        {!file && (
          <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center p-3`}>
            <input {...getInputProps()} />
            <UploadCloudIcon />
            <div className="flex items-center space-x-1 py-3">
              {' '}
              <p className="font-bold text-orange-500">Clique aqui para enviar</p>
              <p className="font-bold text-slate-500">ou arraste e solte o arquivo aqui</p>
            </div>
            <p className="text-gray-500">
              Apenas arquivos nos formatos .pdf e .png serão aceitos, com tamanho máximo de 600KB
            </p>
          </div>
        )}
        {file && (
          <div className="flex flex-col ">
            <p className="mt-4 rounded-xl text-center font-bold text-orange-500">
              Arquivo adicionado com sucesso!
            </p>
            <div className="inline-flex space-x-2 py-3 text-slate-600">
              <FileText />
              <p>{dropedFile?.name}</p>
              <p>{dropedFile?.size} bytes</p>
            </div>
            <Button
              onClick={() => {
                setFile(null);
              }}
              size="icon"
              type="button"
              variant="outline"
              className="mx-auto h-10 hover:border-red-100 hover:bg-red-50 hover:text-red-600 "
            >
              <Trash2Icon className="size-4" />
            </Button>
            <h1 className="p-1 text-center text-sm">Limpar</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadDropzone;
