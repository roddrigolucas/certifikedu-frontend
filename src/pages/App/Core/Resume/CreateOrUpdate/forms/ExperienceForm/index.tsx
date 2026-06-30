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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { Textarea } from '@/components/shared/ui/textarea';

import useCertificate from '@/hooks/core/useCertificate';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { employmentTypeOptions, workModelOptions } from '@/services/entities/app/core/resume/model';

import { ResumeSchemaType } from '../../validation/schema';

export function ExperienceForm({
  form,
  setCertificateCreationOpen,
}: {
  form: UseFormReturn<ResumeSchemaType>;
  setCertificateCreationOpen: (open: boolean) => void;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });
  const { isLoading: isLoadingCertificates } = useCertificate();
  const { lastCertificates } = useCertificateStore();

  const certificateOptions = lastCertificates?.map((cert) => ({
    label: `${cert.certificateName} - Emitido por: ${cert.certificateIssuer}`,
    value: cert.certificateId,
  }));

  return (
    <div>
      {fields.map((field, index) => {
        const currentlyWorking = form.watch(`experiences.${index}.currentlyWorking`);

        return (
          <div key={field.id} className="mb-4 space-y-4 border p-4">
            <h3 className="text-lg font-semibold">Experiência {index + 1}</h3>

            <FormField
              name={`experiences.${index}.title`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Experiência</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Desenvolvedor Frontend" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`experiences.${index}.description`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descreva sua experiência" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`experiences.${index}.currentlyWorking`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`currentlyWorking-${index}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor={`currentlyWorking-${index}`}>
                        Ainda trabalho aqui
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-4 gap-4">
              <FormField
                name={`experiences.${index}.startYear`}
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
                name={`experiences.${index}.startMonth`}
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

              <>
                <FormField
                  name={`experiences.${index}.endYear`}
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
                          placeholder="Ex: 2021"
                          disabled={currentlyWorking}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`experiences.${index}.endMonth`}
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
                          disabled={currentlyWorking}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                name={`experiences.${index}.employmentType`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Emprego</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de emprego" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`experiences.${index}.workModel`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de Trabalho</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo de trabalho" />
                        </SelectTrigger>
                        <SelectContent>
                          {workModelOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h4 className="text-md mt-4 font-semibold">Informações da Empresa</h4>

            <FormField
              name={`experiences.${index}.companyName`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Empresa XYZ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                name={`experiences.${index}.companyEmail`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email da Empresa</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Ex: contato@empresa.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`experiences.${index}.companyPhone`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone da Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: (11) 99999-9999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`experiences.${index}.companyCnpj`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ da Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: 12.345.678/0001-99" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name={`experiences.${index}.companyLocation`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização da Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: São Paulo, SP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`experiences.${index}.certificates`}
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
                        virtualScroll={true}
                        filteringType="auto"
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
              Remover Experiência
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
            description: '',
            startYear: new Date().getFullYear(),
            startMonth: new Date().getMonth(),
            endYear: undefined,
            endMonth: undefined,
            currentlyWorking: true,
            employmentType: '',
            workModel: '',
            companyName: '',
            companyEmail: undefined,
            companyPhone: undefined,
            companyCnpj: undefined,
            companyLocation: undefined,
            certificates: [],
          })
        }
      >
        <PlusIcon className="mr-1 size-4" />
        Adicionar Experiência
      </Button>
    </div>
  );
}
