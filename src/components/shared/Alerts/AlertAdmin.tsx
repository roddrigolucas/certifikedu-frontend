import { ArrowUpRightFromSquareIcon, SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import useProfile from '@/hooks/core/useProfile';

import { EAdminStatus } from '@/services/entities/app/admin/enum';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

export function AlertAdmin() {
  const { profileInfo, setIsAdminSelected, setSelectedPJ } = useProfile();
  const { authenticated } = pagePaths;

  if (profileInfo?.status === EAdminStatus.ADMIN) {
    return (
      <Alert variant="success">
        <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
          <span className="inline-flex items-center gap-2">
            <SettingsIcon className="size-4 min-w-4" />
            Você é Administrador, acesse o ambiente de Admin clicando no botão
          </span>
          <Link to={authenticated.admin.users.root}>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                setIsAdminSelected(true);
                setSelectedPJ(null);
              }}
            >
              <ArrowUpRightFromSquareIcon className="mr-2 size-4" />
              Acessar Ambiente Admin
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
}
