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
import { deleteUser } from '@/services/hopeBackend/users';
import { useAuth } from '@/context/AuthContext';

type Props = {
  user: User;
  onDelete: () => void;
};

export function UserDeleteDialog({ user, onDelete }: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      await deleteUser(axios, user.id);
      setOpen(false);
      onDelete && onDelete();
    } catch (err: any) {
      let errorMessage = 'Algo salió mal';

      try {
        if (err.response?.data?.message) {
          const backendMessage = err.response.data.message;
          errorMessage = Array.isArray(backendMessage) 
            ? backendMessage.join(', ')
            : backendMessage;
        }
      } catch (parseError) {
        errorMessage = 'Algo salió mal';
      }
      
      setError(errorMessage);
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
          <DialogTitle>Eliminar Usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar al usuario <strong>{user.info.username}</strong>? Esta acción no se puede deshacer.
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
