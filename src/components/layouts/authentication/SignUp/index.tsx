import { Fragment, ReactNode } from 'react';

import { Helmet } from 'react-helmet';

import { Logo } from '@/components/core/atoms/Logo';
import { AlertEnv } from '@/components/shared/Alerts/AlertEnv';

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function SignUpLayout({ title = 'Cadastro', children }: Props) {
  return (
    <Fragment>
      <Helmet>
        <title>{title} • CertifikEDU</title>
      </Helmet>
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 z-50 flex h-24 w-full items-center justify-center bg-slate-50 p-4 md:p-8">
          <Logo path={'images/logo_text_color.svg'} className="h-8 md:h-10" />
          <AlertEnv />
        </header>

        <div className="container max-w-6xl pb-16 pt-36">{children}</div>
      </div>
    </Fragment>
  );
}
