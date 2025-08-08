'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form'; // Librería para manejo de formularios
import { zodResolver } from '@hookform/resolvers/zod'; // Adaptador para usar esquema Zod como validador
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { FilterActivityValues, filterActivitySchema } from './schema'; // Tipos y validación Zod
import {
  FormCheckboxCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom'; // Inputs personalizados para el formulario

// Props que recibe el componente:
// onGetData: función que recibe los datos filtrados para hacer algo con ellos (ejemplo: pedir datos o actualizar lista)
type FilterInputActivityProps = {
  onGetData: (data: FilterActivityValues) => void;
};

// Valores por defecto del formulario (todos undefined inicialmente)
const defaultValues: FilterActivityValues = {
  title: undefined,
  finished: undefined,
  admin: undefined,
};

export function FilterInputs({ onGetData }: FilterInputActivityProps) {
  // Crear el formulario usando react-hook-form con esquema de validación Zod y valores iniciales
  const form = useForm<FilterActivityValues>({
    resolver: zodResolver(filterActivitySchema),
    defaultValues,
  });

  // Observar todos los valores del formulario
  const title = form.watch('title');
  const finished = form.watch('finished');
  const admin = form.watch('admin');

  const onSubmit = async (data: FilterActivityValues) => {
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
  }, [title, finished, admin]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 gap-4">
          {/* Input de texto para buscar por título */}
          <FormInputCustom
            control={form.control}
            label="Buscar"
            name="title"
            placeholder="Escribe para filtrar actividades..."
          />
          <FormSelectCustom
            control={form.control}
            name="finished"
            label="¿Esta finalizado?"
            placeholder="Todos"
            options={[
              { label: 'Si', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
          />

          <FormSelectCustom
            control={form.control}
            name="admin"
            label="Es para administrador"
            placeholder="Todos"
            options={[
              { label: 'Si', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
          />

          {/* Botón para resetear formularios */}
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
