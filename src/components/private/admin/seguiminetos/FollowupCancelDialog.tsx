'use client';

import * as React from 'react';
import { OctagonX } from 'lucide-react';
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
import { cancelFollowup } from '@/services/hopeBackend/followups';
import { useAuth } from '@/context/AuthContext';

type Props = {
  followup: AdoptedAnimal;
  onCancel?: () => void;
};

export function FollowupCancelDialog({ followup, onCancel }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      await cancelFollowup(axios, followup.id);
      setOpen(false);
      onCancel && onCancel();
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
          className="text-red-600 hover:text-red-700"
          title="Cancelar sequimiento"
        >
          <OctagonX className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Finalizar el seguimineto</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas cancelar este seguimineto? Ya no se
            podra registrar la esterilizacion del animal.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-red-500">{error}</p>}
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
            {deleting ? 'Finalizar...' : 'Finalizar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
