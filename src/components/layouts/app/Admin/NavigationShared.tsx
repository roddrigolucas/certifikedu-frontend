import { useState } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Link, useLocation } from 'react-router-dom';

import { adminMenuPaths } from '@/constants/navigation/menuPaths/admin.paths';

import { AccordionContent, AccordionItem } from '@/components/shared/ui/accordion';

import useProfile from '@/hooks/core/useProfile';

import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { cn } from '@/utils';
import { checkIsActive } from '@/utils/checkActive';

import { AccordionTrigger } from './AccordionTrigger';

export default function NavigationShared() {
  const { profileInfo } = useProfile();
  const location = useLocation();

  const [values, setValues] = useState<string[]>([]);

  const isENABLED = profileInfo?.status === EUserStatus.ENABLED;

  const handleSubMenuClick = (menuLabel: string) => {
    if (!values.includes(menuLabel)) {
      setValues([menuLabel]);
    }
  };

  return (
    <AccordionPrimitive.Accordion type="multiple" value={values} onValueChange={setValues} asChild>
      <nav className="flex h-full flex-col gap-2">
        {adminMenuPaths.map((menu) => (
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
      </nav>
    </AccordionPrimitive.Accordion>
  );
}
