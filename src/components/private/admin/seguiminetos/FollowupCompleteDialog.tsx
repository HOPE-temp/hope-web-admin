'use client';

import * as React from 'react';
import { CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { completeFollowup } from '@/services/hopeBackend/followups';
import { useAuth } from '@/context/AuthContext';

type Props = {
  followup: AdoptedAnimal;
  onComplete?: () => void;
};

export function FollowupCompleteDialog({ followup, onComplete }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      await completeFollowup(axios, followup.id);
      setOpen(false);
      onComplete && onComplete();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar followup');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700"
          title="Completar sequimiento"
        >
          <CheckSquare className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Eliminar Adopter</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este followup? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-green-500">{error}</p>}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
