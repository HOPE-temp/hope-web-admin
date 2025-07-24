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
import { useAuth } from '@/context/AuthContext';
import {
  FormCheckboxCustom,
  FormInputCustom,
  FormTextareaCustom,
} from '@/components/shared/Input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, schema } from './schema';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { createEvaluation } from '@/services/hopeBackend/evaluations';

interface Props {
  adopter: Adopter;
  onUpdated?: () => void;
}

const defaultValues = {
  idAnimal: undefined,
  profession: undefined,
  professionDescription: undefined,
  hasKids: undefined,
  responsabilityKids: undefined,
  descriptionPets: undefined,
  contextPets: undefined,
  hasPatienceAndTime: undefined,
  hasSterilizationCommitment: undefined,
  descriptionSpaceForNewPet: undefined,
};

export function EvaluationAdopterDialog({ adopter, onUpdated }: Props) {
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
  }, [open, adopter]);

  const onSubmit = async (evaluation: FormValues) => {
    try {
      await createEvaluation(axios, adopter.id, evaluation);
      toast.success(`Evaluacion de la solicitud ${adopter.id}`);
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
            <div className="grid grid-cols-1 gap-4 mt-2 max-h-80 overflow-scroll">
              <span></span>
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿A que se dedica?"
                name="profession"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Necesitamos asegurarnos que tenga una esabilida economica para cualquier eventialidad con su nuevo compañero"
                name="professionDescription"
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasKids"
                label="Tienes niños"
                description="¿Tines niños a tu cuidado?."
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Es fundamental la responsabilida, paciencia y supervicion, si cumple con estas caracteriticas, describalo detalladamente"
                name="responsabilityKids"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿Qué otras mascotas tiene en casa?"
                name="descriptionPets"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿Describa la condicion en la que viven esas mascotas?"
                name="contextPets"
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasPatienceAndTime"
                label="Tiempo y paciencia"
                description="¿Tines tiempo y paciencia para cuidar a un nuevo integrante en tu casa?."
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasSterilizationCommitment"
                label="Tiempo y paciencia"
                description="¿Se compromete a la esterilizacion del animal?"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿Se compromete a la esterilizacion del animal?, escribalo"
                name="hasSterilizationCommitment"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Desriba el espacio de la nueva mascota"
                name="descriptionSpaceForNewPet"
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
