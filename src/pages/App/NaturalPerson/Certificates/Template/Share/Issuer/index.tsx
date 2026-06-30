import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { slideUp } from '@/utils/animations';

import { IProps } from '..';
import { DataTableCourseStudents } from './Table';

interface ITemplateProps {
  isOrigin: IProps | undefined;
  setCreated: () => void;
  data: ITemplate;
}

export default function UsersInCourseTablePage({
  setCreated,
  data,
  isOrigin,
}: Readonly<ITemplateProps>) {
  return (
    <motion.div variants={slideUp} initial="hidden" animate="show">
      <Button
        variant="ghost"
        className="group w-fit -translate-x-6 pr-7"
        onClick={() => setCreated()}
      >
        <ChevronLeft className="ease mr-1 size-5 transition-transform duration-500 group-hover:-translate-x-1" />
        Voltar para Certificado
      </Button>
      <div className="inline-flex w-full items-center gap-2">
        <Badge variant="success">Emissão</Badge>
      </div>
      {isOrigin?.origin === 'course' && (
        <>
          <p className="mt-5 font-bold">Curso: </p>
          <p>{data?.courses[0]?.courseName}</p>
        </>
      )}
      {isOrigin?.origin === 'school' && (
        <>
          <p className="mt-5 font-bold">Instituição: </p>
          <p>{data?.schoolName}</p>
        </>
      )}
      <DataTableCourseStudents data={isOrigin?.data ?? []} />
    </motion.div>
  );
}
