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
  FormInputCustom,
  FormSelectSearchableCustom,
} from '@/components/shared/Input/InputCustom';
import { createAdopters } from '@/services/hopeBackend/adopters';

import { useAuth } from '@/context/AuthContext';

//schema
import { FormValues, schema } from './schema';
import { useAdopter } from '@/context/AdopterContext';

//JSON
import optionCountries from './DataCountry.json';
import optionDistrict from './DataDistrict.json';

type CreatorAdopterDialogProps = {
  onCreated?: (id: number) => void;
};
const defaultValues = {
  firstName: undefined,
  lastName: undefined,
  documentNumber: undefined,
  phone: undefined,
  district: undefined,
  address: undefined,
  nationality: undefined,
};
export function CreatorAdopterDialog({ onCreated }: CreatorAdopterDialogProps) {
  const { axios } = useAuth();
  const { updateAdopters } = useAdopter();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    const adoption = await createAdopters(axios, data);
    if (adoption) {
      toast.success(`Mascota #${adoption.id} guardada`);

      form.reset();
      onCreated && onCreated(adoption.id);
      updateAdopters();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Adopter
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Registrar Adopter</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 overflow-scroll sm:overflow-auto max-h-96 sm:max-h-max md:overflow-auto md:grid-cols-2 gap-4 p-1">
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
              <FormSelectSearchableCustom
                control={form.control}
                label="Nacionalidad"
                name="nationality"
                options={optionCountries}
              />
              <FormInputCustom
                control={form.control}
                label="DNI o CE"
                name="documentNumber"
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
              <FormSelectSearchableCustom
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
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-2"
              >
                {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
