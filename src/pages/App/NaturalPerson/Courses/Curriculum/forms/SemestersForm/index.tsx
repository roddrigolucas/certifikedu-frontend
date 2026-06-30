import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import { CurriculumSchemaType, ETypeSubject } from '../../validation/schema';

interface Props {
  form: UseFormReturn<CurriculumSchemaType>;
  isEdit?: boolean;
}

interface SemesterFormProps {
  form: UseFormReturn<CurriculumSchemaType>;
  isEdit?: boolean;
  semesterField: any;
  semesterIndex: number;
  removeSemester: (index: number) => void;
}

export function SemestersForm({ form, isEdit }: Readonly<Props>) {
  const {
    fields: semesterFields,
    append: appendSemester,
    remove: removeSemester,
  } = useFieldArray({
    control: form.control,
    name: 'semesters',
  });

  return (
    <div>
      {semesterFields.map((semesterField, semesterIndex) => (
        <SemesterForm
          key={semesterField.id}
          form={form}
          isEdit={isEdit}
          semesterField={semesterField}
          semesterIndex={semesterIndex}
          removeSemester={removeSemester}
        />
      ))}
      {!isEdit && (
        <Button
          type="button"
          variant={'outline'}
          onClick={() =>
            appendSemester({
              semesterNumber: semesterFields.length + 1,
              requiredHoursWorkload: 0,
              subjects: [],
            })
          }
        >
          <PlusIcon className="mr-1 size-4" />
          Adicionar Semestre
        </Button>
      )}
    </div>
  );
}

function SemesterForm({
  form,
  isEdit,
  semesterField,
  semesterIndex,
  removeSemester,
}: SemesterFormProps) {
  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control: form.control,
    name: `semesters.${semesterIndex}.subjects`,
  });

  return (
    <div key={semesterField.id} className="mb-4 space-y-4 rounded-lg border p-4">
      <h3 className="mt-3 items-center text-center font-bold text-slate-700">Semestre *</h3>
      <div className="grid grid-cols-12 gap-4 p-2">
        <FormField
          name={`semesters.${semesterIndex}.semesterNumber`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-3">
              <FormLabel className="font-bold">Número *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  disabled={isEdit}
                  data-testId="semesterNumber-input"
                  placeholder="Digite o número do semestre"
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(Number(formattedValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`semesters.${semesterIndex}.requiredHoursWorkload`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-3">
              <FormLabel className="font-bold">Carga Horária Obrigatória *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  disabled={isEdit}
                  data-testId="requiredHoursWorkload-input"
                  placeholder="Digite a carga horária obrigatória"
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(Number(formattedValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`semesters.${semesterIndex}.electiveHoursWorkload`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-3">
              <FormLabel>Carga Horária Eletiva</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  disabled={isEdit}
                  data-testId="electiveHoursWorkload-input"
                  placeholder="Digite a carga horária eletiva"
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(Number(formattedValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`semesters.${semesterIndex}.complementaryHoursWorkload`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-3">
              <FormLabel>Carga Horária Complementar</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isEdit}
                  type="number"
                  data-testId="complementaryHoursWorkload-input"
                  placeholder="Digite a carga horária complementar"
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(Number(formattedValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {subjectFields.map((subjectField, subjectIndex) => (
        <div key={subjectField.id} className="flex">
          <div className="grid w-full grid-cols-12 gap-4 rounded-lg border-2 border-dashed bg-gray-50 p-4">
            <FormField
              name={`semesters.${semesterIndex}.subjects.${subjectIndex}.name`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormLabel className="font-bold">Disciplina *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isEdit} placeholder="Ex: Matemática Aplicada II" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`semesters.${semesterIndex}.subjects.${subjectIndex}.totalHoursWorkload`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel className="font-bold">Carga Horária *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isEdit}
                      placeholder="Digite a carga horária"
                      onChange={(e) => {
                        const formattedValue = e.target.value.replace(/\D/g, '');
                        field.onChange(Number(formattedValue));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`semesters.${semesterIndex}.subjects.${subjectIndex}.type`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel className="font-bold">Tipo *</FormLabel>
                  <Select onValueChange={field.onChange} {...field} disabled={isEdit}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ETypeSubject.REQUIRED}>Obrigatória</SelectItem>
                      <SelectItem value={ETypeSubject.ELECTIVE}>Eletiva</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`semesters.${semesterIndex}.subjects.${subjectIndex}.description`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-12">
                  <FormLabel className="font-bold">Descrição *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isEdit} placeholder="Digite a descrição" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!isEdit && (
            <div>
              <Button
                variant="ghost"
                disabled={isEdit}
                onClick={() => removeSubject(subjectIndex)}
                className="h-full hover:border-red-100 hover:bg-red-50 hover:text-red-600"
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
      {!isEdit && (
        <>
          <div className="my-2 flex items-center justify-center">
            <Button
              type="button"
              disabled={isEdit}
              variant="ghost"
              onClick={() =>
                appendSubject({
                  name: '',
                  totalHoursWorkload: 0,
                  type: ETypeSubject.REQUIRED,
                  description: '',
                })
              }
            >
              <PlusIcon className="mr-1 size-4" />
              Adicionar Disciplina
            </Button>
          </div>
          <Button
            variant="destructive"
            disabled={isEdit}
            onClick={() => removeSemester(semesterIndex)}
            className="mt-4"
          >
            <TrashIcon className="mr-1 size-4" />
            Remover Semestre
          </Button>
        </>
      )}
    </div>
  );
}
