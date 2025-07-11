'use client';

import * as React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
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
import { useAuth } from '@/context/AuthContext';
import { deleteActivity } from '@/services/hopeBackend/activities';

type Props = {
  activity: Activity;
  onDelete: () => void;
};

export function ActivitiesDeleteDialog({ activity }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteActivity(axios, activity.id);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || 'Error desconocido al eliminar la actividad');
    } finally {
      setDeleting(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Eliminar Actividad
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <div>
              ¿Estás seguro de que deseas eliminar la actividad{' '}
              <strong className="text-foreground">"{activity.title}"</strong>?
            </div>

            <div className="bg-muted p-3 rounded-lg space-y-2">
              <div className="text-sm font-medium">
                Información de la actividad:
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.finished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {activity.finished ? 'Finalizada' : 'Pendiente'}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.admin
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {activity.admin ? 'Solo Admin' : 'Regular'}
                </span>
              </div>
              {activity.resourceUrl && (
                <div className="text-xs text-muted-foreground">
                  Tiene recurso asociado
                </div>
              )}
              {activity.imageUrl && (
                <div className="text-xs text-muted-foreground">
                  Tiene imagen asociada
                </div>
              )}
            </div>

            <div className="text-sm text-red-600 font-medium">
              Esta acción no se puede deshacer.
            </div>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

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
            className="bg-red-600 hover:bg-red-700"
          >
            {deleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
