import { Trash2Icon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { toast } from 'sonner';

import { CourseSchemaNaturalPersonType } from '@/pages/App/NaturalPerson/Courses/View/validation/schema';
import { Button } from '@/components/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/shared/ui/form';
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

interface TemplatesFilterProps {
  form: UseFormReturn<CourseSchemaNaturalPersonType>;
}

export default function TemplatesFilter({ form }: TemplatesFilterProps) {
  const { selectedPJ, schools, isCanvas } = useProfile();
  const formSchoolId = form.watch('schoolId');
  const formCourseId = form.watch('courseId');

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

  return (
    <Form {...form}>
      <div className="flex max-w-md flex-col gap-2">
        <FormField
          name="schoolId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <p className="font-sans font-bold text-slate-900">Instituição</p>
              <div className="flex flex-row gap-1">
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por Instituição" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schools.data &&
                      schools?.data?.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {!!formSchoolId && (
                  <Button
                    onClick={() => {
                      form.resetField('courseId');
                      form.setValue('courseId', '');
                      form.resetField('schoolId');
                      field.onChange(null);
                    }}
                    size="icon"
                    type="button"
                    variant="outline"
                    className="h-10 hover:border-red-100 hover:bg-red-50 hover:text-red-600  "
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="courseId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <p className="font-sans font-bold text-slate-900">Curso</p>
              <div className="flex flex-row gap-1">
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por Curso" />
                    </SelectTrigger>
                  </FormControl>
                  <PuffLoader loading={courses.isFetching} size={30} color="#000000" />
                  <SelectContent>
                    {courses?.data &&
                      courses?.data?.map((course) => (
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
                {!!formCourseId && (
                  <Button
                    onClick={() => {
                      form.resetField('courseId');
                      field.onChange(null);
                    }}
                    size="icon"
                    type="button"
                    variant="outline"
                    className="h-10 hover:border-red-100 hover:bg-red-50 hover:text-red-600  "
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
