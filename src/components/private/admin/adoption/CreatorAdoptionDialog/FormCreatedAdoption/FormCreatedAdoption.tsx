'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SlideActions } from '@/components/shared/Carrusel';

import { FormValues, schema } from './schema';

import { ContextProps } from '..';

import { createAdoption } from '@/services/hopeBackend/adoptions';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2Icon, PlusIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function FormCreatedAdoption(
  index: number,
  { prevSlide, setSlide }: SlideActions,
  { onCreated, setOpen, adopter, animals }: ContextProps
) {
  const { axios } = useAuth();

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
  adopter?.id && form.setValue('adopterId', adopter.id);
  form.setValue(
    'animalsIds',
    animals.map(({ id }) => id)
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 min-w-60"
        >
          <div className="grid grid-cols-1 gap-2">
            <h3 className="font-semibold mb-2">Animales seleccionados:</h3>
            {animals.length > 0 && (
              <div className="mt-2 p-2 bg-muted rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {animals.map(item => {
                    return item ? (
                      <Badge
                        key={item.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <div className="w-4 h-4 rounded overflow-hidden">
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            width={16}
                            height={16}
                            className="object-cover"
                          />
                        </div>
                        {item.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="animalsIds"
              render={() => {
                return (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button onClick={() => setSlide(1)}>
              {animals.length > 0 ? (
                <>
                  <Edit2Icon />
                  Editar animales
                </>
              ) : (
                <>
                  <PlusIcon />
                  Añadir animales
                </>
              )}
            </Button>
            <hr />
            <h3 className="font-semibold mb-2">Adopter:</h3>
            {adopter && (
              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-md `}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1 ">
                          <h3 className="font-semibold text-sm truncate">
                            {adopter.firstName} {adopter.lastName}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {adopter.documentNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <FormField
              control={form.control}
              name="adopterId"
              render={({ field: { value } }) => {
                return (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button onClick={() => setSlide(2)}>
              {!adopter ? (
                <>
                  <PlusIcon />
                  Añadir adoptante
                </>
              ) : (
                <>
                  <Edit2Icon />
                  Editar adoptante
                </>
              )}
            </Button>
          </div>
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
          <div className="flex justify-around">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
