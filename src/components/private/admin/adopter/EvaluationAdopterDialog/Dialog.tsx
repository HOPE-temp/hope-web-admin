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
import { PlusSquare } from 'lucide-react';
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
import { isAxiosError } from 'axios';
import { createEvaluation } from '@/services/hopeBackend/evaluations';
import { Button } from '@/components/ui/button';

interface Props {
  adopter: { id: number };
  onUpdated?: () => void;
  openExternal?: boolean;
  triggerVisibled?: boolean;
}

const defaultValues = {
  idAnimal: undefined,
  profession: undefined,
  professionDescription: undefined,
  hasKids: false,
  responsabilityKids: undefined,
  descriptionPets: undefined,
  contextPets: undefined,
  hasPatienceAndTime: false,
  hasSterilizationCommitment: false,
  descriptionSpaceForNewPet: undefined,
};

export function EvaluationAdopterDialog({
  adopter,
  onUpdated,
  triggerVisibled = true,
  openExternal = false,
}: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openExternal);
  }, [openExternal]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, adopter]);

  const hasKids = form.watch('hasKids');

  const onSubmit = async (evaluation: FormValues) => {
    const res = await createEvaluation(axios, adopter.id, evaluation);
    if (!res) {
      return;
    }
    toast.success(`Evaluacion de la solicitud ${adopter.id}`);
    onUpdated && onUpdated();
    setTimeout(() => {
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerVisibled && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            title="Evaluar"
            className=" text-black"
          >
            <PlusSquare />
            Eval
          </Button>
        </DialogTrigger>
      )}

      <DialogContent aria-describedby={undefined} className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Evaluación de Solicitud de Adopción
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 mt-2 p-2 max-h-[65vh] overflow-y-scroll sm:overflow-auto">
              <span></span>
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿A qué se dedica?"
                name="profession"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Describa a qué se dedica para asegurarnos de la estabilidad económica para enfrentar cualquier eventualidad"
                name="professionDescription"
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasKids"
                label="Tienes menores."
                description="¿Tiene niños menores de 5 años en casa?"
              />
              {hasKids && (
                <FormTextareaCustom
                  control={form.control}
                  rows={3}
                  label="Describa la responsabilidad que tiene con los niños en casa. Es fundamental la responsabilidad, la paciencia y la supervisión. Si cumple con estas características, descríbalas detalladamente."
                  name="responsabilityKids"
                />
              )}
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Describa a los animales que tiene en casa."
                name="descriptionPets"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="¿Cómo mantiene a sus mascotas en casa? (alimentación, espacio, atención veterinaria)"
                name="contextPets"
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasPatienceAndTime"
                label="Tiempo y paciencia"
                description="¿Cuenta con el tiempo y la paciencia necesarios para cuidar a esta mascota?"
              />
              <FormCheckboxCustom
                control={form.control}
                name="hasSterilizationCommitment"
                label="Esterilizacion"
                description="¿Se compromete a esterilizar al animal adoptado? (en caso de no estar esterilizado)"
              />
              <FormTextareaCustom
                control={form.control}
                rows={3}
                label="Describa el lugar donde vivirá la mascota (casa, departamento, patio, etc.)"
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
