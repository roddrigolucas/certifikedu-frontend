import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArchiveIcon, Medal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import { TrailForm } from '../Form';

export const achievementTypeOptions = [
  { label: 'Evento', value: 'events' },
  { label: 'Disciplina', value: 'subjects' },
  { label: 'Atividade', value: 'activities' },
  { label: 'Estágio', value: 'internships' },
];

export default function TrailRegisterPage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const setCreated = () => setIsCreated(!isCreated);

  return (
    <ApplicationLayout icon={Medal} title="Cadastrar Trilha de Aprendizagem">
      <div className="space-y-3">
        <BackButton data-testId="back-button" href={`/trails`}>
          Voltar para Trilhas
        </BackButton>
        <div className="mb-48 flex-col">
          {isCreated ? (
            <CreatedTrail setCreated={setCreated} />
          ) : (
            <TrailForm setCreated={setCreated} isEdit={false} />
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function CreatedTrail({ setCreated }: Readonly<{ setCreated: () => void }>) {
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
        <h2 className="text-2xl font-bold">Trilha de aprendizagem cadastrada com sucesso!</h2>
      </div>
      <div className="inline-flex gap-2">
        <Link to={`/trails`}>
          <Button variant="outline">
            <ArchiveIcon className="mr-1 size-5" />
            Voltar para Trilhas
          </Button>
        </Link>
        <Button variant="success" className="group" onClick={() => setCreated()}>
          <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
          Cadastrar Nova Trilha
        </Button>
      </div>
    </motion.div>
  );
}
