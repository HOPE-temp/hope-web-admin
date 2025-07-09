import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadImageAnimal } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { Form } from '@/components/ui/form';
import { FormFileInputCustom } from '@/components/shared/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//schema
import { FormValues, schema } from './schema';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UploaderAnimalImageDialogProps {
  animal: Animal;
}

export function UploaderAnimalImageDialog({
  animal,
}: UploaderAnimalImageDialogProps) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: undefined,
    },
  });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selected = e.target.files?.[0];
  //   if (selected) setFile(selected);
  // };

  const handleUpload = async ({ image }: FormValues) => {
    try {
      if (image && animal.id) {
        const file = image?.item(0);
        if (file) {
          // await uploadImageAnimal(axios, animal.id, file);
          toast.success(`Imagen de la mascota #${animal.id} guardada`);
        }
      }

      form.reset();
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
        <Button variant="ghost" size="sm">
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir Imagen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpload)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1  gap-4">
              <FormFileInputCustom
                control={form.control}
                label="Imagen"
                name="image"
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
