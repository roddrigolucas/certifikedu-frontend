import { Fragment, ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Logo } from '@/components/core/atoms/Logo';
import { AlertEnv } from '@/components/shared/Alerts/AlertEnv';
import { Button } from '@/components/shared/ui/button';

import { getImageUrl } from '@/utils/image';

interface Props {
  title?: string;
  children: ReactNode;
}

export const AuthenticationPageLayout = ({ title, children }: Props) => {
  return (
    <Fragment>
      <AlertEnv />
      <Helmet>{title && <title>{title} • CertifikEDU</title>}</Helmet>
      <div className="flex h-full max-h-screen min-h-screen flex-col overflow-y-scroll bg-white md:flex-row md:items-center ">
        <div className="relative h-60 md:h-screen md:w-[40vw] md:p-0">
          <div className="absolute left-6 top-16 z-20 mx-auto md:left-16">
            <Logo path={'images/logo_text.svg'} className="h-8 md:h-12" />
          </div>
          <figure className="relative size-full overflow-hidden border-blue-zodiac-900/10 md:block md:rounded-3xl md:border-8">
            <img
              src={getImageUrl('images/login_image.jpg')}
              alt="Student Holding a book"
              className="h-96 w-screen object-cover object-top md:h-screen"
            />
            <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-[rgba(24,24,44,0.8)] via-[rgba(16,25,51,0.8)] to-[rgba(19,22,58,0.82)]" />
          </figure>
          <p className="absolute bottom-6 p-6 text-xl font-light text-white md:bottom-8 md:p-16 md:text-4xl md:leading-[120%]">
            Tenha uma carteira digital de{' '}
            <strong className="font-bold">competências e habilidades</strong>.
          </p>
        </div>
        <div className="flex h-full justify-center md:w-[55vw]">
          <article className="container rounded p-6 sm:max-w-[31rem]">{children}</article>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 bg-transparent px-6 md:absolute md:right-16 md:top-16 md:flex-row">
        <span className="w-full text-center text-sm text-white md:text-left md:text-black">
          Ainda não tem conta?{' '}
        </span>
        <Link to="/authentication/sign-up" className="w-full md:w-fit">
          <Button variant="outline" className="group w-full pl-6 text-white md:w-fit md:text-black">
            Quero Testar
            <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};
