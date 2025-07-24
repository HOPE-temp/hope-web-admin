'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

import { FilterUserValues, filterUserSchema } from './schema';
import {
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';

type FilterInputUserProps = {
  onGetData: (data: FilterUserValues) => void;
  table?: any;
};

const defaultValues: FilterUserValues = {
  search: '',
  rol: undefined,
};

export function FilterInputs({ onGetData, table }: FilterInputUserProps) {
  const form = useForm<FilterUserValues>({
    resolver: zodResolver(filterUserSchema),
    defaultValues,
  });

  const applyFiltersRealTime = (currentValues: FilterUserValues) => {
    const filteredData = Object.entries(currentValues)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('Filtros aplicados en tiempo real:', filteredData);
    onGetData(filteredData as FilterUserValues);
  };

  const searchValue = form.watch('search');
  const rolValue = form.watch('rol');

  const [debouncedSearchValue, setDebouncedSearchValue] =
    React.useState(searchValue);

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
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('Datos filtrados enviados:', filteredData);
    onGetData(filteredData as FilterUserValues);
  };

  const handleClickReset = () => {
    form.reset(defaultValues);
    console.log('Filtros reseteados');
    onGetData(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 gap-4 items-end">
          <FormInputCustom
            control={form.control}
            label="Buscar"
            name="search"
            placeholder="Escribe para filtrar usuarios..."
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
          <div className="hidden md:block"></div>
          <div className="hidden 2xl:block"></div>
          <div className="hidden 2xl:block"></div>

          <div className="flex gap-2 justify-end items-center col-span-1 md:col-span-1 2xl:col-span-1">
            <Button type="button" onClick={handleClickReset}>
              Resetear
            </Button>

            {table && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" type="button">
                    Columnas <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column: any) => column.getCanHide())
                    .map((column: any) => {
                      const columnLabels: Record<string, string> = {
                        id: 'ID',
                        Avatar: 'Avatar',
                        Nombre: 'Nombre',
                        Apellido: 'Apellido',
                        Email: 'Email',
                        Telefono: 'Teléfono',
                        Usuario: 'Usuario',
                        DNI: 'DNI',
                        Rol: 'Rol',
                        Dirección: 'Dirección',
                        Ubicación: 'Ubicación',
                        Creado: 'Creado',
                      };

                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={value =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {columnLabels[column.id] || column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
