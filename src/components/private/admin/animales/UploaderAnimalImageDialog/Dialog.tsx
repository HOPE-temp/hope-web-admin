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
import { Label } from '@/components/ui/label';
import { uploadImageAnimal } from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UploaderAnimalImageDialogProps {
  animal: Animal;
  onUpload?: () => void;
}

export function UploaderAnimalImageDialog({
  animal,
  onUpload,
}: UploaderAnimalImageDialogProps) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if (file.size > maxSize) {
        setError('El archivo es muy grande. Máximo 5MB.');
        setSelectedFile(null);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setError('Formato no válido. Solo JPG, PNG y WEBP.');
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
      console.log('File selected:', file.name, file.size);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !animal.id) {
      setError('Por favor selecciona una imagen');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      await uploadImageAnimal(axios, animal.id, selectedFile);
      toast.success(`Imagen de la mascota #${animal.id} guardada`);
      onUpload && onUpload();
      setSelectedFile(null);
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      console.error('Error uploading image:', error);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          setError('Ya existe un animal con ese nombre.');
        } else if (status === 413) {
          setError('La imagen es muy grande.');
        } else if (message) {
          setError(Array.isArray(message) ? message.join(', ') : message);
        } else {
          setError('Error al subir la imagen.');
        }
      } else {
        setError('Error al subir la imagen.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedFile(null);
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Subir Imagen - {animal.nickname}</DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="image">Imagen</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="text-sm text-green-600">
              ✓ {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir Imagen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
