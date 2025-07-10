'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updateStatusAnimal } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { useAnimal } from '@/context/AnimalContext';

interface Props {
  animal: Animal;
  trigger?: React.ReactNode;
  onUpload?: () => void;
}

const STATUS_OPTIONS = [
  { value: 'in_adoption', label: 'En Adopción' },
  { value: 'in_observation', label: 'En Observación' },
  { value: 'dead', label: 'Fallecido' },
];

export function AnimalsEditStatusDialog({ animal, trigger, onUpload }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<StatusAnimal>(animal.status);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateStatusAnimal(axios, animal.id, { status });
      setOpen(false);
      onUpload && onUpload();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar estado');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeValue: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const value = e.target.value as StatusAnimal;

    setStatus(value);
  };

  React.useEffect(() => {
    if (open) setStatus(animal.status);
  }, [open, animal.status, animal.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Editar Estado
          </Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Actualizar Estado</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={handleChangeValue}
            disabled={loading}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || status === animal.status}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
