import { Fragment, ReactNode } from 'react';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { PuffLoader } from 'react-spinners';

import FullscreenErrorOverlay from '@/components/core/atoms/FullscreenErrorOverlay';
import { AlertEnv } from '@/components/shared/Alerts/AlertEnv';

import useProfile from '@/hooks/core/useProfile';

import { cn } from '@/utils';
import { slideUp } from '@/utils/animations';

import { Aside as AsideAdmin } from './Admin/Aside';
import { Header as HeaderAdmin } from './Admin/Header';
import { Aside as AsideCanvas } from './Canvas/Aside';
import { Header as HeaderCanvas } from './Canvas/Header';
import { Aside as AsideCorporative } from './CorporatePerson/Aside';
import { Header as HeaderCorporative } from './CorporatePerson/Header';
import { Aside as AsidePJ } from './LegalPerson/Aside';
import { Header as HeaderPJ } from './LegalPerson/Header';
import { Aside as AsideDefault } from './NaturalPerson/Aside';
import { Header as HeaderDefault } from './NaturalPerson/Header';
import { PageSkeleton } from './shared/PageSkeleton';

interface Props {
  icon: LucideIcon;
  title?: string;
  description?: string;
  isPageLoading?: boolean;
  hasPageError?: boolean;
  hideCredits?: boolean;
  children: ReactNode | ReactNode[];
}

export const ApplicationLayout = ({
  icon,
  title = 'Meu Painel',
  description,
  isPageLoading = false,
  hasPageError = false,
  hideCredits = false,
  children,
}: Props) => {
  const {
    isLegalPerson,
    isNaturalPerson,
    selectedPJ,
    isAdminSelected,
    selectedCorporate,
    isCanvas,
  } = useProfile();
  let content;

  if (isPageLoading) {
    content = <PageSkeleton />;
  } else if (hasPageError) {
    content = <FullscreenErrorOverlay />;
  } else {
    content = children;
  }

  const isPJLayout = isLegalPerson || (isNaturalPerson && !!selectedPJ);

  const isCorpLayout = isNaturalPerson && !!selectedCorporate;

  function Aside() {
    if (isAdminSelected) {
      return <AsideAdmin />;
    }
    if (isPJLayout) {
      return <AsidePJ />;
    }
    if (isCorpLayout) {
      return <AsideCorporative />;
    }
    if (!!isCanvas) {
      return <AsideCanvas />;
    }

    return <AsideDefault />;
  }

  function Header() {
    if (isAdminSelected) {
      return (
        <HeaderAdmin
          icon={icon}
          title={title}
          description={description}
          hideCredits={hideCredits}
        />
      );
    }
    if (isPJLayout) {
      return (
        <HeaderPJ icon={icon} title={title} description={description} hideCredits={hideCredits} />
      );
    }

    if (isCorpLayout) {
      return (
        <HeaderCorporative
          icon={icon}
          title={title}
          description={description}
          hideCredits={hideCredits}
        />
      );
    }

    if (!!isCanvas) {
      return (
        <HeaderCanvas
          icon={icon}
          title={title}
          description={description}
          hideCredits={hideCredits}
        />
      );
    }

    return (
      <HeaderDefault
        icon={icon}
        title={title}
        description={description}
        hideCredits={hideCredits}
      />
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>{title} • CertifikEDU</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <motion.hr
        className={cn('fixed left-0 top-0 z-[1000] h-1 w-full select-none border-0 bg-primary', {
          'bg-emerald-500': isAdminSelected,
        })}
        initial={{ x: '-100%' }}
        animate={{
          x: 0,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{
          x: '-100%',
          transition: {
            duration: 0.1,
          },
        }}
      />
      <motion.div
        className="fixed bottom-8 right-8 select-none"
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 0,
          transition: {
            duration: 1,
          },
        }}
      >
        <PuffLoader size="2rem" color="#FC790D" />
      </motion.div>
      <section className="grid min-h-screen w-full grid-cols-12">
        <Aside />
        <div
          className={cn('col-span-12 size-full bg-blue-zodiac-950 md:p-2 md:pt-3', {
            'bg-blue-zodiac-950': !isLegalPerson,
            'bg-darkGray': isPJLayout,
            'bg-slate-950': isAdminSelected,
            'bg-emerald-950': isCanvas,
          })}
        >
          <motion.div
            className={cn(
              'w-[calc(100vw - 24rem)] flex min-h-full flex-col gap-8 overflow-hidden bg-white px-6 pb-12 pt-8 md:ml-[324px] md:rounded-2xl md:px-12 md:pt-16',
            )}
          >
            <AlertEnv />
            <Header />

            <motion.div
              id="content"
              className="flex flex-col gap-8"
              variants={slideUp}
              initial="hidden"
              animate="show"
            >
              {content}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Fragment>
  );
};
