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
import { Pencil } from 'lucide-react';
import { updateAdopters } from '@/services/hopeBackend/adopters';
import { useAuth } from '@/context/AuthContext';
import {
  FormInputCustom,
  FormSelectCustom,
  FormTextareaCustom,
} from '@/components/shared/Input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, schema } from './schema';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

interface Props {
  adoption: Adopter;
  onUpdated?: () => void;
}

const defaultValues = {
  statusResult: undefined,
  reviewRequestNotes: undefined,
};

export function EvaluationAdopterDialog({ adoption, onUpdated }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      statusResult: adoption.statusResult,
      reviewRequestNotes: adoption.reviewRequestNotes ?? '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        statusResult: adoption.statusResult,
        reviewRequestNotes: adoption.reviewRequestNotes ?? '',
      });
    }
  }, [open, adoption]);

  const onSubmit = async (data: FormValues) => {
    try {
      await evaluationAdopter(axios, adoption.id, data);
      toast.success(`Evaluacion de la solicitud ${adoption.id}`);
      onUpdated && onUpdated();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error('Ya existe un adoption con ese nombre.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Evaluar">
          <Pencil className="h-5 w-5 text-black" />
        </button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Evaluación de Solicitud de Adopción
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FormSelectCustom
                control={form.control}
                label="Resultado"
                name="statusResult"
                options={[
                  { label: 'No evaluado', value: 'not_evaluated' },
                  { label: 'Aprobado', value: 'approved' },
                  { label: 'Rechazado', value: 'rejected' },
                  { label: 'Banneado', value: 'banned' },
                ]}
              />
              <FormTextareaCustom
                control={form.control}
                rows={5}
                label="Notas de Solicitud"
                name="reviewRequestNotes"
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
