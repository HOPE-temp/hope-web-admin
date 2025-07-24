'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

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
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';
import { createMedicalCheckup } from '@/services/hopeBackend/medicalCheckups';

import { useAuth } from '@/context/AuthContext';

//schema
import { FormValues, schema } from './schema';
import { formatDatetimeDBFromMiliseconds } from '@/lib/format/formatDate';

type CreatorMedicalCheckupDialogProps = {
  onCreated?: () => void;
};
const ONE_MINUTE = 1000 * 60;
const dictTimeMiliseconds = {
  '15_min': 15 * ONE_MINUTE,
  '30_min': 30 * ONE_MINUTE,
  '45_min': 45 * ONE_MINUTE,
  '60_min': 60 * ONE_MINUTE,
  '90_min': 90 * ONE_MINUTE,
  '120_min': 120 * ONE_MINUTE,
};

export function CreatorMedicalCheckupDialog({
  onCreated,
}: CreatorMedicalCheckupDialogProps) {
  const { axios } = useAuth();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: undefined,
      animalId: undefined,
      scheduleStartAt: undefined,
      durationSchedule: undefined,
    },
  });

  const onSubmit = async ({
    title,
    animalId,
    durationSchedule,
    scheduleStartAt,
  }: FormValues) => {
    const start = new Date(scheduleStartAt).getTime();
    const scheduleEndAt = formatDatetimeDBFromMiliseconds(
      start + dictTimeMiliseconds[durationSchedule]
    );
    const adoption = await createMedicalCheckup(axios, {
      title,
      animalId,
      scheduleStartAt,
      scheduleEndAt,
    });

    if (adoption) {
      toast.success(`Chequeo Medico #${adoption.id} guardada`);

      form.reset();
      onCreated && onCreated();
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar MedicalCheckup
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Registrar MedicalCheckup</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputCustom
                control={form.control}
                label="Titulo"
                name="title"
              />
              <FormInputCustom
                control={form.control}
                label="Animal"
                type="number"
                name="animalId"
              />
              <FormInputCustom
                control={form.control}
                label="Inicio"
                type="datetime-local"
                name="scheduleStartAt"
              />
              <FormSelectCustom
                control={form.control}
                label="Duración"
                name="durationSchedule"
                options={[
                  { label: '15 min', value: '15_min' },
                  { label: '30 min', value: '30_min' },
                  { label: '45 min', value: '45_min' },
                  { label: '1 hora', value: '60_min' },
                  { label: '1.5 horas', value: '90_min' },
                  { label: '2 horas', value: '120_min' },
                ]}
              />
            </div>
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
                {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
