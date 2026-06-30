/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCardIcon, EditIcon, MapPinIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/shared/ui/input';
import { ScrollArea } from '@/components/shared/ui/scroll-area';

import useProfile from '@/hooks/core/useProfile';

import { SignupCreditCard } from '@/services/entities/app/core/credits';
import { ISignupCreditCard } from '@/services/entities/app/core/credits/types';

import { GetBrand } from '@/utils/validation/format';

import { BrandIcon } from '../../../BrandIcon';
import { AddCardDialogProps } from './types';
import { addFields } from './validation/fields';
import { CreditCardFormSchemaType, CreditCardSchema } from './validation/schema';

const mockData = {
  number: '',
  holderName: '',
  holderDocument: '',
  expMonth: '',
  expYear: '',
  cvv: '',
  billingAddress: {
    zipCode: '',
    street: '',
    streetNumber: '',
    city: '',
    state: '',
    neighborhood: ' ',
    additionalDetails: '',
  },
};
export function AddCardDialog({ mode = 'add', trigger, ...props }: AddCardDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { UpdateCards } = useProfile();

  const defaultValues =
    mode === 'edit'
      ? {
          number: undefined,
          holderName: undefined,
          holderDocument: undefined,
          expMonth: props.card?.expMonth.toString(),
          expYear: props.card?.expYear.toString(),
          cvv: undefined,
        }
      : mockData;

  const form = useForm<CreditCardFormSchemaType>({
    resolver: zodResolver(CreditCardSchema),
    mode: 'onChange',
    defaultValues,
  });

  function onSubmit(values: CreditCardFormSchemaType) {
    const data: ISignupCreditCard = {
      ...values,
      setDefault: false,
      billingAddress: {
        ...values.billingAddress,
        zipCode: values.billingAddress.zipCode.replace(/\D/g, ''),
        country: 'BR',
      },
      holderDocument: values.holderDocument.replace(/\D/g, ''),
      number: values.number.replace(/\D/g, ''),
      expMonth: Number(values.expMonth),
      expYear: Number(values.expYear),
    };

    const response = SignupCreditCard(data);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return 'Cartão cadastrado com sucesso';
      },
      error: () => {
        return 'Falha ao cadastrar cartão, revise sua informações e tente novamente...';
      },
      finally: () => {
        UpdateCards();
      },
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();

        return setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Adicione um novo cartão de crédito' : 'Edite o cartão de crédito'}
          </DialogTitle>
          <DialogDescription>
            Siga as instruções na tela para concluir o processo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-full max-h-[50vh]">
              <div className="flex w-full flex-col items-center gap-6 p-6">
                <div className="flex w-full flex-col gap-4">
                  <div className="grid w-full grid-cols-12 gap-4 pb-6">
                    {addFields.card.map((item) => (
                      <FormField
                        key={item.name}
                        name={item.name}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className={item.className ?? 'col-span-12'}>
                            <FormLabel>{item.label}</FormLabel>

                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  className={item.name === 'number' ? 'pl-10' : ''}
                                  value={field.value as string}
                                  onChange={(e) => {
                                    if (item.onChange) {
                                      const formattedValue = item.onChange(e.target.value);

                                      return field.onChange(formattedValue);
                                    }

                                    return field.onChange(e);
                                  }}
                                  placeholder={item.placeholder}
                                />
                                {item.name === 'number' && (
                                  <BrandIcon
                                    className="absolute inset-y-[5px] left-0.5 bg-white"
                                    brand={GetBrand(field.value as string)}
                                  />
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2">
                      <MapPinIcon className="text-primary" />
                      <h5 className="text-base font-semibold text-slate-950">
                        Endereço de cobrança
                      </h5>
                    </div>
                    <div className="grid w-full grid-cols-12 gap-4 pb-6">
                      {addFields.billingAddress.map((item) => (
                        <FormField
                          key={item.name}
                          name={item.name}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className={item.className ?? 'col-span-12'}>
                              <FormLabel>{item.label}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value as string}
                                  onChange={(e) => {
                                    if (item.onChange) {
                                      const formattedValue = item.onChange(e.target.value);

                                      return field.onChange(formattedValue);
                                    }

                                    return field.onChange(e);
                                  }}
                                  placeholder={item.placeholder}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full md:w-fit" onClick={() => form.reset()}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="success"
                className="w-full md:w-fit"
                disabled={!form.formState.isValid}
              >
                {mode === 'add' ? (
                  <CreditCardIcon className="mr-2 size-4" />
                ) : (
                  <EditIcon className="mr-2 size-4" />
                )}
                {mode === 'add' ? 'Cadastrar cartão' : 'Editar cartão'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
