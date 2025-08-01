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
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';

import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { createUser } from '@/services/hopeBackend/users';
import { FormValues, schema } from './schema';

type CreatorUserDialogProps = {
  onCreated?: () => void;
};

export function CreatorUserDialog({ onCreated }: CreatorUserDialogProps) {
  const { axios } = useAuth();
  const { updateUsers } = useUser();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      documentNumber: '',
      location: '',
      rol: 'admin',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createUser(axios, data);
      toast.success(`Usuario ${data.username} creado`);
      if (onCreated) onCreated();
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error('Ya existe un usuario con ese correo o usuario.');
        } else {
          toast.error('Error al crear usuario.');
        }
      }
    }
    form.reset();
    updateUsers();
    setTimeout(() => {
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Registrar Usuario</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo usuario.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputCustom
                control={form.control}
                label="Usuario"
                name="username"
              />
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
              <FormInputCustom
                control={form.control}
                label="Contraseña"
                name="password"
                type="password"
              />
              <FormInputCustom
                control={form.control}
                label="Correo"
                name="email"
                type="email"
              />
              <FormInputCustom
                control={form.control}
                label="Teléfono"
                name="phone"
              />
              <FormInputCustom
                control={form.control}
                label="Dirección"
                name="address"
              />
              <FormInputCustom
                control={form.control}
                label="Número de documento"
                name="documentNumber"
              />
              <FormInputCustom
                control={form.control}
                label="Ubicación"
                name="location"
              />
              <FormSelectCustom
                control={form.control}
                label="Rol"
                name="rol"
                options={[
                  { label: 'Administrador', value: 'admin' },
                  { label: 'Voluntario', value: 'volunteer' },
                  { label: 'Veterinario', value: 'veterinarian' },
                ]}
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