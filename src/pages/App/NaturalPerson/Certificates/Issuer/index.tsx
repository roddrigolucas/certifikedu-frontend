import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArchiveIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import CreateCertificateFormColaborator from './Form';

/**
 * Emissão de certificado - tela colaborador
 */
export default function CertificateIssuerPageNaturalPerson() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout
      icon={ArchiveIcon}
      title="Cadastrar Modelo de Certificado Digital"
      description="Cadastre um modelo de certificado para destacar e emitir as conquistas e conhecimentos."
    >
      <div className="space-y-3">
        <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
          {isCreated ? (
            <CreatedCertificate setCreated={setCreated} />
          ) : (
            <CreateCertificateFormColaborator setCreated={setCreated} data={null} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function CreatedCertificate({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Certificado cadastrado com sucesso!</h2>
        <p className="text-slate-600">
          Agora você pode visualizar seu modelo de certificado e emitir para os alunos
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Link to="/certificates/templates">
          <Button data-testId="back-button" variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Meus Certificados Cadastrados
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Criar outro Modelo de Certificado
        </Button>
      </div>
    </motion.div>
  );
}
