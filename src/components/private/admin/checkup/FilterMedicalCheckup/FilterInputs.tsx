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

type FilterInputMedicalCheckupProps = {
  onGetData: (data: FormValues) => void;
};

const defaultValues = {
  idAnimal: undefined,
  status: undefined,
};

export function FilterInputMedicalCheckup({
  onGetData,
}: FilterInputMedicalCheckupProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          <FormInputCustom
            control={form.control}
            type="number"
            label="Id mascota"
            name="animalId"
          />

          <FormSelectCustom
            control={form.control}
            name="status"
            label="Estado"
            options={[
              { label: 'Registrado', value: 'registered' },
              { label: 'En atencion', value: 'in_attention' },
              { label: 'Completado', value: 'completed' },
              { label: 'Cancelado', value: 'cancelled' },
            ]}
          />

          <div className="grid justify-center content-end">
            <Button type="submit">Buscar</Button>
          </div>
          <div className="grid justify-center content-end">
            <Button type="submit" onClick={handleClickReset}>
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
