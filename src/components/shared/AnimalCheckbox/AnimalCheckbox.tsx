import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, schema } from './schema';
import { FormInputCustom } from '../Input';
import { findAllAnimals } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SearchCheckIcon, TimerResetIcon } from 'lucide-react';

interface AnimalCheckboxProps {
  onSearch: (animals: PaginationResponse<Animal>) => void;
}
export default function AnimalCheckbox({ onSearch }: AnimalCheckboxProps) {
  const { axios } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: undefined,
    },
  });

  const onSubmit = async ({ nickname }: FormValues) => {
    const limit = 5;
    const data = await findAllAnimals(axios, { nickname, limit });
    onSearch(data);
  };
  const handleKeyUpEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      form.handleSubmit(onSubmit);
    }
  };
  const handleClickReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex md:grid-cols-5 gap-4">
          <div className="flex-grow p-2">
            <FormInputCustom
              control={form.control}
              label="Nombre"
              name="nickname"
              onKeyUp={handleKeyUpEnter}
            />
          </div>
          <div className="p-8">
            <Button type="submit">
              Buscar
              <SearchCheckIcon />
            </Button>
          </div>
          <div className="p-8">
            <Button onClick={handleClickReset}>
              Reiniciar
              <TimerResetIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
