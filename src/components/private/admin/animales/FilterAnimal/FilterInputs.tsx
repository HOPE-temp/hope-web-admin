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

type FilterInputAnimalProps = {
  onGetData: (data: FormValues) => void;
};

const defaultValues = {
  nickname: undefined,
  status: undefined,
  adopterDNI: undefined,
  adopterName: undefined,
  animalId: undefined,
};

export function FilterInputAnimal({ onGetData }: FilterInputAnimalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  const handleKeyUpEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleClickReset = () => {
    form.reset();
    onGetData(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          <FormInputCustom
            control={form.control}
            label="Nombre"
            name="nickname"
            onKeyUp={handleKeyUpEnter}
          />

          <FormSelectCustom
            control={form.control}
            name="status"
            label="Estado"
            options={[
              { label: 'En adopción', value: 'in_adoption' },
              { label: 'En observación', value: 'in_observation' },
              { label: 'Adoptado', value: 'adopted' },
              { label: 'Fallecido', value: 'dead' },
            ]}
          />

          <FormInputCustom
            control={form.control}
            label="DNI de adoptante"
            name="adopterDNI"
            onKeyUp={handleKeyUpEnter}
          />

          <FormInputCustom
            control={form.control}
            label="Nombre del adoptante"
            name="adopterName"
            onKeyUp={handleKeyUpEnter}
          />

          <FormInputCustom
            control={form.control}
            label="Id del animal"
            name="animalId"
            type="number"
            onKeyUp={handleKeyUpEnter}
          />
          <div className="grid justify-center content-end">
            <Button type="submit">Buscar</Button>
          </div>
          <div className="grid justify-center content-end">
            <Button type="button" onClick={handleClickReset}>
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
