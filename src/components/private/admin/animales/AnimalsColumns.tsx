import { Image as ImageIcon, RefreshCcw } from "lucide-react";
import { AnimalActions } from "./AnimalsActions";
import { AnimalsEditStatusDialog } from "./AnimalsUpdateStatusDialog";
import type { AnimalTableRow, EditAnimalInput } from "@/hooks/useAnimals";
import { ColumnDef } from "@tanstack/react-table";

interface AnimalsColumnsProps {
  updateAnimal: (id: number, input: EditAnimalInput) => Promise<any>;
  deleteAnimal: (id: number) => Promise<any>;
  uploadImage?: (id: number, file: File) => Promise<any>;
  updateAnimalStatus: (id: number, input: { status: string }) => Promise<any>;
}

export function createAnimalsColumns({
  updateAnimal,
  deleteAnimal,
  uploadImage,
  updateAnimalStatus,
}: AnimalsColumnsProps): ColumnDef<AnimalTableRow>[] {
  return [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "imageUrl",
      header: "Imagen",
      cell: ({ row }) => {
        const imageUrl = row.original.imageUrl as string | null;
        const nickname = row.original.nickname as string;
        return (
          <div className="flex items-center justify-center w-12 h-12 whitespace-nowrap">
            {imageUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <img
                  src={imageUrl}
                  alt={nickname}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                    }
                  }}
                />
                <div
                  className="w-full h-full bg-muted rounded-full flex items-center justify-center"
                  style={{ display: "none" }}
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
    { accessorKey: "nickname", header: "Nombre" },
    { accessorKey: "type", header: "Tipo" },
    { accessorKey: "breed", header: "Raza" },
    { accessorKey: "size", header: "Tamaño" },
    { accessorKey: "sex", header: "Sexo" },
    { accessorKey: "birthdate", header: "Nacimiento" },
    {
      accessorKey: "descriptionHistory",
      header: "Historia",
      cell: ({ row }) => {
        const value = row.original.descriptionHistory as string;
        return (
          <div className="whitespace-nowrap max-w-[150px] truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    { accessorKey: "status", header: "Estado" },
    {
      accessorKey: "isSterilized",
      header: "Esterilizado",
      cell: ({ row }) => (row.original.isSterilized ? "Sí" : "No"),
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          <AnimalActions
            animal={row.original}
            updateAnimal={updateAnimal}
            deleteAnimal={deleteAnimal}
            uploadImage={uploadImage}
          />
          <AnimalsEditStatusDialog
            animal={row.original}
            updateAnimalStatus={updateAnimalStatus}
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
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}