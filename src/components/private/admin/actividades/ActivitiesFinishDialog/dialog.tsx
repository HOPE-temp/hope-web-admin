'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import { FinishActivityValues, finishActivitySchema } from './schema';
import { finishActivity } from '@/services/hopeBackend/activities';
import { useAuth } from '@/context/AuthContext';
import { useActivity } from '@/context/ActivityContext';

interface ActivitiesFinishDialogProps {
  activity: Activity;
  onFinish: () => void;
}

export function ActivitiesFinishDialog({
  activity,
  onFinish,
}: ActivitiesFinishDialogProps) {
  const { axios } = useAuth();
  const { refreshActivities } = useActivity(); 
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FinishActivityValues>({
    resolver: zodResolver(finishActivitySchema),
    defaultValues: {
      confirm: false,
    },
  });

  const handleFinish = async (data: FinishActivityValues) => {
    if (!data.confirm) {
      toast.error('Debes confirmar para finalizar la actividad');
      return;
    }

    setLoading(true);
    try {
      console.log('Finalizando actividad:', activity.id);
      await finishActivity(axios, activity.id);
      await refreshActivities();
      
      toast.success('Actividad finalizada exitosamente');
      onFinish();
      setOpen(false);
      form.reset();
    } catch (error: any) {
      console.error('Error al finalizar actividad:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error al finalizar la actividad');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };
  if (activity.finished) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          title="Finalizar actividad"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Finalizar Actividad
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas finalizar esta actividad? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-2">Información de la actividad:</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Título:</span> {activity.title}
              </div>
              {activity.scheduleStartAt && (
                <div className="flex items-center gap-1">
                  <CalendarCheck className="h-4 w-4" />
                  <span className="font-medium">Programada para:</span> 
                  {new Date(activity.scheduleStartAt).toLocaleString()}
                </div>
              )}
              <div>
                <span className="font-medium">Estado actual:</span>{' '}
                <Badge className="bg-yellow-100 text-yellow-800 ml-1">
                  Pendiente
                </Badge>
              </div>
              <div>
                <span className="font-medium">Tipo:</span>{' '}
                <Badge className={activity.admin ? "bg-green-100 text-green-800 ml-1" : "bg-gray-100 text-gray-800 ml-1"}>
                  {activity.admin ? 'Administrador' : 'Voluntario'}
                </Badge>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Confirmo que deseo finalizar esta actividad
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Al finalizar, la actividad se marcará como completada y no se podrá modificar.
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(handleFinish)}
            disabled={loading || !form.watch('confirm')}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Finalizando...' : 'Finalizar Actividad'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
