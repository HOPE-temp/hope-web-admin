"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Activity } from "@/hooks/useActivities";

type Props = {
  activity: Activity;
  deleteActivity: (id: number) => Promise<any>;
};

export function ActivitiesDeleteDialog({ activity, deleteActivity }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteActivity(activity.id);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Error desconocido al eliminar la actividad");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Actividad</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar la actividad <strong>{activity.title}</strong>? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={deleting}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}