import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveAllIcon } from 'lucide-react';
import { toast } from 'sonner';

import DataUpdateDisplay from '@/components/core/molecules/DisplayUpdatedValues';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import { UpdateProfilePF } from '@/services/entities/app/naturalPerson/profile';
import { IProfileData } from '@/services/entities/app/naturalPerson/profile/model';
import {
  INaturalPersonUpdate,
  IPersonUpdateData,
} from '@/services/entities/app/naturalPerson/profile/types';

interface UpdateUserInfoDialogType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  changedValues: INaturalPersonUpdate;
  oldAndNewValue: Array<IPersonUpdateData>;
}

export function UpdateUserInfoDialog({
  isOpen,
  setIsOpen,
  changedValues,
  oldAndNewValue,
}: UpdateUserInfoDialogType) {
  const { updateProfileData } = useProfileStore();
  const queryClient = useQueryClient();

  const { mutate: updateProfileDataMutate } = useMutation<
    IProfileData,
    Error,
    INaturalPersonUpdate
  >(async (profileData) => await UpdateProfilePF(profileData));

  function onUpdate() {
    const loadingToastId = toast.loading('Enviando dados...');

    updateProfileDataMutate(changedValues, {
      onSuccess: (data: IProfileData) => {
        updateProfileData(data);
        queryClient.invalidateQueries(['profile']);
        toast.dismiss(loadingToastId);
        toast.success('Campo Atualizado com sucesso');
      },
      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error('Falha ao atualizar campo...');
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Os novos campos ficarão assim: </DialogTitle>
        </DialogHeader>
        <DataUpdateDisplay updates={oldAndNewValue} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="success"
              onClick={() => onUpdate()}
              className="w-full md:w-fit"
            >
              <SaveAllIcon className="mr-2 size-5" />
              Atualizar dados
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
