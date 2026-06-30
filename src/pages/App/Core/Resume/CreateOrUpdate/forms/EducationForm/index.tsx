import Multiselect from '@cloudscape-design/components/multiselect';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/shared/ui/button';
import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import { Textarea } from '@/components/shared/ui/textarea';

import useCertificate from '@/hooks/core/useCertificate';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { ResumeSchemaType } from '../../validation/schema';

export function EducationForm({
  form,
  setCertificateCreationOpen,
}: {
  form: UseFormReturn<ResumeSchemaType>;
  setCertificateCreationOpen: (isOpen: boolean) => void;
}) {
  const { isLoading: isLoadingCertificates } = useCertificate();
  const { lastCertificates } = useCertificateStore();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const certificateOptions = lastCertificates?.map((cert) => ({
    label: `${cert.certificateName} - Emitido por: ${cert.certificateIssuer}`,
    value: cert.certificateId,
  }));

  return (
    <div>
      {fields.map((field, index) => {
        const currentlyStudying = form.watch(`educations.${index}.currentlyStudying`);

        return (
          <div key={field.id} className="mb-4 space-y-4 border  p-4">
            <h3 className="text-lg font-semibold">Educação {index + 1}</h3>

            <FormField
              name={`educations.${index}.title`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Educação</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Bacharelado em Ciência da Computação" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`educations.${index}.description`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descreva sua educação" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`educations.${index}.currentlyStudying`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`currentlyStudying-${index}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor={`currentlyStudying-${index}`}>
                        Ainda estudo aqui
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 gap-4">
              <FormField
                name={`educations.${index}.startYear`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de Início</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                        placeholder="Ex: 2020"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`educations.${index}.startMonth`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mês de Início</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                        placeholder="Ex: 1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`educations.${index}.endYear`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de Término</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                        placeholder="Ex: 2024"
                        disabled={currentlyStudying}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`educations.${index}.endMonth`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mês de Término</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                        placeholder="Ex: 12"
                        disabled={currentlyStudying}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h4 className="text-md mt-4 font-semibold">Informações da Instituição</h4>

            <FormField
              name={`educations.${index}.institutionName`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Instituição</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Universidade XYZ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                name={`educations.${index}.institutionEmail`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email da Instituição</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Ex: contato@universidade.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`educations.${index}.institutionPhone`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone da Instituição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: (11) 99999-9999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`educations.${index}.institutionCnpj`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ da Instituição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: 12.345.678/0001-99" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name={`educations.${index}.institutionLocation`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização da Instituição</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: São Paulo, SP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`educations.${index}.certificates`}
              control={form.control}
              render={({ field }) => {
                const selectedOptions =
                  certificateOptions?.filter((option) => field.value?.includes(option.value)) || [];

                return (
                  <FormItem>
                    <FormLabel>
                      Selecione os certificados que você possui para atrelar a esta experiência
                    </FormLabel>
                    <FormControl>
                      <Multiselect
                        selectedOptions={selectedOptions}
                        onChange={({ detail }) =>
                          field.onChange(detail.selectedOptions.map((option) => option.value))
                        }
                        options={certificateOptions || []}
                        loadingText="Carregando certificados..."
                        placeholder="Selecionar certificados"
                        disabled={isLoadingCertificates}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="mt-2">
              <Button
                variant="link"
                type="button"
                onClick={() => setCertificateCreationOpen(true)}
                className="text-blue-500"
              >
                Não encontrou um certificado? Clique aqui para ampliar suas opções.
              </Button>
            </div>

            <Button size="sm" variant="destructive" onClick={() => remove(index)} className="mt-4">
              <TrashIcon className="mr-1 size-4" />
              Remover Educação
            </Button>
          </div>
        );
      })}
      <Button
        type="button"
        variant={'outline'}
        onClick={() =>
          append({
            title: '',
            startYear: new Date().getFullYear(),
            startMonth: new Date().getMonth(),
            currentlyStudying: true,
            institutionName: '',
            description: '',
            certificates: [],
          })
        }
      >
        <PlusIcon className="mr-1" />
        Adicionar Educação
      </Button>
    </div>
  );
}
