import { BarChart4, Copy, Edit, Trash2 } from 'lucide-react';

export const components: {
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  onClickPath?: string;
}[] = [
  {
    icon: <Trash2 size={15} />,
    title: 'Apagar',
    description: 'Apagar permanentemente modelo de certificado.',
  },
  {
    icon: <Copy size={15} />,
    title: 'Clonar',
    description: 'Clonar certificado.',
  },
  {
    icon: <Edit size={15} />,
    title: 'Editar',
    description: 'Editar certificado.',
    onClickPath: 'edit',
  },
  {
    icon: <BarChart4 size={15} />,
    title: 'Estatísticas',
    description: 'Em breve.',
    disabled: true,
  },
];
