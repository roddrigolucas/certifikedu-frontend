import { zodResolver } from '@hookform/resolvers/zod';
import { LibraryBig, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/NaturalPerson/Courses/columns';
import { DataTable } from '@/components/shared/DataTable';
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

import { cn } from '@/utils';

import { CourseSchemaNaturalPerson, CourseSchemaNaturalPersonType } from './validation/schema';

export default function CourseListPageBySchool() {
  const { selectedPJ, schools } = useProfile();

  const form = useForm<CourseSchemaNaturalPersonType>({
    resolver: zodResolver(CourseSchemaNaturalPerson),
    mode: 'onChange',
  });

  const formSchoolId = form.watch('schoolId');

  const { data, isFetching, isError } = useRequestProcessor().query(
    ['courses', `PJ: ${selectedPJ?.pjId}`, `School: ${formSchoolId}`],
    async () => await CourseService.GetCoursesBySchool(selectedPJ?.pjId ?? '', formSchoolId ?? ''),
    {
      enabled: !!formSchoolId,
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={LibraryBig} title="Cursos">
      <Form {...form}>
        <div className="grid grid-cols-12 gap-4">
          <FormField
            name="schoolId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Selecione a Unidade de Ensino</FormLabel>
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
        </div>
      </Form>

      <div className="flex flex-col gap-4">
        <DataTable
          filterColumn="name"
          columns={columns}
          data={data || []}
          isLoading={isFetching}
          isError={isError}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <Link
                className={cn({
                  'pointer-events-none': !!!formSchoolId,
                })}
                to={`/schools/${formSchoolId}/courses/create`}
              >
                <Button
                  data-testId="create-button"
                  disabled={!!!formSchoolId}
                  variant="success"
                  className="group"
                  size="sm"
                >
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Criar Curso
                </Button>
              </Link>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
