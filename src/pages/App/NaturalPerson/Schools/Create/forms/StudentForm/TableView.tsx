import { TrashIcon, UserIcon } from 'lucide-react';

import { columns } from '@/components/pages/App/LegalPerson/Users/columns';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

import { getImageUrl } from '@/utils/image';
import { FormatCPF } from '@/utils/validation/format';

import { Props } from '.';

export function TableView({ form, studentFields }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Alunos sem cadastro</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentFields.fields.length === 0 && (
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
              </TableCell>
            </TableRow>
          )}
          {form.watch('students').map((field, index) => (
            <TableRow key={field?.name}>
              <TableCell>
                <div className="inline-flex w-full items-center gap-2">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      <UserIcon className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{field?.name}</span>
                </div>
              </TableCell>
              <TableCell>{field?.email}</TableCell>
              <TableCell>{field?.document}</TableCell>
              <TableCell className="text-right">
                <div className="inline-flex gap-2 ">
                  {/* <Button type="button" variant="outline" size="sm">
                    <EditIcon className="mr-2 size-5" />
                    Editar
                  </Button> */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => studentFields.remove(index)}
                  >
                    <TrashIcon className="mr-2 size-5" />
                    Remover
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function TableAssociateView({ form, associateFields }: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Alunos com cadastro na CertifikEDU</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {associateFields.fields.length === 0 && (
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
              </TableCell>
            </TableRow>
          )}
          {form.watch('associate').map((field, index) => (
            <TableRow key={field?.document}>
              <TableCell>
                <div className="inline-flex w-full items-center gap-2">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      <UserIcon className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{field?.name}</span>
                </div>
              </TableCell>
              <TableCell>{field?.email}</TableCell>
              <TableCell>{FormatCPF(field?.document)}</TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => associateFields.remove(index)}
                >
                  <TrashIcon className="mr-2 size-5" />
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
