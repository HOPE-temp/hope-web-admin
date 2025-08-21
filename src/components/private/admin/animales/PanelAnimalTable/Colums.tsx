import { CatIcon, DogIcon, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { EditorAnimalsDialog } from '../EditorAnimalDialog';
import { AnimalsDeleteDialog } from '../AnimalsDeleteDialog';
import { BatchImageManager } from '../UploaderAnimalImageDialog';
import { AnimalsEditStatusDialog } from '../AnimalsUpdateStatusDialog';

interface AnimalsColumnsProps {
  updateAnimals: () => void;
}

export function createAnimalsColumns({
  updateAnimals,
}: AnimalsColumnsProps): ColumnDef<Animal>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    {
      accessorKey: 'imageUrl',
      header: 'Imagen',
      cell: ({ row }) => {
        const imageUrl =
          row.original.images.length > 0
            ? row.original.images[0].url
            : '/images/avatar-dog.png';
        const nickname = row.original.nickname as string;
        return (
          <div className="flex items-center justify-center w-12 h-12 whitespace-nowrap">
            {imageUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <img
                  src={imageUrl}
                  alt={nickname}
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      (
                        e.currentTarget.nextElementSibling as HTMLElement
                      ).style.display = 'flex';
                    }
                  }}
                />
                <div
                  className="w-full h-full bg-muted rounded-full flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'nickname',
      header: 'Nombre',
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }) => {
        const value = row.original.type as TypeAnimal;
        const typeAnimalDict = {
          dog: { name: 'Perro', icon: <DogIcon /> },
          cat: { name: 'Gato', icon: <CatIcon /> },
        };
        return (
          <Badge variant={'outline'}>
            <span>
              {typeAnimalDict[value].icon}
              {`${typeAnimalDict[value].name}`}
            </span>
          </Badge>
        );
      },
    },
    { accessorKey: 'breed', header: 'Raza' },
    {
      accessorKey: 'size',
      header: 'Tamaño',
      cell: ({ row }) => {
        const value = row.original.size as SizeAnimal;
        const sizeAnimalDict = {
          small: { name: 'Pequeño', color: 'bg-orange-100' },
          medium: { name: 'Mediano', color: 'bg-orange-200' },
          large: { name: 'Grande', color: 'bg-orange-400' },
          giant: { name: 'Muy grande', color: 'bg-orange-600' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${sizeAnimalDict[value].color}`}
          >
            {`${sizeAnimalDict[value].name}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'sex',
      header: 'Sexo',
      cell: ({ row }) => {
        const value = row.original.sex as SexAnimal;
        const sexAnimalDict = {
          male: { name: 'Macho', color: 'bg-blue-200' },
          female: { name: 'Hembra', color: 'bg-red-200' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${sexAnimalDict[value].color}`}
          >
            {`${sexAnimalDict[value].name}`}
          </Badge>
        );
      },
    },
    { accessorKey: 'birthdate', header: 'Nacimiento' },
    {
      accessorKey: 'descriptionHistory',
      header: 'Historia',
      cell: ({ row }) => {
        const value = row.original.descriptionHistory as string;
        return (
          <div
            className="whitespace-nowrap max-w-[150px] truncate"
            title={value}
          >
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => {
        const value = row.original.status as StatusAnimal;
        const statusAnimalDict = {
          in_adoption: { name: 'En adopción', color: 'bg-green-600' },
          in_observation: { name: 'En observacion', color: 'bg-yellow-600' },
          adopted: { name: 'Adoptado', color: 'bg-blue-600' },
          dead: { name: 'Fallecido', color: 'bg-red-600' },
        };
        return (
          <Badge
            variant={'destructive'}
            className={`${statusAnimalDict[value].color}`}
          >
            {`${statusAnimalDict[value].name}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'isSterilized',
      header: 'Esterilizado',
      cell: ({ row }) => (row.original.isSterilized ? 'Sí' : 'No'),
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          <div className="flex gap-2 whitespace-nowrap">
            <EditorAnimalsDialog animal={row.original} onEdit={updateAnimals} />
            <AnimalsDeleteDialog
              animal={row.original}
              onDelete={updateAnimals}
            />
            <BatchImageManager animal={row.original} onSave={updateAnimals} />
            <AnimalsEditStatusDialog
              animal={row.original}
              onUpload={updateAnimals}
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
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
