import * as React from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { motion, useAnimation } from 'framer-motion';
import { Plus, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { slideUp } from '@/utils/animations';
import { getImageUrl } from '@/utils/image';

import {
  CardFilterCloudScape,
  DEFAULT_PREFERENCES,
  PAGE_SIZE_OPTIONS,
  TableEmptyState,
  TableNoMatchState,
} from './cardConfig/cardsConfig';
import { CARD_DEFINITIONS } from './cardConfig/cardsDefinition';
import { CardsSectionPropsPosts, ICardsSectionProps } from './types';

const CardsSectionJob: React.FC<ICardsSectionProps> = ({ form }) => {
  const controls = useAnimation();

  return (
    <section className="mb-5">
      <motion.div
        variants={slideUp}
        animate={controls}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <TemplateCardJob form={form} />
      </motion.div>
    </section>
  );
};

const TemplateCardJob: React.FC<CardsSectionPropsPosts> = ({ form }) => {
  const [preferences, setPreferences] = React.useState<any>(DEFAULT_PREFERENCES);
  const { existingPDIs } = useProfile();
  const onlyPDIs = existingPDIs?.data?.pdis ?? [];

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } =
    useCollection(onlyPDIs, {
      filtering: {
        empty: <TableEmptyState resourceName="PDI" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    });

  return (
    <Cards
      {...collectionProps}
      cardDefinition={CARD_DEFINITIONS}
      loading={existingPDIs.isFetching}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 4 }]}
      items={items}
      loadingText="Carregando PDIs ..."
      trackBy="pdiId"
      visibleSections={['title', 'status', 'createdAt', 'progressPercentage']}
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <img
              src={getImageUrl('images/empty/search.svg')}
              alt="search"
              className="h-36 w-full"
            />
            <b>Nenhum PDI criado</b>
            <Link to={pagePaths.authenticated.pdi.create}>
              <Button variant="success" className="group mx-auto w-full  md:w-fit">
                <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Criar Novo PDI
              </Button>
            </Link>
          </SpaceBetween>
        </Box>
      }
      filter={
        <CardFilterCloudScape
          filterProps={filterProps}
          filteredItemsCount={filteredItemsCount ?? 0}
          form={form}
        />
      }
      header={
        <Header
          counter={`(${items?.length ?? 0}/${onlyPDIs?.length ?? 0})`}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                onClick={() => existingPDIs.refetch()}
                size="sm"
                variant="secondary"
                className="group mx-auto mb-1 w-full md:w-fit"
              >
                <RefreshCcw className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Atualizar Página
              </Button>
              <Link to={pagePaths.authenticated.pdi.create}>
                <Button size="sm" variant="success" className="group mx-auto mb-1 w-full md:w-fit">
                  <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                  Criar Novo PDI
                </Button>
              </Link>
            </SpaceBetween>
          }
        >
          PDIs Criados
        </Header>
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <CollectionPreferences
          title="Preferências"
          confirmLabel="Confirmar"
          cancelLabel="Cancelar"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Quantidade por página',
            options: PAGE_SIZE_OPTIONS,
          }}
        />
      }
    />
  );
};

export default CardsSectionJob;
