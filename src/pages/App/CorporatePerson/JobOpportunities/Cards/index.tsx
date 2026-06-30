import * as React from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { motion, useAnimation } from 'framer-motion';
import { Plus } from 'lucide-react';
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
  const { jobsOpportunity } = useProfile();
  const onlyJobsOpportunity = jobsOpportunity.data?.jobOpportunities ?? [];

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } =
    useCollection(onlyJobsOpportunity, {
      filtering: {
        empty: <TableEmptyState resourceName="Vagas" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    });

  return (
    <Cards
      {...collectionProps}
      cardDefinition={CARD_DEFINITIONS}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 4 }]}
      items={items}
      loadingText="Carregando vagas ..."
      trackBy="templateId"
      visibleSections={['title', 'generalInfo', 'createdAt']}
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <img
              src={getImageUrl('images/empty/search.svg')}
              alt="search"
              className="h-36 w-full"
            />
            <b>Nenhuma Vaga</b>
            <Link to={pagePaths.authenticated.corporatePerson.create}>
              <Button
                data-testId="create-button"
                variant="success"
                className="group mx-auto w-full  md:w-fit"
              >
                <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Criar Nova Vaga
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
          counter={`(${items?.length ?? 0}/${onlyJobsOpportunity?.length ?? 0})`}
          actions={
            <Link to={pagePaths.authenticated.corporatePerson.create}>
              <Button size="sm" variant="success" className="group mx-auto mb-1 w-full md:w-fit">
                <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Criar Nova Vaga
              </Button>
            </Link>
          }
        >
          Vagas Cadastradas
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
