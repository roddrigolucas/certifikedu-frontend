import { useState } from 'react';

import { LightbulbIcon } from 'lucide-react';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

interface ICategoriesSectionProps {
  items: { category: string; ability: string }[];
}

export const CategoriesSection: React.FC<ICategoriesSectionProps> = ({ items }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const maxDisplayedItems = 3;

  const itemsToShow = showAll ? items : items.slice(0, maxDisplayedItems);

  return (
    <>
      <div className="mt-1 flex flex-wrap gap-2">
        {itemsToShow.length === 0 && (
          <Badge className="rounded-lg bg-slate-100 p-2" variant="outline">
            Sem habilidades
          </Badge>
        )}
        <div>
          <ul className="flex flex-col gap-5">
            {Object.values(
              itemsToShow.reduce(
                (acc: { [key: string]: { category: string; abilities: string[] } }, ability) => {
                  if (!acc[ability.category]) {
                    acc[ability.category] = { category: ability.category, abilities: [] };
                  }
                  acc[ability.category].abilities.push(ability.ability);

                  return acc;
                },
                {},
              ),
            ).map((group) => (
              <li key={group.category}>
                <div className="mb-2 inline-flex items-center gap-2">
                  <LightbulbIcon className="size-4 text-blue-500" />
                  <h3 className="font-semibold text-slate-600">{group.category}</h3>
                </div>
                <ul className="ml-12 list-disc space-y-2">
                  {group.abilities.map((ability) => (
                    <li key={ability}>
                      <Badge className="rounded-lg border-2 p-1 px-2 text-[14px]" variant="outline">
                        {ability}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex items-end justify-end">
            {items.length > maxDisplayedItems && !showAll && (
              <Button
                variant="ghost"
                className="px-2 underline"
                size="sm"
                onClick={handleToggleShowAll}
              >
                Ver mais
              </Button>
            )}
            {showAll && items.length > maxDisplayedItems && (
              <Button
                variant="ghost"
                size="sm"
                className="px-2 underline"
                onClick={handleToggleShowAll}
              >
                Ver menos
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
