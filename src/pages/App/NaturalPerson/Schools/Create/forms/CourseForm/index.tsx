import { PlusIcon, Trash2Icon } from 'lucide-react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { columns } from '@/components/pages/App/LegalPerson/Users/columns';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import { Textarea } from '@/components/shared/ui/textarea';

import { EducationLevelEnum } from '@/services/entities/app/legalPerson/school/enums';

import { getImageUrl } from '@/utils/image';

import { SchoolSchemaNoStudentType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<SchoolSchemaNoStudentType>;
  courseFields: UseFieldArrayReturn<SchoolSchemaNoStudentType, 'courses', 'id'>;
}

export function CourseForm({ form, courseFields }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-8">
      {courseFields.fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Curso {index + 1}</h4>
          <div className="grid grid-cols-12 gap-4">
            <FormField
              name={`courses.${index}.name`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`courses.${index}.level`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel>Nível</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={EducationLevelEnum.EducacaoInfantil}>
                        Educação Infantil
                      </SelectItem>
                      <SelectItem value={EducationLevelEnum.EnsinoFundamental}>
                        Ensino Fundamental
                      </SelectItem>
                      <SelectItem value={EducationLevelEnum.EnsinoMedio}>Ensino Médio</SelectItem>
                      <SelectItem value={EducationLevelEnum.Graduacao}>Graduação</SelectItem>
                      <SelectItem value={EducationLevelEnum.GraduacaoTecnologica}>
                        Graduação Tecnológica
                      </SelectItem>
                      <SelectItem value={EducationLevelEnum.PosGraduacao}>Pós Graduação</SelectItem>
                      <SelectItem value={EducationLevelEnum.Mestrado}>Mestrado</SelectItem>
                      <SelectItem value={EducationLevelEnum.Doutorado}>Doutorado</SelectItem>
                      <SelectItem value={EducationLevelEnum.PosDoutorado}>Pós Doutorado</SelectItem>
                      <SelectItem value={EducationLevelEnum.Extensao}>Extensão</SelectItem>
                      <SelectItem value={EducationLevelEnum.Profissionalizante}>
                        Profissionalizante
                      </SelectItem>
                      <SelectItem value={EducationLevelEnum.EducacaoEmpresarial}>
                        Educação Empresarial
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`courses.${index}.description`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Digite a descrição" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="inline-flex w-full items-end justify-end">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => courseFields.remove(index)}
            >
              <Trash2Icon className="mr-1 size-4" />
              Remover Curso
            </Button>
          </div>
        </div>
      ))}

      {courseFields.fields.length > 0 && (
        <div className="inline-flex w-full items-end justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              courseFields.append({
                name: '',
                level: EducationLevelEnum.Graduacao,
                description: '',
                isAcademic: false, // REVIEW - Workaround to include isAcademic field
              })
            }
          >
            <PlusIcon className="mr-1 size-4" />
            Incluir Curso
          </Button>
        </div>
      )}
      <TableView courseFields={courseFields} form={form} />
    </div>
  );
}

function TableView({ form, courseFields }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Curso</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseFields.fields.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="w-full py-16 text-center">
              <img
                src={getImageUrl('images/empty/search.svg')}
                alt="search"
                className="h-36 w-full"
              />
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">Nenhum resultado encontrado</h5>
                <p className="text-slate-600">Sem resultados para mostrar...</p>
              </div>
              <Button
                className="mt-8"
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  courseFields.append({
                    name: '',
                    level: EducationLevelEnum.Graduacao,
                    description: '',
                    isAcademic: false, // REVIEW - Workaround to include isAcademic field
                  })
                }
              >
                <PlusIcon className="mr-1 size-4" />
                Incluir Curso
              </Button>
            </TableCell>
          </TableRow>
        )}
        {form.watch('courses').map((field) => (
          <TableRow key={field?.name}>
            <TableCell>{field?.name}</TableCell>
            <TableCell>{field?.level}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
