import { motion } from 'framer-motion';
import { Building2Icon, ChevronLeft, UsersIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { SignUpForm } from '@/pages/Authentication/SignUp/NaturalPersonForm';
import SignUpLayout from '@/components/layouts/authentication/SignUp';
import AccountCard from '@/components/pages/Authentication/SignUp/AccountCard';
import { Button } from '@/components/shared/ui/button';

import { slideUp } from '@/utils/animations';

import LegalPersonForm from './LegalPersonForm';

export default function SignUpPage() {
  const [searchParameters] = useSearchParams();

  const type = searchParameters.get('type') ?? undefined;
  const name = searchParameters.get('name') ?? undefined;
  const email = searchParameters.get('email') ?? undefined;
  const document = searchParameters.get('document') ?? undefined;

  return (
    <SignUpLayout>
      {!type && <SelectTypeAccount />}

      {type === 'PF' && <SignUpForm name={name} document={document} email={email} />}
      {type === 'PJ' && <LegalPersonForm />}
    </SignUpLayout>
  );
}

function SelectTypeAccount() {
  return (
    <motion.section
      id="choose-type"
      className="flex w-full flex-col gap-16"
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <header className="relative flex w-full flex-col items-center justify-center gap-16 text-center md:flex-row md:gap-4">
        <Link to={pagePaths.unauthenticated.signIn} className="self-start md:absolute md:left-0">
          <Button variant="outline">
            <ChevronLeft className="mr-1 size-6 text-slate-950" />
            Voltar para Login
          </Button>
        </Link>
        <h1 className="self-center text-xl font-bold text-slate-950 md:text-2xl">
          Escolha como deseja criar sua conta
        </h1>
      </header>

      <div className="mx-auto grid gap-6 md:grid-cols-2">
        <AccountCard
          icon={UsersIcon}
          title="Pessoa Física"
          description="Crie sua conta Pessoa Física"
          typeAccount="PF"
        />
        <AccountCard
          icon={Building2Icon}
          title="Pessoa Jurídica"
          description="Crie sua conta Pessoa Jurídica"
          typeAccount="PJ"
        />
      </div>
    </motion.section>
  );
}
