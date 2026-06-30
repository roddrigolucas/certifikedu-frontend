import { useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import CreateCertificateFormColaborator from '../../../Issuer/Form';

interface IEditTemplateProps {
  setEdited: () => void;
  data: ITemplate;
}

export default function EditTemplateViewPage({ setEdited, data }: Readonly<IEditTemplateProps>) {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const setCreated = () => setIsCreated(!isCreated);

  return (
    <motion.div variants={slideUp} initial="hidden" animate="show">
      <Button
        data-testId="back-button"
        variant="ghost"
        className="group w-fit -translate-x-6 pr-7"
        onClick={() => setEdited()}
      >
        <ChevronLeft className="ease mr-1 size-5 transition-transform duration-500 group-hover:-translate-x-1" />
        Voltar para Certificado
      </Button>
      <div className="inline-flex w-full items-center gap-2">
        <Badge variant="success">Edição</Badge>
      </div>
      <div className="mb-48 mt-2 flex-col rounded-xl border border-slate-200 bg-white">
        {isCreated ? (
          <EditedCertificate setEdited={setEdited} />
        ) : (
          <CreateCertificateFormColaborator setCreated={setCreated} data={data} />
        )}
      </div>
    </motion.div>
  );
}

function EditedCertificate({ setEdited }: Readonly<{ setEdited: () => void }>) {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-8 p-16"
      variants={slideUp}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={getImageUrl('images/success/certificate.svg')}
          alt="Certificado"
          className="size-48"
        />
        <h2 className="text-2xl font-bold">Certificado editado com sucesso!</h2>
      </div>
      <Button variant="secondary" onClick={() => setEdited()} className="mt-auto w-full lg:w-fit">
        <ChevronLeft className="mr-2 size-5" />
        Voltar para Certificado
      </Button>
    </motion.div>
  );
}
