'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { FormValues, schema } from './schema';
import {
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';
import { SearchCheckIcon, TimerResetIcon } from 'lucide-react';

type FilterInputAdoptionProps = {
  onGetData: (data: FormValues) => void;
};

const defaultValues = {
  idAdopter: undefined,
  statusRequest: undefined,
  statusResult: undefined,
  documentNumber: undefined,
};

export function FilterInputAdoption({ onGetData }: FilterInputAdoptionProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  const handleKeyUpEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(ev.key);
    if (ev.key === 'Enter') {
      form.handleSubmit(onSubmit);
    }
  };

  const handleClickReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  gap-4">
          <FormInputCustom
            control={form.control}
            type="number"
            label="Id adoptante"
            name="idAdopter"
            onKeyUp={handleKeyUpEnter}
            onBlur={() => form.handleSubmit(onSubmit)()}
          />

          <FormSelectCustom
            control={form.control}
            name="statusRequest"
            label="Solicitud de adopción"
            options={[
              { label: 'Creado', value: 'created' },
              { label: 'Apto', value: 'suitable' },
              { label: 'Con animal', value: 'selected_animal' },
              { label: 'Cancelado', value: 'cancelled' },
              { label: 'Completado', value: 'adoption_completed' },
            ]}
            onKeyUp={handleKeyUpEnter}
            onBlur={() => form.handleSubmit(onSubmit)()}
          />

          <FormSelectCustom
            control={form.control}
            label="Resultado"
            name="statusResult"
            options={[
              { label: 'No evaluado', value: 'not_evaluated' },
              { label: 'Aprobado', value: 'approved' },
              { label: 'Rechazado', value: 'rejected' },
              { label: 'Banneado', value: 'banned' },
            ]}
            onKeyUp={handleKeyUpEnter}
            onBlur={() => form.handleSubmit(onSubmit)()}
          />

          <FormInputCustom
            control={form.control}
            label="DNI"
            name="documentNumber"
            onKeyUp={handleKeyUpEnter}
            onBlur={() => form.handleSubmit(onSubmit)()}
          />
          <div className="flex justify-around content-end mt-auto mb-0 ">
            <Button type="submit">
              <SearchCheckIcon />
              Buscar
            </Button>
            <Button type="submit" onClick={handleClickReset}>
              <TimerResetIcon />
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
