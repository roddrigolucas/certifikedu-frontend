import { BookA, Image, Mail, NotebookIcon, ShieldPlus, TrainFront, UsersIcon } from 'lucide-react';

import { pagePaths } from '../pagePaths';
import { MenuItem } from './types';

export const adminMenuPaths: Array<MenuItem> = [
  // {
  //   icon: AirplayIcon,
  //   label: 'Meu Painel',
  //   path: pagePaths.authenticated.admin.dashboard,
  // },
  {
    icon: UsersIcon,
    label: 'Usuários',
    path: pagePaths.authenticated.admin.users.root,
  },
  // {
  //   icon: SchoolIcon,
  //   label: 'Instituições',
  //   path: pagePaths.authenticated.admin.users.root,
  // },
  // {
  //   icon: ArchiveIcon,
  //   label: 'Certificados',
  //   path: pagePaths.authenticated.admin.certificates.root,
  // },
  {
    icon: NotebookIcon,
    label: 'Planos',
    path: pagePaths.authenticated.admin.plans.root,
  },
  {
    icon: Image,
    label: 'Imagens de fundo',
    path: pagePaths.authenticated.admin.backgroundImage,
  },
  {
    icon: Mail,
    label: 'Emails',
    path: pagePaths.authenticated.admin.emails.root,
  },
  {
    icon: BookA,
    label: 'Habilidades Cadastradas',
    path: pagePaths.authenticated.admin.abilities.root,
  },
  {
    icon: TrainFront,
    label: 'Treinar PDI',
    path: pagePaths.authenticated.admin.pdi.train,
  },
  {
    icon: ShieldPlus,
    label: 'Compliance',
    path: pagePaths.authenticated.admin.compliance,
  },
  // {
  //   icon: LayoutListIcon,
  //   label: 'Relatórios',
  //   path: pagePaths.authenticated.legalPerson.reports,
  // },
];
