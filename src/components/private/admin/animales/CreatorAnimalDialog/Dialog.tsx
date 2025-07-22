'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import {
  FormCheckboxCustom,
  FormFileInputCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';
import {
  createAnimal,
  uploadImageAnimal,
} from '@/services/hopeBackend/animals';

import { useAuth } from '@/context/AuthContext';
import { FormValues, schema } from './schema';
import { today } from '../common/schema';
import { useAnimal } from '@/context/AnimalContext';

type CreatorAnimalDialogProps = {
  onCreated?: () => void;
};

export function CreatorAnimalDialog({ onCreated }: CreatorAnimalDialogProps) {
  const { axios } = useAuth();
  const { updateAnimals } = useAnimal();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: '',
      status: 'in_observation',
      type: 'dog',
      breed: '',
      size: 'medium',
      sex: 'female',
      birthdate: '',
      descriptionHistory: '',
      isSterilized: false,
      image: undefined,
    },
  });

  const onSubmit = async ({ image, ...data }: FormValues) => {
    try {
      const { id } = await createAnimal(axios, data);

      toast.success(`Mascota #${id} guardada`);

      if (image) {
        const file = image?.item(0);
        if (file) {
          await uploadImageAnimal(axios, id, file);
        }
        toast.success(`Imagen de la mascota #${id} guardada`);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error('Ya existe un animal con ese nombre.');
        }
      }
    }
    form.reset();
    updateAnimals();
    setTimeout(() => {
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Animal
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Registrar Animal</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputCustom
                control={form.control}
                label="Nombre"
                name="nickname"
              />

              <FormSelectCustom
                control={form.control}
                name="status"
                label="Estado"
                options={[
                  { label: 'En observación', value: 'in_observation' },
                  { label: 'En adopción', value: 'in_adoption' },
                ]}
              />

              <FormSelectCustom
                control={form.control}
                name="type"
                label="Tipo"
                options={[
                  { label: 'Perro', value: 'dog' },
                  { label: 'Gato', value: 'cat' },
                ]}
              />

              <FormInputCustom
                control={form.control}
                label="Raza"
                name="breed"
              />

              <FormSelectCustom
                control={form.control}
                name="size"
                label="Tamaño"
                options={[
                  { label: 'Pequeño', value: 'small' },
                  { label: 'Mediano', value: 'medium' },
                  { label: 'Grande', value: 'large' },
                  { label: 'Gigante', value: 'giant' },
                ]}
              />
              <FormSelectCustom
                control={form.control}
                name="sex"
                label="Sexo"
                options={[
                  { label: 'Hembra', value: 'female' },
                  { label: 'Macho', value: 'male' },
                ]}
              />
              <FormInputCustom
                control={form.control}
                label="Fecha de nacimiento"
                name="birthdate"
                type="date"
                max={today}
              />
              <FormInputCustom
                control={form.control}
                label="Historia"
                name="descriptionHistory"
              />
              <FormCheckboxCustom
                control={form.control}
                name="isSterilized"
                label="¿Está esterilizado?"
                description="Marca esta opción si el animal ya fue esterilizado."
              />
              <FormFileInputCustom
                control={form.control}
                label="Imagen"
                name="image"
              />
            </div>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
