'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
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
import { FormValues, schema, today } from './schema';
import {
  FormCheckboxCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { updateAnimal } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';

type Props = {
  onEdit?: () => void;
  animal: Animal;
};

export function EditorAnimalsDialog({ animal, onEdit }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: animal.nickname ?? '',
      breed: animal.breed ?? '',
      size: (['small', 'medium', 'large'].includes(animal.size as string)
        ? animal.size
        : 'medium') as 'small' | 'medium' | 'large',
      sex: (['male', 'female'].includes(animal.sex as string)
        ? animal.sex
        : 'female') as 'male' | 'female',
      birthdate: animal.birthdate ?? '',
      descriptionHistory: animal.descriptionHistory ?? '',
      isSterilized: animal.isSterilized ?? false,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        nickname: animal.nickname ?? '',
        breed: animal.breed ?? '',
        size: (['small', 'medium', 'large'].includes(animal.size as string)
          ? animal.size
          : 'medium') as 'small' | 'medium' | 'large',
        sex: (['male', 'female'].includes(animal.sex as string)
          ? animal.sex
          : 'female') as 'male' | 'female',
        birthdate: animal.birthdate ?? '',
        descriptionHistory: animal.descriptionHistory ?? '',
        isSterilized: animal.isSterilized ?? false,
      });
    }
  }, [open, animal]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateAnimal(axios, animal.id, data);
      onEdit && onEdit();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error('Ya existe un animal con ese nombre.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar Animal</DialogTitle>
          <DialogDescription>
            Modifica los datos del animal y guarda los cambios.
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? 'Guardando...'
                  : 'Guardar cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
