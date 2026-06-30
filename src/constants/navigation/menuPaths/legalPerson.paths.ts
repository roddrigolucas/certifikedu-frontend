import {
  AirplayIcon,
  CloudCogIcon,
  LayoutListIcon,
  MonitorDotIcon,
  UserSquareIcon,
} from 'lucide-react';

import { pagePaths } from '../pagePaths';
import { MenuItem } from './types';

export const legalPersonMenuPaths: Array<MenuItem> = [
  {
    icon: AirplayIcon,
    label: 'Meu Painel',
    path: pagePaths.authenticated.legalPerson.dashboard,
  },
  {
    icon: LayoutListIcon,
    label: 'Relatórios',
    path: pagePaths.authenticated.legalPerson.reports,
  },
  {
    icon: UserSquareIcon,
    label: 'Perfil da Instituição',
    path: pagePaths.authenticated.legalPerson.profile,
  },
  {
    icon: MonitorDotIcon,
    label: 'Integração Canvas',
    path: pagePaths.authenticated.legalPerson.canvas,
  },
  {
    icon: CloudCogIcon,
    label: 'Documentação API',
    path: '/docs',
    isExternal: true,
  },
];
