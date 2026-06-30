import React, { useCallback, useState } from 'react';

import { Check, Download, FileText, UploadCloudIcon, UsersIcon } from 'lucide-react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';

const csvSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  cpf: yup.number().positive().integer().required('cpf is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
});

interface CSVRow {
  name?: string;
  cpf?: number;
  email?: string;
  isValid: boolean;
}

function AlertCSV() {
  return (
    <Alert variant="info">
      <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
        <span className="inline-flex items-center gap-2">
          💡 A importação de alunos é feita via arquivo CSV . Para sua importação ocorrer de forma
          correta, utilize o modelo de arquivo de importação, que pode ser baixado clicando no botão
          ao lado.{' '}
        </span>
        <Link replace to="/admin" className="w-full sm:w-fit">
          <Button variant="secondary" size="sm">
            <Download className="mr-2 size-4" />
            Baixar modelo
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

const CSVValidator: React.FC = () => {
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [dropedFile, setDropedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setDropedFile(file);
    const tempRows: CSVRow[] = [];

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
                tempRows.push({ ...typedRow, isValid: false });
              }
            }
          }
        }
        setRows(tempRows);
      },
    });
  }, []);

  const handleSubmitValidRows = async () => {
    // const validRows = rows.filter((row) => row.isValid);

    try {
      // const response = await axios.post(API_ENDPOINT, { data: validRows });
      alert('Data successfully submitted!');
    } catch (error) {
      alert('Failed to submit data.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  return (
    <ApplicationLayout icon={UsersIcon} title="Cadastrar Alunos em Lote">
      <BackButton href={pagePaths.authenticated.naturalPerson.student.root}>
        Voltar para Alunos
      </BackButton>
      <AlertCSV />
      <div className="">
        <div
          {...getRootProps()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          {rows.length === 0 && <input {...getInputProps()} />}

          {rows.length > 0 ? (
            <>
              <Check size={32} color={'green'} />
              <p className="font-bold text-black ">{rows?.length} alunos importados com sucesso</p>
              <p className="mt-2 text-gray-500">Abaixo a listagem para conferência.</p>
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  setDropedFile(null);
                  setRows([]);
                }}
                className="mt-5 w-full md:w-fit"
              >
                Limpar Documento
              </Button>
            </>
          ) : (
            <>
              <UploadCloudIcon />
              <div className="flex items-center space-x-2 py-3">
                {' '}
                <p className="font-bold text-orange-500">Clique para enviar</p>
                <p className="font-bold text-slate-500">ou arraste e solte o arquivo aqui</p>
              </div>
              <p className="mt-2 text-gray-500">Apenas arquivos do tipo .CSV sao aceitos</p>
            </>
          )}
        </div>
      </div>
      <div className={`p-4 ${rows.length > 0 ? 'overflow-x-scroll' : ''}`}>
        {rows.length > 0 && (
          <div className="mt-4">
            <p className="font-bold">Arquivos Importados</p>
            <div className="inline-flex space-x-2 py-3">
              <FileText color="green" />
              <p>{dropedFile?.name}</p>
              <p>{dropedFile?.size} bytes</p>
            </div>
            <table className="w-full table-auto border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="w-40 border border-slate-300">Nome</th>
                  <th className="w-40 border border-slate-300">CPF</th>
                  <th className="w-40 border border-slate-300">Email</th>
                  <th className="w-40 border border-slate-300">Válido</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className={row.isValid ? '' : 'bg-red-100'}>
                    <td className="border border-slate-300">{row.name}</td>
                    <td className="border border-slate-300">{row.cpf}</td>
                    <td className="border border-slate-300">{row.email}</td>
                    <td className="border border-slate-300">{row.isValid ? 'Sim' : 'Não'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={handleSubmitValidRows}
        disabled={rows.every((row) => !row.isValid)}
        className="ml-auto w-full md:w-fit"
      >
        <UploadCloudIcon className="mr-1 size-5" />
        Cadastrar Alunos Válidos
      </Button>
    </ApplicationLayout>
  );
};

export default CSVValidator;
