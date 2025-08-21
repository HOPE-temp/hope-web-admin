'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ImageIcon, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  deleteAnimalImage,
  uploadImageAnimal,
} from '@/services/hopeBackend/animals';
import { useAuth } from '@/context/AuthContext';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ImageOperation {
  id: number;
  type: 'add' | 'edit' | 'delete';
  file?: File;
  newName?: string;
  preview?: string;
  publicId?: string; // For edit/delete operations
}

interface BatchImageManagerProps {
  animal: Animal;
  onSave?: () => void;
}

export function BatchImageManager({ animal, onSave }: BatchImageManagerProps) {
  const { axios } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [operations, setOperations] = React.useState<ImageOperation[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const currentImages = React.useMemo(() => {
    return animal.images || [];
  }, [animal.images]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
      setError('El archivo es muy grande. Máximo 5MB.');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError('Formato no válido. Solo JPG, PNG y WEBP.');
      return;
    }

    const preview = URL.createObjectURL(file);
    const newOperation: ImageOperation = {
      id: new Date().getTime(), // Unique ID based on timestamp
      type: 'add',
      file,
      preview,
    };

    setOperations(prev => [...prev, newOperation]);
    setError(null);
    e.target.value = '';
  };

  const handleDeleteImage = (imageId: number) => {
    const existingImage = currentImages.find(img => img.id === imageId);
    if (!existingImage) return;

    const deleteOperation: ImageOperation = {
      id: imageId,
      type: 'delete',
      publicId: existingImage.publicId,
    };

    setOperations(prev => [...prev, deleteOperation]);
  };

  const handleEditImage = (imageId: number) => {
    const existingImage = currentImages.find(img => img.id === imageId);
    if (!existingImage) return;

    const editOperation: ImageOperation = {
      id: imageId,
      type: 'edit',
    };

    setOperations(prev => {
      const filtered = prev.filter(
        op => !(op.id === imageId && op.type === 'edit')
      );
      return [...filtered, editOperation];
    });
  };

  const removeOperation = (operationId: number) => {
    setOperations(prev => prev.filter(op => op.id !== operationId));
  };

  const handleConfirmChanges = async () => {
    if (operations.length === 0) {
      setError('No hay cambios pendientes');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Execute operations sequentially
      for (const operation of operations) {
        switch (operation.type) {
          case 'add':
            if (operation.file) {
              await uploadImageAnimal(axios, animal.id, operation.file);
            }
            break;
          case 'edit':
            // Here you would call your edit API
            console.log(
              `Editing image ${operation.id} to ${operation.newName}`
            );
            break;
          case 'delete':
            // Here you would call your delete API
            if (operation.publicId) {
              await deleteAnimalImage(axios, {
                id: animal.id,
                publicIds: [operation.publicId],
              });
            }
            console.log(`Deleting image ${operation.id}`);
            break;
        }
      }

      toast.success(`${operations.length} cambios aplicados exitosamente`);
      setOperations([]);
      onSave && onSave();

      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (error) {
      console.error('Error applying changes:', error);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          setError('Conflicto al aplicar cambios.');
        } else if (status === 413) {
          setError('Una o más imágenes son muy grandes.');
        } else if (message) {
          setError(Array.isArray(message) ? message.join(', ') : message);
        } else {
          setError('Error al aplicar cambios.');
        }
      } else {
        setError('Error al aplicar cambios.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setOperations([]);
      setError(null);
      setPreviewImage(null);
    }
  };

  const getPendingOperations = () => {
    const addOps = operations.filter(op => op.type === 'add');
    const editOps = operations.filter(op => op.type === 'edit');
    const deleteOps = operations.filter(op => op.type === 'delete');

    return { addOps, editOps, deleteOps };
  };

  const { addOps, editOps, deleteOps } = getPendingOperations();

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl max-h-[80vh] overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Administrar Imágenes - {animal.nickname}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="new-image" className="text-base font-semibold">
              Añadir Nueva Imagen
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="new-image"
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Imágenes Actuales</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentImages.map(image => {
                const isMarkedForDeletion = deleteOps.some(
                  op => op.id === image.id
                );
                const editOp = editOps.find(op => op.id === image.id);

                return (
                  <div
                    key={image.id}
                    className={`relative border rounded-lg p-3 ${
                      isMarkedForDeletion
                        ? 'bg-red-50 border-red-200'
                        : 'bg-white'
                    }`}
                  >
                    <img
                      src={image.url || '/placeholder.svg'}
                      alt={`image-${image.id}`}
                      className="w-full h-32 object-cover rounded mb-2 cursor-pointer"
                      onClick={() => setPreviewImage(image.url)}
                    />
                    {editOp && (
                      <p className="text-xs text-blue-600 mb-1">
                        Será renombrado a: {editOp.newName}
                      </p>
                    )}
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewImage(image.url)}
                        disabled={isMarkedForDeletion}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={
                          isMarkedForDeletion ? 'default' : 'destructive'
                        }
                        size="sm"
                        onClick={() => {
                          if (isMarkedForDeletion) {
                            removeOperation(image.id);
                          } else {
                            handleDeleteImage(image.id);
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    {isMarkedForDeletion && (
                      <p className="text-xs text-red-600 mt-1">
                        Marcado para eliminar
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {addOps.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold text-green-600">
                Nuevas Imágenes a Añadir
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {addOps.map(operation => (
                  <div
                    key={operation.id}
                    className="relative border border-green-200 bg-green-50 rounded-lg p-3"
                  >
                    <img
                      src={operation.preview || '/placeholder.svg'}
                      alt="Nueva imagen"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeOperation(operation.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {operations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                Resumen de Cambios Pendientes:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {addOps.length > 0 && (
                  <li>• {addOps.length} imagen(es) para añadir</li>
                )}
                {editOps.length > 0 && (
                  <li>• {editOps.length} imagen(es) para renombrar</li>
                )}
                {deleteOps.length > 0 && (
                  <li>• {deleteOps.length} imagen(es) para eliminar</li>
                )}
              </ul>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {previewImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage || '/placeholder.svg'}
              alt="Preview"
              className="max-w-[90%] max-h-[90%] object-contain"
            />
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirmChanges}
            disabled={operations.length === 0 || saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving
              ? 'Aplicando Cambios...'
              : `Confirmar ${operations.length} Cambio(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
