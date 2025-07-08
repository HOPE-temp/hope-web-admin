import React, { useState } from 'react';
import { AnimalsEditDialog } from './AnimalsEditDialog';
import { AnimalsDeleteDialog } from './AnimalsDeleteDialog';
import { AnimalImageUploadDialog } from './AnimalImageUploadDialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { AnimalTableRow, EditAnimalInput } from '@/hooks/useAnimals';
import { CreatorAnimalDialog } from './CreatorAnimalDialog';
import { EditorAnimalsDialog } from './EditorAnimalDialog';

interface Props {
  animal: AnimalTableRow;
  updateAnimal: (id: number, input: EditAnimalInput) => Promise<any>;
  deleteAnimal: (id: number) => Promise<any>;
  uploadImage: (id: number, file: File) => Promise<any>;
}

export const AnimalActions = ({
  animal,
  updateAnimal,
  deleteAnimal,
  uploadImage,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!uploadImage) return;
    setLoading(true);
    await uploadImage(animal.id, file);
    setLoading(false);
  };

  return (
    <div className="flex gap-2 whitespace-nowrap">
      <EditorAnimalsDialog animal={animal} />
      <AnimalsDeleteDialog animal={animal} />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDialogOpen(true)}
        title="Subir Imagen"
      >
        <ImageIcon className="w-5 h-5" />
      </Button>
      <AnimalImageUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpload={handleUpload}
        loading={loading}
      />
    </div>
  );
};
