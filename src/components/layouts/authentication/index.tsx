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
      
      {/* Background container */}
      <div className="relative flex h-full max-h-screen min-h-screen flex-col overflow-y-scroll bg-[#0A0F1D] text-white md:flex-row md:items-center">
        
        {/* Repeating chain watermark background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="chain-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="24" stroke="white" stroke-width="2" fill="none" />
                <line x1="64" y1="40" x2="96" y2="40" stroke="white" stroke-width="2" stroke-dasharray="3,3" />
                <circle cx="120" cy="40" r="24" stroke="white" stroke-width="2" fill="none" />
                <line x1="120" y1="64" x2="120" y2="96" stroke="white" stroke-width="2" stroke-dasharray="3,3" />
                <circle cx="120" cy="120" r="24" stroke="white" stroke-width="2" fill="none" />
                <line x1="96" y1="120" x2="64" y2="120" stroke="white" stroke-width="2" stroke-dasharray="3,3" />
                <circle cx="40" cy="120" r="24" stroke="white" stroke-width="2" fill="none" />
                <line x1="40" y1="96" x2="40" y2="64" stroke="white" stroke-width="2" stroke-dasharray="3,3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chain-pattern)" />
          </svg>
        </div>

        {/* Left Column (Avatar and Title) */}
        <div className="relative z-10 flex h-auto min-h-[60vh] flex-col justify-between p-8 md:h-screen md:w-[50vw] md:p-16">
          <div className="w-fit">
            <Logo path={'images/logo_text.svg'} className="h-8 md:h-10" />
          </div>
          
          <figure className="relative flex flex-1 items-center justify-center py-6 md:py-0">
            <img
              src={getImageUrl('images/login_image.jpg')}
              alt="CertifikEDU Avatar"
              className="max-h-[40vh] md:max-h-[55vh] w-auto object-contain"
            />
          </figure>
          
          <p className="text-xl font-light text-white md:text-3xl lg:text-4xl md:leading-[130%] text-center md:text-left">
            Eleve seu portfólio com uma carteira digital de{' '}
            <strong className="font-bold text-[#F59E0B]">competências e habilidades</strong> verificadas.
          </p>
        </div>

        {/* Right Column (Form container) */}
        <div className="relative z-10 flex h-full justify-center items-center p-6 md:w-[50vw] md:p-0">
          <article className="w-full rounded-2xl bg-[#0B0F19]/40 backdrop-blur-md border border-slate-800/50 p-8 sm:max-w-[31rem]">
            {children}
          </article>
        </div>
      </div>

      {/* Top Right "Quero Testar" CTA */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-3 bg-transparent px-6 py-4 md:absolute md:right-16 md:top-16 md:flex-row md:p-0">
        <span className="w-full text-center text-sm text-slate-300 md:text-left">
          Ainda não tem conta?{' '}
        </span>
        <Link to="/authentication/sign-up" className="w-full md:w-fit">
          <Button className="group w-full pl-6 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A0F1D] font-bold rounded-lg border-none transition-all duration-300 md:w-fit">
            Quero Testar
            <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};
