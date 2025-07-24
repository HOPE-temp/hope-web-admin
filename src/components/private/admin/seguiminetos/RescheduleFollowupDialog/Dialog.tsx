'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FormInputCustom } from '@/components/shared/Input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, schema } from './schema';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { rescheduleFollowup } from '@/services/hopeBackend/followups';
import { Button } from '@/components/ui/button';

interface Props {
  followup: AdoptedAnimal;
  onUpdated?: () => void;
}

const defaultValues = {
  scheduleStartAt: undefined,
};

export function RescheduleFollowupDialog({ followup, onUpdated }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, followup]);

  const onSubmit = async (data: FormValues) => {
    try {
      await rescheduleFollowup(axios, followup.id, data);
      toast.success(`Evaluacion de la solicitud ${followup.id}`);
      onUpdated && onUpdated();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error('Ya existe un followup con ese nombre.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
          title="Nueva fecha"
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Cambiar la fecha de seguimiento
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FormInputCustom
                control={form.control}
                label="Nueva fecha"
                type="datetime-local"
                name="scheduleStartAt"
              />
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
                  Cancelar
                </button>
              </DialogClose>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Aceptar
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
