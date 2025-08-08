'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Link, Calendar, Save } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { updateActivity } from '@/services/hopeBackend/activities';
import { useAuth } from '@/context/AuthContext';
import { useActivity } from '@/context/ActivityContext';

import { schema, FormValues } from './schema';
import { FormCheckboxCustom, FormInputCustom } from '@/components/shared/Input';
import { ContainerForm } from '@/components/shared/Containers';

type Props = {
  activity: Activity;
  onEdit: () => void;
};

const formatDateForInput = (dateString: string | Date | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

export function ActivitiesEditDialog({ activity, onEdit }: Props) {
  const { axios } = useAuth();
  const { refreshActivities } = useActivity();
  const [open, setOpen] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: activity.title || '',
      resourceUrl: activity.resourceUrl || '',
      scheduleStartAt: formatDateForInput(activity.scheduleStartAt),
      scheduleEndAt: formatDateForInput(activity.scheduleEndAt),
      admin: activity.admin,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        title: activity.title || '',
        resourceUrl: activity.resourceUrl || '',
        scheduleStartAt: formatDateForInput(activity.scheduleStartAt),
        scheduleEndAt: formatDateForInput(activity.scheduleEndAt),
        admin: activity.admin,
      });
      setFormSuccess(null);
    }
  }, [open, activity, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        title: data.title,
        resourceUrl: data.resourceUrl || undefined,
        scheduleStartAt: data.scheduleStartAt || undefined,
        scheduleEndAt: data.scheduleEndAt || undefined,
        admin: data.admin,
      };

      await updateActivity(axios, activity.id, payload);
      await refreshActivities();

      onEdit && onEdit();
      setFormSuccess('Actividad actualizada correctamente');
      setTimeout(() => {
        setOpen(false);
        setFormSuccess(null);
      }, 1500);
    } catch (err: any) {
      console.error('Error updating activity:', err);

      let errorMessage = 'Error al actualizar actividad';

      try {
        if (err.response?.data?.message) {
          const backendMessage = err.response.data.message;
          if (Array.isArray(backendMessage)) {
            errorMessage = backendMessage.join(', ');
          } else {
            errorMessage = backendMessage;
          }
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        }
      } catch (parseError) {
        console.error('Error parsing backend message:', parseError);
      }

      form.setError('root', { message: errorMessage });
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setFormSuccess(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Editar">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Editar Actividad
          </DialogTitle>
          <DialogDescription>
            Modifica la información de la actividad "{activity.title}"
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ContainerForm>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Estado Actual</h3>
                    <div className="flex gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.admin
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {activity.admin ? 'Solo Admin' : 'Regular'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
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
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">
                        Recursos Multimedia
                      </h3>
                    </div>
                    <FormInputCustom
                      control={form.control}
                      name="resourceUrl"
                      label="URL de Recurso"
                      description="Enlace a redes sociales, páginas web, seguimientos, etc."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
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
                </CardContent>
              </Card>
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
                {form.formState.isSubmitting
                  ? 'Guardando...'
                  : 'Guardar Cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
