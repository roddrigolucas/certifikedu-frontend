import { Unplug } from 'lucide-react';

import { pagePaths } from '../pagePaths';
import { MenuItem } from './types';

export const CorpMenuPaths: Array<MenuItem> = [
  {
    icon: Unplug,
    label: 'Perfil Corporativo',
    path: pagePaths.authenticated.corporatePerson.dashboard,
  },
];
