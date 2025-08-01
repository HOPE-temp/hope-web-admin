'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { FormValues, schema } from './schema';
import { FormInputCustom } from '@/components/shared/Input/InputCustom';
import { SearchCheckIcon, TimerResetIcon } from 'lucide-react';

export interface FormValuesFilterInputAdopter extends FormValues {}

type FilterInputAdopterProps = {
  onGetData: (data: FormValues) => void;
};

const defaultValues = {
  documentNumber: undefined,
  firstName: undefined,
  lastName: undefined,
};

export function FilterInputAdopter({ onGetData }: FilterInputAdopterProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  const handleClickReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          <FormInputCustom
            control={form.control}
            label="DNI"
            name="documentNumber"
          />
          <FormInputCustom
            control={form.control}
            label="Nombre"
            name="firstName"
          />
          <FormInputCustom
            control={form.control}
            label="Apellido"
            name="lastName"
          />
          <div className="flex justify-around content-end mt-auto mb-0">
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
