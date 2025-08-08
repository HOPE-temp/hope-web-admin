'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Upload, Link, Calendar } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useActivity } from '@/context/ActivityContext';
import { createActivity } from '@/services/hopeBackend/activities';
import { useAuth } from '@/context/AuthContext';

import { schema, FormValues } from './schema';
import { ContainerForm } from '@/components/shared/Containers';
import { FormCheckboxCustom, FormInputCustom } from '@/components/shared/Input';

type Props = {};

const defaultValues = {
  title: undefined,
  resourceUrl: undefined,
  scheduleStartAt: undefined,
  scheduleEndAt: undefined,
  admin: false,
};

export function ActivitiesCreateDialog({}: Props) {
  const { axios } = useAuth();
  const { refreshActivities } = useActivity();
  const [open, setOpen] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        title: data.title.trim(),
        resourceUrl: data.resourceUrl?.trim() || undefined,
        scheduleStartAt: data.scheduleStartAt || undefined,
        scheduleEndAt: data.scheduleEndAt || undefined,
        admin: data.admin,
      };

      await createActivity(axios, payload);
      await refreshActivities();

      setFormSuccess('Actividad creada correctamente');
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setFormSuccess(null);
      }, 1500);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Error desconocido';
      form.setError('root', { message: errorMessage });
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset(defaultValues);
      setFormSuccess(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Actividad
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Crear Nueva Actividad</DialogTitle>
          <DialogDescription>
            Completa la información para crear una nueva actividad. Los campos
            marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ContainerForm>
              <div className="border rounded-lg p-6 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información Básica</h3>
                  <FormInputCustom
                    control={form.control}
                    name="title"
                    label="Titulo"
                    placeholder="Nombre de la actividad"
                  />
                  <FormCheckboxCustom
                    control={form.control}
                    name="admin"
                    label="Actividad de administración"
                    description="Solo los administradores podrán marcar esta
                    actividad como finalizada"
                  />
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <h3 className="text-lg font-medium">Recursos Multimedia</h3>
                  </div>
                  <FormInputCustom
                    control={form.control}
                    name="resourceUrl"
                    label="URL de Recurso"
                    description="Enlace a redes sociales, páginas web, seguimientos, etc."
                  />
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <h3 className="text-lg font-medium">Programación</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInputCustom
                      control={form.control}
                      name="scheduleStartAt"
                      type="datetime-local"
                      label="Fecha y Hora de Inicio"
                      description="Cuándo debe comenzar la actividad."
                    />
                    <FormInputCustom
                      control={form.control}
                      name="scheduleEndAt"
                      type="datetime-local"
                      label="Fecha y Hora de Fin"
                      description="Cuándo debe finalizar la actividad."
                    />
                  </div>
                </div>
              </div>
            </ContainerForm>

            {form.formState.errors.root && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            {formSuccess && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
                {formSuccess}
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creando...' : 'Crear Actividad'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
