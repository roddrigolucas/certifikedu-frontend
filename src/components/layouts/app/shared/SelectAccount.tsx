'use client';

import * as React from 'react';

import { CaretSortIcon } from '@radix-ui/react-icons';
import { Briefcase, Building2Icon, CheckIcon, SettingsIcon, UserIcon } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover';

import useProfile from '@/hooks/core/useProfile';

import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';
import { ILegalInstitutionsProfile } from '@/services/entities/app/naturalPerson/profile/model';

import { cn } from '@/utils';

export function SelectAccount() {
  const {
    profileInfo,
    selectedPJ,
    setSelectedPJ,
    isAdminSelected,
    setIsAdminSelected,
    setSelectedCorporate,
    selectedCorporate,
  } = useProfile();

  const [open, setOpen] = React.useState(false);
  const isENABLED = profileInfo?.status === EUserStatus.ENABLED;

  const isAdmin = profileInfo?.status === EUserStatus.ADMIN;

  const accounts: Array<ILegalInstitutionsProfile> = (profileInfo?.pjs ?? []).map((account) => ({
    ...account,
    nameEnvironment:
      account.environment === 'corporate' ? `${account.name} - ${'Corp'}` : account.name,
  }));

  function SelectedIcon() {
    if (isAdminSelected) {
      return <SettingsIcon className="size-5" />;
    }

    if (!!selectedPJ) {
      return <Building2Icon className="size-5" />;
    }

    if (!!selectedCorporate) {
      return <Briefcase className="size-5" />;
    }

    return <UserIcon className="size-5" />;
  }

  function SelectedInstitution(currentValue: string, account: ILegalInstitutionsProfile) {
    if (account.environment === 'institutional') {
      if (currentValue.split('/')[0] === selectedPJ?.pjId) {
        setSelectedPJ(null);
      } else {
        setSelectedPJ(account);
        setSelectedCorporate(null);
      }
    } else {
      if (currentValue.split('/')[0] === selectedCorporate?.pjId) {
        setSelectedCorporate(null);
      } else {
        setSelectedCorporate(account);
        setSelectedPJ(null);
      }
    }
  }

  const selectedLabel = () => {
    if (isAdminSelected) {
      return 'Administrador';
    }

    if (selectedPJ) {
      const label =
        accounts.find((account) => account.pjId === selectedPJ.pjId)?.name ?? 'Desconhecido';

      return label.length > 20 ? label.slice(0, 20) + '...' : label;
    }

    if (selectedCorporate) {
      const label =
        accounts.find((account) => account.nameEnvironment === selectedCorporate.nameEnvironment)
          ?.nameEnvironment ?? 'Desconhecido';

      return label.length > 20 ? label.slice(0, 20) + '...' : label;
    }

    return 'Conta Pessoal';
  };

  return (
    <>
      {(isENABLED || isAdmin) && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              variant="ghost"
              data-testId="selectAccount-button"
              aria-expanded={open}
              className={cn('w-full justify-between gap-2 px-2', {
                'bg-blue-zodiac-900/30 text-white hover:bg-blue-zodiac-900/80 hover:text-white ease transition-all':
                  !selectedPJ,
                'bg-[#fff8f0] text-[#4d2f0c] hover:bg-[#fcf2e5] hover:text-[#8f5717]': selectedPJ,
                'bg-slate-800/30 hover:bg-slate-800': isAdminSelected || selectedCorporate,
              })}
            >
              <div className="inline-flex items-center gap-2">
                <div
                  className={cn('rounded-lg bg-ecstasy-500 text-white p-2', {
                    'bg-blue-zodiac-950 text-slate-200': !selectedPJ,
                  })}
                >
                  <SelectedIcon />
                </div>
                {selectedLabel()}
              </div>
              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[288px] p-0">
            <Command className="w-full">
              <CommandInput placeholder="Procure uma conta..." className="h-9" />
              <CommandEmpty>Nenhuma conta encontrada</CommandEmpty>
              <CommandGroup className="p-2">
                <CommandItem
                  className="inline-flex w-full cursor-pointer justify-between rounded-lg hover:bg-slate-50"
                  value=""
                  onSelect={() => {
                    setIsAdminSelected(false);
                    setSelectedPJ(null);
                    setSelectedCorporate(null);
                    setOpen(false);
                  }}
                >
                  <div className="inline-flex items-center gap-2">
                    <div
                      className={cn('rounded-lg bg-slate-100 text-slate-950  p-2', {
                        'bg-blue-zodiac-950 text-white':
                          selectedPJ === null && selectedCorporate === null && !isAdminSelected,
                      })}
                    >
                      <UserIcon className="size-5" />
                    </div>
                    <p className="font-bold">Conta Pessoal</p>
                  </div>
                  <div
                    className={cn('p-1 rounded-full opacity-0 bg-blue-zodiac-500', {
                      'opacity-100':
                        selectedPJ === null && selectedCorporate === null && !isAdminSelected,
                    })}
                  >
                    <CheckIcon className="size-3 text-white" />
                  </div>
                </CommandItem>
                {isAdmin && (
                  <CommandItem
                    className="inline-flex w-full cursor-pointer justify-between rounded-lg hover:bg-slate-50"
                    value="admin"
                    onSelect={() => {
                      setIsAdminSelected(true);
                      setSelectedPJ(null);
                      setOpen(false);
                      setSelectedCorporate(null);
                    }}
                  >
                    <div className="inline-flex items-center gap-2">
                      <div
                        className={cn('rounded-lg bg-slate-100 text-slate-950  p-2', {
                          'bg-emerald-500 text-white': isAdminSelected,
                        })}
                      >
                        <SettingsIcon className="size-5" />
                      </div>
                      <p className="font-bold">Administrador</p>
                    </div>
                    <div
                      className={cn('p-1 rounded-full opacity-0 bg-blue-zodiac-500', {
                        'opacity-100': isAdminSelected,
                      })}
                    >
                      <CheckIcon className="size-3 text-white" />
                    </div>
                  </CommandItem>
                )}
                {accounts.map((account) => (
                  <CommandItem
                    key={account.nameEnvironment}
                    className="cursor-pointer rounded-lg"
                    value={`${account.pjId}/${account.nameEnvironment}`}
                    onSelect={(currentValue) => {
                      setIsAdminSelected(false);
                      SelectedInstitution(currentValue, account);
                      setOpen(false);
                    }}
                  >
                    <div
                      className="inline-flex w-full items-center gap-2"
                      data-testId={account.environment}
                    >
                      <div
                        className={cn('rounded-lg bg-slate-100 text-slate-950 p-2', {
                          'bg-ecstasy-500 text-white':
                            selectedPJ?.pjId === account.pjId &&
                            account.environment === selectedPJ?.environment,
                          'bg-black text-green-600':
                            selectedCorporate?.pjId === account.pjId &&
                            account.environment === selectedCorporate?.environment,
                        })}
                      >
                        {account.environment === 'institutional' ? (
                          <Building2Icon className="size-5" />
                        ) : (
                          <Briefcase className="size-5" />
                        )}
                      </div>
                      <p className="font-bold">{account.nameEnvironment}</p>
                    </div>
                    <div
                      className={cn(
                        'p-0.5 rounded-full',
                        (selectedPJ?.pjId === account.pjId &&
                          account.environment === selectedPJ?.environment) ||
                          (selectedCorporate?.pjId === account.pjId &&
                            account.environment === selectedCorporate?.environment)
                          ? 'opacity-100 bg-blue-zodiac-500'
                          : 'opacity-0',
                      )}
                    >
                      <CheckIcon className="size-4 text-white" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
