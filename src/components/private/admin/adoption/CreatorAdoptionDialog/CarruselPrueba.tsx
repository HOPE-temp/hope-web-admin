'use client';
import React, { useState } from 'react';
import { CarouselDinamic } from '@/components/shared/Carrusel';
import { FormAnimal } from './FormAnimal/FormAnimal';
import { CheckboxItem } from '@/components/shared/Input';
import { FormAdopter } from './FormAdopter/FormAdopter';
import { FormCreatedAdoption } from './FormCreatedAdoption/FormCreatedAdoption';

export function CarruselPrueba() {
  const [animals, setAnimals] = useState<CheckboxItem[]>([]);
  const [adopter, setAdopter] = useState<Partial<Adopter>>();
  const [open, setOpen] = useState<boolean>(false);
  const onCreated = () => {};
  return (
    <CarouselDinamic
      renders={[FormCreatedAdoption, FormAnimal, FormAdopter]}
      context={{
        animals,
        setAnimals,
        adopter,
        setAdopter,
        onCreated,
        open,
        setOpen,
      }}
    />
  );
}
