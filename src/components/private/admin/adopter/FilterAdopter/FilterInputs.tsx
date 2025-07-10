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

type FilterInputAdopterProps = {
  onGetData: (data: FormValues) => void;
};

const defaultValues = {
  idAdopter: undefined,
  statusRequest: undefined,
  statusResult: undefined,
  documentNumber: undefined,
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          <FormInputCustom
            control={form.control}
            label="DNI"
            name="documentNumber"
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
