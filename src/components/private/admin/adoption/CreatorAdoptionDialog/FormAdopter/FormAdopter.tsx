'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SlideActions } from '@/components/shared/Carrusel';

import { FormValues, schema } from './schema';

import { ContextProps } from '..';

import {
  FilterInputAdopter,
  FormValuesFilterInputAdopter,
} from '@/components/shared/FilterAdopter';
import { findAllAdopters } from '@/services/hopeBackend/adopters';
import { useAuth } from '@/context/AuthContext';
import { InputAdopter, InputRadioAdopterList } from './InputRadioAdopterList';
import { LucideArrowBigLeft } from 'lucide-react';

export function FormAdopter(
  index: number,
  { prevSlide, setSlide }: SlideActions,
  context: ContextProps
) {
  const { axios } = useAuth();
  const [checkOptions, setCheckOptions] = React.useState<InputAdopter[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      adopter: undefined,
    },
  });
  const onSubmit = async ({ adopter }: FormValues) => {
    context.setAdopter(adopter);
    prevSlide();
  };

  const handleSearch = async (data?: FormValuesFilterInputAdopter) => {
    const res = await findAllAdopters(axios, data);
    if (!res) {
      return;
    }
    const { items } = res;
    let ckecks: InputAdopter[] = [];
    if (items.length > 0) {
      ckecks = items.map(
        ({
          id,
          firstName,
          lastName,
          documentNumber,
          evaluations,
          isBanned,
        }) => {
          return {
            id,
            firstName,
            lastName,
            documentNumber,
            evaluations,
            isBanned,
          };
        }
      );
    }
    setCheckOptions(ckecks);
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div className="flex w-full pb-4">
        <Button onClick={() => prevSlide()} variant={'default'}>
          <LucideArrowBigLeft />
          Atrás
        </Button>
      </div>
      <FilterInputAdopter onGetData={handleSearch} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-h-[10wh]"
        >
          <div className="grid grid-cols-1 gap-4 mt-6">
            <InputRadioAdopterList
              control={form.control}
              title="Adoptantes"
              name="adopter"
              items={checkOptions}
            />
          </div>
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Seleccionar...' : 'Seleccionar'}
          </Button>
        </form>
      </Form>
    </>
  );
}
