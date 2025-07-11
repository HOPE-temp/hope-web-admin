'use client';

import * as React from 'react';
import { Check, AlertCircle } from 'lucide-react';
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
import { finishActivity } from '@/services/hopeBackend/activities';
import { useAuth } from '@/context/AuthContext';

type Props = {
  activity: Activity;
  onFinish: () => void;
  children: React.ReactNode;
};

export function ActivitiesFinishDialog({
  activity,
  onFinish,
  children,
}: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [finishing, setFinishing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFinish = async () => {
    setFinishing(true);
    setError(null);
    try {
      await finishActivity(axios, activity.id);
      onFinish && onFinish();
      setOpen(false);
    } catch (err: any) {
      setError(err.message || 'Error desconocido al finalizar la actividad');
    } finally {
      setFinishing(false);
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <Check className="w-5 h-5" />
            Finalizar Actividad
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <div>
              ¿Estás seguro de que deseas marcar como finalizada la actividad{' '}
              <strong className="text-foreground">"{activity.title}"</strong>?
            </div>

            <div className="bg-muted p-3 rounded-lg space-y-2">
              <div className="text-sm font-medium">
                Información de la actividad:
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pendiente
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

            {activity.admin && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md">
                <AlertCircle className="w-4 h-4" />
                <div className="text-sm">
                  Esta es una actividad de administración
                </div>
              </div>
            )}
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
            disabled={finishing}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleFinish}
            disabled={finishing}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {finishing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Finalizando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Finalizar Actividad
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
