'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BookOpen, EditIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteCurriculumDialog } from '@/pages/App/NaturalPerson/Courses/Curriculum/Delete';
import { DeleteCourseDialog } from '@/pages/App/NaturalPerson/Courses/Dialogs/Delete';
import { TableColumnHeader } from '@/components/shared/DataTable/parts';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

import { ICourse } from '@/services/entities/app/legalPerson/courses/model';

export const columns: ColumnDef<ICourse>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center gap-2">
        <span className="font-semibold">{row.getValue('name')}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'educationLevel',
    header: ({ column }) => <TableColumnHeader column={column} title="Nível Educacional" />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'isAcademic',
    header: ({ column }) => <TableColumnHeader column={column} title="Estrutura" />,
    cell: ({ row }) => {
      if (row.getValue('isAcademic')) {
        return <Badge variant="default">Acadêmica</Badge>;
      } else {
        return <Badge variant="secondary">Simples</Badge>;
      }
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const Course = row.original;

      return (
        <div className="flex w-full items-end justify-end">
          <div className="inline-flex gap-5">
            {Course.isAcademic &&
              Course.curriculums.map((curriculum) => (
                <DropdownMenu key={curriculum.curriculumId}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex size-8 items-center gap-2 p-0 text-slate-600 hover:bg-ecstasy-50 hover:text-ecstasy-600"
                    >
                      <BookOpen className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col" align="end">
                    <p className="text-md p-2 font-semibold text-gray-600">{curriculum.name}</p>
                    <Link to={`/courses/curriculum/edit/${curriculum.curriculumId}`}>
                      <DropdownMenuItem
                        data-testId="edit-curriculum-button"
                        onSelect={(event) => event.preventDefault()}
                        className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                      >
                        <EditIcon className="size-4" />
                        Visualizar Currículo
                      </DropdownMenuItem>
                    </Link>
                    <DeleteCurriculumDialog id={curriculum.curriculumId}>
                      <DropdownMenuItem
                        data-testId="delete-curriculum-button"
                        onSelect={(event) => event.preventDefault()}
                        className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                      >
                        <Trash2Icon className="size-4" />
                        Deletar Currículo
                      </DropdownMenuItem>
                    </DeleteCurriculumDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button data-testId="menu-button" variant="outline" className="size-8 p-0">
                  <span className="sr-only">Menu</span>
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col" align="end">
                {Course.isAcademic ? (
                  <Link to={`/courses/${Course.courseId}/curriculum`}>
                    <DropdownMenuItem
                      data-testId="create-curriculum-button"
                      onSelect={(event) => event.preventDefault()}
                      className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                    >
                      <BookOpen className="size-4" />
                      Criar Currículo
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <DropdownMenuItem
                    disabled={true}
                    className="inline-flex w-full cursor-not-allowed gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                  >
                    <BookOpen className="size-4" />
                    Criar Currículo
                  </DropdownMenuItem>
                )}
                <Link to={`/courses/edit/${Course.courseId}`}>
                  <DropdownMenuItem
                    data-testId="edit-course-button"
                    onSelect={(event) => event.preventDefault()}
                    className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-slate-600 focus:bg-slate-50 focus:text-slate-600"
                  >
                    <EditIcon className="size-4" />
                    Editar
                  </DropdownMenuItem>
                </Link>
                <DeleteCourseDialog id={Course.courseId}>
                  <DropdownMenuItem
                    data-testId="delete-course-button"
                    onSelect={(event) => event.preventDefault()}
                    className="inline-flex w-full gap-2 hover:bg-slate-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                  >
                    <Trash2Icon className="size-4" />
                    Deletar
                  </DropdownMenuItem>
                </DeleteCourseDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    },
  },
];
