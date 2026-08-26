import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { KeyRound, EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { authenticationService } from '@/services/cognito/authentication';
import useAuthentication from '@/hooks/core/useAuthentication';

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirmPassword: z.string().min(6, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

interface ChangePasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ChangePasswordDialog({ isOpen, setIsOpen }: ChangePasswordDialogProps) {
  const { user } = useAuthentication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    setIsSubmitting(true);
    const loadingToastId = toast.loading('Atualizando senha...');

    try {
      await authenticationService.updatePassword({
        user: user!,
        newPassword: values.newPassword,
      });

      toast.dismiss(loadingToastId);
      toast.success('Senha atualizada com sucesso!');
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.dismiss(loadingToastId);
      toast.error(error?.response?.data?.message || 'Falha ao atualizar senha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        form.reset();
      }
      setIsOpen(open);
    }}>
      <DialogContent className="max-w-md bg-white text-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-950">
            <KeyRound className="size-5 text-primary" />
            Alterar sua senha
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Nova Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        className="border-slate-200 bg-slate-50 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-primary"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="absolute inset-y-[4px] right-1 size-8 text-slate-400 hover:bg-transparent hover:text-slate-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repita a nova senha"
                        className="border-slate-200 bg-slate-50 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-primary"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="absolute inset-y-[4px] right-1 size-8 text-slate-400 hover:bg-transparent hover:text-slate-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-fit"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="success"
                className="w-full md:w-fit"
                disabled={isSubmitting || !form.formState.isValid}
              >
                Atualizar Senha
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
