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

import { schema, FormValues } from './schema';

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

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nombre de la actividad"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="admin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={e => field.onChange(e.target.checked)}
                            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Actividad de administración</FormLabel>
                          <FormDescription>
                            Solo administradores pueden finalizarla
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">Recursos Multimedia</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="resourceUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de Recurso</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              {...field}
                              type="url"
                              placeholder="https://..."
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enlace a redes sociales, páginas web, seguimientos,
                          etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
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
                    <FormField
                      control={form.control}
                      name="scheduleStartAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha y Hora de Inicio</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormDescription>
                            Cuándo debe comenzar la actividad
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scheduleEndAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha y Hora de Fin</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormDescription>
                            Cuándo debe finalizar la actividad
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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