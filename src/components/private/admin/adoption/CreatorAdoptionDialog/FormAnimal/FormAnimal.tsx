'use client';
import React, { useEffect } from 'react';
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
import { LucideArrowBigLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { findAllAnimals } from '@/services/hopeBackend/animals';

const statusAnimal: Record<StatusAnimal, string> = {
  in_adoption: 'En adopción',
  in_observation: 'En observación',
  adopted: 'Adoptado',
  dead: 'Muerto',
};

export function FormAnimal(
  index: number,
  { prevSlide, setSlide }: SlideActions,
  context: ContextProps
) {
  const { axios } = useAuth();

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

  const getAnimalsOptions = async (params?: FilterAnimalDto) => {
    const data = await findAllAnimals(axios, params);
    const { items } = data;
    let ckecks: CheckboxItem[] = [];
    if (items.length > 0) {
      ckecks = items.map(animal => {
        return {
          id: animal.id,
          image: animal.images[0],
          name: animal.nickname,
          description: `${statusAnimal[animal.status]} - ${
            animal.descriptionHistory
          }`,
        };
      });
    }
    setCheckOptions(ckecks);
  };

  const handleSearch = async ({ nickname }: { nickname?: string }) => {
    const limit = 5;
    const status: StatusAnimal[] = ['in_adoption', 'in_observation'];
    await getAnimalsOptions({
      nickname,
      limit,
      status,
    });
  };

  useEffect(() => {
    getAnimalsOptions({
      nickname: undefined,
      limit: 5,
      status: ['in_adoption', 'in_observation'],
    });
  }, []);

  return (
    <>
      <div className="flex w-full pb-4">
        <Button onClick={() => prevSlide()}>
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
