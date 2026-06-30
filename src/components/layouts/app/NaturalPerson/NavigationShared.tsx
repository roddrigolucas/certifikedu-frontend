import { useEffect, useState } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Link, useLocation } from 'react-router-dom';

import { menuPaths } from '@/constants/navigation/menuPaths/naturalPerson.paths';

import { AccordionContent, AccordionItem } from '@/components/shared/ui/accordion';

import useProfile from '@/hooks/core/useProfile';

import { cn } from '@/utils';
import { checkIsActive } from '@/utils/checkActive';

import { AccordionTrigger } from './AccordionTrigger';

export default function NavigationShared() {
  const { isLegalPerson } = useProfile();
  const location = useLocation();
  const [values, setValues] = useState<string[]>([]);
  const [filteredMenuPaths, setFilteredMenuPaths] = useState<any[]>([]);

  const handleSubMenuClick = (menuLabel: string) => {
    if (!values.includes(menuLabel)) {
      setValues([menuLabel]);
    }
  };

  useEffect(() => {
    if (isLevelingEnabled()) {
      setFilteredMenuPaths(menuPaths);
    } else {
      let filteredMenuPathsAux = menuPaths.filter(
        (menu) => menu.path === undefined || menu.path != '/leveling',
      );

      filteredMenuPathsAux = filteredMenuPathsAux.filter(
        (menu) => menu.path === undefined || menu.path != '/learningTrails',
      );

      setFilteredMenuPaths(filteredMenuPathsAux);
    }
  }, []);

  const isLevelingEnabled = (): boolean => {
    // Substitua 'YOUR_LOCALSTORAGE_KEY' pela chave real que você está usando
    let levelingValue: any = localStorage.getItem('profileStore');

    levelingValue = JSON.parse(levelingValue);
    if (levelingValue.state.profileInfo == null) {
      return false;
    }
    levelingValue = levelingValue.state.profileInfo.email;

    return (
      levelingValue === 'juniorsergio33@gmail.com' ||
      levelingValue === 'luciano.sathler@certifikedu.com' ||
      levelingValue === 'gabrielspinola77@gmail.com' ||
      levelingValue === 'r.lucas@fiemg.com.br'
    );
  };

  return (
    <AccordionPrimitive.Accordion type="multiple" value={values} onValueChange={setValues} asChild>
      <nav className="flex h-screen flex-col gap-2">
        {!isLegalPerson &&
          filteredMenuPaths.map((menu) => (
            <AccordionItem key={menu.path} value={menu.label} className="border-0">
              <AccordionPrimitive.Header asChild>
                {menu.subMenu ? (
                  <AccordionTrigger menu={menu} withSlash />
                ) : (
                  <Link to={menu.path}>
                    <AccordionTrigger menu={menu} data-testId="menu.label" />
                  </Link>
                )}
              </AccordionPrimitive.Header>
              {menu.subMenu && (
                <AccordionContent asChild>
                  <div className="mt-2 flex w-full flex-col gap-2 ">
                    {menu.subMenu.map((subMenu: any) => (
                      <Link
                        key={subMenu.path}
                        to={subMenu.path}
                        className={cn(
                          'justify-start px-8 pl-[3.15rem] py-2 rounded-md w-full font-normal text-slate-400 hover:bg-blue-zodiac-900/50 hover:text-white transition-colors ease',
                          {
                            'border-blue-zodiac-900/30 border hover:bg-blue-zodiac-900/30 font-semibold text-white':
                              checkIsActive(location.pathname, subMenu.path, true),
                          },
                        )}
                        onClick={() => handleSubMenuClick(menu.label)}
                        replace
                      >
                        {subMenu.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
      </nav>
    </AccordionPrimitive.Accordion>
  );
}
