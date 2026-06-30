import { useEffect, useState } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Link, useLocation } from 'react-router-dom';

import { legalPersonMenuPaths } from '@/constants/navigation/menuPaths/legalPerson.paths';
import { naturalPersonMenuPaths } from '@/constants/navigation/menuPaths/naturalPerson.paths';

import { AccordionContent, AccordionItem } from '@/components/shared/ui/accordion';

import useProfile from '@/hooks/core/useProfile';

import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { cn } from '@/utils';
import { checkIsActive } from '@/utils/checkActive';

import { AccordionTrigger } from './AccordionTrigger';

export default function NavigationShared() {
  const { isNaturalPerson, profileInfo } = useProfile();
  const location = useLocation();

  const [values, setValues] = useState<string[]>([]);
  const [filteredMenuPaths, setFilteredMenuPaths] = useState<any[]>([]);

  const isENABLED = profileInfo?.status === EUserStatus.ENABLED;

  const handleSubMenuClick = (menuLabel: string) => {
    if (!values.includes(menuLabel)) {
      setValues([menuLabel]);
    }
  };
  const isLevelingEnabled = (): boolean => {
    let levelingValue: any = localStorage.getItem('profileStore');

    levelingValue = JSON.parse(levelingValue);
    if (levelingValue.state.profileInfo == null) {
      return true;
    }
    levelingValue = levelingValue.state.profileInfo.email;

    return (
      levelingValue === 'juniorsergio33@gmail.com' ||
      levelingValue === 'luciano.sathler@certifikedu.com' ||
      levelingValue === 'gabrielspinola77@gmail.com' ||
      levelingValue === 'r.lucas@fiemg.com.br'
    );
  };

  const hasRole = () => {
    let profileStore: any = localStorage.getItem('profileStore');
    profileStore = JSON.parse(profileStore);

    if (profileStore.state.selectedPJ == null) {
      return true;
    }

    return (
      profileStore?.state.selectedPJ.role === 'medio' ||
      profileStore?.state.selectedPJ.role === 'admin'
    );
  };

  useEffect(() => {
    let paths = [...naturalPersonMenuPaths];
    let profileStore: any = localStorage.getItem('profileStore');
    if (profileStore) {
      if (!hasRole()) {
        paths = paths.filter((menu) => menu.label !== 'Compliance');
      }
    }
    // Filtro de Leveling (sua lógica atual)
    if (!isLevelingEnabled()) {
      paths = paths.filter((menu) => menu.path !== '/levelingPJ');
    }

    setFilteredMenuPaths(paths);
  }, [profileInfo]);

  return (
    <AccordionPrimitive.Accordion type="multiple" value={values} onValueChange={setValues} asChild>
      <nav className="flex h-full flex-col gap-2">
        {!isNaturalPerson &&
          legalPersonMenuPaths.map((menu) => (
            <AccordionItem key={menu.path} value={menu.label} className="border-0">
              <AccordionPrimitive.Header asChild>
                {menu.subMenu ? (
                  <AccordionTrigger menu={menu} withSlash />
                ) : (
                  <Link to={menu.path} target={menu.isExternal ? '_blank' : '_self'}>
                    <AccordionTrigger menu={menu} />
                  </Link>
                )}
              </AccordionPrimitive.Header>
              {menu.subMenu && isENABLED && (
                <AccordionContent asChild>
                  <div className="mt-2 flex w-full flex-col gap-2 ">
                    {menu.subMenu.map((subMenu) => (
                      <Link
                        key={subMenu.path}
                        to={subMenu.path}
                        className={cn(
                          'justify-start px-8 pl-[3.15rem] py-2 rounded-md w-full font-normal text-slate-800 hover:bg-slate-50 hover:text-ecstasy-500 transition-colors ease',
                          {
                            ' hover:bg-slate-50 font-semibold text-slate-500': checkIsActive(
                              location.pathname,
                              subMenu.path,
                              true,
                            ),
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
        {isNaturalPerson &&
          filteredMenuPaths.map((menu) => (
            <AccordionItem key={menu.path} value={menu.label} className="border-0">
              <AccordionPrimitive.Header asChild>
                {menu.subMenu ? (
                  <AccordionTrigger menu={menu} withSlash />
                ) : (
                  <Link to={menu.path}>
                    <AccordionTrigger menu={menu} />
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
                        target={subMenu.isExternal ? '_blank' : '_self'}
                        className={cn(
                          'justify-start px-8 pl-[3.15rem] py-2 rounded-md w-full font-normal text-[#4d2f0c] hover:bg-[#fcf2e5] hover:text-ecstasy-500 transition-colors ease',
                          {
                            ' hover:bg-[#fcf2e5] font-semibold text-ecstasy-500': checkIsActive(
                              location.pathname,
                              subMenu.path,
                              true,
                            ),
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
