import React, { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { cpf as cpfChecker } from 'cpf-cnpj-validator';
import { AlertTriangle, Check, Download, FileText, UploadCloudIcon, UsersIcon } from 'lucide-react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  SchemaRegisterBulkStudents,
  SchemaRegisterBulkStudentsType,
} from '@/pages/App/NaturalPerson/Students/Register/bulk/validation/schema';
import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Students/bulk/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CourseService } from '@/services/entities/app/legalPerson/courses';
import { StudentService } from '@/services/entities/app/legalPerson/students';
import { IStudentBulk } from '@/services/entities/app/legalPerson/students/model';
import { IRegisterUserBulk } from '@/services/entities/app/legalPerson/students/types';

import { removeNonNumeric } from '@/utils/validation/format';

const csvSchema = yup.object().shape({
  nome: yup.string().trim(),
  documento: yup
    .string()
    .trim()
    .required('cpf is required')
    .test('is-valid-cpf', 'Digite um CPF válido', (value) => cpfChecker.isValid(value ?? '')),
  email: yup.string().email('Digite um email válido').required('Email is required'),
  phone: yup.string().trim(),
});

function AlertCSV() {
  return (
    <Alert variant="info">
      <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
        <span className="inline-flex items-center gap-2">
          💡 A importação de alunos é feita via arquivo CSV . Para sua importação ocorrer de forma
          correta, utilize o modelo de arquivo de importação, que pode ser baixado clicando no botão
          ao lado.{' '}
        </span>
        <a href={'/files/student-register-example.csv'} download={'Certifikedu_CSV_EXEMPLO.csv'}>
          <Button variant="secondary" size="sm">
            <Download className="mr-2 size-4" />
            Baixar exemplo
          </Button>
        </a>
      </AlertDescription>
    </Alert>
  );
}

interface User {
  name?: string;
  phone?: string;
  email: string;
  documentNumber: string;
  isValid: boolean;
  error?: string;
}

interface UserContainer {
  users: User[];
}

function AlertStudents() {
  return (
    <Alert variant="info">
      <div className="flex items-center text-justify">
        <AlertTriangle className="size-6" />
        <AlertDescription className="w-full justify-between">
          <span className="inline-flex px-4">
            Um ou mais alunos apresentaram erros nos dados. Por favor, verifique se os CPFs estão
            corretos, possuem 11 dígitos e se as células estão formatadas como texto. Se o problema
            persistir, entre em contato com o Suporte CertifikEDU pelo telefone: +55 (51)
            99280-0702.
          </span>
        </AlertDescription>
      </div>
    </Alert>
  );
}

const CSVValidator: React.FC = () => {
  const [rows, setRows] = useState<IStudentBulk[]>([]);
  const [dropedFile, setDropedFile] = useState<File | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [hasInvalidStudents, setHasInvalidStudents] = useState<boolean>(false);

  const { selectedPJ, schools, students, isCanvas, UpdateCredits, isRefetchingPJ } = useProfile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setDropedFile(file);
    const tempRows: IStudentBulk[] = [];

    Papa.parse(file, {
      header: true,
      encoding: 'ISO-8859-1',
      skipEmptyLines: true,
      complete: async (result) => {
        let hasInvalid = false;
        for (const row of result.data) {
          const typedRow = row as { [key: string]: string };

          if (Object.values(typedRow).some((value) => value !== '')) {
            try {
              const validatedRow = await csvSchema.validate(row);
              tempRows.push({ ...validatedRow, isValid: true });
            } catch (error) {
              if (error instanceof yup.ValidationError) {
                tempRows.push({ ...typedRow, isValid: false, error: error });
                hasInvalid = true;
              }
            }
          }
        }
        setRows(tempRows);
        setHasInvalidStudents(hasInvalid);
      },
    });
  }, []);

  const { mutate: RegisterBulkStudentes, isLoading: isLoadingRegister } = useMutation<
    any,
    Error,
    { selectedPJ: string; data: IRegisterUserBulk }
  >(({ selectedPJ, data }) => StudentService.RegisterStudentBulk(selectedPJ, data));

  const handleSubmitValidRows = async () => {
    try {
      const filteredAndRenamedUsers = rows
        .filter((user) => user.isValid)
        .map((user) => ({
          name: user.nome ?? '',
          documentNumber: removeNonNumeric(user.documento ?? ''),
          email: user.email ?? '',
          phone: removeNonNumeric(user.phone ?? ''),
        }));

      const courseId = form.getValues('courseId');

      const dataToSend = {
        users: filteredAndRenamedUsers,
        school: form.getValues('schoolId'),
        ...(courseId && { courseId: courseId }),
      };

      RegisterBulkStudentes(
        {
          selectedPJ: selectedPJ?.pjId ?? '',
          data: dataToSend ?? '',
        },
        {
          onSuccess: (data: UserContainer) => {
            const returnRows = data?.users.map((user) => ({
              nome: user?.name ?? '',
              email: user?.email ?? '',
              documento: user?.documentNumber ?? '',
              phone: user?.phone ?? '',
              isValid: user?.isValid ?? '',
              error: user?.error ?? '',
            }));
            setRows(returnRows);
            setRegisterSuccess(true);
            toast.warning('Veja na tabela acima os alunos cadastrados com successo');
            students.refetch();
            isRefetchingPJ();
            UpdateCredits();
          },
          onError: () => {
            toast.error('Erro cadastrando alunos.');
          },
        },
      );
    } catch (error) {
      toast.error('Erro cadastrando alunos.');
    }
  };

  const form = useForm<SchemaRegisterBulkStudentsType>({
    resolver: zodResolver(SchemaRegisterBulkStudents),
    mode: 'onChange',
  });

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  return (
    <ApplicationLayout icon={UsersIcon} title="Cadastrar Alunos em Lote">
      <BackButton href={pagePaths.authenticated.naturalPerson.student.create}>
        Voltar para Alunos
      </BackButton>
      <AlertCSV />
      <Form {...form}>
        <div className="">
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            {rows.length === 0 && <input {...getInputProps()} />}
            {rows.length > 0 ? (
              <>
                <Check size={42} color={'green'} />
                <p className="mt-4 p-1 text-lg font-bold text-primary">
                  {rows?.length} alunos{' '}
                  {registerSuccess ? 'retornados após envio do .csv' : 'importados com sucesso!'}
                </p>

                <p className="mt-2 text-gray-500">
                  Segue abaixo a lista para verificação dos alunos
                </p>
                <div className="mt-5 inline-flex space-x-2 py-3">
                  <FileText color="green" />
                  <p>{dropedFile?.name}</p>
                  <p>{dropedFile?.size} bytes</p>
                </div>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    setDropedFile(null);
                    setRows([]);
                    setRegisterSuccess(false);
                  }}
                  className="w-full hover:border-red-100 hover:bg-red-50 hover:text-red-600 md:w-fit "
                >
                  Limpar Documento
                </Button>
              </>
            ) : (
              <>
                <UploadCloudIcon />
                <div className="flex items-center space-x-1 py-3">
                  {' '}
                  <p className="font-bold text-orange-500">Clique aqui para enviar</p>
                  <p className="font-bold text-slate-500">ou arraste e solte o arquivo aqui</p>
                </div>
                <p className="mt-2 text-gray-500">Apenas arquivos do tipo .CSV são aceitos</p>
              </>
            )}
          </div>
        </div>
        {rows.length > 0 && (
          <div className="mt-4">
            <div className="mt-8 flex flex-col gap-2">
              <div className="mb-2 grid grid-cols-12 gap-4">
                <FormField
                  name="schoolId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormLabel className="font-bold">Unidade de Ensino *</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma unidade" />
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
                      <FormLabel>Selecione um Curso</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger disabled={!formSchoolId || !courses.data?.length}>
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.data &&
                            courses.data.map((course) => (
                              <SelectItem
                                disabled={courses.isFetching}
                                key={course.courseId}
                                value={course.courseId}
                              >
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
              <p className="mb-8 italic text-secondary opacity-80">* Campos obrigatórios</p>
              <DataTable
                filterColumn="nome"
                columns={columns}
                data={rows || []}
                headerOptions={{
                  filter: true,
                  toolbar: true,
                }}
              />
            </div>
            {hasInvalidStudents && <AlertStudents />}
          </div>
        )}
        <Button
          type="submit"
          onClick={form.handleSubmit(handleSubmitValidRows)}
          variant="secondary"
          isLoading={isLoadingRegister}
          disabled={rows.every((row) => !row.isValid)}
          className="ml-auto w-full md:w-fit"
        >
          <UploadCloudIcon className="mr-1 size-5" />
          Cadastrar Alunos Válidos
        </Button>
      </Form>
    </ApplicationLayout>
  );
};

export default CSVValidator;
