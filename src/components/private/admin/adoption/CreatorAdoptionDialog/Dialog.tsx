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

import { FormInputCustom } from '@/components/shared/Input/InputCustom';
import { createAdoption } from '@/services/hopeBackend/adoptions';

import { useAuth } from '@/context/AuthContext';

//schema
import { FormValues, schema } from './schema';

type CreatorAdoptionDialogProps = {
  onCreated?: () => void;
};

export function CreatorAdoptionDialog({
  onCreated,
}: CreatorAdoptionDialogProps) {
  const { axios } = useAuth();

  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      adopterId: undefined,
      animalsIds: undefined,
    },
  });

  const onSubmit = async ({ adopterId, animalsIds }: FormValues) => {
    const adoption = await createAdoption(axios, {
      adopterId,
      animalsIds: [animalsIds],
    });

    if (adoption) {
      toast.success(`Mascota #${adoption.id} guardada`);

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
          Registrar Adoption
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Registrar Adoption</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputCustom
                control={form.control}
                label="Adoptante"
                type="number"
                name="adopterId"
              />
              <FormInputCustom
                control={form.control}
                label="Animal"
                type="number"
                name="animalsIds"
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
