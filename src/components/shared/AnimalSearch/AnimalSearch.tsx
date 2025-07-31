'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, schema } from './schema';
import { FormInputCustom } from '../Input';
import { findAllAnimals } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SearchCheckIcon, TimerResetIcon } from 'lucide-react';

interface AnimalSearchProps {
  onSearch: (animals: PaginationResponse<Animal>) => void;
}
export function AnimalSearch({ onSearch }: AnimalSearchProps) {
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

  useEffect(() => {
    onSubmit({ nickname: undefined });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-2">
            <FormInputCustom
              control={form.control}
              label="Nombre"
              name="nickname"
              onKeyUp={handleKeyUpEnter}
            />
          </div>
          <div className="flex justify-around mt-auto mb-0">
            <Button type="submit">
              <SearchCheckIcon />
              Buscar
            </Button>
            <Button onClick={handleClickReset}>
              <TimerResetIcon />
              Reiniciar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
