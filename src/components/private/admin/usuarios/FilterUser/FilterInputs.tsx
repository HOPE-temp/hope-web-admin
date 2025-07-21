'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { FilterUserValues, filterUserSchema } from './schema';
import {
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';

type FilterInputUserProps = {
  onGetData: (data: FilterUserValues) => void;
};

const defaultValues: FilterUserValues = {
  search: "",
  rol: undefined,
};

export function FilterInputs({ onGetData }: FilterInputUserProps) {
  const form = useForm<FilterUserValues>({
    resolver: zodResolver(filterUserSchema),
    defaultValues,
  });

  const applyFiltersRealTime = (currentValues: FilterUserValues) => {
    const filteredData = Object.entries(currentValues)
      .filter(([_, value]) => value !== undefined && value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    console.log('Filtros aplicados en tiempo real:', filteredData);
    onGetData(filteredData as FilterUserValues);
  };

  const searchValue = form.watch('search');
  const rolValue = form.watch('rol');

  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState(searchValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  React.useEffect(() => {
    
    applyFiltersRealTime({ search: debouncedSearchValue, rol: rolValue });
  }, [debouncedSearchValue, rolValue]);

  const onSubmit = async (data: FilterUserValues) => {
    console.log('Datos del filtro enviados:', data);
    
    const filteredData = Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    console.log('Datos filtrados enviados (solo frontend):', filteredData);
    onGetData(filteredData as FilterUserValues);
  };

  const handleKeyUpEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(ev.key);
    if (ev.key === 'Enter') {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleClickReset = () => {
    form.reset(defaultValues);
    console.log('Filtros reseteados');
    onGetData(defaultValues); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-6 gap-4">
          <FormInputCustom
            control={form.control}
            label="Buscar"
            name="search"
            placeholder="Escribe para filtrar usuarios..."
            onKeyUp={handleKeyUpEnter}
          />

          <FormSelectCustom
            control={form.control}
            name="rol"
            label="Rol"
            options={[
              { label: 'Administrador', value: 'admin' },
              { label: 'Voluntario', value: 'volunteer' },
              { label: 'Veterinario', value: 'veterinarian' },
            ]}
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
