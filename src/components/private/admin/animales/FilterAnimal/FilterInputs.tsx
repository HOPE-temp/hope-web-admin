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

export function FilterInputAnimal({ onGetData }: FilterInputAnimalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: undefined,
      status: undefined,
      adopterDNI: undefined,
      adopterName: undefined,
      animalId: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInputCustom
            control={form.control}
            label="Nombre"
            name="nickname"
          />

          <FormSelectCustom
            control={form.control}
            name="status"
            label="Estado"
            options={[
              { label: 'En adopción', value: 'in_adoption ' },
              { label: 'En observación', value: 'in_observation' },
              { label: 'Adoptado', value: 'adopted' },
              { label: 'Fallecido', value: 'dead' },
            ]}
          />

          <FormInputCustom
            control={form.control}
            label="DNI de adoptante"
            name="adopterDNI"
          />

          <FormInputCustom
            control={form.control}
            label="Nombre del adoptante"
            name="adopterName"
          />

          <FormInputCustom
            control={form.control}
            label="Id del animal"
            name="animalId"
            type="number"
          />
          <div className="grid justify-center content-end">
            <Button
              onClick={() => {
                form.reset({
                  nickname: undefined,
                  status: undefined,
                  adopterDNI: undefined,
                  adopterName: undefined,
                  animalId: undefined,
                });
              }}
            >
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
