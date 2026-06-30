import { useState } from 'react';

import { EyeIcon, EyeOffIcon, FileIcon } from 'lucide-react';
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
import { Textarea } from '@/components/shared/ui/textarea';

import { CanvasSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<CanvasSchemaType>;
  ltiConfigurationData: any;
  isReview?: boolean;
}

export default function LTIConfigurationForm({ form, ltiConfigurationData, isReview }: Props) {
  const [ltiCopied, setLtiCopied] = useState(false);
  const [ltiSecretKeyVisible, setLtiSecretKeyVisible] = useState(false);
  const url = form.watch('url');

  return (
    <div>
      {!isReview && (
        <>
          <h1 className="text-lg font-bold">Registrar chave LTI no Canvas</h1>
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
              e clique em <b>+ Chave do Desenvolvedor</b> e selecione o tipo <b>Chave LTI</b>.
            </li>
            <li>
              Selecione o Método <b>Colar JSON</b>{' '}
            </li>
            <li>
              Copie o JSON abaixo e cole na entrada <b>Configuração do LTI 1.3</b>
            </li>
            <li>Salve e ative a chave.</li>
            <li>
              Copie os dados da coluna <b>Detalhes</b> e cole abaixo abaixo.
            </li>
          </ol>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(ltiConfigurationData));
              setLtiCopied(true);
              setTimeout(() => {
                setLtiCopied(false);
              }, 2000);
            }}
          >
            <FileIcon className="mr-2 size-5" />
            {ltiCopied ? 'Copiado!' : 'Copiar JSON'}
          </Button>
          <Textarea
            readOnly={true}
            className="col-span-6 bg-gray-200 lg:col-span-6"
            value={JSON.stringify(ltiConfigurationData, null, 2)}
          ></Textarea>
        </>
      )}
      <FormField
        name="ltiClientId"
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
        name="ltiClientSecret"
        control={form.control as Control<CanvasSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-6">
            <FormLabel>Chave (Client Secret)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={ltiSecretKeyVisible ? 'text' : 'password'}
                  placeholder="Digite o Client Secret"
                  className="pr-10"
                  required
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute inset-y-[5px] right-1 size-8"
                  onClick={() => setLtiSecretKeyVisible(!ltiSecretKeyVisible)}
                >
                  {ltiSecretKeyVisible ? (
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
