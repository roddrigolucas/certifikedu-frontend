import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Control, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { ICanvasConfigResponse } from '@/services/entities/app/legalPerson/canvas/types';

import { CanvasSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<CanvasSchemaType>;
  canvasConfigResponse: ICanvasConfigResponse | undefined;
  isReview?: boolean;
}

const StepsToConfigureCanvasAPIKey = ({ url }: { url: string }) => {
  return (
    <>
      <h1 className="text-lg font-bold">Registrar Chave API no Canvas</h1>
      <ol className="mb-4 ml-6 list-decimal">
        <li>
          Navegue até{' '}
          <a
            href={`${url}/accounts/1/developer_keys`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {url}/accounts/1/developer_keys
          </a>{' '}
          e clique em <b>+ Chave do Desenvolvedor</b> e selecione o tipo <b>Chave API</b>.
        </li>
        <li>
          Clique em <b>Aplicar Escopos</b> e selecione <b>Leitura apenas</b>.
        </li>
        <li>
          Copie a URI de Redirecionamento abaixo e cole em <b>Redirecionar URIs</b> no Canvas.
        </li>
        <li>Salve e ative a chave.</li>
        <li>
          Copie os dados da coluna <b>Detalhes</b> e cole abaixo abaixo.
        </li>
        <br />
      </ol>
    </>
  );
};

export default function CanvasAPIKeyConfigurationForm({
  form,
  canvasConfigResponse,
  isReview,
}: Props) {
  const [canvasAPIKeyVisibility, setCanvasAPIKeyVisibility] = useState(false);
  const url = form.watch('url');

  return (
    <div>
      {!isReview && <StepsToConfigureCanvasAPIKey url={url} />}
      {!isReview && (
        <FormField
          name="redirectUri"
          control={form.control as Control<CanvasSchemaType> | undefined}
          render={({ field }) => (
            <FormItem className="col-span-6 lg:col-span-6">
              <FormLabel>URI de Redirecionamento</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o Client ID"
                  className="pr-10"
                  required
                  readOnly={true}
                  value={canvasConfigResponse?.redirectUri}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        name="canvasClientId"
        control={form.control as Control<CanvasSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-6">
            <FormLabel>ID do Cliente Canvas (Client ID)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Digite o Client ID"
                className="pr-10"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="canvasClientSecret"
        control={form.control as Control<CanvasSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-6">
            <FormLabel>Chave (Client Secret)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={canvasAPIKeyVisibility ? 'text' : 'password'}
                  placeholder="Digite o Client Secret"
                  className="pr-10"
                  required
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute inset-y-[5px] right-1 size-8"
                  onClick={() => setCanvasAPIKeyVisibility(!canvasAPIKeyVisibility)}
                >
                  {canvasAPIKeyVisibility ? (
                    <EyeOffIcon className="size-5 text-slate-500" />
                  ) : (
                    <EyeIcon className="size-5 text-slate-500" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
