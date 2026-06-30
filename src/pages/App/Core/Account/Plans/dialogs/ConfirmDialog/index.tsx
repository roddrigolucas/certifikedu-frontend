import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { BanIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { queryClient } from '@/components/Providers';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useProfile from '@/hooks/core/useProfile';

import { PlansService } from '@/services/entities/app/core/plans';

import { PlansSchemaNaturalPerson, PlansSchemaNaturalPersonType } from '../../validation/schema';

export default function ConfirmPlan({ id, installments }: { id: string; installments: number[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { profileInfo, profileCards, isUserEnabled } = useProfile();

  const form = useForm<PlansSchemaNaturalPersonType>({
    resolver: zodResolver(PlansSchemaNaturalPerson),
    mode: 'onChange',
  });

  const installment = form.watch('installments');

  const handlePlanChange = () => {
    const creditCardId =
      profileInfo?.paymentCardId !== ''
        ? profileInfo?.paymentCardId
        : profileCards?.find((card) => card.isDefault === true)?.cardId;

    const data = {
      planId: id,
      creditCardId: creditCardId ?? '',
      installments: Number(installment),
    };
    const response = PlansService.SubscribePlan(data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return `Plano assinado com sucesso`;
      },
      error: () => {
        return 'Falha ao assinar plano...';
      },
      finally: () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={profileInfo?.planId === id || profileCards?.length === 0 || !isUserEnabled}
          variant="outline"
          className="bg-white"
        >
          {profileInfo?.planId === id ? 'Plano atual' : 'Assinar agora'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza ?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">Selecione abaixo o modelo de parcelamento.</p>
          <Form {...form}>
            <form className="space-y-8">
              {!!installments && (
                <FormField
                  name="installments"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormLabel>Selecione as parcelas</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione as parcelas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {installments &&
                            installments.map((installment) => (
                              <SelectItem key={installment} value={String(installment)}>
                                {installment} x
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full md:w-fit">
                    Fechar
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  disabled={!!!installment}
                  onClick={() => handlePlanChange()}
                  variant="success"
                  className="w-full md:w-fit"
                >
                  <BanIcon className="mr-2 size-4" />
                  Confirma assinatura
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
