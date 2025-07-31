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
} from '@/components/ui/dialog';

//schema
import { CheckboxItem } from '@/components/shared/Input';
import { CarouselDinamic } from '@/components/shared/Carrusel';
import { FormCreatedAdoption } from './FormCreatedAdoption/FormCreatedAdoption';
import { FormAnimal } from '.';
import { FormAdopter } from './FormAdopter/FormAdopter';

export interface ContextProps {
  setAnimals: React.Dispatch<React.SetStateAction<CheckboxItem[]>>;
  animals: CheckboxItem[];
  setAdopter: React.Dispatch<
    React.SetStateAction<Partial<Adopter> | undefined>
  >;
  adopter: Partial<Adopter> | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onCreated?: () => void;
}

type CreatorAdoptionDialogProps = {
  onCreated?: () => void;
};

export function CreatorAdoptionDialog({
  onCreated,
}: CreatorAdoptionDialogProps) {
  const [animals, setAnimals] = React.useState<CheckboxItem[]>([]);
  const [adopter, setAdopter] = React.useState<Partial<Adopter>>();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Adoption
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-5xl p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle>Registrar Adoption</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo animal.
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-[90vw]">
          <CarouselDinamic
            renders={[FormCreatedAdoption, FormAnimal, FormAdopter]}
            context={{
              animals,
              setAnimals,
              adopter,
              setAdopter,
              onCreated,
              open,
              setOpen,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
