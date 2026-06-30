/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { queryClient } from '@/components/Providers';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
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

import { TemplateService } from '@/services/entities/app/naturalPerson/templates';
import { IQrCodeSettings, ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { slideUp } from '@/utils/animations';
import { CheckDateRange } from '@/utils/checkDateRange';
import { downloadCsv } from '@/utils/downloadCsv';
import { ConvertFromISODateTime, ConvertToISODateTime } from '@/utils/isoDateTime';
import { FormatBirthday } from '@/utils/validation/format';

import { GenerateQrCodeSchema, GenerateQrCodeSchemaType } from './validation/schema';

interface QrCodeFormProps {
  setIsQRCodeSettings: (value: boolean) => void;
  id: string;
  selectedPJ: string;
  qrCodeData: ITemplate;
}

export function QrCodeForm({ setIsQRCodeSettings, id, selectedPJ, qrCodeData }: QrCodeFormProps) {
  const defaultStart = qrCodeData?.startDateTime
    ? ConvertFromISODateTime(qrCodeData.startDateTime)
    : { date: '', time: '' };
  const defaultExpiration = qrCodeData?.expirationDateTime
    ? ConvertFromISODateTime(qrCodeData.expirationDateTime)
    : { date: '', time: '' };

  const form = useForm<GenerateQrCodeSchemaType>({
    resolver: zodResolver(GenerateQrCodeSchema),
    mode: 'onChange',
    defaultValues: {
      startTime: defaultStart.time,
      expirationTime: defaultExpiration.time,
      emissionQty: qrCodeData?.issuesNumberLimit?.toString(),
    },
  });

  const { mutate: SetQrCodeSettings, isLoading } = useMutation<void, Error, IQrCodeSettings>(
    async (data: IQrCodeSettings) => {
      await TemplateService.SetQrCodeSettings(selectedPJ ?? '', id ?? '', data);
    },
  );
  useEffect(() => {
    if (defaultStart.date) {
      form.setValue('startDate', defaultStart.date);
    }
    if (defaultExpiration.date) {
      form.setValue('expirationDate', defaultExpiration.date);
    }
  }, [qrCodeData]);

  function GenerateTimeSelect() {
    const time = [];
    for (let i = 0; i < 24; i++) {
      for (let j of [0, 30]) {
        let hour = i.toString().padStart(2, '0');
        let min = j.toString().padStart(2, '0');
        time.push(`${hour}:${min}`);
      }
    }

    return time;
  }

  const timeSelect = GenerateTimeSelect();

  function onSubmit(values: GenerateQrCodeSchemaType) {
    let startDateTime: string | null = null;
    let expirationDateTime: string | null = null;
    if (values.emissionQty) {
      if (parseInt(values.emissionQty, 10) < 0) {
        toast.error('A quantidade de emissões não pode ser negativa.');

        return;
      }
    }
    if (values.startDate && values.expirationDate) {
      if (!CheckDateRange(values.startDate, values.expirationDate)) {
        toast.error('A data de expiração deve ser posterior à data de início.');

        return;
      }
    }
    if (values.startDate) {
      startDateTime = ConvertToISODateTime(values.startDate, values.startTime ?? '');
    }
    if (values.expirationDate) {
      expirationDateTime = ConvertToISODateTime(values.expirationDate, values.expirationTime ?? '');
    }

    const data: IQrCodeSettings = {
      issuesNumberLimit: parseInt(values.emissionQty ?? '', 10),
      startDateTime: startDateTime,
      expirationDateTime: expirationDateTime,
    };

    SetQrCodeSettings(data, {
      onSuccess: () => {
        toast.success('Configurações de QRCode aplicadas com sucesso!');
        setIsQRCodeSettings(false);
        queryClient.refetchQueries({ queryKey: [`id: ${id}`] });
      },
      onError: () => {
        toast.error('Erro ao aplicar configurações do QRCode!');
      },
    });
  }

  const startDateField = form.watch('startDate');
  const expirationDateField = form.watch('expirationDate');

  return (
    <div className="flex flex-col p-6">
      <div className="-mt-5">
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => setIsQRCodeSettings(false)}
        >
          <ChevronLeft className="mr-1 size-5" />
          Voltar
        </Button>
      </div>
      <div className="my-5">
        <p className="font-semibold text-slate-900">
          Defina o tempo disponível e a quantidade de emissões do seu QRCode!
        </p>
      </div>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          variants={slideUp}
          initial="hidden"
          animate="show"
        >
          <div className="grid w-full grid-cols-3 gap-4">
            <FormField
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-2">
                  <FormLabel>Data Início para Emissão</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        if (e.target.value == '') {
                          form.resetField('startDate');
                        } else {
                          const formattedValue = FormatBirthday(e.target.value);
                          field.onChange(formattedValue);
                        }
                      }}
                      placeholder="DD/MM/AAAA"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="startTime"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Horário Inicial</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={!startDateField}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSelect.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
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
              name="expirationDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-2">
                  <FormLabel>Data Final para Emissão</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        if (e.target.value == '') {
                          form.resetField('expirationDate');
                        } else {
                          const formattedValue = FormatBirthday(e.target.value);
                          field.onChange(formattedValue);
                        }
                      }}
                      placeholder="DD/MM/AAAA"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="expirationTime"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Horário Final</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={!expirationDateField}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSelect.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
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
              name="emissionQty"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-2">
                  <FormLabel>Quantidade de Emissões</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Digite uma quantidade" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3 lg:col-span-2 ">
              <FormLabel>CPFs permitidos para Emissões</FormLabel>
              <div className="flex flex-row items-end gap-4">
                <Input value={qrCodeData?.allowedDocuments?.length}></Input>

                <Button
                  onClick={() => downloadCsv(qrCodeData?.allowedDocuments ?? [])}
                  disabled={(qrCodeData?.allowedDocuments?.length ?? 0) === 0}
                  variant={'outline'}
                >
                  <Download />
                  Baixar
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-7 flex w-full flex-col lg:col-span-1">
            <Button variant="secondary" type="submit" isLoading={isLoading} disabled={isLoading}>
              <Check className="mr-1 size-5" />
              Salvar
            </Button>
          </div>
        </motion.form>
      </Form>
    </div>
  );
}
