'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

import { useAuth } from '@/context/AuthContext';
import { linkAnimalAdoption } from '@/services/hopeBackend/adoptions';
import { findAllAnimals } from '@/services/hopeBackend/animals';
import { FormValues, schema } from './schema';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import {
  CheckboxItem,
  FormTextareaCustom,
  DynamicCheckboxList,
} from '@/components/shared/Input';
import { AnimalSearch } from '@/components/shared/AnimalSearch';

interface Props {
  adoption: Adoption;
  onUpdated?: () => void;
}

const statusAnimal: Record<StatusAnimal, string> = {
  in_adoption: 'En adopción',
  in_observation: 'En observación',
  adopted: 'Adoptado',
  dead: 'Muerto',
};

export function LinkAnimalAdoptionDialog({ adoption, onUpdated }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);
  const [checkOptions, setCheckOptions] = React.useState<CheckboxItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      animalsIds: adoption.animalsTemp,
      reviewRequestNotes: adoption.reviewRequestNotes ?? '',
    },
  });

  const onSubmit = async ({ animalsIds, reviewRequestNotes }: FormValues) => {
    try {
      await linkAnimalAdoption(axios, adoption.id, {
        animalsIds: animalsIds,
        reviewRequestNotes,
      });
      toast.success(`Evaluacion de la solicitud ${adoption.id}`);
      onUpdated && onUpdated();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error(
            'El estado del animal debe ser "En adopción" ó "En observación"'
          );
        }
      }
    }
  };
  const getAnimalsOptions = async (params?: FilterAnimalDto) => {
    const data = await findAllAnimals(axios, { ...params, limit: 5 });
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
    const status: StatusAnimal[] = ['in_adoption', 'in_observation'];
    await getAnimalsOptions({
      nickname,
      status,
    });
  };

  useEffect(() => {
    if (open) {
      //oreden importante
      getAnimalsOptions({
        animalId: adoption.animalsTemp,
      });
      form.reset({
        animalsIds: adoption.animalsTemp,
        reviewRequestNotes: adoption.reviewRequestNotes ?? '',
      });
    }
  }, [open, adoption.animalsTemp]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Vincular animal">
          <Paperclip className="h-5 w-5 text-black" />
        </button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Vincular Animal con Adopción
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-scroll">
          <AnimalSearch onSearch={handleSearch} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1  gap-4 mt-2">
                <DynamicCheckboxList
                  control={form.control}
                  title="Animal"
                  name="animalsIds"
                  items={checkOptions}
                />
                <FormTextareaCustom
                  control={form.control}
                  rows={5}
                  label="Notas de Solicitud"
                  name="reviewRequestNotes"
                />
              </div>

              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
                    Cancelar
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Aceptar
                </button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
