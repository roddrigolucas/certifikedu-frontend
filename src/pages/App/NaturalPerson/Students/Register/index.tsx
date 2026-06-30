import { motion } from 'framer-motion';
import { Building2Icon, GraduationCapIcon, UsersIcon } from 'lucide-react';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import AccountCard from '@/components/pages/App/NaturalPerson/Students/Register/AccountCard';
import { BackButton } from '@/components/shared/BackButton';

import { slideUp } from '@/utils/animations';

export default function StudentRegisterPage() {
  return (
    <ApplicationLayout
      icon={GraduationCapIcon}
      title="Cadastrar Aluno"
      description="Bem-vindo ao ambiente para cadastrar alunos. Inicie selecionando uma das opções abaixo."
      hideCredits
    >
      <div className="space-y-3">
        <BackButton href={pagePaths.authenticated.naturalPerson.student.root}>
          Voltar para Alunos
        </BackButton>
        <motion.section
          id="choose-type"
          className="flex w-full flex-col gap-16"
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="mx-auto grid gap-6 md:grid-cols-2">
            <AccountCard
              icon={UsersIcon}
              testId="registerUnitary-card"
              title="Cadastro e Associação Individual"
              description="Cadastre ou associe um aluno"
              typeAccount="unitary"
            />
            <AccountCard
              icon={Building2Icon}
              testId="registerBulk-card"
              title="Cadastrar em Lote"
              description="Cadastre múltiplos alunos"
              typeAccount="bulk"
            />
          </div>
        </motion.section>
      </div>
    </ApplicationLayout>
  );
}
