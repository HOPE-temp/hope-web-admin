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
import {
  CheckboxItem,
  DynamicCheckboxList,
} from '@/components/shared/Input/DynamicCheckboxList';
import AnimalCheckbox from '@/components/shared/AnimalCheckbox/AnimalCheckbox';
import { isAxiosError } from 'axios';

type CreatorAdoptionDialogProps = {
  onCreated?: () => void;
};

export function CreatorAdoptionDialog({
  onCreated,
}: CreatorAdoptionDialogProps) {
  const { axios } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [checkOptions, setCheckOptions] = React.useState<CheckboxItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      adopterId: undefined,
      animalsIds: undefined,
    },
  });

  const onSubmit = async ({ adopterId, animalsIds }: FormValues) => {
    try {
      const adoption = await createAdoption(axios, {
        adopterId,
        animalsIds,
      });
      if (adoption) {
        toast.success(`Mascota #${adoption.id} guardada`);

        form.reset();
        onCreated && onCreated();
        setTimeout(() => {
          setOpen(false);
        }, 1200);
      }
    } catch (error) {
      toast.error('error.message');

      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          toast.error('Ya existe un adoption con ese nombre.');
        }
        toast.error(error.message);
      }
    }
  };

  const handleSearch = (data: PaginationResponse<Animal>) => {
    const { items } = data;
    let ckecks: CheckboxItem[] = [];
    if (items.length > 0) {
      ckecks = items.map(animal => {
        return {
          id: animal.id,
          image: animal.images[0],
          name: animal.nickname,
          description: animal.descriptionHistory,
        };
      });
    }
    setCheckOptions(ckecks);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Adoption
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Registrar Adoption</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-scroll">
          <AnimalCheckbox onSearch={handleSearch} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <DynamicCheckboxList
                  control={form.control}
                  title="Animal"
                  name="animalsIds"
                  items={checkOptions}
                />
                <FormInputCustom
                  control={form.control}
                  label="Adoptante"
                  type="number"
                  name="adopterId"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
