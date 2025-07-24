'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { FilterActivityValues, filterActivitySchema } from './schema';
import {
  FormCheckboxCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';

type FilterInputActivityProps = {
  onGetData: (data: FilterActivityValues) => void;
};

const defaultValues: FilterActivityValues = {
  search: '',
  finished: false,
  admin: false,
};

export function FilterInputs({ onGetData }: FilterInputActivityProps) {
  const form = useForm<FilterActivityValues>({
    resolver: zodResolver(filterActivitySchema),
    defaultValues,
  });

  const applyFiltersRealTime = (currentValues: FilterActivityValues) => {
    const processedValues = {
      ...currentValues,
      finished: currentValues.finished,
      admin: currentValues.admin,
    };

    const filteredData = Object.entries(processedValues)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log(
      'Filtros de actividades aplicados en tiempo real:',
      filteredData
    );
    onGetData(filteredData as FilterActivityValues);
  };

  const searchValue = form.watch('search');
  const finishedValue = form.watch('finished');
  const adminValue = form.watch('admin');
  const [debouncedSearchValue, setDebouncedSearchValue] =
    React.useState(searchValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  React.useEffect(() => {
    applyFiltersRealTime({
      search: debouncedSearchValue,
      finished: finishedValue,
      admin: adminValue,
    });
  }, [debouncedSearchValue, finishedValue, adminValue]);

  const onSubmit = async (data: FilterActivityValues) => {
    console.log('Datos del filtro de actividades enviados:', data);
    const processedData = {
      ...data,
      finished: data.finished,
      admin: data.admin,
    };

    const filteredData = Object.entries(processedData)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('Datos filtrados enviados (actividades):', filteredData);
    onGetData(filteredData as FilterActivityValues);
  };

  const handleKeyUpEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(ev.key);
    if (ev.key === 'Enter') {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleClickReset = () => {
    form.reset(defaultValues);
    console.log('Filtros de actividades reseteados');
    onGetData(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 gap-4">
          <FormInputCustom
            control={form.control}
            label="Buscar"
            name="search"
            placeholder="Escribe para filtrar actividades..."
            onKeyUp={handleKeyUpEnter}
          />
          <FormCheckboxCustom
            control={form.control}
            name="finished"
            label="¿Esta finalizado?"
            description="Ya finalizó."
          />
          <FormCheckboxCustom
            control={form.control}
            name="admin"
            label="Es para administrador"
            description="Solo el administrador podra finarlizarlo."
          />

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
