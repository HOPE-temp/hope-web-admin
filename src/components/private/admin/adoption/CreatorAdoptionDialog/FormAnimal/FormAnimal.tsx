'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AnimalSearch } from '@/components/shared/AnimalSearch';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SlideActions } from '@/components/shared/Carrusel';

import { FormValues, schema } from './schema';

import { ContextProps } from '..';

import {
  CheckboxItem,
  DynamicCheckboxObjetList,
} from '@/components/shared/Input';
import { ArrowBigLeftDash, ArrowLeft, LucideArrowBigLeft } from 'lucide-react';

export function FormAnimal(
  index: number,
  { prevSlide, setSlide }: SlideActions,
  context: ContextProps
) {
  const [checkOptions, setCheckOptions] = React.useState<CheckboxItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      animals: undefined,
    },
  });
  const onSubmit = async ({ animals }: FormValues) => {
    context.setAnimals && context.setAnimals(animals);
    setSlide(0);
  };

  const handleSearch = (data: PaginationResponse<Animal>) => {
    const { items } = data;
    let ckecks: CheckboxItem[] = [];
    if (items.length > 0) {
      ckecks = items.map(animal => {
        return {
          id: animal.id,
          image: animal.images[0],
          name: animal.nickname,
          description: animal.descriptionHistory,
        };
      });
    }
    setCheckOptions(ckecks);
  };

  return (
    <>
      <div className="flex w-full pb-4">
        <Button onClick={prevSlide}>
          <LucideArrowBigLeft />
          Atrás
        </Button>
      </div>
      <AnimalSearch onSearch={handleSearch} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <DynamicCheckboxObjetList
              control={form.control}
              title="Animal"
              name="animals"
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
