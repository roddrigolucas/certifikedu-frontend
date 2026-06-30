import {
  AirplayIcon,
  ArchiveIcon,
  BookOpenText,
  FileText,
  FileTextIcon,
  GraduationCapIcon,
  LibraryBig,
  Medal,
  Milestone,
  SchoolIcon,
  ShieldPlus,
  Trophy,
  UserSquareIcon,
} from 'lucide-react';

import { buildCertificatesPageUrl } from '@/utils/url';

import { pagePaths } from '../pagePaths';
import { MenuItem } from './types';

export const menuPaths: Array<MenuItem> = [
  {
    icon: AirplayIcon,
    label: 'Meu Painel',
    path: pagePaths.authenticated.dashboard,
  },
  {
    icon: ArchiveIcon,
    label: 'Meus Certificados',
    path: pagePaths.authenticated.certificates.root,
    subMenu: [
      {
        label: 'Emitir Certificado',
        path: pagePaths.authenticated.certificates.create,
      },
      {
        label: 'Certificados',
        path: buildCertificatesPageUrl(),
      },
    ],
  },
  {
    icon: Milestone,
    label: 'Trilhas de Aprendizagem',
    path: pagePaths.authenticated.learningTrails.root,
  },
  {
    icon: FileTextIcon,
    label: 'Meu Currículo',
    path: pagePaths.authenticated.resume.root,
  },
  {
    icon: BookOpenText,
    label: 'Plano de Desenvolvimento Individual (PDI)',
    path: pagePaths.authenticated.pdi.root,
  },
  {
    icon: Trophy,
    label: 'Missões e Conquistas',
    path: pagePaths.authenticated.leveling.root,
  },
  {
    icon: UserSquareIcon,
    label: 'Minha Conta',
    path: pagePaths.authenticated.account.root,
    subMenu: [
      {
        label: 'Gerenciar Plano',
        path: pagePaths.authenticated.account.plans,
      },
      {
        label: 'Gerenciar Cartões',
        path: pagePaths.authenticated.account.cards,
      },
      {
        label: 'Gerenciar Perfil',
        path: pagePaths.authenticated.account.profile,
      },
    ],
  },
];

export const naturalPersonMenuPaths: Array<MenuItem> = [
  {
    icon: AirplayIcon,
    label: 'Meu Painel',
    path: pagePaths.authenticated.naturalPerson.dashboard,
  },
  {
    icon: SchoolIcon,
    label: 'Unidades de Ensino',
    path: pagePaths.authenticated.naturalPerson.school.root,
    // subMenu: [
    //   {
    //     label: 'Unidades de Ensino ou Organizações Cadastradas',
    //     path: pagePaths.authenticated.naturalPerson.school.root,
    //   },
    //   {
    //     label: 'Cadastrar Unidade de Ensino',
    //     path: pagePaths.authenticated.naturalPerson.school.create,
    //   },
    // ],
  },
  {
    icon: LibraryBig,
    label: 'Cursos',
    path: pagePaths.authenticated.naturalPerson.course.root,
  },
  {
    icon: Medal,
    label: 'Trilhas de Aprendizagem',
    path: pagePaths.authenticated.naturalPerson.trail.root,
  },
  {
    icon: GraduationCapIcon,
    label: 'Alunos',
    path: pagePaths.authenticated.naturalPerson.student.root,
    // subMenu: [
    //   {
    //     label: 'Alunos Cadastrados',
    //     path: pagePaths.authenticated.naturalPerson.student.root,
    //   },
    //   // {
    //   //   label: 'Cadastrar Aluno',
    //   //   path: pagePaths.authenticated.naturalPerson.student.create,
    //   // },
    //   // {
    //   //   label: 'Cadastrar Alunos em lote',
    //   //   path: pagePaths.authenticated.naturalPerson.student.bulkCreate,
    //   // },
    // ],
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
        label: 'Certificados Cadastrados',
        path: pagePaths.authenticated.naturalPerson.template.root,
      },
      {
        label: 'Cadastrar Certificado',
        path: pagePaths.authenticated.naturalPerson.certificates.create,
      },
      {
        label: 'Cadastrar Imagem de fundo',
        path: pagePaths.authenticated.naturalPerson.template.backgroundImage,
      },
    ],
  },
  {
    icon: Trophy,
    label: 'Missões & Conquistas',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.root,
  },
  {
    icon: FileText,
    label: 'Relatórios',
    path: pagePaths.authenticated.naturalPerson.reports,
  },
  {
    icon: ShieldPlus,
    label: 'Compliance',
    path: pagePaths.authenticated.naturalPerson.history.compliance,
  },
  {
    icon: FileText,
    label: 'Históricos',
    path: pagePaths.authenticated.naturalPerson.history.certificates.list,
    subMenu: [
      {
        label: 'Emissões de Certificados',
        path: pagePaths.authenticated.naturalPerson.history.certificates.list,
      },
      // {
      //   label: 'Cadastro de Alunos',
      //   path: pagePaths.authenticated.naturalPerson.history.certificates.view,
      // },
    ],
  },

  // {
  //   icon: Building2Icon,
  //   label: 'Minha Conta',
  //   path: pagePaths.authenticated.account.root,
  //   subMenu: [
  //     {
  //       label: 'Gerenciar Perfil',
  //       path: pagePaths.authenticated.account.profile,
  //     },
  //   ],
  // },
];
