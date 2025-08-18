'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
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
  FormComboboxCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';

import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { updateUser } from '@/services/hopeBackend/users';
import { FormValues, schema } from './schema';
import { ContainerForm } from '@/components/shared/Containers';
import optionDistrict from '@/components/private/admin/common/DataDistrict.json';

type EditorUserDialogProps = {
  user: User;
  onEdit?: () => void;
};

export function EditorUserDialog({ user, onEdit }: EditorUserDialogProps) {
  const { axios } = useAuth();
  const { updateUsers } = useUser();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.info?.username ?? '',
      firstName: user.info?.firstName ?? '',
      lastName: user.info?.lastName ?? '',
      email: user.info?.email ?? '',
      phone: user.info?.phone ?? '',
      address: user.info?.address ?? '',
      district: user.info?.district ?? '',
      rol:
        (user.info?.rol as 'admin' | 'volunteer' | 'veterinarian') ?? 'admin',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUser(axios, user.id, data);
      toast.success('Usuario actualizado');
      if (onEdit) onEdit();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error('Error al editar usuario');
      }
    } finally {
      updateUsers();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Editar">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifica los datos y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ContainerForm>
              <FormInputCustom
                control={form.control}
                label="Usuario publico"
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
                label="Correo"
                name="email"
                type="email"
              />
              <FormInputCustom
                control={form.control}
                label="Teléfono"
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
            </ContainerForm>
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
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
