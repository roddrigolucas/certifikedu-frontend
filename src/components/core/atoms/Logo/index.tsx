import { Link } from 'react-router-dom';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';
import { buildDashboardPageUrl } from '@/utils/url';

interface LogoProps {
  path: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ path, className }) => {
  return (
    <Link to={buildDashboardPageUrl()} className="block w-fit">
      <img
        src={getImageUrl(path)}
        alt={import.meta.env.VITE_APPLICATION_NAME}
        className={cn('h-10 hover:opacity-90', className)}
      />
    </Link>
  );
};
