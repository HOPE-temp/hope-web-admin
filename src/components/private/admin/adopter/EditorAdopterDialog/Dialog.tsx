'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { FormValues, schema } from './schema';
import {
  FormComboboxCustom,
  FormInputCustom,
  FormSelectSearchableCustom,
} from '@/components/shared/Input';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { updateAdopter } from '@/services/hopeBackend/adopters';
import { useAuth } from '@/context/AuthContext';

//JSON
import optionCountries from '../common/DataCountry.json';
import optionDistrict from '../common/DataDistrict.json';

type Props = {
  onEdit?: () => void;
  adopter: Adopter;
};

export function EditorAdoptersDialog({ adopter, onEdit }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: adopter.firstName ?? undefined,
      lastName: adopter.lastName ?? undefined,
      documentNumber: adopter.documentNumber ?? undefined,
      phone: adopter.phone ?? undefined,
      email: adopter.email ?? undefined,
      district: adopter.district ?? undefined,
      address: adopter.address ?? undefined,
      nationality: adopter.nationality ?? undefined,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        firstName: adopter.firstName ?? undefined,
        lastName: adopter.lastName ?? undefined,
        documentNumber: adopter.documentNumber ?? undefined,
        phone: adopter.phone ?? undefined,
        email: adopter.email ?? undefined,
        district: adopter.district ?? undefined,
        address: adopter.address ?? undefined,
        nationality: adopter.nationality ?? undefined,
      });
    }
  }, [open, adopter]);

  const onSubmit = async ({ documentNumber, ...data }: FormValues) => {
    try {
      await updateAdopter(axios, adopter.id, data);
      onEdit && onEdit();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error('Ya existe un adopteante con ese nombre.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar Adopter</DialogTitle>
          <DialogDescription>
            Modifica los datos del adopter y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-scroll sm:overflow-auto">
              <FormInputCustom
                control={form.control}
                label="Nombre"
                name="firstName"
              />
              <FormInputCustom
                control={form.control}
                label="Apellido"
                name="lastName"
              />
              <FormComboboxCustom
                control={form.control}
                label="Nacionalidad"
                name="nationality"
                options={optionCountries}
              />
              <FormInputCustom
                control={form.control}
                label="DNI"
                name="documentNumber"
                disabled
              />
              <FormInputCustom
                control={form.control}
                type="email"
                label="Email"
                name="email"
              />
              <FormInputCustom
                control={form.control}
                label="Celular"
                name="phone"
              />
              <FormComboboxCustom
                control={form.control}
                label="Distrito"
                name="district"
                options={optionDistrict}
              />
              <FormInputCustom
                control={form.control}
                label="Dirección"
                name="address"
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
