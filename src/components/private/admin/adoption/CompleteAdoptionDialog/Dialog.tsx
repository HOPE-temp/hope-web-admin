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
import { CheckSquare } from 'lucide-react';
import { completeAdoption } from '@/services/hopeBackend/adoptions';
import { useAuth } from '@/context/AuthContext';
import {
  FormCheckboxCustom,
  FormTextareaCustom,
} from '@/components/shared/Input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, schema } from './schema';
import toast from 'react-hot-toast';
import { isAxiosError } from '@/lib/axiosInstance';

interface Props {
  adoption: Adoption;
  onUpdated?: () => void;
}

const defaultValues = {
  statusResult: undefined,
  reviewRequestNotes: undefined,
};

export function CompleteAdoptionDialog({ adoption, onUpdated }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      adoptionHistory: adoption.adoptionHistory ?? '',
      isWebVisible: adoption.isWebVisible,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        adoptionHistory: adoption.adoptionHistory ?? '',
        isWebVisible: adoption.isWebVisible,
      });
    }
  }, [open, adoption]);

  const onSubmit = async (data: FormValues) => {
    try {
      await completeAdoption(axios, adoption.id, data);
      toast.success(`Competaste la solicitud ${adoption.id}`);
      onUpdated && onUpdated();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error('Ya existe un animal con ese nombre.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Completar solicitud">
          <CheckSquare className="h-5 w-5 text-violet-600" />
        </button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Completar Solicitud de Adopción
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FormTextareaCustom
                control={form.control}
                rows={5}
                label="Notas de Solicitud"
                name="adoptionHistory"
              />
              <FormCheckboxCustom
                control={form.control}
                name="isWebVisible"
                label="¿Será visible en web?"
                description="Marca esta opción si la adopcion sera visible en la web."
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
