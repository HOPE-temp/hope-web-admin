import React from 'react';
import { EditorAnimalsDialog } from '../EditorAnimalDialog';
import { AnimalsDeleteDialog } from '../AnimalsDeleteDialog';
import { AnimalsEditStatusDialog } from '../AnimalsUpdateStatusDialog';
import { UploaderAnimalImageDialog } from '../UploaderAnimalImageDialog';
import { RefreshCcw } from 'lucide-react';

interface Props {
  animal: Animal;
}

export const AnimalActions = ({ animal }: Props) => {
  return (
    <div className="flex gap-2 whitespace-nowrap">
      <EditorAnimalsDialog animal={animal} />
      <AnimalsDeleteDialog animal={animal} />
      <UploaderAnimalImageDialog animal={animal} />
      <AnimalsEditStatusDialog
        animal={animal}
        trigger={
          <button
            type="button"
            className="p-2 rounded hover:bg-muted transition-colors"
            title="Actualizar Estado"
          >
            <RefreshCcw className="w-4 h-4 text-blue-600" />
          </button>
        }
      />
    </div>
  );
};
