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

  // Observar todos los valores del formulario
  const adopterDNI = form.watch('adopterDNI');
  const adopterName = form.watch('adopterName');
  const animalId = form.watch('animalId');
  const nickname = form.watch('nickname');
  const status = form.watch('status');

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  const handleClickReset = () => {
    form.reset(defaultValues); // Resetea el formulario
    onGetData(defaultValues); // Limpia filtros en el componente padre
  };

  React.useEffect(() => {
    const handler = setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 500); // espera 500ms desde el último cambio

    return () => clearTimeout(handler); // limpia el timeout si cambia algo antes de los 500ms
  }, [adopterDNI, adopterName, animalId, nickname, status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
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
          <div className="flex justify-around content-end mt-auto mb-0 ">
            <Button type="button" onClick={handleClickReset}>
              <TimerResetIcon />
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
