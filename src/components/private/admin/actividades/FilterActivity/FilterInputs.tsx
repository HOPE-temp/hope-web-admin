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

  // Función que procesa los valores actuales para eliminar campos vacíos y llama a onGetData con los filtros activos
  const applyFiltersRealTime = (currentValues: FilterActivityValues) => {
    // Reorganiza los valores (en este caso, los mismos)
    const processedValues = {
      ...currentValues,
      finished: currentValues.finished,
      admin: currentValues.admin,
    };

    // Filtra claves cuyos valores no sean undefined ni cadena vacía
    const filteredData = Object.entries(processedValues)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Llama al callback con solo los filtros que tienen valor
    onGetData(filteredData as FilterActivityValues);
  };

  // Observar cambios en los campos para poder filtrar en tiempo real
  const searchValue = form.watch('title');
  const finishedValue = form.watch('finished');
  const adminValue = form.watch('admin');

  // Estado para hacer "debounce" de la búsqueda (evitar llamar muy seguido mientras se escribe)
  const [debouncedSearchValue, setDebouncedSearchValue] =
    React.useState(searchValue);

  // Efecto que espera 500ms desde el último cambio en searchValue para actualizar debouncedSearchValue
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(timer); // Limpiar timeout si cambia antes de 500ms
  }, [searchValue]);

  // Cuando cambia el valor con debounce, o cualquiera de los checkboxes, se llaman los filtros en tiempo real
  React.useEffect(() => {
    applyFiltersRealTime({
      title: debouncedSearchValue,
      finished: finishedValue,
      admin: adminValue,
    });
  }, [debouncedSearchValue, finishedValue, adminValue]);

  // Función que se ejecuta cuando se envía el formulario de manera explícita (ej. al presionar Enter o botón submit)
  // Hace el mismo filtrado para eliminar campos vacíos y llama a onGetData
  const onSubmit = async (data: FilterActivityValues) => {
    const processedData = {
      ...data,
      finished: data.finished,
      admin: data.admin,
    };

    const filteredData = Object.entries(processedData)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onGetData(filteredData as FilterActivityValues);
  };

  // Función para resetear el formulario a los valores por defecto y limpiar filtros
  const handleClickReset = () => {
    form.reset(defaultValues); // Resetea el formulario
    onGetData(defaultValues); // Limpia filtros en el componente padre
  };

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

          {/* Checkbox para filtrar actividades finalizadas */}
          <FormCheckboxCustom
            control={form.control}
            name="finished"
            label="¿Esta finalizado?"
            description="Ya finalizó."
          />

          {/* Checkbox para filtrar actividades solo para admin */}
          <FormCheckboxCustom
            control={form.control}
            name="admin"
            label="Es para administrador"
            description="Solo el administrador podrá finalizarlo."
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
