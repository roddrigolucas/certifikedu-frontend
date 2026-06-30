import { AirplayIcon, ArchiveIcon, GraduationCapIcon } from 'lucide-react';

import { buildCertificatesPageUrl } from '@/utils/url';

import { pagePaths } from '../pagePaths';
import { MenuItem } from './types';

export const canvasMenuPaths: Array<MenuItem> = [
  {
    icon: AirplayIcon,
    label: 'Painel do Curso',
    path: pagePaths.authenticated.canvas.dashboard,
  },
  {
    icon: GraduationCapIcon,
    label: 'Alunos',
    path: pagePaths.authenticated.canvas.students,
  },
  {
    icon: ArchiveIcon,
    label: 'Certificados',
    path: pagePaths.authenticated.naturalPerson.certificates.root,
    subMenu: [
      {
        label: 'Certificados Emitidos',
        path: buildCertificatesPageUrl(),
      },
      {
        label: 'Cadastrar Modelo',
        path: pagePaths.authenticated.canvas.certificates.create,
      },
      {
        label: 'Cadastrar Imagem de fundo',
        path: pagePaths.authenticated.canvas.template.backgroundImage,
      },
    ],
  },
];
