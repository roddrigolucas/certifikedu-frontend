import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '../ui/button';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  href?: string;
  children?: React.ReactNode;
}

export function BackButton({ children, href = '/', ...props }: Readonly<Props>) {
  return (
    <Link to={href}>
      <Button variant="ghost" className="group w-fit -translate-x-5 pr-7" {...props}>
        <ChevronLeft className="ease size-5 transition-transform duration-500 group-hover:-translate-x-1" />
        {children ?? 'Voltar para Meu Painel'}
      </Button>
    </Link>
  );
}
