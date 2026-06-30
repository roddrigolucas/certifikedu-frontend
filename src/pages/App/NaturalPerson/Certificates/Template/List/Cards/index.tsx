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

import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { slideUp } from '@/utils/animations';

import {
  CardFilterCloudScape,
  DEFAULT_PREFERENCES,
  PAGE_SIZE_OPTIONS,
  TableEmptyState,
  TableNoMatchState,
} from './cardConfig/cardsConfig';
import { CARD_DEFINITIONS } from './cardConfig/cardsDefinition';
import { CardsSectionPropsPosts, ICardsSectionProps, TransformedTemplate } from './types';

const CardsSection: React.FC<ICardsSectionProps> = ({ templates, form }) => {
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
        <TemplateCard post={templates} form={form} />
      </motion.div>
    </section>
  );
};

const transformAbilities = (templates: ITemplate[]): TransformedTemplate[] => {
  const isIncluded = Object.keys(templates[0]).includes('abilities');

  return templates.map((template) => ({
    ...template,
    abilitiesText: isIncluded
      ? template.abilities.map((ability) => ability.category).join(':')
      : template?.categories?.map((category) => category).join(':') ?? '',
  }));
};

const TemplateCard: React.FC<CardsSectionPropsPosts> = ({ post, form }) => {
  const [preferences, setPreferences] = React.useState<any>(DEFAULT_PREFERENCES);

  const transformedPost = transformAbilities(post);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } =
    useCollection(transformedPost, {
      filtering: {
        empty: <TableEmptyState resourceName="Certificados" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    });

  return (
    <Cards
      {...collectionProps}
      cardDefinition={CARD_DEFINITIONS}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
      items={items}
      loadingText="Carregando certificados ..."
      trackBy="templateId"
      visibleSections={['imagem', 'title', 'hoursWorkload', 'schoolName', 'createdAt', 'abilities']}
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>Nenhum Certificado</b>
            <Link to={pagePaths.authenticated.naturalPerson.certificates.create}>
              <Button variant="success" className="group mx-auto w-full  md:w-fit">
                <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Cadastrar Certificado
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
          counter={`(${items?.length ?? 0}/${transformedPost?.length ?? 0})`}
          actions={
            <Link to={pagePaths.authenticated.naturalPerson.certificates.create}>
              <Button size="sm" variant="success" className="group mx-auto mb-1 w-full md:w-fit">
                <Plus className="ease mr-1 size-5 transition-transform duration-500 group-hover:rotate-180" />
                Cadastrar Certificado
              </Button>
            </Link>
          }
        >
          Certificados Cadastrados
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

export default CardsSection;
