import React, { useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { Check, Download, Flame, Send, Trash2Icon, X } from 'lucide-react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as yup from 'yup';

import { queryClient } from '@/components/Providers';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { IStudentBulk } from '@/services/entities/app/legalPerson/students/model';
import { TemplateService } from '@/services/entities/app/naturalPerson/templates';

import { downloadCsv } from '@/utils/downloadCsv';
import { removeNonNumeric } from '@/utils/validation/format';

const csvSchema = yup.object().shape({
  documento: yup
    .string()
    .trim()
    .required('cpf is required')
    .test('is-valid-cpf', 'Digite um CPF válido', (value) => cpfChecker.isValid(value ?? '')),
});

interface FileUploaderTestProps {
  children: React.ReactNode;
}

const FileUploaderTest: React.FC<FileUploaderTestProps> = ({ children }) => {
  const [rows, setRows] = useState<IStudentBulk[]>([]);
  const [sucess, isSuccess] = useState<boolean>(false);

  const { selectedPJ } = useProfile();
  const { id } = useParams<{ id: string }>();

  const { mutate: RegisterAllowedCpfs, isLoading } = useMutation<
    { success: boolean },
    Error,
    { templateId: string; pjId: string; data: { documents: string[] } }
  >(({ templateId, pjId, data }) => TemplateService.AddAllowedDocument(pjId, templateId, data));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const tempRows: IStudentBulk[] = [];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        for (const row of result.data) {
          const typedRow = row as { [key: string]: string };

          if (Object.values(typedRow).some((value) => value !== '')) {
            try {
              const validatedRow = await csvSchema.validate(row);
              tempRows.push({ ...validatedRow, isValid: true });
            } catch (error) {
              if (error instanceof yup.ValidationError) {
                tempRows.push({ ...typedRow, isValid: false, error: error });
              }
            }
          }
        }
        setRows(tempRows);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  function OnSubmit(users: IStudentBulk[]) {
    const valuesList = users?.map((user) => removeNonNumeric(user?.documento ?? '')) ?? [];

    const CPFS = { documents: valuesList };
    RegisterAllowedCpfs(
      {
        pjId: selectedPJ?.pjId ?? '',
        templateId: id ?? '',
        data: CPFS,
      },
      {
        onSuccess: () => {
          isSuccess(true);
          queryClient.refetchQueries({ queryKey: [`id: ${id}`] });
          toast.success('Envio feito com successo');
        },
        onError: () => {
          toast.error('Erro emitindo certificados, tente novamente...');
        },
      },
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {children}
        </div>
        {rows.length > 0 && (
          <Button
            type="reset"
            variant="outline"
            size="sm"
            onClick={() => {
              setRows([]);
              isSuccess(false);
            }}
            className=" hover:bg-red-300 "
          >
            <div className="flex flex-col items-center">
              <Trash2Icon className="text-red-500" size={16} />
              Limpar
            </div>
          </Button>
        )}
      </div>
      <div className="px-4">
        {rows.length > 0 && (
          <div className="flex flex-col">
            {!sucess && (
              <div className="flex flex-row">
                <div className="inline-flex w-1/2 gap-2">
                  <Check size={26} color={'green'} />
                  <p className="text-sm font-bold text-black ">
                    {' '}
                    {rows.filter((item) => item.isValid).length} Válido(s){' '}
                  </p>
                </div>
                <div className="inline-flex gap-2">
                  <X size={26} color={'red'} />
                  <p className="text-sm font-bold text-black ">
                    {rows.filter((item) => !item.isValid).length} Inválido(s){' '}
                  </p>
                </div>
              </div>
            )}
            {sucess && (
              <div className="inline-flex gap-2">
                <Flame size={26} color={'orange'} />
                <p className="font-bold text-black ">
                  Envio feito com sucesso. Verifique as configurações{' '}
                </p>
              </div>
            )}
            <div className="flex flex-row gap-4">
              <Button
                type="button"
                variant="success"
                disabled={rows.filter((item) => item.isValid).length === 0 || sucess}
                onClick={() => {
                  OnSubmit(rows.filter((item) => item.isValid));
                }}
                isLoading={isLoading}
                className="mt-5 w-full "
              >
                <Send size={20} className="mr-2" />
                Enviar
              </Button>
              {rows.filter((item) => !item.isValid).length > 0 && (
                <Button
                  type="reset"
                  variant="outline"
                  disabled={rows.length === 0}
                  onClick={() => {
                    const validDocuments = rows
                      .filter((item) => !item.isValid)
                      .map((item) => item.documento)
                      .filter((doc): doc is string => doc !== undefined); // Type guard to filter out undefined
                    downloadCsv(validDocuments);
                  }}
                  isLoading={isLoading}
                  className="mt-5 w-full "
                >
                  <Download size={20} className="mr-2" />
                  Baixar Inválidos
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploaderTest;
